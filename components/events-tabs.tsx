"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface EventsTabsProps {
  registeredCount?: number;
}

export function EventsTabs({ registeredCount = 0 }: EventsTabsProps) {
  const pathname = usePathname();

  const isUpcoming =
    pathname === "/events/upcoming" || pathname.startsWith("/events/upcoming/");
  const isRegistered =
    pathname === "/events/registrations" ||
    pathname.startsWith("/events/registrations/");
  const isPast =
    pathname === "/events/past" || pathname.startsWith("/events/past/");

  return (
    <div className="mb-6 flex gap-2">
      <Link
        href="/events/registrations"
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4",
          isRegistered
            ? "bg-primary text-primary-foreground"
            : "border-border text-foreground hover:bg-muted border bg-white",
        )}
      >
        <span className="hidden sm:inline">My Registrations</span>
        <span className="sm:hidden">Registered</span>
        {registeredCount > 0 && (
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs",
              isRegistered ? "text-primary bg-white" : "bg-primary text-white",
            )}
          >
            {registeredCount}
          </span>
        )}
      </Link>
      <Link
        href="/events/upcoming"
        className={cn(
          "rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4",
          isUpcoming
            ? "bg-primary text-primary-foreground"
            : "border-border text-foreground hover:bg-muted border bg-white",
        )}
      >
        <span className="hidden sm:inline">Upcoming Sessions</span>
        <span className="sm:hidden">Upcoming</span>
      </Link>
      <Link
        href="/events/past"
        className={cn(
          "rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4",
          isPast
            ? "bg-primary text-primary-foreground"
            : "border-border text-foreground hover:bg-muted border bg-white",
        )}
      >
        <span className="hidden sm:inline">Past Workshops</span>
        <span className="sm:hidden">Past</span>
      </Link>
    </div>
  );
}
