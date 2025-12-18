"use client";

import { useAuthAction, useCart, useWishlist } from "@/hooks";
import type { ProductWithCategories, ProductWithDetails } from "@/types";
import { motion } from "framer-motion";
import { Check, Heart, Loader2, ShoppingCartIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { ProductCard, ReviewCard } from "@/components/cards";
import { ProductImageGallery } from "@/components/products";
import { Rating, ReviewsSheet } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: ProductWithDetails;
  relatedProducts: ProductWithCategories[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.color_name || "");
  const [addedToCart, setAddedToCart] = useState(false);

  const { requireAuth } = useAuthAction();
  const { addToCart, isLoading: isCartLoading } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
    isLoading: isWishlistLoading,
  } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const cartLoading = isCartLoading(product.id);
  const wishlistLoading = isWishlistLoading(product.id);

  const handleAddToCart = useCallback(() => {
    requireAuth(async () => {
      const success = await addToCart(product.id);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    });
  }, [requireAuth, addToCart, product.id]);

  const handleToggleWishlist = useCallback(() => {
    requireAuth(() => toggleWishlist(product.id));
  }, [requireAuth, toggleWishlist, product.id]);

  // Calculate average rating from reviews
  const averageRating = useMemo(() => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / product.reviews.length;
  }, [product.reviews]);

  const totalReviews = product._count?.reviews || 0;

  // Convert reviews to the format expected by ReviewCard
  const formattedReviews = useMemo(() => {
    return (product.reviews || []).map((review) => ({
      id: String(review.id),
      author: review.user?.name || "Anonymous",
      avatar:
        review.user?.image ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: review.rating,
      content: review.review,
      date: new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      likes: review.likes?.length || 0,
      images: review.image_urls || [],
    }));
  }, [product.reviews]);

  const images = product.image_urls || [];

  return (
    <>
      <main className="pt-14 pb-40 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <ProductImageGallery images={images} productName={product.name} />

            {/* Product Info */}
            <div className="min-w-0">
              <h1 className="mb-2 text-2xl font-semibold lg:text-3xl">
                {product.name}
                {selectedColor && ` - ${selectedColor}`}
              </h1>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ₹{product.price.toFixed(2)}
                </span>
                <Rating rating={averageRating} reviewCount={totalReviews} />
              </div>

              {/* Stock Status */}
              {product.available_quantity !== undefined &&
                product.available_quantity <= 5 &&
                product.available_quantity > 0 && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <span className="bg-in-stock h-2 w-2 rounded-full"></span>
                      <span className="text-primary font-medium">
                        ONLY {product.available_quantity} PIECES LEFT
                      </span>
                    </span>
                  </div>
                )}

              {/* Out of Stock */}
              {product.available_quantity === 0 && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="font-medium text-red-600">
                      OUT OF STOCK
                    </span>
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Color Display */}
              {product.color_name && product.color_code && (
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Color</span>
                    <span className="text-muted-foreground text-sm">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedColor(product.color_name)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      )}
                      style={{
                        backgroundColor: product.color_code,
                        outlineColor:
                          selectedColor === product.color_name
                            ? product.color_code
                            : "transparent",
                        outlineWidth:
                          selectedColor === product.color_name ? "2px" : "0px",
                        outlineStyle:
                          selectedColor === product.color_name
                            ? "solid"
                            : "none",
                      }}
                      title={product.color_name}
                    />
                  </div>
                </div>
              )}

              {/* Reviews Preview */}
              {formattedReviews.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">Recent Reviews</h3>
                    <ReviewsSheet
                      reviews={formattedReviews}
                      averageRating={averageRating}
                      totalReviews={totalReviews}
                    >
                      <button className="text-primary text-sm hover:underline">
                        View All &rarr;
                      </button>
                    </ReviewsSheet>
                  </div>
                  <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                    {formattedReviews.slice(0, 2).map((review) => (
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
              )}

              {/* Accordion sections */}
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="materials">
                  <AccordionTrigger>Materials & Care</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                      <li>Made from high-quality {product.material}</li>
                      {product.instructions &&
                      product.instructions.length > 0 ? (
                        product.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))
                      ) : (
                        <>
                          <li>Dishwasher and microwave safe</li>
                          <li>Hand wash recommended for longevity</li>
                          <li>Avoid sudden temperature changes</li>
                        </>
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                      <li>Free shipping on orders over ₹2,000</li>
                      <li>Standard delivery 5-7 business days</li>
                      <li>Express delivery 2-3 business days</li>
                      <li>30-day return policy for unused items</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Desktop Add to Cart */}
              <div className="hidden gap-3 lg:flex">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-12 w-12 rounded-xl transition-colors",
                      inWishlist && "border-red-200 bg-red-50 hover:bg-red-100",
                    )}
                    onClick={handleToggleWishlist}
                    disabled={wishlistLoading}
                  >
                    {wishlistLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <motion.div
                        key={inWishlist ? "filled" : "empty"}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5",
                            inWishlist && "fill-red-500 text-red-500",
                          )}
                        />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                  <Button
                    className={cn(
                      "h-12 w-full rounded-xl transition-all",
                      addedToCart && "bg-green-600 hover:bg-green-700",
                    )}
                    size="lg"
                    disabled={product.available_quantity === 0 || cartLoading}
                    onClick={handleAddToCart}
                  >
                    {cartLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : addedToCart ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <ShoppingCartIcon className="mr-2 h-5 w-5" />
                    )}
                    {product.available_quantity === 0
                      ? "Out of Stock"
                      : addedToCart
                        ? "Added!"
                        : "Add to Cart"}
                  </Button>
                </motion.div>
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
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-12 w-12 shrink-0 rounded-xl transition-colors",
                inWishlist && "border-red-200 bg-red-50 hover:bg-red-100",
              )}
              onClick={handleToggleWishlist}
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <motion.div
                  key={inWishlist ? "filled" : "empty"}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      inWishlist && "fill-red-500 text-red-500",
                    )}
                  />
                </motion.div>
              )}
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
            <Button
              className={cn(
                "h-12 w-full rounded-xl transition-all",
                addedToCart && "bg-green-600 hover:bg-green-700",
              )}
              disabled={product.available_quantity === 0 || cartLoading}
              onClick={handleAddToCart}
            >
              {cartLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : addedToCart ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mr-2"
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : (
                <ShoppingCartIcon className="mr-2 h-5 w-5" />
              )}
              {product.available_quantity === 0
                ? "Out of Stock"
                : addedToCart
                  ? "Added!"
                  : "Add to Cart"}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
