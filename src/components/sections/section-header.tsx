import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  description,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <h2
        className={cn(
          "font-display text-2xl font-bold tracking-tight lg:text-4xl",
          description ? "mb-3 lg:mb-4" : "mb-6 lg:mb-8",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mb-6 max-w-lg text-base lg:mb-8",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
