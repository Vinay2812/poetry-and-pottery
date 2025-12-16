"use client";

import { Heart, ShoppingCartIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { MobileHeader } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { Rating } from "@/components/rating";
import { ReviewCard } from "@/components/review-card";
import { ReviewsSheet } from "@/components/reviews-sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { PRODUCTS } from "@/lib/constants";
import {
  calculateAverageRating,
  getProductReviews,
} from "@/lib/product-reviews";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];
  const [selectedGlaze, setSelectedGlaze] = useState(
    product.glazeOptions?.[0]?.name || "",
  );

  // Load merged reviews (base + user-submitted) using useMemo
  const reviews = useMemo(() => {
    if (typeof window === "undefined") return [];
    return getProductReviews(product.id);
  }, [product.id]);

  const averageRating =
    reviews.length > 0 ? calculateAverageRating(reviews) : product.rating;
  const totalReviews =
    reviews.length > 0 ? reviews.length : product.reviewCount;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const images = product.images || [product.image];

  return (
    <>
      <MobileHeader title="Product Detail" showBack backHref="/products" />

      <main className="pt-14 pb-40 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <ProductImageGallery images={images} productName={product.name} />

            {/* Product Info */}
            <div className="min-w-0">
              <h1 className="mb-2 text-2xl font-semibold lg:text-3xl">
                {product.name}
                {selectedGlaze && ` - ${selectedGlaze}`}
              </h1>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ₹{product.price.toFixed(2)}
                </span>
                <Rating rating={averageRating} reviewCount={totalReviews} />
              </div>

              {/* Stock Status */}
              {product.stockCount !== undefined &&
                product.stockCount <= 5 &&
                product.stockCount > 0 && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <span className="bg-in-stock h-2 w-2 rounded-full"></span>
                      <span className="text-primary font-medium">
                        ONLY {product.stockCount} PIECES LEFT
                      </span>
                    </span>
                  </div>
                )}

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Glaze Selector */}
              {product.glazeOptions && product.glazeOptions.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Select Glaze</span>
                    <span className="text-muted-foreground text-sm">
                      {selectedGlaze}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {product.glazeOptions.map((glaze) => (
                      <button
                        key={glaze.name}
                        onClick={() => setSelectedGlaze(glaze.name)}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                        )}
                        style={{
                          backgroundColor: glaze.color,
                          outlineColor:
                            selectedGlaze === glaze.name
                              ? glaze.color
                              : "transparent",
                          outlineWidth:
                            selectedGlaze === glaze.name ? "2px" : "0px",
                          outlineStyle:
                            selectedGlaze === glaze.name ? "solid" : "none",
                        }}
                        title={glaze.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Preview */}
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">Recent Reviews</h3>
                  <ReviewsSheet
                    reviews={reviews}
                    averageRating={averageRating}
                    totalReviews={totalReviews}
                  >
                    <button className="text-primary text-sm hover:underline">
                      View All →
                    </button>
                  </ReviewsSheet>
                </div>
                <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                  {reviews.slice(0, 2).map((review) => (
                    <ReviewCard
                      key={review.id}
                      author={review.author}
                      avatar={review.avatar}
                      rating={review.rating}
                      content={review.content}
                      date={review.date}
                      likes={review.likes}
                      images={review.images}
                      isCompact
                    />
                  ))}
                </div>
              </div>

              {/* Accordion sections */}
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="materials">
                  <AccordionTrigger>Materials & Care</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                      <li>
                        Made from high-quality {product.material || "Stoneware"}
                      </li>
                      <li>Dishwasher and microwave safe</li>
                      <li>Hand wash recommended for longevity</li>
                      <li>Avoid sudden temperature changes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                      <li>Free shipping on orders over ₹75</li>
                      <li>Standard delivery 5-7 business days</li>
                      <li>Express delivery 2-3 business days</li>
                      <li>30-day return policy for unused items</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Desktop Add to Cart */}
              <div className="hidden gap-3 lg:flex">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button className="h-12 flex-1 rounded-xl" size="lg">
                  <ShoppingCartIcon className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-xl font-semibold">
                You might also like
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-xl"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button className="h-12 flex-1 rounded-xl">
            <ShoppingCartIcon className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
