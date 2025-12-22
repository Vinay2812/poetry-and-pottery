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

import { MAX_CART_QUANTITY } from "@/lib/constants";

interface CartItemCardProps {
  product: ProductWithCategories;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  isLoading?: boolean;
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  isLoading = false,
}: CartItemCardProps) {
  const imageUrl = product.image_urls[0] || "/placeholder.jpg";
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";

  const quantityOptions = Array.from(
    { length: MAX_CART_QUANTITY },
    (_, i) => i + 1,
  );
  const itemTotal = product.price * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group shadow-soft relative overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-3 transition-all duration-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      {/* Mobile Layout */}
      <div className="flex gap-4 lg:hidden">
        <Link
          href={`/products/${product.slug}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/products/${product.slug}`}>
                <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {category}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-red-500 dark:text-neutral-500 dark:hover:bg-neutral-800"
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

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-900 dark:text-white">
              ₹{itemTotal.toLocaleString()}
            </span>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => onQuantityChange(parseInt(value, 10))}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-[4.5rem] rounded-full text-xs font-medium">
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
          className="focus-visible:ring-primary/30 relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
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
