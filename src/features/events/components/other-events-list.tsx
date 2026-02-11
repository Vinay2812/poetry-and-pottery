import type { EventBase } from "@/data/events/types";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";

import { formatEventDate } from "../types";

interface OtherEventsListProps {
  events: EventBase[];
}

export function OtherEventsList({ events }: OtherEventsListProps) {
  if (events.length === 0) return null;

  return (
    <div className="mt-12 border-t border-neutral-100 px-4 pt-10 lg:mt-16 lg:px-0 lg:pt-12 dark:border-neutral-800">
      <h2 className="font-display mb-6 text-xl font-bold tracking-tight text-neutral-900 lg:text-2xl dark:text-white">
        Other events you might like
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {events.map((otherEvent) => {
          const otherFormattedDate = formatEventDate(otherEvent.starts_at);
          const otherImageUrl = otherEvent.image || "/placeholder.jpg";

          return (
            <Link
              key={otherEvent.id}
              href={`/events/${otherEvent.id}`}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100">
                <OptimizedImage
                  src={otherImageUrl}
                  alt={otherEvent.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 px-1">
                <h3 className="font-display line-clamp-1 text-sm font-bold text-neutral-900 lg:text-base dark:text-neutral-100">
                  {otherEvent.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-neutral-500">
                    {otherFormattedDate}
                  </p>
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    ₹{otherEvent.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
