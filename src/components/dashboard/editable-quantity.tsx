"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface EditableQuantityProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  className?: string;
  min?: number;
  disabled?: boolean;
}

export function EditableQuantity({
  quantity,
  onChange,
  className,
  min = 1,
  disabled = false,
}: EditableQuantityProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(quantity.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(quantity.toString());
  }, [quantity]);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const newQuantity = parseInt(editValue, 10);
    if (isNaN(newQuantity) || newQuantity < min) {
      setEditValue(quantity.toString());
      return;
    }
    if (newQuantity !== quantity) {
      onChange(newQuantity);
    }
  }, [editValue, onChange, quantity, min]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        inputRef.current?.blur();
      } else if (e.key === "Escape") {
        setEditValue(quantity.toString());
        inputRef.current?.blur();
      }
    },
    [quantity],
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
      <div
        className={cn(
          "inline-flex w-12 items-center justify-center border-b-2 px-1 py-0.5 transition-colors",
          isEditing
            ? "border-primary bg-primary/10"
            : "border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10",
        )}
      >
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "text-primary w-full bg-transparent text-center text-sm font-semibold focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            disabled && "opacity-50",
          )}
          min={min}
          step="1"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
