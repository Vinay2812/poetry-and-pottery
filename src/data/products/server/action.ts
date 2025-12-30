"use server";

import {
  getBestSellers as getBestSellersAction,
  getFeaturedProducts as getFeaturedProductsAction,
  getProductById as getProductByIdAction,
  getProductBySlug as getProductBySlugAction,
  getProducts as getProductsAction,
  getRelatedProducts as getRelatedProductsAction,
  getSmartRecommendations as getSmartRecommendationsAction,
} from "@/actions/product.actions";

import type {
  ProductBase,
  ProductDetail,
  ProductReview,
  ProductsResponse,
} from "@/graphql/generated/types";

// Map server action product to GraphQL ProductBase type
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

// Map server action product detail to GraphQL ProductDetail type
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
    in_wishlist: false, // Will be set by container based on wishlist hook
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
  const result = await getProductsAction({
    page: params.page,
    limit: params.limit,
    search: params.search,
    category: params.categories?.[0],
    materials: params.materials,
    minPrice: params.min_price,
    maxPrice: params.max_price,
    sortBy:
      params.order_by === "price_low_to_high"
        ? "price-low"
        : params.order_by === "price_high_to_low"
          ? "price-high"
          : params.order_by === "new"
            ? "newest"
            : "featured",
  });

  if (!result?.data) {
    throw new Error("Failed to fetch products from server action");
  }

  return {
    products: result.data.map(mapToProductBase),
    filter: {
      limit: params.limit ?? 12,
      page: params.page ?? 1,
      search: params.search ?? null,
      categories: params.categories ?? null,
      materials: params.materials ?? null,
      min_price: params.min_price ?? null,
      max_price: params.max_price ?? null,
      order_by: null,
    },
    total_products: result.total,
    total_pages: result.totalPages,
    meta: {
      categories: result.categories,
      materials: result.materials,
      price_range: result.priceRange,
      price_histogram: result.priceHistogram,
    },
  };
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const product = await getProductBySlugAction(slug);
  if (!product) return null;
  return mapToProductDetail(product);
}

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  const product = await getProductByIdAction(id);
  if (!product) return null;
  return mapToProductDetail(product);
}

export async function getRelatedProducts(
  productId: number,
  category: string,
  limit: number = 8,
): Promise<ProductBase[]> {
  const products = await getRelatedProductsAction(productId, category, limit);
  if (!products) return [];
  return products.map(mapToProductBase);
}

export async function getFeaturedProducts(
  limit: number = 8,
): Promise<ProductBase[]> {
  const products = await getFeaturedProductsAction(limit);
  if (!products) return [];
  return products.map(mapToProductBase);
}

export async function getBestSellers(
  limit: number = 8,
): Promise<ProductBase[]> {
  const products = await getBestSellersAction(limit);
  if (!products) return [];
  return products.map(mapToProductBase);
}

export async function getRecommendedProducts(
  limit: number = 10,
): Promise<ProductBase[]> {
  const products = await getSmartRecommendationsAction(limit);
  if (!products) return [];
  return products.map(mapToProductBase);
}
