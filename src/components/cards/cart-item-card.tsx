"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import type { ProductBase } from "@/data/products/types";
import type { AvailabilityInfo } from "@/features/cart/types";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { OptimizedImage, QuantitySelector } from "@/components/shared";

import { cn } from "@/lib/utils";

import type { ProductCustomizationData } from "@/graphql/generated/types";

import { CartItemActions } from "./cart-item-actions";
import { CartItemCustomizationDetails } from "./cart-item-customization-details";

interface CartItemCardProps {
  product: ProductBase;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onMoveToWishlist?: () => void;
  isLoading?: boolean;
  availability?: AvailabilityInfo;
  customData?: ProductCustomizationData | null;
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  onMoveToWishlist,
  isLoading = false,
  customData,
}: CartItemCardProps) {
  const [isCustomizationExpanded, setIsCustomizationExpanded] = useState(false);
  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category = product.material || "Pottery";
  const customizationModifier = customData?.totalModifier ?? 0;
  const effectivePrice = product.price + customizationModifier;
  const itemTotal = effectivePrice * quantity;
  const hasCustomization = customData && customData.options.length > 0;

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

  const handleToggleCustomization = () => {
    setIsCustomizationExpanded(!isCustomizationExpanded);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group shadow-soft hover:shadow-card relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300",
        hasCustomization && "ring-primary/20 ring-2",
      )}
    >
      {/* Custom badge for customized items */}
      {hasCustomization && (
        <div className="bg-primary/10 text-primary absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium lg:hidden">
          <Sparkles className="h-3 w-3" />
          <span>Custom</span>
        </div>
      )}

      {/* Mobile Layout */}
      <div className="flex gap-3 lg:hidden">
        <Link
          href={`/products/${product.slug}`}
          className={cn(
            "relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100",
            hasCustomization && "ring-primary/30 ring-2",
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
              <Link href={`/products/${product.slug}`}>
                <h3 className="line-clamp-2 pr-16 text-sm font-semibold text-neutral-900">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-0.5 text-xs text-neutral-500">{category}</p>
            </div>
            <CartItemActions
              onRemove={onRemove}
              onMoveToWishlist={onMoveToWishlist}
              isLoading={isLoading}
            />
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
              <span className="text-xs text-neutral-500">&times;</span>
              <span className="text-sm font-medium text-neutral-700">
                ₹{effectivePrice.toLocaleString()}
              </span>
            </div>
            <span className="text-base font-bold text-neutral-900">
              ₹{itemTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Customization Expandable Section */}
      {hasCustomization && (
        <CartItemCustomizationDetails
          customData={customData}
          basePrice={product.price}
          customizationModifier={customizationModifier}
          effectivePrice={effectivePrice}
          isExpanded={isCustomizationExpanded}
          onToggle={handleToggleCustomization}
          variant="mobile"
        />
      )}

      {/* Desktop Layout - Grid aligned with table header */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_200px_100px_80px] lg:items-center lg:gap-4">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100",
              hasCustomization && "ring-primary/30 ring-2",
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
            <div className="flex items-center gap-2">
              <Link href={`/products/${product.slug}`}>
                <h3 className="hover:text-primary line-clamp-1 font-medium text-neutral-900 transition-colors">
                  {product.name}
                </h3>
              </Link>
              {hasCustomization && (
                <span className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
                  <Sparkles className="h-3 w-3" />
                  <span>Custom</span>
                </span>
              )}
            </div>
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
          <span className="text-sm text-neutral-500">&times;</span>
          <span className="text-primary text-sm font-semibold">
            ₹{effectivePrice.toLocaleString()}
          </span>
        </div>

        {/* Total */}
        <span className="text-right text-sm font-bold text-neutral-900">
          ₹{itemTotal.toLocaleString()}
        </span>

        {/* Actions */}
        <CartItemActions
          onRemove={onRemove}
          onMoveToWishlist={onMoveToWishlist}
          isLoading={isLoading}
        />
      </div>

      {/* Desktop Customization Expandable Section */}
      {hasCustomization && (
        <CartItemCustomizationDetails
          customData={customData}
          basePrice={product.price}
          customizationModifier={customizationModifier}
          effectivePrice={effectivePrice}
          isExpanded={isCustomizationExpanded}
          onToggle={handleToggleCustomization}
          variant="desktop"
        />
      )}
    </motion.div>
  );
}
