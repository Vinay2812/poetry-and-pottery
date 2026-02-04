import { getProductById } from "@/data/products/gateway/server";
import { MobileHeaderContainer } from "@/features/layout";
import { ProductDetailContainer } from "@/features/product-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductDetailSkeleton } from "@/components/skeletons";

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
    };
  }

  const product = await getProductById(numericId);

  if (!product) {
    return {
      title: "Product Not Found | Poetry & Pottery",
    };
  }

  const imageUrl =
    product.image_urls[0] ||
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop";

  return {
    title: `${product.name} | Poetry & Pottery`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Poetry & Pottery`,
      description: product.description ?? undefined,
      type: "website",
      url: `/products/${product.id}`,
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
      description: product.description ?? undefined,
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
      <ProductDetailContainer product={product} />
    </>
  );
}
