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
import { getProductAvailability } from "../types";

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
      is_active: item.product.is_active,
      created_at: new Date(),
      updated_at: new Date(),
      product_categories: [],
      collection: item.product.collection ?? null,
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

  // Build cart item view models with availability status
  const allCartItemViewModels: CartItemViewModel[] = useMemo(
    () =>
      displayItems.map((item) => {
        const product = {
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
          is_active: item.product.is_active ?? true,
          collection: item.product.collection
            ? {
                id: item.product.collection.id,
                slug: item.product.collection.slug,
                name: item.product.collection.name,
                description: item.product.collection.description ?? null,
                image_url: item.product.collection.image_url ?? null,
                starts_at: item.product.collection.starts_at,
                ends_at: item.product.collection.ends_at,
                created_at: item.product.collection.created_at,
                updated_at: item.product.collection.updated_at,
                products_count: 0,
              }
            : null,
        };

        const availability = getProductAvailability(product, item.quantity);

        return {
          productId: item.product.id,
          product,
          quantity: item.quantity,
          isLoading: isLoading(item.product.id),
          availability,
        };
      }),
    [displayItems, isLoading],
  );

  // Split into available and unavailable items
  const availableItems = useMemo(
    () => allCartItemViewModels.filter((item) => item.availability.isAvailable),
    [allCartItemViewModels],
  );
  const unavailableItems = useMemo(
    () =>
      allCartItemViewModels.filter((item) => !item.availability.isAvailable),
    [allCartItemViewModels],
  );

  // Calculate order summary only from AVAILABLE items
  const availableSubtotal = useMemo(
    () =>
      availableItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [availableItems],
  );
  const availableShipping = 150;
  const availableTax = 0;
  const availableTotal =
    availableItems.length > 0
      ? availableSubtotal + availableShipping + availableTax
      : 0;

  const hasUnavailableItems = unavailableItems.length > 0;
  const availableItemCount = availableItems.length;

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

  const handleCheckout = useCallback(() => {
    requireAuth(async () => {
      if (isOrdering || availableItems.length === 0) return;

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
          shippingFee: 150,
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
    availableItems.length,
    selectedAddress,
    addToast,
    clear,
    router,
    startNavigation,
    createOrderMutate,
  ]);

  const canCheckout =
    availableItems.length > 0 &&
    selectedAddress !== null &&
    !hasUnavailableItems;

  // Build checkout button text
  const checkoutButtonText = isOrdering
    ? "Placing Order..."
    : hasUnavailableItems
      ? "Remove unavailable items to continue"
      : !selectedAddress
        ? "Select Address to Continue"
        : "Request Order";

  // Build the view model
  const viewModel: CartViewModel = {
    cartItems: availableItems,
    unavailableItems,
    orderSummary: {
      subtotal: availableSubtotal,
      shipping: availableShipping,
      tax: availableTax,
      total: availableTotal,
    },
    selectedAddress,
    addresses: initialAddresses,
    recommendedProducts,
    isOrdering,
    canCheckout,
    checkoutButtonText,
    hasUnavailableItems,
    availableItemCount,
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
