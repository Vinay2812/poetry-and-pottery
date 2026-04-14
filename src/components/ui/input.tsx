import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "bg-card flex h-10 w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-sm transition-colors duration-150",
          "placeholder:text-muted-foreground",
          "hover:border-neutral-300",
          "focus:border-primary focus:ring-primary/10 focus:ring-3 focus:outline-none",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
          "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/10",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
