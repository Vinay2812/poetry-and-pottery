import { UsersTableSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          View and manage user accounts and permissions.
        </p>
      </div>
      <UsersTableSkeleton />
    </div>
  );
}
