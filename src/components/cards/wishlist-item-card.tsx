"use client";

import type { ProductWithCategories } from "@/types";
import { motion } from "framer-motion";
import { Check, Heart, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface WishlistItemCardProps {
  product: ProductWithCategories;
  onRemove: () => void;
  onMoveToCart: () => void;
  isRemoving?: boolean;
  isMovingToCart?: boolean;
  movedToCart?: boolean;
}

export function WishlistItemCard({
  product,
  onRemove,
  onMoveToCart,
  isRemoving = false,
  isMovingToCart = false,
  movedToCart = false,
}: WishlistItemCardProps) {
  const inStock = product.available_quantity > 0;
  const lowStock =
    product.available_quantity > 0 && product.available_quantity <= 5;

  const stockStatus = inStock
    ? lowStock
      ? "LOW STOCK"
      : "IN STOCK"
    : "OUT OF STOCK";

  const stockColor = inStock ? "text-in-stock" : "text-low-stock";

  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="shadow-soft hover:shadow-card rounded-2xl bg-white p-4 transition-shadow duration-200"
    >
      <div className="flex gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="focus-visible:ring-primary/30 relative h-24 w-24 shrink-0 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none lg:h-32 lg:w-32"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div>
              <Link href={`/products/${product.slug}`}>
                <h3 className="hover:text-primary mb-0.5 font-semibold transition-colors duration-150">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground mb-2 text-sm">{category}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onRemove}
              disabled={isRemoving}
              className="text-primary hover:bg-primary/10 focus-visible:ring-primary/30 rounded-full p-1 transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
            >
              {isRemoving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Heart className="h-5 w-5 fill-current" />
              )}
            </motion.button>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className={`text-xs font-medium ${stockColor}`}>
                {stockStatus}
              </span>
              <p className="mt-1 font-semibold">₹{product.price.toFixed(2)}</p>
            </div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className={`rounded-full transition-all ${movedToCart ? "bg-green-600 hover:bg-green-700" : ""}`}
                disabled={!inStock || isMovingToCart}
                onClick={onMoveToCart}
              >
                {isMovingToCart ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : movedToCart ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-1"
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <ShoppingCart className="mr-1 h-4 w-4" />
                )}
                {movedToCart ? "Added!" : "Add"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
