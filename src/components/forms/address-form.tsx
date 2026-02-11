"use client";

import { INDIAN_STATES } from "@/consts/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import {
  type AddressFormValues,
  addressFormSchema,
} from "@/lib/validations/address";

import type { UserAddress } from "@/graphql/generated/types";

interface AddressFormData {
  name: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  zip: string;
  contactNumber: string;
}

interface AddressFormProps {
  initialData?: UserAddress;
  onSubmit: (
    data: AddressFormData,
  ) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
  submitLabel?: string;
}

export function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Address",
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema) as never,
    defaultValues: {
      name: initialData?.name || "",
      addressLine1: initialData?.address_line_1 || "",
      addressLine2: initialData?.address_line_2 || "",
      landmark: initialData?.landmark || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zip: initialData?.zip || "",
      contactNumber: initialData?.contact_number || "",
    },
  });

  const handleFormSubmit = useCallback(
    async (data: AddressFormValues) => {
      const result = await onSubmit({
        name: data.name,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || "",
        landmark: data.landmark || "",
        city: data.city,
        state: data.state,
        zip: data.zip,
        contactNumber: data.contactNumber || "",
      });

      if (!result.success && result.error) {
        setError("name", { message: result.error });
      }
    },
    [onSubmit, setError],
  );

  const handleFormAction = useCallback(async () => {
    await handleSubmit(handleFormSubmit)();
  }, [handleSubmit, handleFormSubmit]);

  const inputClassName =
    "h-12 rounded-xl border-neutral-200 bg-neutral-50 px-4 text-base transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

  return (
    <form action={handleFormAction} className="space-y-5">
      <AddressFormFields
        register={register}
        control={control}
        errors={errors}
        inputClassName={inputClassName}
        submitLabel={submitLabel}
        onCancel={onCancel}
      />
    </form>
  );
}

interface AddressFormFieldsProps {
  register: ReturnType<typeof useForm<AddressFormValues>>["register"];
  control: ReturnType<typeof useForm<AddressFormValues>>["control"];
  errors: ReturnType<typeof useForm<AddressFormValues>>["formState"]["errors"];
  inputClassName: string;
  submitLabel: string;
  onCancel: () => void;
}

function AddressFormFields({
  register,
  control,
  errors,
  inputClassName,
  submitLabel,
  onCancel,
}: AddressFormFieldsProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {/* Full Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-sm font-semibold text-neutral-700"
        >
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          disabled={pending}
          aria-invalid={!!errors.name}
          className={cn(inputClassName, errors.name && "border-destructive")}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1.5">
        <label
          htmlFor="contactNumber"
          className="text-sm font-semibold text-neutral-700"
        >
          Phone Number
        </label>
        <Input
          id="contactNumber"
          type="tel"
          placeholder="10-digit mobile number"
          disabled={pending}
          aria-invalid={!!errors.contactNumber}
          className={cn(
            inputClassName,
            errors.contactNumber && "border-destructive",
          )}
          {...register("contactNumber")}
        />
        {errors.contactNumber && (
          <p className="text-destructive text-xs">
            {errors.contactNumber.message}
          </p>
        )}
      </div>

      {/* Address Line 1 */}
      <div className="space-y-1.5">
        <label
          htmlFor="addressLine1"
          className="text-sm font-semibold text-neutral-700"
        >
          Address Line 1
        </label>
        <Input
          id="addressLine1"
          type="text"
          placeholder="House no., Building, Street"
          disabled={pending}
          aria-invalid={!!errors.addressLine1}
          className={cn(
            inputClassName,
            errors.addressLine1 && "border-destructive",
          )}
          {...register("addressLine1")}
        />
        {errors.addressLine1 && (
          <p className="text-destructive text-xs">
            {errors.addressLine1.message}
          </p>
        )}
      </div>

      {/* Address Line 2 */}
      <div className="space-y-1.5">
        <label
          htmlFor="addressLine2"
          className="text-sm font-semibold text-neutral-700"
        >
          Address Line 2{" "}
          <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <Input
          id="addressLine2"
          type="text"
          placeholder="Apartment, Suite, Area"
          disabled={pending}
          className={inputClassName}
          {...register("addressLine2")}
        />
      </div>

      {/* Landmark */}
      <div className="space-y-1.5">
        <label
          htmlFor="landmark"
          className="text-sm font-semibold text-neutral-700"
        >
          Landmark{" "}
          <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <Input
          id="landmark"
          type="text"
          placeholder="Nearby landmark"
          disabled={pending}
          className={inputClassName}
          {...register("landmark")}
        />
      </div>

      {/* City & Pincode - Always side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor="city"
            className="text-sm font-semibold text-neutral-700"
          >
            City
          </label>
          <Input
            id="city"
            type="text"
            placeholder="Enter city"
            disabled={pending}
            aria-invalid={!!errors.city}
            className={cn(inputClassName, errors.city && "border-destructive")}
            {...register("city")}
          />
          {errors.city && (
            <p className="text-destructive text-xs">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="zip"
            className="text-sm font-semibold text-neutral-700"
          >
            Pincode
          </label>
          <Input
            id="zip"
            type="text"
            placeholder="Enter pincode"
            maxLength={6}
            disabled={pending}
            aria-invalid={!!errors.zip}
            className={cn(inputClassName, errors.zip && "border-destructive")}
            {...register("zip")}
          />
          {errors.zip && (
            <p className="text-destructive text-xs">{errors.zip.message}</p>
          )}
        </div>
      </div>

      {/* State */}
      <div className="space-y-1.5">
        <label
          htmlFor="state"
          className="text-sm font-semibold text-neutral-700"
        >
          State
        </label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={pending}
            >
              <SelectTrigger
                id="state"
                className={cn(
                  "focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border-neutral-200 bg-neutral-50 px-4 text-base transition-all focus:bg-white focus:ring-2",
                  errors.state && "border-destructive",
                )}
                aria-invalid={!!errors.state}
              >
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.state && (
          <p className="text-destructive text-xs">{errors.state.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-12 flex-1 rounded-xl"
          onClick={onCancel}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          className="h-12 flex-1 rounded-xl"
          disabled={pending}
        >
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </>
  );
}
