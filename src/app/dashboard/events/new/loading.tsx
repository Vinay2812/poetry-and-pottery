import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { DashboardFormSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Event</h1>
          <p className="text-muted-foreground">Create a new event.</p>
        </div>
      </div>
      <DashboardFormSkeleton />
    </div>
  );
}
