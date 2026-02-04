import { DashboardFormSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground">
          Update customization category details.
        </p>
      </div>
      <DashboardFormSkeleton />
    </div>
  );
}
