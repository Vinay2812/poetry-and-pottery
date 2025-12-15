"use client";

import { Heart } from "lucide-react";
import { useCallback, useState } from "react";

import { WishlistItemCard } from "@/components/cards";
import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/sections";

import { PRODUCTS } from "@/lib/constants";

const WISHLIST_ITEMS = PRODUCTS.slice(0, 3);
const RECOMMENDATIONS = PRODUCTS.slice(10, 14);

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(WISHLIST_ITEMS);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId));
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="My Wishlist" showBack backHref="/products" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {wishlistItems.length} Items saved
            </p>
            <button className="text-primary text-sm font-medium">
              Edit List
            </button>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <div className="mb-12 space-y-4">
              {wishlistItems.map((item) => (
                <WishlistItemCard
                  key={item.id}
                  product={item}
                  onRemove={() => removeFromWishlist(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="mb-12">
              <EmptyState
                icon={Heart}
                title="Your wishlist is empty"
                description="Save items you love to your wishlist"
                actionText="Start Shopping"
                actionHref="/products"
              />
            </div>
          )}

          {/* Recommendations */}
          <section>
            <h2 className="mb-4 text-lg font-semibold">You might also like</h2>
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4">
              {RECOMMENDATIONS.map((product) => (
                <div key={product.id} className="min-w-[160px] lg:min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
