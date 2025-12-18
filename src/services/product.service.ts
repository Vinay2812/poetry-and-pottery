import { Prisma } from "@/prisma/generated/client";
import type {
  ProductFilterParams,
  ProductWithCategories,
  ProductWithDetails,
  ProductsResponse,
} from "@/types";

import { prisma } from "@/lib/prisma";

export class ProductService {
  /**
   * Get products with filtering, sorting, and pagination
   */
  static async getProducts(
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

    // Build where clause
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

    // Build orderBy
    const orderBy = this.getOrderBy(sortBy);

    // Parallel fetch: products, count, distinct categories, distinct materials
    const [products, total, categoriesResult, materialsResult] =
      await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            product_categories: true,
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

    return {
      data: products as ProductWithCategories[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      categories: categoriesResult.map((c) => c.category),
      materials: materialsResult.map((m) => m.material),
    };
  }

  /**
   * Get single product by slug with full details
   */
  static async getProductBySlug(
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

  /**
   * Get single product by ID
   */
  static async getProductById(id: number): Promise<ProductWithDetails | null> {
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

  /**
   * Get related products (same category, excluding current)
   */
  static async getRelatedProducts(
    productId: number,
    category: string,
    limit: number = 4,
  ): Promise<ProductWithCategories[]> {
    return prisma.product.findMany({
      where: {
        is_active: true,
        id: { not: productId },
        product_categories: {
          some: { category },
        },
      },
      include: {
        product_categories: true,
      },
      take: limit,
      orderBy: { created_at: "desc" },
    }) as Promise<ProductWithCategories[]>;
  }

  /**
   * Get all distinct categories
   */
  static async getCategories(): Promise<string[]> {
    const categories = await prisma.productCategory.findMany({
      distinct: ["category"],
      select: { category: true },
    });
    return categories.map((c) => c.category);
  }

  /**
   * Get all distinct materials
   */
  static async getMaterials(): Promise<string[]> {
    const materials = await prisma.product.findMany({
      where: { is_active: true },
      distinct: ["material"],
      select: { material: true },
    });
    return materials.map((m) => m.material);
  }

  /**
   * Get featured products for homepage
   */
  static async getFeaturedProducts(
    limit: number = 8,
  ): Promise<ProductWithCategories[]> {
    return prisma.product.findMany({
      where: {
        is_active: true,
        available_quantity: { gt: 0 },
      },
      include: {
        product_categories: true,
      },
      take: limit,
      orderBy: { created_at: "desc" },
    }) as Promise<ProductWithCategories[]>;
  }

  private static getOrderBy(
    sortBy: string,
  ): Prisma.ProductOrderByWithRelationInput {
    switch (sortBy) {
      case "price-low":
        return { price: "asc" };
      case "price-high":
        return { price: "desc" };
      case "newest":
        return { created_at: "desc" };
      default:
        return { created_at: "desc" };
    }
  }
}
