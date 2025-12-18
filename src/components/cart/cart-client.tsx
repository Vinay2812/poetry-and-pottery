"use client";

import { useCart } from "@/hooks";
import { useCartStore } from "@/store/cart.store";
import type { CartWithProduct, ProductWithCategories } from "@/types";
import { AnimatePresence } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { CartItemCard, ProductCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { OrderSummary } from "@/components/orders";
import { EmptyState } from "@/components/sections";

interface CartClientProps {
  initialCartItems: CartWithProduct[];
  recommendedProducts: ProductWithCategories[];
}

export function CartClient({
  initialCartItems,
  recommendedProducts,
}: CartClientProps) {
  const cartStore = useCartStore();
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
      // Sync with server
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

  const hasRecommendations = recommendedProducts.length > 0;

  return (
    <>
      <MobileHeader title="My Cart" showBack backHref="/products" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Cart Items or Empty State */}
          {cartItems.length > 0 ? (
            <div className={hasRecommendations ? "mb-12" : ""}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2">
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

                {/* Order Summary */}
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  freeShippingThreshold={2000}
                  buttonText="Proceed to Checkout"
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
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
