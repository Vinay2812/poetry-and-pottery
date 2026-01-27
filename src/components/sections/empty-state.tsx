import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: {
    container: "py-8 px-5",
    circle: "size-16",
    icon: "size-8",
    title: "text-base",
    description: "text-[13px] max-w-[260px]",
  },
  md: {
    container: "py-12 px-6",
    circle: "size-20",
    icon: "size-10",
    title: "text-lg",
    description: "text-sm max-w-xs",
  },
  lg: {
    container: "py-16 px-8",
    circle: "size-[100px]",
    icon: "size-12",
    title: "text-[22px]",
    description: "text-[15px] max-w-sm",
  },
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  size = "md",
  className,
}: EmptyStateProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        config.container,
        className,
      )}
    >
      <div
        className={cn(
          "bg-primary-light mb-5 flex items-center justify-center rounded-full",
          config.circle,
        )}
      >
        <Icon className={cn("text-primary", config.icon)} />
      </div>
      <h3 className={cn("font-display mb-2 font-semibold", config.title)}>
        {title}
      </h3>
      <p
        className={cn(
          "text-muted-foreground mb-6 leading-relaxed",
          config.description,
        )}
      >
        {description}
      </p>
      {actionText &&
        (actionHref || onAction) &&
        (actionHref ? (
          <Button asChild>
            <Link href={actionHref}>{actionText}</Link>
          </Button>
        ) : (
          <Button onClick={onAction}>{actionText}</Button>
        ))}
    </div>
  );
}
