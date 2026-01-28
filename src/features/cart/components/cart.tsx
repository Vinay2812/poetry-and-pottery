"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { AddressSelector } from "@/components/address";
import { CartItemCard } from "@/components/cards";
import { OrderSummary } from "@/components/orders";
import { EmptyState, ProductCarousel } from "@/components/sections";

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
  const itemCount = cartItems.length;

  return (
    <>
      <MobileHeaderContainer
        title={`Cart (${itemCount})`}
        showBack
        backHref="/products"
      />

      <main className="pt-14 pb-24 lg:pt-8 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Desktop Page Header */}
          <div className="mb-8 hidden lg:block">
            {/* Breadcrumbs */}
            <nav className="mb-4 flex items-center gap-1 text-sm text-neutral-500">
              <Link
                href="/"
                className="transition-colors hover:text-neutral-900"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-neutral-900">Your Cart</span>
            </nav>

            {/* Title with green underline */}
            <div>
              <h1 className="font-display text-3xl font-bold text-neutral-900">
                Your Cart
              </h1>
              <div className="bg-primary mt-2 h-[3px] w-12 rounded-full" />
              {itemCount > 0 && (
                <p className="mt-3 text-sm text-neutral-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                </p>
              )}
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className={hasRecommendations ? "mb-12" : ""}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items & Address */}
                <div className="min-w-0 space-y-8 lg:col-span-2">
                  {/* Desktop Table Header */}
                  <div className="hidden border-b border-neutral-200 pb-3 lg:grid lg:grid-cols-[1fr_120px_160px_100px_40px] lg:gap-4 lg:px-4">
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Product
                    </span>
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Price
                    </span>
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Quantity
                    </span>
                    <span className="text-right text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      Total
                    </span>
                    <span />
                  </div>

                  {/* Cart Items */}
                  <div>
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
                  itemCount={itemCount}
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
