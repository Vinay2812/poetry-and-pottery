"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { Prisma } from "@/prisma/generated/client";

import { prisma } from "@/lib/prisma";

import type {
  BestSellersResponse,
  ProductBase,
  ProductDetail,
  ProductReview,
  ProductsResponse,
  RecommendedProductsResponse,
} from "@/graphql/generated/types";

// Helper to get order by clause
function getOrderBy(sortBy: string): Prisma.ProductOrderByWithRelationInput[] {
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
    case "best-sellers":
      return [stockSort, { purchased_products: { _count: "desc" } }];
    default:
      return [stockSort, { created_at: "desc" }];
  }
}

// Map product to ProductBase type
function mapToProductBase(product: {
  id: number;
  slug: string;
  name: string;
  price: number;
  image_urls: string[];
  reviews_count?: number;
  avg_rating?: number;
  averageRating?: number | null;
  material: string;
  in_wishlist?: boolean;
  inWishlist?: boolean;
  available_quantity: number;
  total_quantity: number;
  color_code: string;
  color_name: string;
}): ProductBase {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image_urls: product.image_urls,
    reviews_count: product.reviews_count ?? 0,
    avg_rating: product.avg_rating ?? product.averageRating ?? 0,
    material: product.material,
    in_wishlist: product.in_wishlist ?? product.inWishlist ?? false,
    available_quantity: product.available_quantity,
    total_quantity: product.total_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
  };
}

// Map product detail to ProductDetail type
function mapToProductDetail(product: {
  id: number;
  slug: string;
  name: string;
  price: number;
  image_urls: string[];
  material: string;
  available_quantity: number;
  total_quantity: number;
  color_code: string;
  color_name: string;
  description: string | null;
  instructions: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  product_categories: { category: string }[];
  reviews: {
    id: number;
    user_id: number;
    rating: number;
    review: string | null;
    image_urls: string[];
    created_at: Date;
    user: { id: number; name: string | null; image: string | null } | null;
    likes: { id: number; user_id: number }[];
  }[];
  _count?: { reviews: number; wishlists?: number };
}): ProductDetail {
  const reviewsCount = product._count?.reviews ?? product.reviews?.length ?? 0;
  const avgRating =
    product.reviews?.length > 0
      ? Math.round(
          product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length,
        )
      : 0;

  const mappedReviews: ProductReview[] = (product.reviews ?? []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    rating: r.rating,
    review: r.review,
    image_urls: r.image_urls,
    created_at: r.created_at,
    user: r.user
      ? { id: r.user.id, name: r.user.name, image: r.user.image }
      : null,
    likes: r.likes.map((l) => ({ id: l.id, user_id: l.user_id })),
  }));

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image_urls: product.image_urls,
    material: product.material,
    available_quantity: product.available_quantity,
    total_quantity: product.total_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
    reviews_count: reviewsCount,
    avg_rating: avgRating,
    in_wishlist: false,
    description: product.description,
    instructions: product.instructions,
    is_active: product.is_active,
    created_at: product.created_at,
    updated_at: product.updated_at,
    categories: product.product_categories.map((c) => c.category),
    reviews: mappedReviews,
  };
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const product = await prisma.product.findUnique({
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
  });

  if (!product) return null;
  return mapToProductDetail(product);
}

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  const product = await prisma.product.findUnique({
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
  });

  if (!product) return null;
  return mapToProductDetail(product);
}

export async function getBestSellers(params: {
  limit?: number;
  page?: number;
}): Promise<BestSellersResponse> {
  const limit = params.limit ?? 8;
  const page = params.page ?? 1;
  const offset = (page - 1) * limit;

  const where = {
    is_active: true,
    available_quantity: { gt: 0 },
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        product_categories: true,
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
      skip: offset,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  const mappedProducts = products.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return mapToProductBase({ ...rest, averageRating });
  });

  return {
    products: mappedProducts,
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function getRecommendedProducts(params: {
  limit?: number;
  page?: number;
  productId?: number;
}): Promise<RecommendedProductsResponse> {
  const limit = params.limit ?? 10;
  const page = params.page ?? 1;
  const offset = (page - 1) * limit;
  const productId = params.productId;

  const userId = await getAuthenticatedUserId();
  let categoryPreferences: string[] = [];
  const excludeProductIds: number[] = [];

  // If productId is provided, use category-based recommendations
  if (productId) {
    excludeProductIds.push(productId);
    const productCategories = await prisma.productCategory.findMany({
      where: { product_id: productId },
      select: { category: true },
    });
    categoryPreferences = productCategories.map((c) => c.category);
  } else if (userId) {
    // Use personalized recommendations based on user's history
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
        take: 20,
      }),
    ]);

    type CartItemType = (typeof cartItems)[number];
    type WishlistItemType = (typeof wishlistItems)[number];
    type OrderItemType = (typeof orderItems)[number];
    type CategoryType = { category: string };

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
    categoryPreferences = Array.from(userCategories);
  }

  // Build where clause
  const baseWhere = {
    is_active: true,
    available_quantity: { gt: 0 },
    ...(excludeProductIds.length > 0 && { id: { notIn: excludeProductIds } }),
  };

  let whereClause;
  if (categoryPreferences.length > 0) {
    whereClause = {
      ...baseWhere,
      product_categories: {
        some: { category: { in: categoryPreferences } },
      },
    };
  } else {
    whereClause = baseWhere;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: {
        product_categories: true,
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
      skip: offset,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.product.count({ where: whereClause }),
  ]);

  const mappedProducts = products.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return mapToProductBase({ ...rest, averageRating });
  });

  return {
    products: mappedProducts,
    total,
    page,
    total_pages: Math.ceil(total / limit) || 1,
  };
}

export async function getCategories(): Promise<string[]> {
  const categoryCounts = await prisma.productCategory.groupBy({
    by: ["category"],
    _count: {
      product_id: true,
    },
    orderBy: {
      _count: {
        product_id: "desc",
      },
    },
  });

  return categoryCounts.map((c) => c.category);
}

export async function getMaterials(): Promise<string[]> {
  const materials = await prisma.product.findMany({
    where: { is_active: true },
    distinct: ["material"],
    select: { material: true },
  });
  return materials.map((m) => m.material);
}

export interface FilterMetadata {
  categories: string[];
  materials: string[];
  priceRange: { min: number; max: number };
  priceHistogram: { min: number; max: number; count: number }[];
}

export async function getFilterMetadata(): Promise<FilterMetadata> {
  const [categoriesResult, materialsResult, priceStats] = await Promise.all([
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
      where: { is_active: true },
      select: { price: true },
    }),
  ]);

  const prices = priceStats.map((p) => p.price);
  const minPriceVal = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceVal = prices.length > 0 ? Math.max(...prices) : 1000;

  const bucketCount = 30;
  const range = maxPriceVal - minPriceVal || 1;
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
    categories: categoriesResult.map((c) => c.category),
    materials: materialsResult.map((m) => m.material),
    priceRange: { min: minPriceVal, max: maxPriceVal },
    priceHistogram,
  };
}
