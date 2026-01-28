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
    button: "h-7 w-7",
    icon: "size-3.5",
    text: "text-sm w-5",
  },
  md: {
    button: "h-8 w-8",
    icon: "size-4",
    text: "text-sm w-6",
  },
  lg: {
    button: "h-9 w-9",
    icon: "size-4",
    text: "text-base w-7",
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
        "bg-primary/15 inline-flex w-fit items-center gap-0.5 rounded-full p-0.5",
        disabled && "opacity-60",
      )}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || isMin}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-white text-neutral-800 transition-colors",
          "hover:bg-neutral-100",
          "disabled:pointer-events-none disabled:text-neutral-400",
          config.button,
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={config.icon} strokeWidth={2.5} />
      </button>
      <span
        className={cn(
          "text-center font-semibold text-neutral-900 select-none",
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
          "inline-flex items-center justify-center rounded-full bg-white text-neutral-800 transition-colors",
          "hover:bg-neutral-100",
          "disabled:pointer-events-none disabled:text-neutral-400",
          config.button,
        )}
        aria-label="Increase quantity"
      >
        <Plus className={config.icon} strokeWidth={2.5} />
      </button>
    </div>
  );
}
