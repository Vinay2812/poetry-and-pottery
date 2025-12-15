"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

import { PRODUCTS } from "@/lib/constants";

// Mock wishlist items (first 3 products)
const WISHLIST_ITEMS = PRODUCTS.slice(0, 3);
const RECOMMENDATIONS = PRODUCTS.slice(10, 14);

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(WISHLIST_ITEMS);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId));
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="My Wishlist" showBack backHref="/products" />

      <main className="pt-14 pb-24 md:pt-0 md:pb-0">
        <div className="container mx-auto px-4 py-6 md:px-8">
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
                <div
                  key={item.id}
                  className="shadow-soft rounded-2xl bg-white p-4"
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/products/${item.id}`}
                      className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl md:h-32 md:w-32"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="hover:text-primary mb-0.5 font-semibold">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground mb-2 text-sm">
                            {item.vendor}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-primary"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span
                            className={`text-xs font-medium ${
                              item.inStock ? "text-in-stock" : "text-low-stock"
                            }`}
                          >
                            {item.inStock
                              ? item.stockCount && item.stockCount < 5
                                ? "LOW STOCK"
                                : "IN STOCK"
                              : "OUT OF STOCK"}
                          </span>
                          <p className="mt-1 font-semibold">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full"
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-12 py-12 text-center">
              <Heart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h2 className="mb-2 text-lg font-semibold">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-4">
                Save items you love to your wishlist
              </p>
              <Link href="/products">
                <Button className="rounded-full">Start Shopping</Button>
              </Link>
            </div>
          )}

          {/* Recommendations */}
          <section>
            <h2 className="mb-4 text-lg font-semibold">You might also like</h2>
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4">
              {RECOMMENDATIONS.map((product) => (
                <div key={product.id} className="min-w-[160px] md:min-w-0">
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
