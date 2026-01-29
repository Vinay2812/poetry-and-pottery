"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { AnimatePresence } from "framer-motion";
import { AlertTriangle, ShoppingCartIcon } from "lucide-react";

import { AddressSelector } from "@/components/address";
import { CartItemCard } from "@/components/cards";
import { OrderSummary } from "@/components/orders";
import { EmptyState, ProductCarousel } from "@/components/sections";
import { ListingPageHeader } from "@/components/shared";

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
    unavailableItems,
    orderSummary,
    selectedAddress,
    addresses,
    recommendedProducts,
    isOrdering,
    canCheckout,
    checkoutButtonText,
    hasUnavailableItems,
  } = viewModel;

  const hasRecommendations = recommendedProducts.length > 0;
  const availableItemCount = cartItems.length;
  const totalItemCount = cartItems.length + unavailableItems.length;

  return (
    <>
      <MobileHeaderContainer
        title={`Cart (${totalItemCount})`}
        showBack
        backHref="/products"
      />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-0 lg:px-8">
          {/* Desktop Page Header */}
          <ListingPageHeader
            title="Your Cart"
            subtitle={
              totalItemCount > 0
                ? `${totalItemCount} ${totalItemCount === 1 ? "item" : "items"} in your cart`
                : undefined
            }
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Your Cart" }]}
            // className="hidden lg:block"
          />

          {totalItemCount > 0 ? (
            <div className={hasRecommendations ? "mb-12" : ""}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items & Address */}
                <div className="min-w-0 space-y-8 lg:col-span-2">
                  {/* Desktop Table Header */}
                  <div className="hidden border-b border-neutral-200 pb-3 lg:grid lg:grid-cols-[1fr_200px_100px_40px] lg:gap-4 lg:px-4">
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Product
                    </span>
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Quantity
                    </span>
                    <span className="text-right text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Total
                    </span>
                    <span />
                  </div>

                  {/* Unavailable Items Warning */}
                  {hasUnavailableItems && (
                    <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4">
                      <div className="mb-3 flex items-center gap-2 text-red-700">
                        <AlertTriangle className="h-5 w-5" />
                        <h3 className="font-semibold">
                          Unavailable Items ({unavailableItems.length})
                        </h3>
                      </div>
                      <p className="mb-4 text-sm text-red-600">
                        These items are no longer available. Please remove them
                        to continue with your order.
                      </p>
                      <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                          {unavailableItems.map((item) => (
                            <CartItemCard
                              key={item.productId}
                              product={item.product}
                              quantity={item.quantity}
                              onQuantityChange={(quantity) =>
                                onQuantityChange(item.productId, quantity)
                              }
                              onRemove={() => onRemoveItem(item.productId)}
                              isLoading={item.isLoading}
                              availability={item.availability}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Available Cart Items */}
                  {availableItemCount > 0 && (
                    <div>
                      {hasUnavailableItems && (
                        <h3 className="mb-3 text-sm font-medium text-neutral-600">
                          Available Items ({availableItemCount})
                        </h3>
                      )}
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
                              availability={item.availability}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

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
                  buttonText={checkoutButtonText}
                  onCheckout={onCheckout}
                  disabled={!canCheckout || isOrdering}
                  itemCount={availableItemCount}
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
            <ProductCarousel
              products={recommendedProducts}
              title="You might also like"
              className="mb-42 lg:mb-0"
            />
          )}
        </div>
      </main>
    </>
  );
}
