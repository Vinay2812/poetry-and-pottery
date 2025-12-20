"use client";

import { useAuthAction, useCart, useWishlist } from "@/hooks";
import type { ProductWithCategories } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingCartIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Rating } from "@/components/shared";
import { ImageCarousel } from "@/components/shared/image-carousel";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductWithCategories;
  variant?: "default" | "wishlist";
  onRemoveFromWishlist?: () => void;
  className?: string;
}

export function ProductCard({
  product,
  variant = "default",
  onRemoveFromWishlist,
  className,
}: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const category =
    product.product_categories[0]?.category || product.material || "Pottery";
  const inStock = product.available_quantity > 0;

  const { requireAuth } = useAuthAction();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  const inWishlist = isInWishlist(product.id);
  const isWishlistVariant = variant === "wishlist";

  const handleWishlistClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      requireAuth(() => toggleWishlist(product.id));
    },
    [requireAuth, toggleWishlist, product.id],
  );

  const handleAddToCart = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const success = await requireAuth(() => addToCart(product.id));
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
        if (isWishlistVariant) {
          onRemoveFromWishlist?.();
        }
      }
    },
    [
      requireAuth,
      addToCart,
      product.id,
      isWishlistVariant,
      onRemoveFromWishlist,
    ],
  );

  const handleRemoveFromWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemoveFromWishlist?.();
    },
    [onRemoveFromWishlist],
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, type: "spring", bounce: 0 }}
      className={cn("group relative", className)}
    >
      <div className="group shadow-soft hover:shadow-card relative flex flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Card Content */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Image Container */}
          <div className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <ImageCarousel
              images={product.image_urls}
              alt={product.name}
              onImageClick={() => router.push(`/products/${product.slug}`)}
              className="w-full"
              dotsClassName="bottom-16 lg:bottom-3 lg:group-hover:bottom-16"
            />

            {/* Out of stock overlay */}
            {!inStock && (
              <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-black/60">
                <span className="rounded-full bg-neutral-900/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-white dark:bg-white/90 dark:text-neutral-900">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Floating Actions */}
            <div className="absolute top-3 right-3 z-20">
              {!isWishlistVariant ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                    inWishlist
                      ? "bg-red-500/90 text-white shadow-lg shadow-red-500/20"
                      : "bg-white/70 text-neutral-700 shadow-sm hover:bg-white dark:bg-black/40 dark:text-white dark:hover:bg-black/60",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlistClick(e);
                  }}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-transform",
                      inWishlist ? "fill-current" : "",
                    )}
                  />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-500 shadow-sm backdrop-blur-md transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-black/50 dark:text-neutral-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFromWishlist(e);
                  }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>

            {/* Add to Cart Button */}
            <AnimatePresence>
              {inStock && (
                <div className="absolute right-3 bottom-3 left-3 z-20 transform transition-all duration-300 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <motion.button
                    initial={false}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(e);
                    }}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-md transition-all duration-300",
                      addedToCart
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/90 text-neutral-900 hover:bg-white dark:bg-neutral-900/90 dark:text-white dark:hover:bg-neutral-900",
                    )}
                  >
                    {addedToCart ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ShoppingCartIcon className="h-4 w-4" />
                    )}
                    <span>{addedToCart ? "Added" : "Add to Cart"}</span>
                  </motion.button>
                </div>
              )}
            </AnimatePresence>

            {/* Mobile Cart Button - Always visible on mobile if needed, but the above is responsive now.
                 Wait, the above translates Y on Desktop. On mobile, we might want it always visible or icon only?
                 The previous design had an icon button on mobile. 
                 Let's keep the button visible on mobile but icon-only or smaller if space is tight.
                 Actually, the previous design used a separate mobile/desktop button. 
                 Let's unify but handle the visibility.
                 
                 Mobile behavior: Button always visible at bottom right? 
                 Or maybe just show the button at the bottom of the card content?
                 
                 Let's make the "Add to Cart" button standard below the image for better mobile UX?
                 No, overlying on image is more premium.
                 On Mobile (touch), hover doesn't exist. So opacity logic needs to be careful.
                 Let's make it always visible on mobile/touch devices (using media query or just always visible for now since we can't easily detect touch here without hooks).
                 Better: Use `lg:translate-y-4 lg:opacity-0` for desktop hover effect, but on mobile (`< lg`) make it normal.
                 Wait, the classes I added: `lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100`.
                 This means on mobile it will be visible (default). But wait, `translate-y-4` is not applied on mobile? 
                 Classes are `transition-all ...`. If I don't set base opacity/transform for mobile, it defaults to visible and 0 transform? Yes.
                 So on mobile, it will be visible. Perfect.
             */}
          </div>

          {/* Product Details */}
          <Link
            href={`/products/${product.slug}`}
            className="flex flex-col gap-1 p-5 lg:gap-1.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
                  {product.name}
                </h3>
                <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs dark:text-neutral-400">
                  {category}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-sm font-bold text-neutral-900 lg:text-base dark:text-neutral-100">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.averageRating &&
                  product._count?.reviews &&
                  product._count.reviews > 0 && (
                    <Rating
                      rating={product.averageRating}
                      reviewCount={product._count.reviews}
                      size="sm"
                      className="origin-right scale-90"
                    />
                  )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
