"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface EditableNumberProps {
  value: number;
  onChange: (newValue: number) => void;
  className?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function EditableNumber({
  value,
  onChange,
  className,
  min = 1,
  max,
  disabled = false,
}: EditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value.toString());
  }, [value]);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const newValue = parseInt(editValue);
    if (
      isNaN(newValue) ||
      newValue < min ||
      (max !== undefined && newValue > max)
    ) {
      setEditValue(value.toString());
      return;
    }
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [editValue, onChange, value, min, max]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        inputRef.current?.blur();
      } else if (e.key === "Escape") {
        setEditValue(value.toString());
        inputRef.current?.blur();
      }
    },
    [value],
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
          "inline-flex w-16 items-center justify-center border-b-2 px-1 py-0.5 transition-colors",
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
            "w-full bg-transparent text-center text-sm font-semibold focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            disabled && "opacity-50",
          )}
          min={min}
          max={max}
          step="1"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
