"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingCartIcon, X } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, type: "spring", bounce: 0 }}
      className={cn("group relative", className)}
    >
      <div className="group shadow-soft hover:shadow-card relative flex flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Card Content */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Image Container */}
          <div className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <ImageCarousel
              images={product.image_urls}
              alt={product.name}
              onImageClick={onImageClick}
              className="w-full"
              dotsClassName="bottom-16 lg:bottom-3 lg:group-hover:bottom-16"
              disableCarousel={disableImageCarousel}
            />

            {/* Out of stock overlay */}
            {!inStock && (
              <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-black/60">
                <span className="rounded-full bg-neutral-900/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-white dark:bg-white/90 dark:text-neutral-900">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Floating Actions */}
            <div className="absolute top-3 right-3 z-20">
              {!isWishlistVariant ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                    inWishlist
                      ? "bg-red-500/90 text-white shadow-lg shadow-red-500/20"
                      : "bg-white/70 text-neutral-700 shadow-sm hover:bg-white dark:bg-black/40 dark:text-white dark:hover:bg-black/60",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onWishlistClick();
                  }}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-transform",
                      inWishlist ? "fill-current" : "",
                    )}
                  />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-500 shadow-sm backdrop-blur-md transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-black/50 dark:text-neutral-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
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

            {/* Add to Cart Button */}
            <AnimatePresence>
              {canAddToCart && (
                <div className="absolute right-3 bottom-3 left-3 z-20 transform transition-all duration-300 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <motion.button
                    initial={false}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart();
                    }}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-md transition-all duration-300",
                      addedToCart
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/90 text-neutral-900 hover:bg-white dark:bg-neutral-900/90 dark:text-white dark:hover:bg-neutral-900",
                    )}
                  >
                    {addedToCart ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ShoppingCartIcon className="h-4 w-4" />
                    )}
                    <span>{addedToCart ? "Added" : "Add to Cart"}</span>
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Details */}
          <Link
            href={`/products/${product.slug}`}
            className="flex flex-col gap-1 p-5 lg:gap-1.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
                  {product.name}
                </h3>
                <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs dark:text-neutral-400">
                  {category}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-sm font-bold text-neutral-900 lg:text-base dark:text-neutral-100">
                  {formattedPrice}
                </span>
                {product.avg_rating > 0 && product.reviews_count > 0 && (
                  <Rating
                    rating={product.avg_rating}
                    reviewCount={product.reviews_count}
                    size="sm"
                    className="origin-right scale-90"
                  />
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
