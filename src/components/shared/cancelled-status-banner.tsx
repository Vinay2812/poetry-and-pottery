import type { LucideIcon } from "lucide-react";

import { formatProgressDate } from "@/lib/date";

interface CancelledStatusBannerProps {
  title: string;
  label: string;
  icon: LucideIcon;
  timestamp?: Date | string | null;
  subtitle?: string;
}

export function CancelledStatusBanner({
  title,
  label,
  icon: Icon,
  timestamp,
  subtitle,
}: CancelledStatusBannerProps) {
  return (
    <div className="rounded-2xl">
      <h2 className="mb-5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>
      <div className="flex items-center gap-4 rounded-xl bg-red-50 p-4 dark:bg-red-950/20">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            {label}
          </p>
          {timestamp && (
            <time className="mt-0.5 block text-[10px] font-bold tracking-wider text-red-500 uppercase">
              {formatProgressDate(timestamp)}
            </time>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs text-red-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
