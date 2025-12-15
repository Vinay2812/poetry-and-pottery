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
    <div className="shadow-soft rounded-2xl bg-white p-4">
      <div className="flex gap-4">
        <Link
          href={`/products/${product.id}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl"
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
                <h3 className="hover:text-primary font-semibold">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm">{product.vendor}</p>
            </div>
            <button
              onClick={onRemove}
              className="text-muted-foreground hover:text-foreground"
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
