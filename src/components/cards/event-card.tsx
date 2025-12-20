import type { EventWithRegistrationCount } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface EventCardProps {
  event: EventWithRegistrationCount;
}

export function EventCard({ event }: EventCardProps) {
  // Format date and time from starts_at
  const eventDate = new Date(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const totalSeats = event.total_seats;
  const registrations = event._count?.event_registrations || 0;
  const isSoldOut = registrations >= totalSeats;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link
        href={`/events/upcoming/${event.slug}`}
        className="shadow-soft hover:shadow-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900"
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {event.level && (
              <Badge className="w-fit border-none bg-white/90 text-[10px] font-bold tracking-wider text-neutral-900 uppercase backdrop-blur-md dark:bg-black/90 dark:text-white">
                {event.level}
              </Badge>
            )}
            {isSoldOut && (
              <Badge
                variant="destructive"
                className="w-fit text-[10px] font-bold uppercase"
              >
                Sold Out
              </Badge>
            )}
          </div>

          <div className="absolute right-3 bottom-3">
            <div className="flex h-8 w-16 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur-md dark:bg-black/80 dark:text-white">
              ₹{event.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-5 pt-3 lg:gap-3 lg:pt-4">
          <div className="flex flex-col gap-0.5 lg:gap-1">
            <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
              {event.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
              <span className="text-neutral-300">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formattedTime}
              </span>
            </div>
          </div>

          {event.description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500 lg:text-sm dark:text-neutral-400">
              {event.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-neutral-50 pt-2 lg:pt-3 dark:border-neutral-800">
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <MapPin className="h-3.5 w-3.5 text-rose-500" />
              <span className="truncate">
                {event.location ? event.location.split(",")[0] : "TBA"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500">
              <Users className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span>
                {registrations}/{totalSeats}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
