"use client";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";

import { ProductCarousel } from "@/components/sections";
import { ProductCarouselSkeleton } from "@/components/skeletons";

import { useRecommendedProductsQuery } from "../hooks/use-recommended-products-query";

interface RecommendedProductsContainerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  limit?: number;
  productId?: number;
  viewAllHref?: string;
}

export function RecommendedProductsContainer({
  title = "Curated Favorites",
  subtitle = "Handpicked pieces for your home.",
  className,
  limit = DEFAULT_PAGE_SIZE,
  productId,
  viewAllHref = "/products",
}: RecommendedProductsContainerProps) {
  const { products, isLoading } = useRecommendedProductsQuery({
    limit,
    productId,
  });

  if (isLoading) {
    return <ProductCarouselSkeleton className={className} />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <ProductCarousel
      products={products}
      title={title}
      subtitle={subtitle}
      className={className}
      viewAllHref={viewAllHref}
    />
  );
}
