"use server";

import { OrderStatus } from "@/prisma/generated/enums";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

// Order of statuses for regression checking
const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.PAID,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
  OrderStatus.RETURNED,
  OrderStatus.REFUNDED,
];

type TimestampField =
  | "request_at"
  | "approved_at"
  | "paid_at"
  | "shipped_at"
  | "delivered_at"
  | "cancelled_at"
  | "returned_at"
  | "refunded_at";

// Map status to timestamp field
const STATUS_TIMESTAMP_FIELDS: Record<OrderStatus, TimestampField | null> = {
  [OrderStatus.PENDING]: "request_at",
  [OrderStatus.PROCESSING]: "approved_at",
  [OrderStatus.PAID]: "paid_at",
  [OrderStatus.SHIPPED]: "shipped_at",
  [OrderStatus.DELIVERED]: "delivered_at",
  [OrderStatus.CANCELLED]: "cancelled_at",
  [OrderStatus.RETURNED]: "returned_at",
  [OrderStatus.REFUNDED]: "refunded_at",
};

// Main flow statuses (excludes terminal states)
const MAIN_FLOW = ORDER_STATUS_SEQUENCE.slice(0, 5); // PENDING to DELIVERED

// Get statuses that come after the given status
function getLaterStatuses(status: OrderStatus): OrderStatus[] {
  const statusIndex = MAIN_FLOW.indexOf(status);
  if (statusIndex !== -1) {
    return MAIN_FLOW.slice(statusIndex + 1);
  }
  return [];
}

// Get statuses between current and new status (exclusive of current, inclusive of new)
function getIntermediateStatuses(
  currentStatus: OrderStatus,
  newStatus: OrderStatus,
): OrderStatus[] {
  const currentIndex = MAIN_FLOW.indexOf(currentStatus);
  const newIndex = MAIN_FLOW.indexOf(newStatus);

  if (currentIndex === -1 || newIndex === -1 || newIndex <= currentIndex) {
    return [];
  }

  // Return statuses from current+1 to new (inclusive)
  return MAIN_FLOW.slice(currentIndex + 1, newIndex + 1);
}

export interface UpdateOrderStatusResult {
  success: boolean;
  error?: string;
}

interface OrderUpdateData {
  status: OrderStatus;
  request_at?: Date | null;
  approved_at?: Date | null;
  paid_at?: Date | null;
  shipped_at?: Date | null;
  delivered_at?: Date | null;
  cancelled_at?: Date | null;
  returned_at?: Date | null;
  refunded_at?: Date | null;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
): Promise<UpdateOrderStatusResult> {
  await requireAdmin();

  const order = await prisma.productOrder.findUnique({
    where: { id: orderId },
    select: { id: true, status: true, user_id: true },
  });

  if (!order) {
    return { success: false, error: "Order not found" };
  }

  if (order.status === newStatus) {
    return { success: true }; // No change needed
  }

  const now = new Date();
  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(order.status);
  const newIndex = ORDER_STATUS_SEQUENCE.indexOf(newStatus);

  const updateData: OrderUpdateData = { status: newStatus };

  // If moving forward, set all intermediate timestamps
  if (newIndex > currentIndex) {
    const intermediateStatuses = getIntermediateStatuses(
      order.status,
      newStatus,
    );
    for (const status of intermediateStatuses) {
      const field = STATUS_TIMESTAMP_FIELDS[status];
      if (field) {
        updateData[field] = now;
      }
    }
  }

  // Set the timestamp for the new status (in case it's a terminal status not in main flow)
  const timestampField = STATUS_TIMESTAMP_FIELDS[newStatus];
  if (timestampField && !updateData[timestampField]) {
    updateData[timestampField] = now;
  }

  // If moving backwards, clear timestamps for later statuses
  if (newIndex < currentIndex) {
    const laterStatuses = getLaterStatuses(newStatus);
    for (const laterStatus of laterStatuses) {
      const laterField = STATUS_TIMESTAMP_FIELDS[laterStatus];
      if (laterField) {
        updateData[laterField] = null;
      }
    }

    // Also clear terminal status timestamps if going back to main flow
    if (newIndex < 5) {
      // Going back into main flow
      updateData.cancelled_at = null;
      updateData.returned_at = null;
      updateData.refunded_at = null;
    }
  }

  await prisma.productOrder.update({
    where: { id: orderId },
    data: updateData,
  });

  revalidatePath(`/dashboard/users/${order.user_id}`);
  revalidatePath("/dashboard");

  return { success: true };
}

