import { ProductsTableSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product catalog, inventory, and pricing.
        </p>
      </div>
      <ProductsTableSkeleton />
    </div>
  );
}
