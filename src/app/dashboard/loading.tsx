import { DashboardSectionSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-12">
      <DashboardSectionSkeleton />
      <DashboardSectionSkeleton />
      <div className="grid gap-12 lg:grid-cols-2">
        <DashboardSectionSkeleton />
        <DashboardSectionSkeleton />
      </div>
      <div className="grid gap-12 lg:grid-cols-2">
        <DashboardSectionSkeleton />
        <DashboardSectionSkeleton />
      </div>
      <DashboardSectionSkeleton />
      <DashboardSectionSkeleton />
    </div>
  );
}
