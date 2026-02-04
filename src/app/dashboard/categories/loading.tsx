import { CategoriesTableSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage product categories and their icons.
        </p>
      </div>
      <CategoriesTableSkeleton />
    </div>
  );
}
