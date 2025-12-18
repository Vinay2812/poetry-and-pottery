"use client";

import { useAuthAction, useWishlist } from "@/hooks";
import type { ProductWithCategories } from "@/types";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductWithCategories;
  variant?: "default" | "compact";
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";

  const { requireAuth } = useAuthAction();
  const { toggleWishlist, isInWishlist, isLoading } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const loading = isLoading(product.id);

  const handleWishlistClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      requireAuth(() => toggleWishlist(product.id));
    },
    [requireAuth, toggleWishlist, product.id],
  );

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group focus-visible:ring-primary/30 block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="relative">
        {/* Image */}
        <div
          className={cn(
            "bg-muted relative overflow-hidden rounded-xl lg:rounded-2xl",
            variant === "default" ? "aspect-square" : "aspect-4/3",
          )}
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Wishlist button */}
        <motion.div
          className="absolute top-2 right-2 lg:top-3 lg:right-3"
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full shadow-sm backdrop-blur-sm transition-all duration-150 hover:scale-105",
              inWishlist
                ? "bg-red-50 hover:bg-red-100"
                : "bg-white/90 hover:bg-white",
            )}
            onClick={handleWishlistClick}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            ) : (
              <motion.div
                key={inWishlist ? "filled" : "empty"}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    inWishlist
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground",
                  )}
                />
              </motion.div>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-2 space-y-0.5 lg:mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm leading-tight font-medium">
            {product.name}
          </h3>
          <span className="text-primary shrink-0 text-sm font-semibold">
            ₹{product.price}
          </span>
        </div>
        <p className="text-muted-foreground text-xs">{category}</p>
      </div>
    </Link>
  );
}
