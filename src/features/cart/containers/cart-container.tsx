"use client";

import { createOrder } from "@/actions";
import { useAuthAction, useCart } from "@/hooks";
import type { UserAddress } from "@/prisma/generated/client";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { contactBusiness } from "@/lib/contact-business";

import { Cart } from "../components/cart";
import type {
  CartContainerProps,
  CartItemViewModel,
  CartViewModel,
} from "../types";

export function CartContainer({
  initialCartItems,
  recommendedProducts,
  initialAddresses,
}: CartContainerProps) {
  const router = useRouter();
  const cartStore = useCartStore();
  const { addToast } = useUIStore();
  const { requireAuth } = useAuthAction();
  const [isOrdering, setIsOrdering] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    initialAddresses[0] || null,
  );

  const cartItems =
    cartStore.items.length > 0 ? cartStore.items : initialCartItems;
  const {
    updateQuantity: updateCartQuantity,
    removeFromCart,
    isLoading,
  } = useCart();

  useEffect(() => {
    if (initialCartItems.length > 0 && !cartStore.isHydrated) {
      cartStore.hydrate(initialCartItems);
    }
  }, [initialCartItems, cartStore]);

  const handleUpdateQuantity = useCallback(
    async (productId: number, newQuantity: number) => {
      if (newQuantity < 1) return;
      await updateCartQuantity(productId, newQuantity);
    },
    [updateCartQuantity],
  );

  const handleRemoveItem = useCallback(
    async (productId: number) => {
      await removeFromCart(productId);
    },
    [removeFromCart],
  );

  const handleSelectAddress = useCallback((address: UserAddress | null) => {
    setSelectedAddress(address);
  }, []);

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleCheckout = useCallback(() => {
    requireAuth(async () => {
      if (isOrdering || cartItems.length === 0) return;

      if (!selectedAddress) {
        addToast({
          type: "error",
          message: "Please select a delivery address",
        });
        return;
      }

      setIsOrdering(true);

      try {
        const result = await createOrder({
          shippingFee: subtotal > 2000 ? 0 : 150,
          shippingAddress: {
            name: selectedAddress.name,
            addressLine1: selectedAddress.address_line_1,
            addressLine2: selectedAddress.address_line_2 || undefined,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zip: selectedAddress.zip,
            contactNumber: selectedAddress.contact_number || undefined,
          },
        });

        if (!result.success) {
          addToast({
            type: "error",
            message: result.error || "Failed to place order",
          });
          setIsOrdering(false);
          return;
        }

        cartStore.clear();

        addToast({
          type: "success",
          message: "Order placed! Complete your order via WhatsApp.",
          duration: 5000,
        });

        await contactBusiness({
          type: "order",
          orderId: result.data.id,
          orderTotal: result.data.total,
          itemCount: result.data.ordered_products.length,
          customerName: result.data.user.name || result.data.user.email,
          customerEmail: result.data.user.email,
          customerPhone: result.data.user.phone || undefined,
          shippingAddress: {
            name: selectedAddress.name,
            addressLine1: selectedAddress.address_line_1,
            addressLine2: selectedAddress.address_line_2 || undefined,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zip: selectedAddress.zip,
            contactNumber: selectedAddress.contact_number || undefined,
          },
          items: result.data.ordered_products.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        });

        setTimeout(() => {
          router.push(`/orders/${result.data.id}`);
        }, 1000);
      } catch {
        addToast({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      } finally {
        setIsOrdering(false);
      }
    });
  }, [
    requireAuth,
    isOrdering,
    cartItems.length,
    selectedAddress,
    subtotal,
    addToast,
    cartStore,
    router,
  ]);

  // Build cart item view models
  const cartItemViewModels: CartItemViewModel[] = cartItems.map((item) => ({
    productId: item.product.id,
    product: item.product,
    quantity: item.quantity,
    isLoading: isLoading(item.product.id),
  }));

  const canCheckout = cartItems.length > 0 && selectedAddress !== null;

  // Build checkout button text
  const checkoutButtonText = isOrdering
    ? "Placing Order..."
    : !selectedAddress
      ? "Select Address to Continue"
      : "Request Order";

  // Build the view model
  const viewModel: CartViewModel = {
    cartItems: cartItemViewModels,
    orderSummary: {
      subtotal,
      shipping,
      tax,
      total,
      freeShippingThreshold: 2000,
    },
    selectedAddress,
    addresses: initialAddresses,
    recommendedProducts,
    isOrdering,
    canCheckout,
    checkoutButtonText,
  };

  return (
    <Cart
      viewModel={viewModel}
      onQuantityChange={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onSelectAddress={handleSelectAddress}
      onCheckout={handleCheckout}
    />
  );
}
