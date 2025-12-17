import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-border bg-background flex h-10 w-full rounded-lg border px-4 py-2 text-sm transition-colors duration-150",
        "placeholder:text-muted-foreground",
        "focus:border-primary focus:ring-primary/20 focus:ring-2 focus:outline-none",
        "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
