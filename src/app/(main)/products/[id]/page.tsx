import { getProductById } from "@/data/products/gateway/server";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductDetailSkeleton } from "@/components/skeletons";

import { absoluteUrl, resolveSocialImageUrl } from "@/lib/seo";

import {
  ProductDetailContent,
  type ProductPageParams,
} from "./product-detail-content";

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

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

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
