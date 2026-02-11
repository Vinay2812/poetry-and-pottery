import * as React from "react";

interface PriceInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function PriceInput({
  value,
  onChange,
  onBlur,
  onKeyDown,
}: PriceInputProps) {
  return (
    <div className="relative flex-1">
      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-400">
        ₹
      </span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className="focus:ring-primary/30 h-10 w-full [appearance:textfield] rounded-lg border-none bg-neutral-100 pr-2 pl-7 text-sm font-medium text-neutral-900 focus:ring-2 focus:outline-none dark:bg-neutral-800 dark:text-neutral-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
}