export interface UpdateOrderPriceResult {
  success: boolean;
  error?: string;
}

export async function updateOrderPrice(
  orderId: string,
  newTotal: number,
): Promise<UpdateOrderPriceResult> {
  await requireAdmin();

  if (newTotal < 0) {
    return { success: false, error: "Price cannot be negative" };
  }

  const order = await prisma.productOrder.findUnique({
    where: { id: orderId },
    select: { id: true, user_id: true },
  });

  if (!order) {
    return { success: false, error: "Order not found" };
  }

  await prisma.productOrder.update({
    where: { id: orderId },
    data: { total: newTotal },
  });

  revalidatePath(`/dashboard/users/${order.user_id}`);
  revalidatePath("/dashboard");

  return { success: true };
}

export interface UpdateOrderDiscountResult {
  success: boolean;
  error?: string;
}

export async function updateOrderDiscount(
  orderId: string,
  newTotalDiscount: number,
): Promise<UpdateOrderDiscountResult> {
  await requireAdmin();

  if (newTotalDiscount < 0) {
    return { success: false, error: "Discount cannot be negative" };
  }

  const order = await prisma.productOrder.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      user_id: true,
      shipping_fee: true,
      ordered_products: {
        select: {
          id: true,
          price: true,
          quantity: true,
          discount: true,
        },
      },
    },
  });

  if (!order) {
    return { success: false, error: "Order not found" };
  }

  // Subtotal = sum of (price * quantity)
  const subtotal = order.ordered_products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  if (newTotalDiscount > subtotal) {
    return { success: false, error: "Discount exceeds order subtotal" };
  }

  // Current sum of item discounts
  const currentTotalDiscount = order.ordered_products.reduce(
    (sum, p) => sum + p.discount,
    0,
  );

  const delta = newTotalDiscount - currentTotalDiscount;

  // If no change, just return success
  if (delta === 0) {
    return { success: true };
  }

  // Distribute delta across items proportionally by item total
  const itemTotals = order.ordered_products.map((p) => ({
    id: p.id,
    total: p.price * p.quantity,
    currentDiscount: p.discount,
  }));

  const grandTotal = itemTotals.reduce((sum, item) => sum + item.total, 0);

  // Calculate new discounts with integer distribution
  let distributed = 0;
  const newDiscounts = itemTotals.map((item, index) => {
    const proportion =
      grandTotal > 0 ? item.total / grandTotal : 1 / itemTotals.length;
    let itemDelta: number;

    if (index === itemTotals.length - 1) {
      // Last item gets the remainder to ensure exact total
      itemDelta = delta - distributed;
    } else {
      itemDelta = Math.round(delta * proportion);
      distributed += itemDelta;
    }

    // Ensure discount stays within bounds [0, item total]
    const newDiscount = Math.max(
      0,
      Math.min(item.total, item.currentDiscount + itemDelta),
    );

    return {
      id: item.id,
      discount: newDiscount,
    };
  });

  // Update all items
  await Promise.all(
    newDiscounts.map((item) =>
      prisma.purchasedProductItem.update({
        where: { id: item.id },
        data: { discount: item.discount },
      }),
    ),
  );

  // Calculate final total
  const finalTotalDiscount = newDiscounts.reduce(
    (sum, item) => sum + item.discount,
    0,
  );
  const newTotal = subtotal + order.shipping_fee - finalTotalDiscount;

  await prisma.productOrder.update({
    where: { id: orderId },
    data: {
      subtotal,
      discount: 0, // Order-level discount is always 0
      total: Math.max(0, newTotal),
    },
  });

  revalidatePath(`/dashboard/users/${order.user_id}`);
  revalidatePath("/dashboard");

  return { success: true };
}

