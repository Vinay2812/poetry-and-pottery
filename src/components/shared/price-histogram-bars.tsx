import { cn } from "@/lib/utils";

interface PriceHistogramBucket {
  min: number;
  max: number;
  count: number;
}

interface PriceHistogramBarsProps {
  histogram: PriceHistogramBucket[];
  maxCount: number;
  rangeMin: number;
  rangeMax: number;
}

export function PriceHistogramBars({
  histogram,
  maxCount,
  rangeMin,
  rangeMax,
}: PriceHistogramBarsProps) {
  return (
    <div className="flex h-12 w-full items-end gap-[1px] px-1">
      {histogram.map((bucket, index) => {
        const heightPercentage =
          maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;
        const bucketMid = (bucket.min + bucket.max) / 2;
        const isSelected = bucketMid >= rangeMin && bucketMid <= rangeMax;

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
  );
}
