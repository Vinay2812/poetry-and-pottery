"use client";

import type { ProductWithCategories } from "@/types";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { QuantitySelector } from "@/components/shared";

interface CartItemCardProps {
  product: ProductWithCategories;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  isLoading?: boolean;
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  isLoading = false,
}: CartItemCardProps) {
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
          className="focus-visible:ring-primary/30 relative h-24 w-24 shrink-0 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Link href={`/products/${product.slug}`}>
                <h3 className="hover:text-primary font-semibold transition-colors duration-150">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm">{category}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onRemove}
              disabled={isLoading}
              className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-primary/30 rounded-full p-1 transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </motion.button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold">₹{product.price.toFixed(2)}</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => onQuantityChange(quantity + 1)}
              onDecrease={() => onQuantityChange(quantity - 1)}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
