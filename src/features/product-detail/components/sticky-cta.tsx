"use client";

import { Check, Loader2, ShoppingCartIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface StickyCTAProps {
  price: number;
  isOutOfStock: boolean;
  atMaxQuantity: boolean;
  addedToCart: boolean;
  cartLoading: boolean;
  onAddToCart: () => void;
  /** Ref to the main CTA button element to observe */
  mainCtaRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyCTA({
  price,
  isOutOfStock,
  atMaxQuantity,
  addedToCart,
  cartLoading,
  onAddToCart,
  mainCtaRef,
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const target = mainCtaRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when main CTA is NOT visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [mainCtaRef]);

  const isDisabled = isOutOfStock || atMaxQuantity;

  return (
    <div
      className={cn(
        "fixed right-0 bottom-16 left-0 z-40 border-t border-neutral-100 bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur-md transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        {/* Price */}
        <div className="shrink-0">
          <span className="text-lg font-bold text-neutral-900">
            ₹{price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart */}
        <Button
          className={cn(
            "h-11 flex-1 rounded-xl transition-all",
            addedToCart && "bg-green-600 hover:bg-green-700",
          )}
          disabled={isDisabled || cartLoading}
          onClick={onAddToCart}
        >
          {cartLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding to cart...
            </>
          ) : addedToCart ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <ShoppingCartIcon className="mr-2 h-4 w-4" />
          )}
          {isOutOfStock
            ? "Out of Stock"
            : atMaxQuantity
              ? "Max in Cart"
              : addedToCart
                ? "Added!"
                : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