export interface UpdateOrderItemDiscountResult {
  success: boolean;
  error?: string;
}

export async function updateOrderItemDiscount(
  itemId: number,
  discount: number,
): Promise<UpdateOrderItemDiscountResult> {
  await requireAdmin();

  if (discount < 0) {
    return { success: false, error: "Discount cannot be negative" };
  }

  const item = await prisma.purchasedProductItem.findUnique({
    where: { id: itemId },
    select: {
      id: true,
      price: true,
      quantity: true,
      order: {
        select: {
          id: true,
          user_id: true,
          shipping_fee: true,
          ordered_products: {
            select: {
              id: true,
              price: true,
              quantity: true,
              discount: true,
            },
          },
        },
      },
    },
  });

  if (!item) {
    return { success: false, error: "Item not found" };
  }

  const itemTotal = item.price * item.quantity;
  if (discount > itemTotal) {
    return { success: false, error: "Discount exceeds item total" };
  }

  // Update the item discount
  await prisma.purchasedProductItem.update({
    where: { id: itemId },
    data: { discount },
  });

  // Subtotal = sum of (price * quantity) - no discounts included
  const subtotal = item.order.ordered_products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  // Total discount = sum of all item discounts (with updated item)
  const totalItemDiscounts = item.order.ordered_products.reduce(
    (sum, p) => sum + (p.id === itemId ? discount : p.discount),
    0,
  );

  // Total = subtotal + shipping - total discounts
  const newTotal = subtotal + item.order.shipping_fee - totalItemDiscounts;

  await prisma.productOrder.update({
    where: { id: item.order.id },
    data: {
      subtotal,
      discount: 0, // Order-level discount is always 0, total discount is sum of item discounts
      total: Math.max(0, newTotal),
    },
  });

  revalidatePath(`/dashboard/users/${item.order.user_id}`);
  revalidatePath("/dashboard");

  return { success: true };
}

export interface UpdateOrderItemQuantityResult {
  success: boolean;
  error?: string;
}

export async function updateOrderItemQuantity(
  itemId: number,
  quantity: number,
): Promise<UpdateOrderItemQuantityResult> {
  await requireAdmin();

  if (quantity < 1) {
    return { success: false, error: "Quantity must be at least 1" };
  }

  if (!Number.isInteger(quantity)) {
    return { success: false, error: "Quantity must be a whole number" };
  }

  const item = await prisma.purchasedProductItem.findUnique({
    where: { id: itemId },
    select: {
      id: true,
      price: true,
      discount: true,
      order: {
        select: {
          id: true,
          user_id: true,
          shipping_fee: true,
          ordered_products: {
            select: {
              id: true,
              price: true,
              quantity: true,
              discount: true,
            },
          },
        },
      },
    },
  });

  if (!item) {
    return { success: false, error: "Item not found" };
  }

  // Check if new item total can support current discount
  const newItemTotal = item.price * quantity;
  const adjustedDiscount = Math.min(item.discount, newItemTotal);

  // Update the item quantity (and adjust discount if needed)
  await prisma.purchasedProductItem.update({
    where: { id: itemId },
    data: {
      quantity,
      discount: adjustedDiscount,
    },
  });

  // Recalculate order totals with updated quantity
  const subtotal = item.order.ordered_products.reduce(
    (sum, p) => sum + p.price * (p.id === itemId ? quantity : p.quantity),
    0,
  );

  const totalItemDiscounts = item.order.ordered_products.reduce(
    (sum, p) => sum + (p.id === itemId ? adjustedDiscount : p.discount),
    0,
  );

  const newTotal = subtotal + item.order.shipping_fee - totalItemDiscounts;

  await prisma.productOrder.update({
    where: { id: item.order.id },
    data: {
      subtotal,
      discount: 0,
      total: Math.max(0, newTotal),
    },
  });

  revalidatePath(`/dashboard/users/${item.order.user_id}`);
  revalidatePath("/dashboard");

  return { success: true };
}
