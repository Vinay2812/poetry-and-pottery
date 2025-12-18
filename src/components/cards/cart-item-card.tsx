"use client";

import type { ProductWithCategories } from "@/types";
import { motion } from "framer-motion";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItemCardProps {
  product: ProductWithCategories;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  isLoading?: boolean;
  maxQuantity?: number;
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  isLoading = false,
  maxQuantity = 5,
}: CartItemCardProps) {
  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";

  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);
  const itemTotal = product.price * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="shadow-soft hover:shadow-card rounded-2xl bg-white p-3 transition-shadow duration-200 lg:p-4"
    >
      {/* Mobile Layout */}
      <div className="flex gap-3 lg:hidden">
        <Link
          href={`/products/${product.slug}`}
          className="focus-visible:ring-primary/30 relative h-20 w-20 shrink-0 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/products/${product.slug}`}>
                <h3 className="hover:text-primary truncate text-sm font-medium transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-xs">{category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-red-400 hover:bg-red-50 hover:text-red-500"
              onClick={onRemove}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-sm font-semibold">
              ₹{itemTotal.toLocaleString()}
            </span>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => onQuantityChange(parseInt(value, 10))}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-16 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {quantityOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden gap-4 lg:flex">
        <Link
          href={`/products/${product.slug}`}
          className="focus-visible:ring-primary/30 relative h-24 w-24 shrink-0 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>

        <div className="flex flex-1 items-center justify-between">
          <div className="min-w-0 flex-1">
            <Link href={`/products/${product.slug}`}>
              <h3 className="hover:text-primary font-semibold transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">{category}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              ₹{product.price.toLocaleString()} each
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Select
              value={quantity.toString()}
              onValueChange={(value) => onQuantityChange(parseInt(value, 10))}
              disabled={isLoading}
            >
              <SelectTrigger className="h-9 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {quantityOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="w-24 text-right font-semibold">
              ₹{itemTotal.toLocaleString()}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-red-400 hover:bg-red-50 hover:text-red-500"
              onClick={onRemove}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
