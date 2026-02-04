import { DashboardFormSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">New Option</h1>
        <p className="text-muted-foreground">
          Create a new customization option.
        </p>
      </div>
      <DashboardFormSkeleton />
    </div>
  );
}
