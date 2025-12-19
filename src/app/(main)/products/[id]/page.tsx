import {
  getCurrentUserId,
  getProductById,
  getProductBySlug,
  getRelatedProducts,
} from "@/actions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MobileHeader } from "@/components/layout";
import { ProductDetailClient } from "@/components/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  // Try to find by slug first, then by ID
  let product = await getProductBySlug(id);
  if (!product) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      product = await getProductById(numericId);
    }
  }

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
      description: product.description,
      type: "website",
      url: `/products/${product.slug}`,
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
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Try to find by slug first, then by ID
  let product = await getProductBySlug(id);
  if (!product) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      product = await getProductById(numericId);
    }
  }

  if (!product) {
    notFound();
  }

  // Get current user ID for review like functionality
  const currentUserId = await getCurrentUserId();

  // Get related products (same category, excluding current)
  const category = product.product_categories[0]?.category || "";
  const relatedProducts = category
    ? await getRelatedProducts(product.id, category, 4)
    : [];

  return (
    <>
      <MobileHeader title="Product Detail" showBack backHref="/products" />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        currentUserId={currentUserId}
      />
    </>
  );
}
