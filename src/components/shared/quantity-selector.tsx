"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const sizeConfig = {
  sm: {
    container: "h-7",
    button: "h-7 w-7",
    icon: "size-3",
    text: "text-xs w-6",
  },
  md: {
    container: "h-9",
    button: "h-9 w-9",
    icon: "size-3.5",
    text: "text-sm w-8",
  },
  lg: {
    container: "h-11",
    button: "h-11 w-11",
    icon: "size-4",
    text: "text-base w-10",
  },
};

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = "md",
  disabled = false,
}: QuantitySelectorProps) {
  const config = sizeConfig[size];
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-200 bg-white",
        disabled && "opacity-50",
        config.container,
      )}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || isMin}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-neutral-600 transition-colors duration-150",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "active:scale-95",
          "disabled:pointer-events-none disabled:text-neutral-300",
          config.button,
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={config.icon} />
      </button>
      <span
        className={cn(
          "text-center font-medium text-neutral-900 select-none",
          config.text,
        )}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled || isMax}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-neutral-600 transition-colors duration-150",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "active:scale-95",
          "disabled:pointer-events-none disabled:text-neutral-300",
          config.button,
        )}
        aria-label="Increase quantity"
      >
        <Plus className={config.icon} />
      </button>
    </div>
  );
}
