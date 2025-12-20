"use client";

import { createOrder } from "@/actions";
import { useAuthAction, useCart } from "@/hooks";
import type { UserAddress } from "@/prisma/generated/client";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import type { CartWithProduct, ProductWithCategories } from "@/types";
import { AnimatePresence } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AddressSelector } from "@/components/address";
import { CartItemCard, ProductCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { OrderSummary } from "@/components/orders";
import { EmptyState } from "@/components/sections";

import { contactBusiness } from "@/lib/contact-business";

interface CartClientProps {
  initialCartItems: CartWithProduct[];
  recommendedProducts: ProductWithCategories[];
  initialAddresses: UserAddress[];
}

export function CartClient({
  initialCartItems,
  recommendedProducts,
  initialAddresses,
}: CartClientProps) {
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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleSelectAddress = useCallback((address: UserAddress | null) => {
    setSelectedAddress(address);
  }, []);

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

  const hasRecommendations = recommendedProducts.length > 0;
  const canCheckout = cartItems.length > 0 && selectedAddress !== null;

  return (
    <>
      <MobileHeader title="My Cart" showBack backHref="/products" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {cartItems.length > 0 ? (
            <div className={hasRecommendations ? "mb-12" : ""}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items & Address */}
                <div className="min-w-0 space-y-8 lg:col-span-2">
                  {/* Cart Items */}
                  <div>
                    <h2 className="mb-4 text-lg font-semibold">
                      Cart Items ({cartItems.length})
                    </h2>
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {cartItems.map((item) => (
                          <CartItemCard
                            key={item.product.id}
                            product={item.product}
                            quantity={item.quantity}
                            onQuantityChange={(quantity) =>
                              handleUpdateQuantity(item.product.id, quantity)
                            }
                            onRemove={() => handleRemoveItem(item.product.id)}
                            isLoading={isLoading(item.product.id)}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Address Selector */}
                  <div className="shadow-soft overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 lg:p-6">
                    <AddressSelector
                      addresses={initialAddresses}
                      selectedAddressId={selectedAddress?.id || null}
                      onSelectAddress={handleSelectAddress}
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  freeShippingThreshold={2000}
                  buttonText={
                    isOrdering
                      ? "Placing Order..."
                      : !selectedAddress
                        ? "Select Address to Continue"
                        : "Request Order"
                  }
                  onCheckout={handleCheckout}
                  disabled={!canCheckout || isOrdering}
                />
              </div>
            </div>
          ) : (
            <div className="mb-8 flex min-h-[40vh] items-center justify-center lg:min-h-[50vh]">
              <EmptyState
                icon={ShoppingCartIcon}
                title="Your cart is empty"
                description="Add some beautiful pottery to your cart"
                actionText="Start Shopping"
                actionHref="/products"
              />
            </div>
          )}

          {/* Recommendations */}
          {hasRecommendations && (
            <section className="mb-42 lg:mb-0">
              <h2 className="mb-4 text-lg font-semibold">
                You might also like
              </h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
