"use server";

import { Prisma } from "@/prisma/generated/client";
import type {
  ProductFilterParams,
  ProductWithCategories,
  ProductWithDetails,
  ProductsResponse,
} from "@/types";

import { prisma } from "@/lib/prisma";

function getOrderBy(sortBy: string): Prisma.ProductOrderByWithRelationInput[] {
  // Always sort by available_quantity desc first (in-stock items first, out of stock at bottom)
  const stockSort: Prisma.ProductOrderByWithRelationInput = {
    available_quantity: "desc",
  };

  switch (sortBy) {
    case "price-low":
      return [stockSort, { price: "asc" }];
    case "price-high":
      return [stockSort, { price: "desc" }];
    case "newest":
      return [stockSort, { created_at: "desc" }];
    default:
      return [stockSort, { created_at: "desc" }];
  }
}

export async function getProducts(
  params: ProductFilterParams = {},
): Promise<ProductsResponse> {
  const {
    category,
    materials,
    minPrice,
    maxPrice,
    sortBy = "featured",
    page = 1,
    limit = 12,
    search,
  } = params;

  const where: Prisma.ProductWhereInput = {
    is_active: true,
  };

  if (category && category !== "all") {
    where.product_categories = {
      some: { category },
    };
  }

  if (materials && materials.length > 0) {
    where.material = { in: materials };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy = getOrderBy(sortBy);

  const [products, total, categoriesResult, materialsResult] =
    await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          product_categories: true,
          _count: { select: { reviews: true } },
          reviews: { select: { rating: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
      prisma.productCategory.findMany({
        distinct: ["category"],
        select: { category: true },
      }),
      prisma.product.findMany({
        where: { is_active: true },
        distinct: ["material"],
        select: { material: true },
      }),
    ]);

  // Calculate average rating for each product
  const productsWithRating = products.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  });

  return {
    data: productsWithRating as ProductWithCategories[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
    categories: categoriesResult.map((c) => c.category),
    materials: materialsResult.map((m) => m.material),
  };
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithDetails | null> {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      product_categories: true,
      reviews: {
        include: {
          user: true,
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
      _count: {
        select: { reviews: true, wishlists: true },
      },
    },
  }) as Promise<ProductWithDetails | null>;
}

export async function getProductById(
  id: number,
): Promise<ProductWithDetails | null> {
  return prisma.product.findUnique({
    where: { id },
    include: {
      product_categories: true,
      reviews: {
        include: {
          user: true,
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
      _count: {
        select: { reviews: true, wishlists: true },
      },
    },
  }) as Promise<ProductWithDetails | null>;
}

export async function getFeaturedProducts(
  limit: number = 8,
): Promise<ProductWithCategories[]> {
  const products = await prisma.product.findMany({
    where: {
      is_active: true,
      available_quantity: { gt: 0 },
    },
    include: {
      product_categories: true,
      _count: { select: { reviews: true } },
      reviews: { select: { rating: true } },
    },
    take: limit,
    orderBy: { created_at: "desc" },
  });

  return products.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  }) as ProductWithCategories[];
}

export async function getRelatedProducts(
  productId: number,
  category: string,
  limit: number = 4,
): Promise<ProductWithCategories[]> {
  const products = await prisma.product.findMany({
    where: {
      is_active: true,
      id: { not: productId },
      product_categories: {
        some: { category },
      },
    },
    include: {
      product_categories: true,
      _count: { select: { reviews: true } },
      reviews: { select: { rating: true } },
    },
    take: limit,
    orderBy: { created_at: "desc" },
  });

  return products.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  }) as ProductWithCategories[];
}

export async function getCategories(): Promise<string[]> {
  const categories = await prisma.productCategory.findMany({
    distinct: ["category"],
    select: { category: true },
  });
  return categories.map((c) => c.category);
}

export async function getMaterials(): Promise<string[]> {
  const materials = await prisma.product.findMany({
    where: { is_active: true },
    distinct: ["material"],
    select: { material: true },
  });
  return materials.map((m) => m.material);
}
