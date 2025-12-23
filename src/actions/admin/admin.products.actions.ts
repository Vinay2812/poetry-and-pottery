"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export interface AdminProduct {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  total_quantity: number;
  available_quantity: number;
  is_active: boolean;
  color_name: string;
  color_code: string;
  material: string;
  image_urls: string[];
  categories: string[];
  created_at: Date;
  _count: {
    reviews: number;
    wishlists: number;
    carts: number;
  };
}

export interface GetProductsParams {
  search?: string;
  category?: string;
  isActive?: boolean;
  lowStock?: boolean;
  page?: number;
  limit?: number;
}

export interface GetProductsResult {
  products: AdminProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  instructions: string[];
  price: number;
  total_quantity: number;
  available_quantity: number;
  is_active: boolean;
  color_name: string;
  color_code: string;
  material: string;
  image_urls: string[];
  categories: string[];
  created_at: Date;
  updated_at: Date;
  _count: {
    reviews: number;
    wishlists: number;
    carts: number;
    purchased_products: number;
  };
}

export interface CreateProductParams {
  name: string;
  slug: string;
  description?: string;
  instructions?: string[];
  price: number;
  total_quantity: number;
  available_quantity: number;
  is_active?: boolean;
  color_name: string;
  color_code: string;
  material: string;
  image_urls: string[];
  categories: string[];
}

export interface UpdateProductParams {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  instructions?: string[];
  price?: number;
  total_quantity?: number;
  available_quantity?: number;
  is_active?: boolean;
  color_name?: string;
  color_code?: string;
  material?: string;
  image_urls?: string[];
  categories?: string[];
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

export interface CreateProductResult extends ActionResult {
  productId?: number;
}

export interface ProductReview {
  id: number;
  rating: number;
  review: string | null;
  image_urls: string[];
  created_at: Date;
  user: {
    id: number;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export interface GetProductReviewsResult {
  reviews: ProductReview[];
  total: number;
  averageRating: number;
}

/**
 * Get paginated list of products with search and filters.
 */
export async function getProducts(
  params: GetProductsParams = {},
): Promise<GetProductsResult> {
  await requireAdmin();

  const {
    search = "",
    category,
    isActive,
    lowStock,
    page = 1,
    limit = 20,
  } = params;
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        // { description: { contains: search, mode: "insensitive" as const } },
        { slug: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(category && {
      product_categories: {
        some: { category },
      },
    }),
    ...(typeof isActive === "boolean" && { is_active: isActive }),
    ...(lowStock && { available_quantity: { lte: 5 } }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        price: true,
        total_quantity: true,
        available_quantity: true,
        is_active: true,
        color_name: true,
        color_code: true,
        material: true,
        image_urls: true,
        created_at: true,
        product_categories: {
          select: { category: true },
        },
        _count: {
          select: {
            reviews: true,
            wishlists: true,
            carts: true,
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((p) => ({
      ...p,
      categories: p.product_categories.map((pc) => pc.category),
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get a single product by ID.
 */
export async function getProductById(
  productId: number,
): Promise<ProductDetail | null> {
  await requireAdmin();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      instructions: true,
      price: true,
      total_quantity: true,
      available_quantity: true,
      is_active: true,
      color_name: true,
      color_code: true,
      material: true,
      image_urls: true,
      created_at: true,
      updated_at: true,
      product_categories: {
        select: { category: true },
      },
      _count: {
        select: {
          reviews: true,
          wishlists: true,
          carts: true,
          purchased_products: true,
        },
      },
    },
  });

  if (!product) return null;

  return {
    ...product,
    categories: product.product_categories.map((pc) => pc.category),
  };
}

/**
 * Create a new product.
 */
export async function createProduct(
  params: CreateProductParams,
): Promise<CreateProductResult> {
  await requireAdmin();

  const {
    name,
    slug,
    description,
    instructions = [],
    price,
    total_quantity,
    available_quantity,
    is_active = true,
    color_name,
    color_code,
    material,
    image_urls,
    categories,
  } = params;

  // Validate slug uniqueness
  const existingProduct = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingProduct) {
    return { success: false, error: "A product with this slug already exists" };
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        instructions,
        price,
        total_quantity,
        available_quantity,
        is_active,
        color_name,
        color_code,
        material,
        image_urls,
        product_categories: {
          create: categories.map((category) => ({ category })),
        },
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true, productId: product.id };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

/**
 * Update an existing product.
 */
export async function updateProduct(
  params: UpdateProductParams,
): Promise<ActionResult> {
  await requireAdmin();

  const { id, categories, ...data } = params;

  // If slug is being updated, validate uniqueness
  if (data.slug) {
    const existingProduct = await prisma.product.findFirst({
      where: { slug: data.slug, NOT: { id } },
      select: { id: true },
    });

    if (existingProduct) {
      return {
        success: false,
        error: "A product with this slug already exists",
      };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Update product
      await tx.product.update({
        where: { id },
        data,
      });

      // Update categories if provided
      if (categories !== undefined) {
        // Delete existing categories
        await tx.productCategory.deleteMany({
          where: { product_id: id },
        });

        // Create new categories
        if (categories.length > 0) {
          await tx.productCategory.createMany({
            data: categories.map((category) => ({
              product_id: id,
              category,
            })),
          });
        }
      }
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

/**
 * Delete a product (or deactivate if it has orders).
 */
export async function deleteProduct(productId: number): Promise<ActionResult> {
  await requireAdmin();

  try {
    // Check if product has any purchased products
    const purchasedCount = await prisma.purchasedProductItem.count({
      where: { product_id: productId },
    });

    if (purchasedCount > 0) {
      // Has orders - deactivate instead of delete
      await prisma.product.update({
        where: { id: productId },
        data: { is_active: false },
      });

      revalidatePath("/dashboard/products");
      revalidatePath("/products");

      return {
        success: true,
        error:
          "Product has orders and was deactivated instead of deleted. This keeps order history intact.",
      };
    }

    // No orders - safe to delete
    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

/**
 * Toggle product active status.
 */
export async function toggleProductActive(
  productId: number,
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { is_active: true },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    await prisma.product.update({
      where: { id: productId },
      data: { is_active: !product.is_active },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to toggle product status:", error);
    return { success: false, error: "Failed to toggle product status" };
  }
}

/**
 * Get reviews for a product.
 */
export async function getProductReviews(
  productId: number,
): Promise<GetProductReviewsResult> {
  await requireAdmin();

  const [reviews, aggregation] = await Promise.all([
    prisma.review.findMany({
      where: { product_id: productId },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        rating: true,
        review: true,
        image_urls: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }),
    prisma.review.aggregate({
      where: { product_id: productId },
      _avg: { rating: true },
      _count: true,
    }),
  ]);

  return {
    reviews,
    total: aggregation._count,
    averageRating: aggregation._avg.rating || 0,
  };
}

/**
 * Delete a product review.
 */
export async function deleteProductReview(
  reviewId: number,
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { product_id: true },
    });

    if (!review) {
      return { success: false, error: "Review not found" };
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    if (review.product_id) {
      revalidatePath(`/dashboard/products/${review.product_id}`);
      revalidatePath(`/products`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}

/**
 * Get all unique categories from products.
 */
export async function getAllCategories(): Promise<string[]> {
  await requireAdmin();

  const categories = await prisma.productCategory.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });

  return categories.map((c) => c.category);
}
