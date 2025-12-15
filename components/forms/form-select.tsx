import { forwardRef, SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const selectStyles =
  "border-border bg-muted/30 focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border px-4 text-sm transition-colors focus:bg-white focus:ring-2 focus:outline-none";

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm font-semibold">
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          className={cn(selectStyles, error && "border-destructive", className)}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
