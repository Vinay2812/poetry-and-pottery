import { EventsTableSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Manage workshops, classes, and event registrations.
        </p>
      </div>
      <EventsTableSkeleton />
    </div>
  );
}
