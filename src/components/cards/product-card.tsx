"use client";

import { useAuthAction, useCart, useWishlist } from "@/hooks";
import type { ProductWithCategories } from "@/types";
import { motion } from "framer-motion";
import { Check, Heart, Loader2, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductWithCategories;
  variant?: "default" | "wishlist";
  onRemoveFromWishlist?: () => void;
  isRemovingFromWishlist?: boolean;
}

export function ProductCard({
  product,
  variant = "default",
  onRemoveFromWishlist,
  isRemovingFromWishlist = false,
}: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";
  const inStock = product.available_quantity > 0;

  const { requireAuth } = useAuthAction();
  const {
    toggleWishlist,
    isInWishlist,
    isLoading: isWishlistLoading,
  } = useWishlist();
  const { addToCart, isLoading: isCartLoading } = useCart();

  const inWishlist = isInWishlist(product.id);
  const wishlistLoading = isWishlistLoading(product.id);
  const cartLoading = isCartLoading(product.id);

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
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full shadow-sm backdrop-blur-sm transition-all duration-200",
                    inWishlist
                      ? "bg-red-50 hover:bg-red-100"
                      : "bg-white/90 hover:bg-white",
                  )}
                  onClick={handleWishlistClick}
                  disabled={wishlistLoading}
                >
                  {wishlistLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  ) : (
                    <motion.div
                      key={inWishlist ? "filled" : "empty"}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4 transition-colors",
                          inWishlist
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600",
                        )}
                      />
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-red-50"
                  onClick={handleRemoveFromWishlist}
                  disabled={isRemovingFromWishlist}
                >
                  {isRemovingFromWishlist ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  ) : (
                    <X className="h-4 w-4 text-gray-600" />
                  )}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Bottom - Add to Cart button */}
          {inStock && (
            <>
              {/* Mobile: Icon button */}
              <div className="absolute right-2.5 bottom-2.5 lg:hidden">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full shadow-sm backdrop-blur-sm transition-all duration-200",
                      addedToCart
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-white/90 hover:bg-white",
                    )}
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                  >
                    {cartLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    ) : addedToCart ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </motion.div>
                    ) : (
                      <Plus className="h-4 w-4 text-gray-700" />
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Desktop: Full width button */}
              <div className="absolute right-3 bottom-3 left-3 hidden lg:block">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    size="sm"
                    className={cn(
                      "w-full rounded-full shadow-sm backdrop-blur-sm transition-all duration-200",
                      addedToCart
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-white/95 text-gray-900 hover:bg-white",
                    )}
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                  >
                    {cartLoading ? (
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    ) : addedToCart ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-1.5"
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Plus className="mr-1.5 h-4 w-4" />
                    )}
                    <span className="text-xs font-medium">
                      {addedToCart ? "Added" : "Add to Cart"}
                    </span>
                  </Button>
                </motion.div>
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-3 space-y-0.5">
          <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-muted-foreground text-xs">{category}</p>
            <span className="text-primary text-sm font-semibold">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
