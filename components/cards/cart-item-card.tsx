import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { QuantitySelector } from "@/components/quantity-selector";

import { Product } from "@/lib/constants";

interface CartItemCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemCard({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="shadow-soft hover:shadow-card rounded-2xl bg-white p-4 transition-shadow duration-200">
      <div className="flex gap-4">
        <Link
          href={`/products/${product.id}`}
          className="focus-visible:ring-primary/30 relative h-24 w-24 shrink-0 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3 className="hover:text-primary font-semibold transition-colors duration-150">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm">{product.vendor}</p>
            </div>
            <button
              onClick={onRemove}
              className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-primary/30 rounded-full p-1 transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold">₹{product.price.toFixed(2)}</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => onQuantityChange(quantity + 1)}
              onDecrease={() => onQuantityChange(quantity - 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
