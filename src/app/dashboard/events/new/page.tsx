import {
  getEventLevelOptions,
  getEventStatusOptions,
} from "@/data/admin/events/gateway/server";
import { EventFormContainer } from "@/features/dashboard/events";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
