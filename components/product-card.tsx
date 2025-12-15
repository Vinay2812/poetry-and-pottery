"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { Product } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative">
        {/* Image */}
        <div
          className={cn(
            "bg-muted relative overflow-hidden rounded-xl lg:rounded-2xl",
            variant === "default" ? "aspect-square" : "aspect-[4/3]",
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Wishlist button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-white lg:top-3 lg:right-3"
          onClick={(e) => {
            e.preventDefault();
            // Toggle wishlist
          }}
        >
          <Heart className="text-muted-foreground h-4 w-4" />
        </Button>
      </div>

      {/* Info */}
      <div className="mt-2 space-y-0.5 lg:mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm leading-tight font-medium">
            {product.name}
          </h3>
          <span className="text-primary flex-shrink-0 text-sm font-semibold">
            ₹{product.price}
          </span>
        </div>
        <p className="text-muted-foreground text-xs">{product.vendor}</p>
      </div>
    </Link>
  );
}
