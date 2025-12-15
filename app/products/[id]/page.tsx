"use client";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { Rating } from "@/components/rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PRODUCTS, REVIEWS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGlaze, setSelectedGlaze] = useState(
    product.glazeOptions?.[0]?.name || "",
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const images = product.images || [product.image];

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <MobileHeader title="Product Detail" showBack backHref="/products" />

      <main className="pt-14 pb-40 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="min-w-0">
              <div className="bg-muted/30 group relative mb-4 aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Full Screen Trigger */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 opacity-100 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                      aria-label="View full screen"
                    >
                      <Maximize2 className="text-foreground h-5 w-5" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="h-full max-h-[90vh] w-full max-w-[90vw] border-none bg-black/95 p-0 sm:max-w-screen-xl">
                    <DialogTitle className="sr-only">Product Image</DialogTitle>
                    <div className="relative flex h-full w-full items-center justify-center p-4">
                      <Image
                        src={images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority
                      />
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setSelectedImage((prev) =>
                                prev === 0 ? images.length - 1 : prev - 1,
                              )
                            }
                            className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                          >
                            <ChevronLeft className="h-8 w-8" />
                          </button>
                          <button
                            onClick={() =>
                              setSelectedImage((prev) =>
                                prev === images.length - 1 ? 0 : prev + 1,
                              )
                            }
                            className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                          >
                            <ChevronRight className="h-8 w-8" />
                          </button>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Image Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1,
                        )
                      }
                      className="absolute top-1/2 left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute top-1/2 right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnail dots */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        index === selectedImage
                          ? "bg-primary"
                          : "bg-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="min-w-0">
              <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
                {product.name}
                {selectedGlaze && ` - ${selectedGlaze}`}
              </h1>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ₹{product.price.toFixed(2)}
                </span>
                <Rating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
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
                          "h-10 w-10 rounded-full border-2 transition-all",
                          selectedGlaze === glaze.name
                            ? "border-primary ring-primary/20 ring-2"
                            : "border-transparent",
                        )}
                        style={{ backgroundColor: glaze.color }}
                        title={glaze.name}
                      >
                        {selectedGlaze === glaze.name && (
                          <span className="flex h-full items-center justify-center">
                            <span className="h-3 w-3 text-white">✓</span>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Preview */}
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">Recent Reviews</h3>
                  <Link href="#reviews" className="text-primary text-sm">
                    View All →
                  </Link>
                </div>
                <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                  {REVIEWS.slice(0, 2).map((review) => (
                    <div
                      key={review.id}
                      className="border-border w-64 flex-shrink-0 rounded-xl border bg-white p-4"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.author}</p>
                          <Rating
                            rating={review.rating}
                            showCount={false}
                            size="sm"
                          />
                        </div>
                      </div>
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion sections */}
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="materials">
                  <AccordionTrigger>Materials & Care</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      Made from high-quality {product.material || "stoneware"}.
                      Dishwasher and microwave safe. Hand wash recommended for
                      longevity. Avoid sudden temperature changes.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      Free shipping on orders over ₹75. Standard delivery 5-7
                      business days. Express delivery 2-3 business days. 30-day
                      return policy for unused items.
                    </p>
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
                  <ShoppingBag className="mr-2 h-5 w-5" />
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
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
            className="h-12 w-12 flex-shrink-0 rounded-xl"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button className="h-12 flex-1 rounded-xl">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
