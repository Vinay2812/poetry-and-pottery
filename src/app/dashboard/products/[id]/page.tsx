import {
  getAllCategories,
  getProductById,
  getProductReviews,
} from "@/data/admin/products/gateway/server";
import {
  ProductFormContainer,
  ProductReviewsSection,
} from "@/features/dashboard/products";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  const [product, categories, reviewsData] = await Promise.all([
    getProductById(productId),
    getAllCategories(),
    getProductReviews(productId),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Link href="/dashboard/products" className="shrink-0">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="size-4" />
            </Button>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {product.name}
              </h1>
              <Badge variant={product.is_active ? "default" : "secondary"}>
                {product.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              ID: {product.id} · Slug: {product.slug}
            </p>
          </div>
        </div>
        <Link href={`/products/${product.id}`} target="_blank">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <ExternalLinkIcon className="mr-2 size-4" />
            View on site
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({reviewsData.total})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <ProductFormContainer product={product} categories={categories} />
        </TabsContent>

        <TabsContent value="reviews">
          <ProductReviewsSection
            productId={productId}
            reviews={reviewsData.reviews}
            total={reviewsData.total}
            averageRating={reviewsData.averageRating}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
