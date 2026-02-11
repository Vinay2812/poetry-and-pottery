import { z } from "zod";

export const customizationOptionFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Display name is required"),
  value: z.string().min(1, "Value is required"),
  priceModifier: z.number(),
  sortOrder: z.number().min(0, "Sort order must be 0 or greater"),
  isActive: z.boolean(),
});

export type CustomizationOptionFormValues = z.infer<
  typeof customizationOptionFormSchema
>;

export const addOptionFormSchema = z.object({
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Display name is required"),
  value: z.string().min(1, "Value is required"),
  priceModifier: z.number(),
  sortOrder: z.number().min(0, "Sort order must be 0 or greater"),
});

export type AddOptionFormValues = z.infer<typeof addOptionFormSchema>;

export const editCategoryFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  basePrice: z.number().min(0, "Base price must be 0 or greater"),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
});

export type EditCategoryFormValues = z.infer<typeof editCategoryFormSchema>;
