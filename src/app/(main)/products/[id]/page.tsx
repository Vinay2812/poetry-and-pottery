import { getProductById } from "@/data/products/gateway/server";
import { MobileHeaderContainer } from "@/features/layout";
import { ProductDetailContainer } from "@/features/product-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductDetailSkeleton } from "@/components/skeletons";

import {
  DEFAULT_SOCIAL_IMAGE,
  absoluteUrl,
  resolveSocialImageUrl,
} from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return {
      title: "Product Not Found | Poetry & Pottery",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const product = await getProductById(numericId);

  if (!product) {
    return {
      title: "Product Not Found | Poetry & Pottery",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const imageUrl = resolveSocialImageUrl(product.image_urls[0]);
  const canonicalUrl = absoluteUrl(`/products/${product.id}`);
  const description =
    product.description?.trim() ||
    `${product.name} handcrafted by Poetry & Pottery artisans.`;

  return {
    title: `${product.name} | Poetry & Pottery`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Poetry & Pottery`,
      description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Poetry & Pottery`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

async function ProductDetailContent({ params }: ProductPageProps) {
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
