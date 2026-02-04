import { DashboardCardsSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bulk Delete</h1>
        <p className="text-muted-foreground">
          Select items to delete in bulk. Products with orders will be
          deactivated, events with registrations will be cancelled.
        </p>
      </div>
      <DashboardCardsSkeleton />
    </div>
  );
}
