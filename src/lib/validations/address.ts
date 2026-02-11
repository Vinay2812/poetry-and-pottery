import { INDIAN_STATES } from "@/consts/forms";
import { z } from "zod";

export const addressFormSchema = z.object({
  name: z.string().min(1, "Full name is required").trim(),
  addressLine1: z.string().min(1, "Address is required").trim(),
  addressLine2: z.string().optional().default(""),
  landmark: z.string().optional().default(""),
  city: z.string().min(1, "City is required").trim(),
  state: z
    .string()
    .min(1, "State is required")
    .refine((val) => (INDIAN_STATES as readonly string[]).includes(val), {
      message: "Please select a valid state",
    }),
  zip: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Pincode must be 6 digits"),
  contactNumber: z
    .string()
    .optional()
    .default("")
    .refine((val) => !val || /^(\+91|91)?[6-9]\d{9}$/.test(val.trim()), {
      message: "Enter a valid 10-digit mobile number",
    }),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;
