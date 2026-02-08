import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DailyWorkshopRescheduleNotFound() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-primary-lighter mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <Search className="text-primary h-10 w-10" />
          </div>

          <h1 className="mb-2 text-2xl font-bold">Reschedule not available</h1>
          <p className="text-muted-foreground mb-8 max-w-md text-sm">
            This registration is not eligible for rescheduling.
          </p>

          <Link href="/events/registrations">
            <Button>Back to My Registrations</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
