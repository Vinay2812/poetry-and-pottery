import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon?: LucideIcon;
  iconClassName?: string;
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export function SectionHeader({
  icon: Icon,
  iconClassName,
  title,
  description,
  titleClassName,
  descriptionClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2
        className={cn(
          "font-display text-2xl font-bold tracking-tight lg:text-4xl",
          description ? "mb-3 lg:mb-4" : "mb-6 lg:mb-8",
          titleClassName,
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "mr-2 inline-block h-5 w-5 lg:h-6 lg:w-6",
              iconClassName,
            )}
          />
        )}
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mb-6 max-w-lg text-base lg:mb-8",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
