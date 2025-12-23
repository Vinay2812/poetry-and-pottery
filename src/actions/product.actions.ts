"use server";

import { Prisma } from "@/prisma/generated/client";
import type {
  ProductFilterParams,
  ProductWithCategories,
  ProductWithDetails,
  ProductsResponse,
} from "@/types";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

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
      // { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy = getOrderBy(sortBy);

  // Create a separate where clause for price stats that ignores the price filter itself
  // but respects other filters (category, materials, search) to show relevant price range
  const priceStatsWhere: Prisma.ProductWhereInput = {
    is_active: true,
  };

  if (category && category !== "all") {
    priceStatsWhere.product_categories = {
      some: { category },
    };
  }

  if (materials && materials.length > 0) {
    priceStatsWhere.material = { in: materials };
  }

  if (search) {
    priceStatsWhere.OR = [
      { name: { contains: search, mode: "insensitive" } },
      // { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [products, total, categoriesResult, materialsResult, priceStats] =
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
      prisma.product.findMany({
        where: priceStatsWhere,
        select: { price: true },
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

  // Calculate price range and histogram
  const prices = priceStats.map((p) => p.price);
  const minPriceVal = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceVal = prices.length > 0 ? Math.max(...prices) : 1000; // Default max if no products
  const priceRange = { min: minPriceVal, max: maxPriceVal };

  // Generate histogram
  const bucketCount = 30; // Number of bars
  const range = maxPriceVal - minPriceVal || 1; // Avoid division by zero
  const step = range / bucketCount;

  const priceHistogram = Array.from({ length: bucketCount }, (_, i) => {
    const bucketMin = minPriceVal + i * step;
    const bucketMax = minPriceVal + (i + 1) * step;
    const count = prices.filter(
      (p) =>
        p >= bucketMin &&
        (i === bucketCount - 1 ? p <= bucketMax : p < bucketMax),
    ).length;
    return { min: bucketMin, max: bucketMax, count };
  });

  return {
    data: productsWithRating as ProductWithCategories[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
    categories: categoriesResult.map((c) => c.category),
    materials: materialsResult.map((m) => m.material),
    priceRange,
    priceHistogram,
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

/**
 * Get best-selling products (most ordered).
 */
export async function getBestSellers(
  limit: number = 8,
): Promise<ProductWithCategories[]> {
  // Get product IDs sorted by total order count
  const productOrderCounts = await prisma.purchasedProductItem.groupBy({
    by: ["product_id"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: limit * 2, // Get more in case some are inactive
  });

  const productIds = productOrderCounts.map(
    (p: { product_id: number }) => p.product_id,
  );

  if (productIds.length === 0) {
    // Fallback to featured products if no orders exist
    return getFeaturedProducts(limit);
  }

  // Get product details for best sellers
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      is_active: true,
      available_quantity: { gt: 0 },
    },
    include: {
      product_categories: true,
      _count: { select: { reviews: true } },
      reviews: { select: { rating: true } },
    },
    take: limit,
  });

  // Sort by order count to maintain the best-seller order
  const sortedProducts = products.sort((a, b) => {
    const aIndex = productIds.indexOf(a.id);
    const bIndex = productIds.indexOf(b.id);
    return aIndex - bIndex;
  });

  return sortedProducts.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  }) as ProductWithCategories[];
}

/**
 * Get smart recommendations based on user's cart, wishlist, and orders.
 * Falls back to best sellers if user is not logged in or has no data.
 */
export async function getSmartRecommendations(
  limit: number = 8,
): Promise<ProductWithCategories[]> {
  const userId = await getAuthenticatedUserId();

  // If not logged in, return best sellers
  if (!userId) {
    return getBestSellers(limit);
  }

  // Get user's cart, wishlist, and order product IDs and categories
  const [cartItems, wishlistItems, orderItems] = await Promise.all([
    prisma.cart.findMany({
      where: { user_id: userId },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
    }),
    prisma.wishlist.findMany({
      where: { user_id: userId },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
    }),
    prisma.purchasedProductItem.findMany({
      where: {
        order: { user_id: userId },
      },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
      take: 20, // Recent orders
    }),
  ]);

  type CartItemType = (typeof cartItems)[number];
  type WishlistItemType = (typeof wishlistItems)[number];
  type OrderItemType = (typeof orderItems)[number];
  type CategoryType = { category: string };

  // Collect all product IDs to exclude from recommendations
  const excludeProductIds = new Set<number>();
  cartItems.forEach((item: CartItemType) =>
    excludeProductIds.add(item.product_id),
  );
  wishlistItems.forEach((item: WishlistItemType) =>
    excludeProductIds.add(item.product_id),
  );

  // Collect all categories from user's items
  const userCategories = new Set<string>();
  cartItems.forEach((item: CartItemType) => {
    item.product.product_categories.forEach((cat: CategoryType) =>
      userCategories.add(cat.category),
    );
  });
  wishlistItems.forEach((item: WishlistItemType) => {
    item.product.product_categories.forEach((cat: CategoryType) =>
      userCategories.add(cat.category),
    );
  });
  orderItems.forEach((item: OrderItemType) => {
    item.product?.product_categories?.forEach((cat: CategoryType) =>
      userCategories.add(cat.category),
    );
  });

  // If user has no categories to recommend from, return best sellers
  if (userCategories.size === 0) {
    return getBestSellers(limit);
  }

  // Find products in similar categories, excluding already owned/wishlisted
  const products = await prisma.product.findMany({
    where: {
      is_active: true,
      available_quantity: { gt: 0 },
      id: { notIn: Array.from(excludeProductIds) },
      product_categories: {
        some: {
          category: { in: Array.from(userCategories) },
        },
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

  // If not enough recommendations, supplement with best sellers
  if (products.length < limit) {
    const bestSellers = await getBestSellers(limit - products.length);
    const existingIds = new Set(products.map((p) => p.id));

    for (const seller of bestSellers) {
      if (!existingIds.has(seller.id) && !excludeProductIds.has(seller.id)) {
        products.push(seller as never);
        if (products.length >= limit) break;
      }
    }
  }

  return products.map((product) => {
    if ("reviews" in product) {
      const { reviews, ...rest } = product;
      const averageRating =
        reviews.length > 0
          ? reviews.reduce(
              (sum: number, r: { rating: number }) => sum + r.rating,
              0,
            ) / reviews.length
          : null;
      return { ...rest, averageRating };
    }
    return product;
  }) as ProductWithCategories[];
}
