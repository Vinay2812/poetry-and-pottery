import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

interface EventDetailHeaderProps {
  labelIcon: LucideIcon;
  labelText: string;
  title: string;
  price: number;
  priceLabel: string;
  rightBadge?: ReactNode;
  subtitle?: string;
}

export function EventDetailHeader({
  labelIcon: LabelIcon,
  labelText,
  title,
  price,
  priceLabel,
  rightBadge,
  subtitle,
}: EventDetailHeaderProps) {
  return (
    <div className="mb-8 border-b border-neutral-100 pb-6 dark:border-neutral-800">
      <div className="mb-3">
        <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
          <LabelIcon className="h-3 w-3" />
          {labelText}
        </span>
      </div>

      <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-5xl dark:text-white">
        {title}
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-neutral-900 dark:text-white">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
            {priceLabel}
          </span>
        </div>
        {rightBadge && (
          <div className="flex items-center gap-2">{rightBadge}</div>
        )}
      </div>

      {subtitle && (
        <p className="mt-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClassName?: string;
}

export function EventDetailInfoItem({
  icon: Icon,
  label,
  value,
  valueClassName,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 h-4 w-4 text-neutral-400" />
      <div>
        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
          {label}
        </p>
        <p
          className={
            valueClassName ||
            "text-sm font-semibold text-neutral-900 dark:text-neutral-100"
          }
        >
          {value}
        </p>
      </div>
    </div>
  );
}
