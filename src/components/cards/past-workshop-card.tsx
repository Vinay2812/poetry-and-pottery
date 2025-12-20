import type { EventWithRegistrationCount } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Images, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

interface PastWorkshopCardProps {
  event: EventWithRegistrationCount;
}

export function PastWorkshopCard({ event }: PastWorkshopCardProps) {
  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = event.image || "/placeholder.jpg";
  const attendees = event._count?.event_registrations || 0;
  const highlights = event.highlights || [];
  const gallery = event.gallery || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link
        href={`/events/past/${event.slug}`}
        className="shadow-soft hover:shadow-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-3 transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900"
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {/* Gallery Count Badge */}
          {gallery.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge className="flex items-center gap-1 border-none bg-white/90 px-2 py-1 text-[10px] font-bold text-neutral-700 shadow-sm backdrop-blur-md dark:bg-black/80 dark:text-white">
                <Images className="h-3 w-3" />
                {gallery.length} PHOTOS
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-2 pt-3 lg:gap-3 lg:pt-4">
          <div className="flex flex-col gap-0.5 lg:gap-1">
            <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
              {event.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </div>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500 lg:text-sm dark:text-neutral-400">
            {event.description}
          </p>

          <div className="mt-auto space-y-3">
            {highlights && highlights.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {highlights.slice(0, 2).map((highlight, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-neutral-50 pt-2 lg:pt-3 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <Users className="h-3.5 w-3.5" />
                <span>{attendees} attended</span>
              </div>
              {event.averageRating && (
                <Rating
                  rating={event.averageRating}
                  reviewCount={event._count?.reviews || 0}
                  size="sm"
                  className="origin-right scale-90"
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
