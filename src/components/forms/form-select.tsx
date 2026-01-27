import { SelectHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const selectStyles =
  "h-10 w-full cursor-pointer rounded-lg border border-neutral-200 bg-white px-3.5 text-sm transition-colors duration-150 hover:border-neutral-300 focus:border-primary focus:ring-3 focus:ring-primary/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div>
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-neutral-600"
        >
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
  },
);

FormSelect.displayName = "FormSelect";
