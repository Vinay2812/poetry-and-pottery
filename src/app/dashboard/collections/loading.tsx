import { CollectionsTableSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Collections</h1>
        <p className="text-muted-foreground">
          Manage product collections for seasonal or limited editions.
        </p>
      </div>
      <CollectionsTableSkeleton />
    </div>
  );
}
