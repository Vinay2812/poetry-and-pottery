import { formatCreatedAt } from "@/lib/date";

import type {
  EditedItem,
  OrderData,
  OrderItemViewModel,
  OrderViewModel,
} from "../types";

/**
 * Distributes a total discount delta proportionally across order items
 * based on each item's share of the subtotal.
 *
 * Returns an updated editedItems record with adjusted discounts.
 */
export function distributeDiscount(
  order: OrderData,
  editedItems: Record<number, EditedItem>,
  newTotalDiscount: number,
): Record<number, EditedItem> {
  const subtotal = order.ordered_products.reduce((sum, item) => {
    const edited = editedItems[item.id];
    const qty = edited?.quantity ?? item.quantity;
    return sum + item.price * qty;
  }, 0);

  const currentTotalDiscount = order.ordered_products.reduce((sum, item) => {
    const edited = editedItems[item.id];
    return sum + (edited?.discount ?? item.discount);
  }, 0);

  const delta = newTotalDiscount - currentTotalDiscount;
  if (delta === 0) return editedItems;

  let distributed = 0;
  const newEditedItems = { ...editedItems };

  order.ordered_products.forEach((item, index) => {
    const edited = editedItems[item.id];
    const qty = edited?.quantity ?? item.quantity;
    const currentDiscount = edited?.discount ?? item.discount;
    const itemTotal = item.price * qty;

    const proportion =
      subtotal > 0 ? itemTotal / subtotal : 1 / order.ordered_products.length;
    let itemDelta: number;

    if (index === order.ordered_products.length - 1) {
      itemDelta = delta - distributed;
    } else {
      itemDelta = Math.round(delta * proportion);
      distributed += itemDelta;
    }

    const newDiscount = Math.max(
      0,
      Math.min(itemTotal, currentDiscount + itemDelta),
    );

    newEditedItems[item.id] = {
      ...newEditedItems[item.id],
      discount: newDiscount,
    };
  });

  return newEditedItems;
}

/**
 * Builds the OrderViewModel from raw order data and edited item state.
 */
export function buildOrderDetailViewModel(
  order: OrderData,
  editedItems: Record<number, EditedItem>,
  isPending: boolean,
): OrderViewModel {
  const items: OrderItemViewModel[] = order.ordered_products.map((item) => {
    const edited = editedItems[item.id];
    const qty = edited?.quantity ?? item.quantity;
    const discount = edited?.discount ?? item.discount;
    const itemTotal = item.price * qty;
    const itemFinal = itemTotal - discount;

    return {
      id: item.id,
      productName: item.product.name,
      productImage: item.product.image_urls[0] || null,
      unitPrice: item.price,
      quantity: qty,
      discount,
      itemTotal,
      itemFinal,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const calculatedTotal = Math.max(
    0,
    subtotal + order.shipping_fee - totalDiscount,
  );

  return {
    id: order.id,
    formattedCreatedAt: formatCreatedAt(order.created_at),
    items,
    subtotal,
    shippingFee: order.shipping_fee,
    totalDiscount,
    calculatedTotal,
    isPending,
  };
}
