"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { Prisma } from "@/prisma/generated/client";

import { prisma } from "@/lib/prisma";

import type {
  ProductBase,
  ProductDetail,
  ProductReview,
  ProductsResponse,
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

export async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  min_price?: number;
  max_price?: number;
  order_by?: "featured" | "new" | "price_low_to_high" | "price_high_to_low";
}): Promise<ProductsResponse> {
  const {
    page = 1,
    limit = 12,
    search,
    categories,
    materials,
    min_price,
    max_price,
    order_by = "featured",
  } = params;

  const category = categories?.[0];
  const sortBy =
    order_by === "price_low_to_high"
      ? "price-low"
      : order_by === "price_high_to_low"
        ? "price-high"
        : order_by === "new"
          ? "newest"
          : "featured";

  const where: Prisma.ProductWhereInput = {
    is_active: true,
  };

  if (category && category !== "all") {
    where.product_categories = {
      some: { category: { equals: category, mode: "insensitive" } },
    };
  }

  if (materials && materials.length > 0) {
    where.material = { in: materials };
  }

  if (min_price !== undefined || max_price !== undefined) {
    where.price = {};
    if (min_price !== undefined) where.price.gte = min_price;
    if (max_price !== undefined) where.price.lte = max_price;
  }

  if (search) {
    where.OR = [{ name: { contains: search, mode: "insensitive" } }];
  }

  const orderBy = getOrderBy(sortBy);

  const priceStatsWhere: Prisma.ProductWhereInput = {
    is_active: true,
  };

  if (category && category !== "all") {
    priceStatsWhere.product_categories = {
      some: { category: { equals: category, mode: "insensitive" } },
    };
  }

  if (materials && materials.length > 0) {
    priceStatsWhere.material = { in: materials };
  }

  if (search) {
    priceStatsWhere.OR = [{ name: { contains: search, mode: "insensitive" } }];
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

  const productsWithRating = products.map((product) => {
    const { reviews, ...rest } = product;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  });

  const prices = priceStats.map((p) => p.price);
  const minPriceVal = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceVal = prices.length > 0 ? Math.max(...prices) : 1000;
  const priceRange = { min: minPriceVal, max: maxPriceVal };

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
    products: productsWithRating.map(mapToProductBase),
    filter: {
      limit,
      page,
      search: search ?? null,
      categories: categories ?? null,
      materials: materials ?? null,
      min_price: min_price ?? null,
      max_price: max_price ?? null,
      order_by: null,
    },
    total_products: total,
    total_pages: Math.ceil(total / limit),
    meta: {
      categories: categoriesResult.map((c) => c.category),
      materials: materialsResult.map((m) => m.material),
      price_range: priceRange,
      price_histogram: priceHistogram,
    },
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

export async function getRelatedProducts(
  productId: number,
  category: string,
  limit: number = 8,
): Promise<ProductBase[]> {
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
    return mapToProductBase({ ...rest, averageRating });
  });
}

export async function getFeaturedProducts(
  limit: number = 8,
): Promise<ProductBase[]> {
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
    return mapToProductBase({ ...rest, averageRating });
  });
}

export async function getBestSellers(
  limit: number = 8,
): Promise<ProductBase[]> {
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
    take: limit * 2,
  });

  const productIds = productOrderCounts.map(
    (p: { product_id: number }) => p.product_id,
  );

  if (productIds.length === 0) {
    return getFeaturedProducts(limit);
  }

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
    return mapToProductBase({ ...rest, averageRating });
  });
}

export async function getRecommendedProducts(
  limit: number = 10,
): Promise<ProductBase[]> {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return getBestSellers(limit);
  }

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

  const excludeProductIds = new Set<number>();
  cartItems.forEach((item: CartItemType) =>
    excludeProductIds.add(item.product_id),
  );
  wishlistItems.forEach((item: WishlistItemType) =>
    excludeProductIds.add(item.product_id),
  );

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

  if (userCategories.size === 0) {
    return getBestSellers(limit);
  }

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
      return mapToProductBase({ ...rest, averageRating });
    }
    return product as ProductBase;
  });
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
