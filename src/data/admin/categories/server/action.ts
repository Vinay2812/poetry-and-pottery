"use server";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import type {
  AdminCategoriesResponse,
  AdminCategoryConfig,
  AdminCategoryMutationResponse,
  AdminIconOption,
} from "@/graphql/generated/types";

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

export async function getCategories(): Promise<AdminCategoriesResponse> {
  await requireAdmin();

  const categoryData = await prisma.productCategory.groupBy({
    by: ["category"],
    _count: { category: true },
    orderBy: { category: "asc" },
  });

  const iconConfig = await getCategoryIconConfig();

  const categoryMap = new Map<string, number>();

  for (const c of categoryData) {
    categoryMap.set(c.category, c._count.category);
  }

  for (const name of Object.keys(iconConfig)) {
    if (!categoryMap.has(name)) {
      categoryMap.set(name, 0);
    }
  }

  const categories = Array.from(categoryMap.entries())
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

export async function getAllConfiguredCategories(): Promise<
  AdminCategoryConfig[]
> {
  await requireAdmin();

  const iconConfig = await getCategoryIconConfig();

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

export async function updateCategoryIcon(
  categoryName: string,
  icon: string,
): Promise<AdminCategoryMutationResponse> {
  await requireAdmin();

  try {
    const config = await getCategoryIconConfig();
    config[categoryName] = icon;
    await saveCategoryIconConfig(config);

    return { success: true };
  } catch {
    return { success: false, error: "Failed to update category icon" };
  }
}

export async function addCategory(
  name: string,
  icon: string = "tag",
): Promise<AdminCategoryMutationResponse> {
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

    return { success: true };
  } catch {
    return { success: false, error: "Failed to add category" };
  }
}

export async function renameCategory(
  oldName: string,
  newName: string,
): Promise<AdminCategoryMutationResponse> {
  await requireAdmin();

  if (!newName || newName.trim().length === 0) {
    return { success: false, error: "New category name is required" };
  }

  const normalizedNewName = newName.trim();

  if (oldName === normalizedNewName) {
    return { success: true };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const existingWithNewName = await tx.productCategory.findFirst({
        where: { category: normalizedNewName },
      });

      if (existingWithNewName) {
        throw new Error("A category with this name already exists");
      }

      await tx.productCategory.updateMany({
        where: { category: oldName },
        data: { category: normalizedNewName },
      });

      const config = await getCategoryIconConfig();
      if (config[oldName]) {
        config[normalizedNewName] = config[oldName];
        delete config[oldName];
        await saveCategoryIconConfig(config);
      }
    });

    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to rename category";
    return { success: false, error: message };
  }
}

export async function deleteCategory(
  name: string,
): Promise<AdminCategoryMutationResponse> {
  await requireAdmin();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.productCategory.deleteMany({
        where: { category: name },
      });

      const config = await getCategoryIconConfig();
      if (config[name]) {
        delete config[name];
        await saveCategoryIconConfig(config);
      }
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete category" };
  }
}

export async function getAvailableIcons(): Promise<AdminIconOption[]> {
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
