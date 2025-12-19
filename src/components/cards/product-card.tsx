"use client";

import { useAuthAction, useCart, useWishlist } from "@/hooks";
import type { ProductWithCategories } from "@/types";
import { motion } from "framer-motion";
import { Check, Heart, Plus, ShoppingCartIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { Rating } from "@/components/shared";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductWithCategories;
  variant?: "default" | "wishlist";
  onRemoveFromWishlist?: () => void;
}

export function ProductCard({
  product,
  variant = "default",
  onRemoveFromWishlist,
}: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";
  const inStock = product.available_quantity > 0;

  const { requireAuth } = useAuthAction();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      requireAuth(() => toggleWishlist(product.id));
    },
    [requireAuth, toggleWishlist, product.id],
  );

  const handleAddToCart = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const success = await requireAuth(() => addToCart(product.id));
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    },
    [requireAuth, addToCart, product.id],
  );

  const handleRemoveFromWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemoveFromWishlist?.();
    },
    [onRemoveFromWishlist],
  );

  const isWishlistVariant = variant === "wishlist";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        href={`/products/${product.slug}`}
        className="focus-visible:ring-primary/30 block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {/* Image Container */}
        <div className="relative">
          <div className="bg-muted relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />

            {/* Out of stock overlay */}
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Top right - Wishlist or Remove button */}
          <div className="absolute top-2.5 right-2.5">
            {!isWishlistVariant ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors duration-200",
                  inWishlist
                    ? "bg-red-50 hover:bg-red-100"
                    : "bg-white/90 hover:bg-white",
                )}
                onClick={handleWishlistClick}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-200",
                    inWishlist ? "fill-red-500 text-red-500" : "text-gray-600",
                  )}
                />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-red-50"
                onClick={handleRemoveFromWishlist}
              >
                <X className="h-4 w-4 text-gray-600" />
              </motion.button>
            )}
          </div>

          {/* Bottom - Add to Cart button */}
          {inStock && (
            <>
              {/* Mobile: Icon button */}
              <div className="absolute right-2.5 bottom-2.5 lg:hidden">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors duration-200",
                    addedToCart
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-white/90 hover:bg-white",
                  )}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <ShoppingCartIcon className="h-4 w-4 text-gray-700" />
                  )}
                </motion.button>
              </div>

              {/* Desktop: Full width button */}
              <div className="absolute right-3 bottom-3 left-3 hidden lg:block">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors duration-200",
                    addedToCart
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-white/95 text-gray-900 hover:bg-white",
                  )}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {addedToCart ? "Added" : "Add to Cart"}
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* Product Info - 70/30 split */}
        <div className="mt-3 flex gap-2">
          {/* Left 70% - Name and Category */}
          <div className="flex w-[70%] flex-col gap-0.5">
            <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-xs">{category}</p>
          </div>
          {/* Right 30% - Price and Rating */}
          <div className="flex w-[30%] flex-col items-end gap-0.5">
            <span className="text-primary text-sm font-semibold">
              ₹{product.price.toLocaleString()}
            </span>
            {product.averageRating &&
              product._count?.reviews &&
              product._count.reviews > 0 && (
                <Rating
                  rating={product.averageRating}
                  reviewCount={product._count.reviews}
                  size="sm"
                />
              )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
