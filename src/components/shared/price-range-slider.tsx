"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";

import { cn } from "@/lib/utils";

interface PriceHistogram {
  min: number;
  max: number;
  count: number;
}

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  onValueCommit?: (value: [number, number]) => void;
  histogram?: PriceHistogram[];
  className?: string;
}

export function PriceRangeSlider({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  onValueCommit,
  histogram,
  className,
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = React.useState(value);
  const [inputValues, setInputValues] = React.useState<[string, string]>([
    value[0].toString(),
    value[1].toString(),
  ]);

  // Sync local value and inputs when prop changes (external update)
  React.useEffect(() => {
    setLocalValue(value);
    setInputValues([value[0].toString(), value[1].toString()]);
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    const val = newValue as [number, number];
    setLocalValue(val);
    setInputValues([val[0].toString(), val[1].toString()]);
    onValueChange(val);
  };

  const handleValueCommit = (newValue: number[]) => {
    if (onValueCommit) {
      onValueCommit(newValue as [number, number]);
    }
  };

  const handleInputChange = (
    index: 0 | 1,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    const newInputs = [...inputValues] as [string, string];
    newInputs[index] = newValue;
    setInputValues(newInputs);

    const parsed = parseInt(newValue);
    if (!isNaN(parsed)) {
      if (index === 0) {
        if (parsed >= min && parsed <= localValue[1]) {
          handleValueChange([parsed, localValue[1]]);
        }
      } else {
        if (parsed >= localValue[0] && parsed <= max) {
          handleValueChange([localValue[0], parsed]);
        }
      }
    }
  };

  const handleInputBlur = (index: 0 | 1) => {
    let parsed = parseInt(inputValues[index]);

    if (isNaN(parsed)) {
      parsed = localValue[index];
    }

    let finalVal = parsed;
    if (index === 0) {
      finalVal = Math.max(min, Math.min(parsed, localValue[1]));
    } else {
      finalVal = Math.max(localValue[0], Math.min(parsed, max));
    }

    const newVal = [...localValue] as [number, number];
    newVal[index] = finalVal;

    handleValueChange(newVal);
    handleValueCommit(newVal);
  };

  const handleKeyDown = (index: 0 | 1, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
  };

  const maxCount = React.useMemo(() => {
    if (!histogram || histogram.length === 0) return 0;
    return Math.max(...histogram.map((b) => b.count));
  }, [histogram]);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-1">
        <div className="flex h-12 w-full items-end gap-[1px] px-1">
          {histogram?.map((bucket, index) => {
            const heightPercentage =
              maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;
            const bucketMid = (bucket.min + bucket.max) / 2;
            const isSelected =
              bucketMid >= localValue[0] && bucketMid <= localValue[1];

            return (
              <div
                key={index}
                className={cn(
                  "flex-1 rounded-t-sm transition-colors",
                  isSelected ? "bg-primary" : "bg-muted",
                )}
                style={{ height: `${heightPercentage}%`, minHeight: "2px" }}
              />
            );
          })}
        </div>
        <Slider
          min={min}
          max={max}
          step={step}
          value={localValue}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
        />
        {/* Min/Max Labels */}
        <div className="flex justify-between px-0.5">
          <span className="text-[11px] text-neutral-400">
            ₹{min.toLocaleString()}
          </span>
          <span className="text-[11px] text-neutral-400">
            ₹{max.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-400">
            ₹
          </span>
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e)}
            onBlur={() => handleInputBlur(0)}
            onKeyDown={(e) => handleKeyDown(0, e)}
            className="focus:ring-primary/30 h-10 w-full [appearance:textfield] rounded-lg border-none bg-neutral-100 pr-2 pl-7 text-sm font-medium text-neutral-900 focus:ring-2 focus:outline-none dark:bg-neutral-800 dark:text-neutral-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <div className="h-[1px] w-3 bg-neutral-300" />

        <div className="relative flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-400">
            ₹
          </span>
          <input
            type="number"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e)}
            onBlur={() => handleInputBlur(1)}
            onKeyDown={(e) => handleKeyDown(1, e)}
            className="focus:ring-primary/30 h-10 w-full [appearance:textfield] rounded-lg border-none bg-neutral-100 pr-2 pl-7 text-sm font-medium text-neutral-900 focus:ring-2 focus:outline-none dark:bg-neutral-800 dark:text-neutral-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
