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
  "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3.5 text-sm transition-colors duration-150 placeholder:text-muted-foreground hover:border-neutral-300 focus:border-primary focus:ring-3 focus:ring-primary/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none";

export const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ label, error, className, as = "input", ...props }, ref) => {
  const id = props.id || props.name;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-neutral-600"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          className={cn(
            inputStyles,
            "h-auto min-h-[120px] resize-y py-3",
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
