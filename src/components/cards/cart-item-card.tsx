"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import type { ProductBase } from "@/data/products/types";
import type { AvailabilityInfo } from "@/features/cart/types";
import { motion } from "framer-motion";
import { Heart, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

import { OptimizedImage, QuantitySelector } from "@/components/shared";
import { Button } from "@/components/ui/button";

interface CartItemCardProps {
  product: ProductBase;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onMoveToWishlist?: () => void;
  isLoading?: boolean;
  availability?: AvailabilityInfo;
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  onMoveToWishlist,
  isLoading = false,
}: CartItemCardProps) {
  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category = product.material || "Pottery";
  const itemTotal = product.price * quantity;

  const handleIncrease = () => {
    if (quantity < MAX_CART_QUANTITY) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group shadow-soft hover:shadow-card relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300"
    >
      {/* Mobile Layout */}
      <div className="flex gap-3 lg:hidden">
        <Link
          href={`/products/${product.slug}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
        >
          <OptimizedImage
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/products/${product.slug}`}>
                <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-0.5 text-xs text-neutral-500">{category}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {onMoveToWishlist && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary h-8 w-8 rounded-full text-neutral-400"
                  onClick={onMoveToWishlist}
                  disabled={isLoading}
                  title="Save to Wishlist"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
                onClick={onRemove}
                disabled={isLoading}
                title="Remove"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <QuantitySelector
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                min={1}
                max={MAX_CART_QUANTITY}
                size="sm"
                disabled={isLoading}
              />
              <span className="text-xs text-neutral-500">×</span>
              <span className="text-sm font-medium text-neutral-700">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            <span className="text-base font-bold text-neutral-900">
              ₹{itemTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Grid aligned with table header */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_200px_100px_80px] lg:items-center lg:gap-4">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <Link
            href={`/products/${product.slug}`}
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
          >
            <OptimizedImage
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="min-w-0">
            <Link href={`/products/${product.slug}`}>
              <h3 className="hover:text-primary line-clamp-1 font-medium text-neutral-900 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-sm text-neutral-500">{category}</p>
          </div>
        </div>

        {/* Quantity with price */}
        <div className="flex items-center gap-3">
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
            max={MAX_CART_QUANTITY}
            size="sm"
            disabled={isLoading}
          />
          <span className="text-sm text-neutral-500">×</span>
          <span className="text-primary text-sm font-semibold">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Total */}
        <span className="text-right text-sm font-bold text-neutral-900">
          ₹{itemTotal.toLocaleString()}
        </span>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1">
          {onMoveToWishlist && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary h-8 w-8 rounded-full text-neutral-400"
              onClick={onMoveToWishlist}
              disabled={isLoading}
              title="Save to Wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
            onClick={onRemove}
            disabled={isLoading}
            title="Remove"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
