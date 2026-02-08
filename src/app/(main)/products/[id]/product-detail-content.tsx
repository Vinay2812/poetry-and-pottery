import { getProductById } from "@/data/products/gateway/server";
import { MobileHeaderContainer } from "@/features/layout";
import { ProductDetailContainer } from "@/features/product-detail";
import { notFound } from "next/navigation";

import {
  DEFAULT_SOCIAL_IMAGE,
  absoluteUrl,
  resolveSocialImageUrl,
} from "@/lib/seo";

export interface ProductPageParams {
  id: string;
}

interface ProductDetailContentProps {
  params: Promise<ProductPageParams>;
}

export async function ProductDetailContent({
  params,
}: ProductDetailContentProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    notFound();
  }

  const product = await getProductById(numericId);
  if (!product) {
    notFound();
  }

  return (
    <>
      <MobileHeaderContainer
        title="Product Detail"
        showBack
        backHref="/products"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductStructuredData(product)),
        }}
      />
      <ProductDetailContainer product={product} />
    </>
  );
}

function buildProductStructuredData(
  product: Awaited<ReturnType<typeof getProductById>>,
) {
  const images =
    product?.image_urls?.length && product.image_urls.length > 0
      ? product.image_urls.map((imageUrl) => resolveSocialImageUrl(imageUrl))
      : [DEFAULT_SOCIAL_IMAGE];
  const canonicalUrl = absoluteUrl(`/products/${product?.id ?? ""}`);

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name ?? "Product",
    image: images,
    description:
      product?.description?.trim() ||
      "Handcrafted ceramic piece by Poetry & Pottery.",
    sku: String(product?.id ?? ""),
    category:
      product?.categories && product.categories.length > 0
        ? product.categories[0]
        : undefined,
    brand: {
      "@type": "Brand",
      name: "Poetry & Pottery",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "INR",
      price: product?.price ?? 0,
      availability:
        (product?.available_quantity ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if ((product?.reviews_count ?? 0) > 0) {
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product?.avg_rating ?? 0,
      reviewCount: product?.reviews_count ?? 0,
    };
  }

  return structuredData;
}
