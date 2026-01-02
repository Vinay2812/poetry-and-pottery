"use server";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import type {
  AdminProductDetail,
  AdminProductMutationResponse,
  AdminProductReviewsResponse,
  AdminProductsResponse,
  CreateProductInput,
  UpdateProductInput,
} from "@/graphql/generated/types";

interface AdminProductsFilterParams {
  search?: string;
  category?: string;
  isActive?: boolean;
  lowStock?: boolean;
  page?: number;
  limit?: number;
}

export async function getProducts(
  filter: AdminProductsFilterParams = {},
): Promise<AdminProductsResponse> {
  await requireAdmin();

  const {
    search = "",
    category,
    isActive,
    lowStock,
    page = 1,
    limit = 20,
  } = filter;
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
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
    })) as unknown as AdminProductsResponse["products"],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(
  productId: number,
): Promise<AdminProductDetail | null> {
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
  } as unknown as AdminProductDetail;
}

export async function getProductReviews(
  productId: number,
): Promise<AdminProductReviewsResponse> {
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
    reviews: reviews as unknown as AdminProductReviewsResponse["reviews"],
    total: aggregation._count,
    averageRating: aggregation._avg.rating || 0,
  };
}

export async function getAllCategories(): Promise<string[]> {
  await requireAdmin();

  const categories = await prisma.productCategory.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });

  return categories.map((c) => c.category);
}

export async function createProduct(
  input: CreateProductInput,
): Promise<AdminProductMutationResponse> {
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
  } = input;

  const existingProduct = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingProduct) {
    return {
      success: false,
      productId: null,
      error: "A product with this slug already exists",
    };
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        instructions: instructions ?? undefined,
        price,
        total_quantity,
        available_quantity,
        is_active: is_active ?? true,
        color_name,
        color_code,
        material,
        image_urls,
        product_categories: {
          create: categories.map((category) => ({ category })),
        },
      },
    });

    return { success: true, productId: product.id, error: null };
  } catch {
    return {
      success: false,
      productId: null,
      error: "Failed to create product",
    };
  }
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<AdminProductMutationResponse> {
  await requireAdmin();

  const { categories, ...data } = input;

  if (data.slug) {
    const existingProduct = await prisma.product.findFirst({
      where: { slug: data.slug, NOT: { id } },
      select: { id: true },
    });

    if (existingProduct) {
      return {
        success: false,
        productId: null,
        error: "A product with this slug already exists",
      };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: data as object,
      });

      if (categories !== undefined && categories !== null) {
        await tx.productCategory.deleteMany({
          where: { product_id: id },
        });

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

    return { success: true, productId: id, error: null };
  } catch {
    return {
      success: false,
      productId: null,
      error: "Failed to update product",
    };
  }
}

export async function deleteProduct(
  productId: number,
): Promise<AdminProductMutationResponse> {
  await requireAdmin();

  try {
    const purchasedCount = await prisma.purchasedProductItem.count({
      where: { product_id: productId },
    });

    if (purchasedCount > 0) {
      await prisma.product.update({
        where: { id: productId },
        data: { is_active: false },
      });

      return {
        success: true,
        productId,
        error:
          "Product has orders and was deactivated instead of deleted. This keeps order history intact.",
      };
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return { success: true, productId: null, error: null };
  } catch {
    return {
      success: false,
      productId: null,
      error: "Failed to delete product",
    };
  }
}

export async function toggleProductActive(
  productId: number,
): Promise<AdminProductMutationResponse> {
  await requireAdmin();

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { is_active: true },
    });

    if (!product) {
      return { success: false, productId: null, error: "Product not found" };
    }

    await prisma.product.update({
      where: { id: productId },
      data: { is_active: !product.is_active },
    });

    return { success: true, productId, error: null };
  } catch {
    return {
      success: false,
      productId: null,
      error: "Failed to toggle product status",
    };
  }
}

export async function deleteProductReview(
  reviewId: number,
): Promise<AdminProductMutationResponse> {
  await requireAdmin();

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { product_id: true },
    });

    if (!review) {
      return { success: false, productId: null, error: "Review not found" };
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return { success: true, productId: review.product_id, error: null };
  } catch {
    return {
      success: false,
      productId: null,
      error: "Failed to delete review",
    };
  }
}
