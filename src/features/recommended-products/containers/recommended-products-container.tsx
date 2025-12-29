import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import React from "react";

import { useRecommendedProductsQuery } from "@/graphql/generated/graphql";

export function RecommendedProductsContainer() {
  const {
    data: recommendedProducts,
    loading: isLoading,
    error,
  } = useRecommendedProductsQuery({
    variables: {
      limit: DEFAULT_PAGE_SIZE,
    },
  });

  if (isLoading) return null;

  return <div>RecommendedProductsContainer</div>;
}
