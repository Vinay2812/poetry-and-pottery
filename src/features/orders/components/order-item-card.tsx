"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { OptimizedImage, ReviewForm } from "@/components/shared";

import { cn } from "@/lib/utils";

import type { OrderItemViewModel } from "../types";

interface OrderItemCardProps {
  item: OrderItemViewModel;
  canReview: boolean;
  onReviewSubmit: (
    rating: number,
    review?: string,
    imageUrls?: string[],
  ) => Promise<{ success: boolean; error?: string }>;
}

export function OrderItemCard({
  item,
  canReview,
  onReviewSubmit,
}: OrderItemCardProps) {
  const [isCustomizationExpanded, setIsCustomizationExpanded] = useState(false);
  const hasCustomization =
    item.customData && item.customData.options.length > 0;

  return (
    <div
      className={cn(
        "shadow-soft rounded-2xl border bg-white p-4 dark:bg-neutral-900",
        hasCustomization
          ? "border-primary/30 ring-primary/20 ring-2"
          : "border-neutral-100 dark:border-neutral-800",
      )}
    >
      <div className="flex gap-4">
        <Link href={`/products/${item.productId}`}>
          <div
            className={cn(
              "h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800",
              hasCustomization && "ring-primary/30 ring-2",
            )}
          >
            <OptimizedImage
              src={item.productImage}
              alt={item.productName}
              width={80}
              height={80}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link href={`/products/${item.productId}`}>
                <h3 className="hover:text-primary line-clamp-1 text-sm font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
                  {item.productName}
                </h3>
              </Link>
              {hasCustomization && (
                <span className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium">
                  <Sparkles className="h-3 w-3" />
                  <span>Custom</span>
                </span>
              )}
            </div>
            {item.colorName && (
              <p className="text-xs text-neutral-500">{item.colorName}</p>
            )}
            <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-primary text-sm font-bold">
              ₹{item.finalPrice.toLocaleString()}
            </p>
            {item.discount > 0 && (
              <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                -₹{item.discount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {hasCustomization && (
        <div className="mt-3">
          <button
            onClick={() => setIsCustomizationExpanded(!isCustomizationExpanded)}
            className="flex w-full items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 text-left dark:bg-neutral-800"
          >
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
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
                  {item.customData?.options.map((option) => (
                    <div
                      key={option.optionId}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {option.name}
                      </span>
                      <span className="font-medium text-neutral-700 dark:text-neutral-200">
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
                  {item.customData && item.customData.totalModifier !== 0 && (
                    <div className="border-t border-neutral-100 pt-1.5 dark:border-neutral-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500 dark:text-neutral-400">
                          Customization Total
                        </span>
                        <span className="text-primary font-medium">
                          {item.customData.totalModifier > 0 ? "+" : ""}₹
                          {item.customData.totalModifier.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {canReview && (
        <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <ReviewForm
            title={`Review ${item.productName}`}
            hasReviewed={item.hasReviewed}
            variant="full-width"
            onSubmit={onReviewSubmit}
          />
        </div>
      )}
    </div>
  );
}
