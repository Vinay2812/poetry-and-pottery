import type { ProductDetail as ProductDetailType } from "@/data/products/types";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface CollectionBadgeProps {
  collection: NonNullable<ProductDetailType["collection"]>;
}

export function CollectionBadge({ collection }: CollectionBadgeProps) {
  return (
    <Link
      href={`/products?collection_ids=${collection.id}`}
      className="group bg-primary-light/50 hover:bg-primary-light dark:bg-primary/10 dark:hover:bg-primary/20 mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 transition-colors"
    >
      <div className="bg-primary/10 dark:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
        <Sparkles className="text-primary h-4 w-4" />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-primary/70 text-[10px] font-medium tracking-wider uppercase">
          Part of Collection
        </span>
        <span className="text-primary text-sm font-semibold">
          {collection.name}
        </span>
      </div>
      <ChevronRight className="text-primary/50 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
