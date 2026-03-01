import {
  getEventLevelOptions,
  getEventStatusOptions,
} from "@/data/admin/events/gateway/server";
import { EventFormContainer } from "@/features/dashboard/events";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Route: /dashboard/events/new
 * Page does: Admin create page for publishing a new workshop/class event.
 * Key UI operations:
 * - Fill event form details (content, schedule, seats, pricing, status/level) and save.
 * - Navigate back to events index after creation from the dashboard flow.
 * UI info needed for operations:
 * - Status and level option sets used by event form selectors.
 * - Event creation payload schema including scheduling and capacity constraints.
 */
export default async function NewEventPage() {
  const [statusOptions, levelOptions] = await Promise.all([
    Promise.resolve(getEventStatusOptions()),
    Promise.resolve(getEventLevelOptions()),
  ]);

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
          <p className="text-muted-foreground">
            Create a new workshop or class.
          </p>
        </div>
      </div>

      <EventFormContainer
        statusOptions={statusOptions}
        levelOptions={levelOptions}
      />
    </div>
  );
}
