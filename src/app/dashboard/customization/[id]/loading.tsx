import { DashboardFormSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Option</h1>
        <p className="text-muted-foreground">
          Update customization option details.
        </p>
      </div>
      <DashboardFormSkeleton />
    </div>
  );
}
