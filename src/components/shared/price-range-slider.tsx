"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";

import { cn } from "@/lib/utils";

import { PriceHistogramBars } from "./price-histogram-bars";
import { PriceInput } from "./price-input";

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
        {histogram && (
          <PriceHistogramBars
            histogram={histogram}
            maxCount={maxCount}
            rangeMin={localValue[0]}
            rangeMax={localValue[1]}
          />
        )}
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

      <div className="flex items-center justify-between gap-3 px-1">
        <PriceInput
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e)}
          onBlur={() => handleInputBlur(0)}
          onKeyDown={(e) => handleKeyDown(0, e)}
        />

        <div className="h-[1px] w-3 bg-neutral-300" />

        <PriceInput
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e)}
          onBlur={() => handleInputBlur(1)}
          onKeyDown={(e) => handleKeyDown(1, e)}
        />
      </div>
    </div>
  );
}
