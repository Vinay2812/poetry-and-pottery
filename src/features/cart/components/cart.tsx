"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { AnimatePresence } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";

import { AddressSelector } from "@/components/address";
import { CartItemCard, ProductCard } from "@/components/cards";
import { OrderSummary } from "@/components/orders";
import { EmptyState } from "@/components/sections";

import type { CartProps } from "../types";

export function Cart({
  viewModel,
  onQuantityChange,
  onRemoveItem,
  onSelectAddress,
  onCheckout,
}: CartProps) {
  const {
    cartItems,
    orderSummary,
    selectedAddress,
    addresses,
    recommendedProducts,
    isOrdering,
    canCheckout,
    checkoutButtonText,
  } = viewModel;

  const hasRecommendations = recommendedProducts.length > 0;

  return (
    <>
      <MobileHeaderContainer title="My Cart" showBack backHref="/products" />

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
                            key={item.productId}
                            product={item.product}
                            quantity={item.quantity}
                            onQuantityChange={(quantity) =>
                              onQuantityChange(item.productId, quantity)
                            }
                            onRemove={() => onRemoveItem(item.productId)}
                            isLoading={item.isLoading}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Address Selector */}
                  <div className="shadow-soft overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 lg:p-6">
                    <AddressSelector
                      addresses={addresses}
                      selectedAddressId={selectedAddress?.id || null}
                      onSelectAddress={onSelectAddress}
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <OrderSummary
                  subtotal={orderSummary.subtotal}
                  shipping={orderSummary.shipping}
                  tax={orderSummary.tax}
                  total={orderSummary.total}
                  freeShippingThreshold={orderSummary.freeShippingThreshold}
                  buttonText={checkoutButtonText}
                  onCheckout={onCheckout}
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
