"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import type { ProductBase } from "@/data/products/types";
import type { AvailabilityInfo } from "@/features/cart/types";
import { motion } from "framer-motion";
import { AlertCircle, Archive, Loader2, Package, Trash2 } from "lucide-react";
import Link from "next/link";

import { OptimizedImage, QuantitySelector } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CartItemCardProps {
  product: ProductBase;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  isLoading?: boolean;
  availability?: AvailabilityInfo;
}

function getAvailabilityIcon(status: AvailabilityInfo["status"]) {
  switch (status) {
    case "archived":
    case "collection_ended":
      return Archive;
    case "out_of_stock":
    case "insufficient_stock":
      return Package;
    default:
      return AlertCircle;
  }
}

function getAvailabilityColor(status: AvailabilityInfo["status"]) {
  switch (status) {
    case "archived":
    case "collection_ended":
      return "bg-neutral-100 text-neutral-600";
    case "out_of_stock":
      return "bg-red-50 text-red-600";
    case "insufficient_stock":
      return "bg-amber-50 text-amber-600";
    default:
      return "bg-neutral-100 text-neutral-600";
  }
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  isLoading = false,
  availability,
}: CartItemCardProps) {
  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category = product.material || "Pottery";
  const itemTotal = product.price * quantity;
  const isUnavailable = availability && !availability.isAvailable;

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

  const AvailabilityIcon = availability
    ? getAvailabilityIcon(availability.status)
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group shadow-soft hover:shadow-card relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300",
        isUnavailable && "border-2 border-red-200 bg-red-50/30",
      )}
    >
      {/* Mobile Layout */}
      <div className="flex gap-3 lg:hidden">
        <Link
          href={`/products/${product.id}`}
          className={cn(
            "relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100",
            isUnavailable && "opacity-60 grayscale",
          )}
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
              <Link href={`/products/${product.id}`}>
                <h3
                  className={cn(
                    "line-clamp-2 text-sm font-semibold text-neutral-900",
                    isUnavailable && "text-neutral-500",
                  )}
                >
                  {product.name}
                </h3>
              </Link>
              <p className="mt-0.5 text-xs text-neutral-500">{category}</p>
              {isUnavailable && availability && AvailabilityIcon && (
                <div
                  className={cn(
                    "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    getAvailabilityColor(availability.status),
                  )}
                >
                  <AvailabilityIcon className="h-3 w-3" />
                  {availability.message}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
              onClick={onRemove}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between gap-2">
            {isUnavailable ? (
              <span className="text-sm text-neutral-400 line-through">
                ₹{itemTotal.toLocaleString()}
              </span>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Grid aligned with table header */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_200px_100px_40px] lg:items-center lg:gap-4">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <Link
            href={`/products/${product.id}`}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100",
              isUnavailable && "opacity-60 grayscale",
            )}
          >
            <OptimizedImage
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="min-w-0">
            <Link href={`/products/${product.id}`}>
              <h3
                className={cn(
                  "hover:text-primary line-clamp-1 font-medium text-neutral-900 transition-colors",
                  isUnavailable && "text-neutral-500",
                )}
              >
                {product.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-sm text-neutral-500">{category}</p>
            {isUnavailable && availability && AvailabilityIcon && (
              <div
                className={cn(
                  "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  getAvailabilityColor(availability.status),
                )}
              >
                <AvailabilityIcon className="h-3 w-3" />
                {availability.message}
              </div>
            )}
          </div>
        </div>

        {/* Quantity with price */}
        {isUnavailable ? (
          <span className="text-sm text-neutral-400">—</span>
        ) : (
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
        )}

        {/* Total */}
        <span
          className={cn(
            "text-right text-sm font-bold",
            isUnavailable
              ? "text-neutral-400 line-through"
              : "text-neutral-900",
          )}
        >
          ₹{itemTotal.toLocaleString()}
        </span>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
          onClick={onRemove}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Removing...
            </>
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.div>
  );
}
