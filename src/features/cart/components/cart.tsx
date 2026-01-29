"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Heart, ShoppingCartIcon, Trash2, X } from "lucide-react";
import Link from "next/link";

import { AddressSelectorContainer } from "@/components/address";
import { CartItemCard } from "@/components/cards";
import { OrderSummary } from "@/components/orders";
import { EmptyState } from "@/components/sections";
import { ListingPageHeader, OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";

import type { CartProps } from "../types";

export function Cart({
  viewModel,
  onQuantityChange,
  onRemoveItem,
  onMoveToWishlist,
  onSelectAddress,
  onCheckout,
}: CartProps) {
  const {
    cartItems,
    unavailableItems,
    orderSummary,
    selectedAddress,
    isOrdering,
    canCheckout,
    checkoutButtonText,
    hasUnavailableItems,
  } = viewModel;

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
          />

          {totalItemCount > 0 ? (
            <div className="mb-12">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items & Address */}
                <div className="min-w-0 space-y-8 lg:col-span-2">
                  {/* Available Cart Items */}
                  {availableItemCount > 0 && (
                    <div>
                      {/* Desktop Table Header */}
                      <div className="hidden border-b border-neutral-200 pb-3 lg:grid lg:grid-cols-[1fr_200px_100px_80px] lg:gap-4 lg:px-4">
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

                      <div className="mt-4 space-y-4">
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
                              onMoveToWishlist={() =>
                                onMoveToWishlist(item.productId)
                              }
                              isLoading={item.isLoading}
                              availability={item.availability}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Unavailable Items Section */}
                  {hasUnavailableItems && (
                    <div className="rounded-2xl border border-amber-200/60 bg-amber-50/30 p-4 lg:p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-700">
                          <AlertCircle className="h-4 w-4" />
                          <h3 className="text-sm font-medium">
                            Unavailable ({unavailableItems.length})
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 px-2 text-xs text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                            onClick={() => {
                              unavailableItems.forEach((item) =>
                                onMoveToWishlist(item.productId),
                              );
                            }}
                          >
                            <Heart className="h-3 w-3" />
                            <span className="hidden sm:inline">
                              Save all to Wishlist
                            </span>
                            <span className="sm:hidden">Save all</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 px-2 text-xs text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
                            onClick={() => {
                              unavailableItems.forEach((item) =>
                                onRemoveItem(item.productId),
                              );
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Remove all</span>
                          </Button>
                        </div>
                      </div>

                      <p className="mb-4 text-xs text-amber-600/80">
                        These items won&apos;t be included in your order.
                      </p>

                      {/* Unavailable Items List - Simple rows */}
                      <div className="space-y-2">
                        <AnimatePresence mode="popLayout">
                          {unavailableItems.map((item) => (
                            <motion.div
                              key={item.productId}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="group flex items-center gap-3 rounded-xl bg-white/60 p-2.5 transition-colors hover:bg-white"
                            >
                              {/* Product Image */}
                              <Link
                                href={`/products/${item.product.slug}`}
                                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100 opacity-60 grayscale"
                              >
                                <OptimizedImage
                                  src={
                                    item.product.image_urls[0] ||
                                    "/placeholder.jpg"
                                  }
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </Link>

                              {/* Product Info */}
                              <div className="min-w-0 flex-1">
                                <Link href={`/products/${item.product.slug}`}>
                                  <h4 className="line-clamp-1 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
                                    {item.product.name}
                                  </h4>
                                </Link>
                                <p className="mt-0.5 text-xs text-amber-600">
                                  {item.availability.message}
                                </p>
                              </div>

                              {/* Actions */}
                              <div className="flex shrink-0 items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-primary/10 hover:text-primary h-7 w-7 rounded-full text-neutral-400"
                                  onClick={() =>
                                    onMoveToWishlist(item.productId)
                                  }
                                  title="Save to Wishlist"
                                >
                                  <Heart className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
                                  onClick={() => onRemoveItem(item.productId)}
                                  title="Remove"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Address Selector */}
                  <div className="shadow-soft overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 lg:p-6">
                    <AddressSelectorContainer
                      selectedAddressId={selectedAddress?.id}
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
          <RecommendedProductsContainer
            title="You might also like"
            className="mb-42 lg:mb-0"
          />
        </div>
      </main>
    </>
  );
}
