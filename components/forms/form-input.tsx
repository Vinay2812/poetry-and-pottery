import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface BaseFormFieldProps {
  label: string;
  error?: string;
}

interface FormInputProps
  extends BaseFormFieldProps, InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface FormTextareaProps
  extends BaseFormFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

type FormFieldProps = FormInputProps | FormTextareaProps;

const inputStyles =
  "border-border bg-muted/30 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border px-4 text-sm transition-colors focus:bg-white focus:ring-2 focus:outline-none";

export const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ label, error, className, as = "input", ...props }, ref) => {
  const id = props.id || props.name;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          className={cn(
            inputStyles,
            "h-auto resize-none py-3",
            error && "border-destructive",
            className,
          )}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          className={cn(inputStyles, error && "border-destructive", className)}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
    </div>
  );
});

FormInput.displayName = "FormInput";
