"use client";

import { INDIAN_STATES } from "@/consts/forms";
import type { UserAddress } from "@/prisma/generated/client";
import { useCallback, useState } from "react";

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
  isSubmitting?: boolean;
}

export function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Address",
  isSubmitting = false,
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    name: initialData?.name || "",
    addressLine1: initialData?.address_line_1 || "",
    addressLine2: initialData?.address_line_2 || "",
    landmark: initialData?.landmark || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zip: initialData?.zip || "",
    contactNumber: initialData?.contact_number || "",
  });
  const [errors, setErrors] = useState<Partial<AddressFormData>>({});

  const validateForm = useCallback(() => {
    const newErrors: Partial<AddressFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.zip.trim()) {
      newErrors.zip = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.zip.trim())) {
      newErrors.zip = "Pincode must be 6 digits";
    }
    if (
      formData.contactNumber &&
      !/^[6-9]\d{9}$/.test(formData.contactNumber.trim())
    ) {
      newErrors.contactNumber = "Enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (field: keyof AddressFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
    [errors],
  );

  const handleStateChange = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, state: value }));
      if (errors.state) {
        setErrors((prev) => ({ ...prev, state: undefined }));
      }
    },
    [errors.state],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      const result = await onSubmit(formData);

      if (!result.success && result.error) {
        setErrors((prev) => ({ ...prev, name: result.error }));
      }
    },
    [formData, onSubmit, validateForm],
  );

  const inputClassName =
    "h-12 rounded-xl border-neutral-200 bg-neutral-50 px-4 text-base transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          value={formData.name}
          onChange={handleChange("name")}
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          className={cn(inputClassName, errors.name && "border-destructive")}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name}</p>
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
          value={formData.contactNumber}
          onChange={handleChange("contactNumber")}
          disabled={isSubmitting}
          aria-invalid={!!errors.contactNumber}
          className={cn(
            inputClassName,
            errors.contactNumber && "border-destructive",
          )}
        />
        {errors.contactNumber && (
          <p className="text-destructive text-xs">{errors.contactNumber}</p>
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
          value={formData.addressLine1}
          onChange={handleChange("addressLine1")}
          disabled={isSubmitting}
          aria-invalid={!!errors.addressLine1}
          className={cn(
            inputClassName,
            errors.addressLine1 && "border-destructive",
          )}
        />
        {errors.addressLine1 && (
          <p className="text-destructive text-xs">{errors.addressLine1}</p>
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
          value={formData.addressLine2}
          onChange={handleChange("addressLine2")}
          disabled={isSubmitting}
          className={inputClassName}
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
          value={formData.landmark}
          onChange={handleChange("landmark")}
          disabled={isSubmitting}
          className={inputClassName}
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
            value={formData.city}
            onChange={handleChange("city")}
            disabled={isSubmitting}
            aria-invalid={!!errors.city}
            className={cn(inputClassName, errors.city && "border-destructive")}
          />
          {errors.city && (
            <p className="text-destructive text-xs">{errors.city}</p>
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
            value={formData.zip}
            onChange={handleChange("zip")}
            disabled={isSubmitting}
            aria-invalid={!!errors.zip}
            className={cn(inputClassName, errors.zip && "border-destructive")}
          />
          {errors.zip && (
            <p className="text-destructive text-xs">{errors.zip}</p>
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
        <Select
          value={formData.state}
          onValueChange={handleStateChange}
          disabled={isSubmitting}
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
        {errors.state && (
          <p className="text-destructive text-xs">{errors.state}</p>
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
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          className="h-12 flex-1 rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
