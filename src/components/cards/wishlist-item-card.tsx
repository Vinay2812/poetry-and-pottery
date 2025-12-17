import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Product } from "@/lib/constants";

interface WishlistItemCardProps {
  product: Product;
  onRemove: () => void;
  onAddToCart?: () => void;
}

export function WishlistItemCard({
  product,
  onRemove,
  onAddToCart,
}: WishlistItemCardProps) {
  const stockStatus = product.inStock
    ? product.stockCount && product.stockCount < 5
      ? "LOW STOCK"
      : "IN STOCK"
    : "OUT OF STOCK";

  const stockColor = product.inStock ? "text-in-stock" : "text-low-stock";

  return (
    <div className="shadow-soft hover:shadow-card rounded-2xl bg-white p-4 transition-shadow duration-200">
      <div className="flex gap-4">
        <Link
          href={`/products/${product.id}`}
          className="focus-visible:ring-primary/30 relative h-24 w-24 shrink-0 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none lg:h-32 lg:w-32"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3 className="hover:text-primary mb-0.5 font-semibold transition-colors duration-150">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground mb-2 text-sm">
                {product.vendor}
              </p>
            </div>
            <button
              onClick={onRemove}
              className="text-primary hover:bg-primary/10 focus-visible:ring-primary/30 rounded-full p-1 transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Heart className="h-5 w-5 fill-current" />
            </button>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className={`text-xs font-medium ${stockColor}`}>
                {stockStatus}
              </span>
              <p className="mt-1 font-semibold">₹{product.price.toFixed(2)}</p>
            </div>
            <Button
              size="sm"
              className="rounded-full"
              disabled={!product.inStock}
              onClick={onAddToCart}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
