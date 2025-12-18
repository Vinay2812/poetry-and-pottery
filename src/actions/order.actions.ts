"use server";

import { CartService } from "@/services/cart.service";
import { OrderService } from "@/services/order.service";
import { UserService } from "@/services/user.service";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getCurrentUserId(): Promise<number | null> {
  const { userId: authId } = await auth();
  if (!authId) return null;

  const user = await UserService.getUserByAuthId(authId);
  return user?.id ?? null;
}

export async function getOrders(page: number = 1, limit: number = 10) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated", data: [] };
  }

  const result = await OrderService.getOrdersByUserId(userId, page, limit);
  return { success: true, ...result };
}

export async function getOrderById(orderId: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const order = await OrderService.getOrderByIdForUser(orderId, userId);
  if (!order) {
    return { success: false, error: "Order not found" };
  }

  return { success: true, data: order };
}

export async function createOrder(data: {
  shippingFee: number;
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
    contactNumber?: string;
  };
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Get cart items
    const cartItems = await CartService.getCartByUserId(userId);
    if (cartItems.length === 0) {
      return { success: false, error: "Cart is empty" };
    }

    // Create order
    const order = await OrderService.createOrder({
      userId,
      items: cartItems.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingFee: data.shippingFee,
      shippingAddress: data.shippingAddress,
    });

    // Clear cart after successful order
    await CartService.clearCart(userId);

    revalidatePath("/orders");
    revalidatePath("/cart");

    return { success: true, data: order };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function cancelOrder(orderId: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Verify order belongs to user
    const order = await OrderService.getOrderByIdForUser(orderId, userId);
    if (!order) {
      return { success: false, error: "Order not found" };
    }

    // Only allow cancellation of processing orders
    if (order.status !== "processing") {
      return {
        success: false,
        error: "Only processing orders can be cancelled",
      };
    }

    const updated = await OrderService.updateOrderStatus(orderId, "cancelled");
    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to cancel order:", error);
    return { success: false, error: "Failed to cancel order" };
  }
}
