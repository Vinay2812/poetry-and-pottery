"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface EditablePriceProps {
  price: number;
  onChange: (newPrice: number) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export function EditablePrice({
  price,
  onChange,
  className,
  label,
  disabled = false,
}: EditablePriceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(price.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(price.toString());
  }, [price]);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const newPrice = parseFloat(editValue);
    if (isNaN(newPrice) || newPrice < 0) {
      setEditValue(price.toString());
      return;
    }
    if (newPrice !== price) {
      onChange(newPrice);
    }
  }, [editValue, onChange, price]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        inputRef.current?.blur();
      } else if (e.key === "Escape") {
        setEditValue(price.toString());
        inputRef.current?.blur();
      }
    },
    [price],
  );

  const handleInteraction = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (isEditing) {
        e.stopPropagation();
      }
    },
    [isEditing],
  );

  return (
    <div
      className={cn("inline-flex items-center", className)}
      onClick={handleInteraction}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {label && (
        <span className="mr-1.5 text-xs text-neutral-500">{label}</span>
      )}
      <div
        className={cn(
          "inline-flex w-20 items-center border-b-2 px-1 py-0.5 transition-colors",
          isEditing
            ? "border-primary bg-primary/10"
            : "border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10",
        )}
      >
        <span className="text-primary text-sm font-semibold">₹</span>
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "text-primary w-full bg-transparent text-sm font-semibold focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            disabled && "opacity-50",
          )}
          min="0"
          step="1"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
