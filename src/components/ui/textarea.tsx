import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground border-border bg-cream flex min-h-[120px] w-full resize-y rounded-lg border px-3.5 py-3 text-sm transition-colors duration-150 outline-none",
        "hover:border-neutral-400",
        "focus:border-primary focus:ring-primary/10 focus:ring-3",
        "aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
