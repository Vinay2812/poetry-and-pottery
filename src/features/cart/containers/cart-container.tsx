"use client";

import { useCreateOrder } from "@/data/orders/gateway/client";
import type { ShippingAddress } from "@/data/orders/types";
import { useAuthAction, useCart } from "@/hooks";
import { useUIStore } from "@/store";
import type { CartWithProduct } from "@/types";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";
import { CartSkeleton } from "@/components/skeletons";

import { contactBusiness } from "@/lib/contact-business";

import type { CartItem, UserAddress } from "@/graphql/generated/types";

import { Cart } from "../components/cart";
import type {
  CartContainerProps,
  CartItemViewModel,
  CartViewModel,
} from "../types";

function mapToCartWithProduct(item: CartItem): CartWithProduct {
  return {
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    quantity: item.quantity,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
    product: {
      id: item.product.id,
      slug: item.product.slug,
      name: item.product.name,
      price: item.product.price,
      image_urls: item.product.image_urls,
      material: item.product.material,
      available_quantity: item.product.available_quantity,
      total_quantity: item.product.total_quantity,
      color_code: item.product.color_code,
      color_name: item.product.color_name,
      description: null,
      instructions: [],
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      product_categories: [],
    },
  };
}

export function CartContainer({
  initialCartItems,
  recommendedProducts,
  initialAddresses,
}: CartContainerProps) {
  const mappedInitialItems = useMemo(
    () => initialCartItems.map(mapToCartWithProduct),
    [initialCartItems],
  );

  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const { addToast } = useUIStore();
  const { requireAuth } = useAuthAction();
  const { mutate: createOrderMutate } = useCreateOrder();
  const [isOrdering, setIsOrdering] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    initialAddresses[0] || null,
  );

  const {
    items: cartItems,
    updateQuantity: updateCartQuantity,
    removeFromCart,
    isLoading,
    hydrate,
    clear,
  } = useCart();

  // Use cart items from hook, fallback to initial if not hydrated yet
  const displayItems = cartItems.length > 0 ? cartItems : mappedInitialItems;

  useEffect(() => {
    if (mappedInitialItems.length > 0 && cartItems.length === 0) {
      hydrate(mappedInitialItems);
    }
  }, [mappedInitialItems, cartItems.length, hydrate]);

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
  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleCheckout = useCallback(() => {
    requireAuth(async () => {
      if (isOrdering || displayItems.length === 0) return;

      if (!selectedAddress) {
        addToast({
          type: "error",
          message: "Please select a delivery address",
        });
        return;
      }

      setIsOrdering(true);

      try {
        const result = await createOrderMutate({
          shippingFee: subtotal > 2000 ? 0 : 150,
          shippingAddress: {
            name: selectedAddress.name,
            address_line_1: selectedAddress.address_line_1,
            address_line_2: selectedAddress.address_line_2 || undefined,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zip: selectedAddress.zip,
            contact_number: selectedAddress.contact_number || undefined,
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

        clear();

        addToast({
          type: "success",
          message: "Order placed! Complete your order via WhatsApp.",
          duration: 5000,
        });

        // Extract shipping address from the order
        const orderShippingAddress = result.data
          .shipping_address as ShippingAddress | null;

        await contactBusiness({
          type: "order",
          orderId: result.data.id,
          orderTotal: result.data.total,
          itemCount: result.data.ordered_products.length,
          customerName: orderShippingAddress?.name || selectedAddress.name,
          customerEmail: result.data.user.email,
          customerPhone:
            orderShippingAddress?.contact_number ||
            selectedAddress.contact_number ||
            undefined,
          shippingAddress: {
            name: selectedAddress.name,
            address_line_1: selectedAddress.address_line_1,
            address_line_2: selectedAddress.address_line_2 || undefined,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zip: selectedAddress.zip,
            contact_number: selectedAddress.contact_number || undefined,
          },
          items: result.data.ordered_products.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        });

        startNavigation(() => {
          router.push(`/orders/${result.data.id}`);
        });
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
    displayItems.length,
    selectedAddress,
    subtotal,
    addToast,
    clear,
    router,
    startNavigation,
    createOrderMutate,
  ]);

  // Build cart item view models
  const cartItemViewModels: CartItemViewModel[] = displayItems.map((item) => ({
    productId: item.product.id,
    product: {
      id: item.product.id,
      slug: item.product.slug,
      name: item.product.name,
      price: item.product.price,
      image_urls: item.product.image_urls,
      material: item.product.material,
      available_quantity: item.product.available_quantity,
      total_quantity: item.product.total_quantity,
      color_code: item.product.color_code,
      color_name: item.product.color_name,
      avg_rating: 0,
      reviews_count: 0,
      in_wishlist: false,
    },
    quantity: item.quantity,
    isLoading: isLoading(item.product.id),
  }));

  const canCheckout = displayItems.length > 0 && selectedAddress !== null;

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
    },
    selectedAddress,
    addresses: initialAddresses,
    recommendedProducts,
    isOrdering,
    canCheckout,
    checkoutButtonText,
  };

  return (
    <Suspense fallback={<CartSkeleton />}>
      <Cart
        viewModel={viewModel}
        onQuantityChange={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onSelectAddress={handleSelectAddress}
        onCheckout={handleCheckout}
      />
    </Suspense>
  );
}
