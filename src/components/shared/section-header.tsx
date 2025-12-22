import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon: LucideIcon;
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
      <div className="mb-3 flex items-center gap-2 lg:mb-6">
        <Icon className={cn("h-5 w-5", iconClassName)} />
        <h2
          className={cn(
            "text-xl font-bold tracking-tight lg:text-3xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mb-4 text-sm lg:mb-8 lg:text-base",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
