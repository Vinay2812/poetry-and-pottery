"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingBag, X } from "lucide-react";
import Link from "next/link";

import { Rating } from "@/components/shared";
import { ImageCarousel } from "@/components/shared/image-carousel";

import { cn } from "@/lib/utils";

import type { ProductCardProps } from "../types";

export function ProductCard({
  product,
  variant = "default",
  className,
  inWishlist,
  addedToCart,
  canAddToCart,
  disableImageCarousel = false,
  onImageClick,
  onWishlistClick,
  onAddToCart,
  onRemove,
}: ProductCardProps) {
  const isWishlistVariant = variant === "wishlist";
  const inStock = product.available_quantity > 0;
  const formattedPrice = `₹${product.price.toLocaleString()}`;
  const category = product.material || "Pottery";

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("group relative", className)}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 lg:hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-neutral-900">
        {/* Image Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{ viewTransitionName: `product-image-${product.id}` }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ImageCarousel
            images={
              product.image_urls.length > 0
                ? product.image_urls
                : ["/placeholder.jpg"]
            }
            alt={product.name}
            onImageClick={() => onImageClick()}
            disableCarousel={disableImageCarousel}
            showArrows={false}
            showDots={true}
            showCounter={false}
          />

          {/* Out of stock overlay */}
          {!inStock && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-black/60">
              <span className="rounded-full bg-neutral-900/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-white dark:bg-white/90 dark:text-neutral-900">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col gap-1.5 p-4 lg:p-5">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-col gap-1"
          >
            <h3 className="font-display line-clamp-2 text-sm leading-tight font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
              {product.name}
            </h3>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {category}
            </p>
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-neutral-900 lg:text-base dark:text-neutral-100">
                {formattedPrice}
              </span>
              {product.avg_rating > 0 && product.reviews_count > 0 && (
                <Rating
                  rating={product.avg_rating}
                  reviewCount={product.reviews_count}
                  size="sm"
                />
              )}
            </div>
          </Link>

          {/* Action Buttons - Always Visible */}
          <div className="mt-auto flex items-center gap-2 pt-2">
            <AnimatePresence mode="wait">
              {canAddToCart && (
                <motion.button
                  key={addedToCart ? "added" : "add"}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToCart();
                  }}
                  disabled={!inStock}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 lg:text-sm",
                    addedToCart
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "bg-primary hover:bg-primary-hover text-white",
                    !inStock && "cursor-not-allowed opacity-50",
                  )}
                >
                  {addedToCart ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <ShoppingBag className="h-3.5 w-3.5" />
                  )}
                  <span>{addedToCart ? "Added" : "Add to Cart"}</span>
                </motion.button>
              )}
            </AnimatePresence>

            {!isWishlistVariant ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 lg:h-9 lg:w-9",
                  inWishlist
                    ? "bg-red-50 dark:bg-red-900/20"
                    : "bg-neutral-100 hover:bg-red-50 dark:bg-neutral-800 dark:hover:bg-red-900/20",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onWishlistClick();
                }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    inWishlist
                      ? "fill-red-500 text-red-500"
                      : "text-neutral-600 dark:text-neutral-400",
                  )}
                />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-red-50 hover:text-red-500 lg:h-9 lg:w-9 dark:bg-neutral-800 dark:hover:bg-red-900/30"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove?.();
                }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
