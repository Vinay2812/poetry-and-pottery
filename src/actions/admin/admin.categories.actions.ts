"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export interface Category {
  name: string;
  icon: string;
  productCount: number;
}

export interface GetCategoriesResult {
  categories: Category[];
  total: number;
}

export interface CategoryConfig {
  name: string;
  icon: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

// Default icons for common categories
const DEFAULT_CATEGORY_ICONS: Record<string, string> = {
  bowls: "bowl",
  mugs: "coffee",
  plates: "plate",
  vases: "flower",
  planters: "plant",
  decor: "home",
  gifts: "gift",
  kitchenware: "utensils",
  serveware: "serving",
  art: "palette",
};

// Site setting key for category configuration
const CATEGORY_CONFIG_KEY = "category_icons";

async function getCategoryIconConfig(): Promise<Record<string, string>> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: CATEGORY_CONFIG_KEY },
  });

  if (setting && typeof setting.value === "object" && setting.value !== null) {
    return setting.value as Record<string, string>;
  }

  return {};
}

async function saveCategoryIconConfig(
  config: Record<string, string>,
): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key: CATEGORY_CONFIG_KEY },
    create: { key: CATEGORY_CONFIG_KEY, value: config },
    update: { value: config },
  });
}

/**
 * Get all categories with their product counts and icons.
 * Includes categories from icon config even if they have no products.
 */
export async function getCategories(): Promise<GetCategoriesResult> {
  await requireAdmin();

  // Get all unique categories with product counts
  const categoryData = await prisma.productCategory.groupBy({
    by: ["category"],
    _count: { category: true },
    orderBy: { category: "asc" },
  });

  // Get icon config
  const iconConfig = await getCategoryIconConfig();

  // Create a map of categories with counts
  const categoryMap = new Map<string, number>();

  // Add categories from products
  for (const c of categoryData) {
    categoryMap.set(c.category, c._count.category);
  }

  // Add categories from icon config (with 0 products if not in map)
  for (const name of Object.keys(iconConfig)) {
    if (!categoryMap.has(name)) {
      categoryMap.set(name, 0);
    }
  }

  // Build categories array
  const categories: Category[] = Array.from(categoryMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, productCount]) => ({
      name,
      icon:
        iconConfig[name] || DEFAULT_CATEGORY_ICONS[name.toLowerCase()] || "tag",
      productCount,
    }));

  return {
    categories,
    total: categories.length,
  };
}

/**
 * Get all configured categories (including those without products).
 */
export async function getAllConfiguredCategories(): Promise<CategoryConfig[]> {
  await requireAdmin();

  const iconConfig = await getCategoryIconConfig();

  // Get categories from products
  const productCategories = await prisma.productCategory.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });

  const allCategoryNames = new Set([
    ...productCategories.map((c) => c.category),
    ...Object.keys(iconConfig),
  ]);

  return Array.from(allCategoryNames)
    .sort()
    .map((name) => ({
      name,
      icon:
        iconConfig[name] || DEFAULT_CATEGORY_ICONS[name.toLowerCase()] || "tag",
    }));
}

/**
 * Update category icon.
 */
export async function updateCategoryIcon(
  categoryName: string,
  icon: string,
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const config = await getCategoryIconConfig();
    config[categoryName] = icon;
    await saveCategoryIconConfig(config);

    revalidatePath("/dashboard/categories");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to update category icon:", error);
    return { success: false, error: "Failed to update category icon" };
  }
}

/**
 * Add a new category configuration.
 */
export async function addCategory(
  name: string,
  icon: string = "tag",
): Promise<ActionResult> {
  await requireAdmin();

  if (!name || name.trim().length === 0) {
    return { success: false, error: "Category name is required" };
  }

  const normalizedName = name.trim();

  try {
    const config = await getCategoryIconConfig();

    if (config[normalizedName]) {
      return { success: false, error: "Category already exists" };
    }

    config[normalizedName] = icon;
    await saveCategoryIconConfig(config);

    revalidatePath("/dashboard/categories");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to add category:", error);
    return { success: false, error: "Failed to add category" };
  }
}

/**
 * Rename a category across all products.
 */
export async function renameCategory(
  oldName: string,
  newName: string,
): Promise<ActionResult> {
  await requireAdmin();

  if (!newName || newName.trim().length === 0) {
    return { success: false, error: "New category name is required" };
  }

  const normalizedNewName = newName.trim();

  if (oldName === normalizedNewName) {
    return { success: true }; // No change needed
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Check if new name already exists
      const existingWithNewName = await tx.productCategory.findFirst({
        where: { category: normalizedNewName },
      });

      if (existingWithNewName) {
        throw new Error("A category with this name already exists");
      }

      // Update all product categories
      await tx.productCategory.updateMany({
        where: { category: oldName },
        data: { category: normalizedNewName },
      });

      // Update icon config
      const config = await getCategoryIconConfig();
      if (config[oldName]) {
        config[normalizedNewName] = config[oldName];
        delete config[oldName];
        await saveCategoryIconConfig(config);
      }
    });

    revalidatePath("/dashboard/categories");
    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to rename category:", error);
    const message =
      error instanceof Error ? error.message : "Failed to rename category";
    return { success: false, error: message };
  }
}

/**
 * Delete a category (removes from all products).
 */
export async function deleteCategory(name: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.$transaction(async (tx) => {
      // Delete all product category associations
      await tx.productCategory.deleteMany({
        where: { category: name },
      });

      // Remove from icon config
      const config = await getCategoryIconConfig();
      if (config[name]) {
        delete config[name];
        await saveCategoryIconConfig(config);
      }
    });

    revalidatePath("/dashboard/categories");
    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

/**
 * Get available icon options.
 */
export async function getAvailableIcons(): Promise<
  { value: string; label: string }[]
> {
  return [
    { value: "tag", label: "Tag" },
    { value: "bowl", label: "Bowl" },
    { value: "coffee", label: "Coffee/Mug" },
    { value: "plate", label: "Plate" },
    { value: "flower", label: "Flower/Vase" },
    { value: "plant", label: "Plant/Planter" },
    { value: "home", label: "Home/Decor" },
    { value: "gift", label: "Gift" },
    { value: "utensils", label: "Utensils" },
    { value: "serving", label: "Serving" },
    { value: "palette", label: "Art/Palette" },
    { value: "heart", label: "Heart" },
    { value: "star", label: "Star" },
    { value: "sparkles", label: "Sparkles" },
    { value: "gem", label: "Gem" },
    { value: "shapes", label: "Shapes" },
  ];
}
