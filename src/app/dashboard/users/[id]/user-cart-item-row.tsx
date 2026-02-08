import { PackageIcon } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import type { UserCartItem } from "./user-cart-types";

interface UserCartItemRowProps {
  item: UserCartItem;
}

export function UserCartItemRow({ item }: UserCartItemRowProps) {
  return (
    <div className="flex items-center gap-4 p-4">
      {item.product.image_urls[0] ? (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
          <OptimizedImage
            src={item.product.image_urls[0]}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
          <PackageIcon className="size-6 text-neutral-400" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${item.product.id}`}
          className="hover:text-primary font-medium"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-neutral-500">
          ₹{item.product.price.toLocaleString("en-IN")} x {item.quantity}
        </p>
        {item.product.available_quantity === 0 && (
          <Badge variant="destructive" className="mt-1">
            Out of stock
          </Badge>
        )}
      </div>
      <div className="text-right">
        <p className="font-semibold">
          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
