"use client";

import { cn } from "@/lib/utils";

interface EventsSubTabOption {
  value: string;
  label: string;
  count?: number;
}

interface EventsSubTabsProps {
  activeTab: string;
  options: EventsSubTabOption[];
  onTabChange: (value: string) => void;
  ariaLabel?: string;
}

export function EventsSubTabs({
  activeTab,
  options,
  onTabChange,
  ariaLabel = "Sub sections",
}: EventsSubTabsProps) {
  return (
    <div className="mb-6">
      <div
        className="scrollbar-hide inline-flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-neutral-200 bg-white p-1"
        role="tablist"
        aria-label={ariaLabel}
      >
        {options.map((option) => {
          const isActive = option.value === activeTab;

          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-lighter text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-neutral-100",
              )}
              onClick={() => onTabChange(option.value)}
              role="tab"
              aria-selected={isActive}
            >
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] leading-none",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-neutral-100 text-neutral-600",
                  )}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
