import { ArrowRightIcon, PackageIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import type { InventoryAlertsSectionProps } from "../types";

export function InventoryAlertsSection({
  products,
}: InventoryAlertsSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PackageIcon className="text-terracotta size-5" />
          <h2 className="text-lg font-semibold">Inventory Alerts</h2>
        </div>
        <Link
          href="/dashboard/products?stock=low"
          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Manage <ArrowRightIcon className="size-3" />
        </Link>
      </div>
      {products.length === 0 ? (
        <div className="bg-primary/5 rounded-2xl py-8 text-center">
          <p className="text-primary font-medium">All products well stocked!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{product.name}</p>
                <p className="text-muted-foreground text-sm">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
              <Badge
                variant={
                  product.available_quantity === 0 ? "destructive" : "outline"
                }
              >
                {product.available_quantity === 0
                  ? "Out of stock"
                  : `${product.available_quantity} left`}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
