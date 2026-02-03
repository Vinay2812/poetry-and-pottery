"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import type { ProductBase } from "@/data/products/types";
import type { AvailabilityInfo } from "@/features/cart/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Loader2, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { OptimizedImage, QuantitySelector } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { ProductCustomizationData } from "@/graphql/generated/types";

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
        <div className="mt-3 lg:hidden">
          <button
            onClick={() => setIsCustomizationExpanded(!isCustomizationExpanded)}
            className="flex w-full items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 text-left"
          >
            <span className="text-xs font-medium text-neutral-600">
              View Customization Details
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-400 transition-transform",
                isCustomizationExpanded && "rotate-180",
              )}
            />
          </button>
          <AnimatePresence>
            {isCustomizationExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1.5 pt-2">
                  {customData.options.map((option) => (
                    <div
                      key={option.optionId}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-neutral-500">{option.name}</span>
                      <span className="font-medium text-neutral-700">
                        {option.value}
                        {option.priceModifier !== 0 && (
                          <span className="text-primary ml-1">
                            {option.priceModifier > 0 ? "+" : ""}₹
                            {option.priceModifier.toLocaleString()}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-neutral-100 pt-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Base Price</span>
                      <span className="text-neutral-700">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                    {customizationModifier !== 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Customization</span>
                        <span className="text-primary font-medium">
                          {customizationModifier > 0 ? "+" : ""}₹
                          {customizationModifier.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
          <span className="text-sm text-neutral-500">×</span>
          <span className="text-primary text-sm font-semibold">
            ₹{effectivePrice.toLocaleString()}
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

      {/* Desktop Customization Expandable Section */}
      {hasCustomization && (
        <div className="mt-3 hidden lg:block">
          <button
            onClick={() => setIsCustomizationExpanded(!isCustomizationExpanded)}
            className="flex w-full items-center justify-between rounded-lg bg-neutral-50 px-4 py-2 text-left"
          >
            <span className="text-sm font-medium text-neutral-600">
              View Customization Details
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-400 transition-transform",
                isCustomizationExpanded && "rotate-180",
              )}
            />
          </button>
          <AnimatePresence>
            {isCustomizationExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 px-4 pt-3">
                  {customData.options.map((option) => (
                    <div
                      key={option.optionId}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-500">{option.name}</span>
                      <span className="font-medium text-neutral-700">
                        {option.value}
                        {option.priceModifier !== 0 && (
                          <span className="text-primary ml-1.5">
                            {option.priceModifier > 0 ? "+" : ""}₹
                            {option.priceModifier.toLocaleString()}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t border-neutral-100 px-4 pt-2">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-neutral-500">
                      Base: ₹{product.price.toLocaleString()}
                    </span>
                    {customizationModifier !== 0 && (
                      <span className="text-primary font-medium">
                        Customization: {customizationModifier > 0 ? "+" : ""}₹
                        {customizationModifier.toLocaleString()}
                      </span>
                    )}
                    <span className="ml-auto font-semibold text-neutral-900">
                      Total: ₹{effectivePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
