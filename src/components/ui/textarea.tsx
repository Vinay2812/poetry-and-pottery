import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground flex min-h-[120px] w-full resize-y rounded-lg border border-neutral-200 bg-white px-3.5 py-3 text-sm transition-colors duration-150 outline-none",
        "hover:border-neutral-300",
        "focus:border-primary focus:ring-primary/10 focus:ring-3",
        "aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
