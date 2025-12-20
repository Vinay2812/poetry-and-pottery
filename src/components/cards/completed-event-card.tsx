"use client";

import type { RegistrationWithReviewStatus } from "@/actions";
import { createEventReview } from "@/actions";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ReviewForm } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { Separator } from "../ui/separator";

interface CompletedEventCardProps {
  registration: RegistrationWithReviewStatus;
}

export function CompletedEventCard({ registration }: CompletedEventCardProps) {
  const { event, hasReviewed } = registration;
  const router = useRouter();

  // Format date and time
  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const imageUrl = event.image || "/placeholder.jpg";

  const handleReviewSubmit = useCallback(
    async (rating: number, review?: string) => {
      const result = await createEventReview({
        eventId: event.id,
        rating,
        review,
      });

      if (result.success) {
        router.refresh();
      }

      return {
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    },
    [event.id, router],
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group shadow-soft hover:shadow-card relative flex flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-3 transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <Link
        href={`/events/past/${event.slug}`}
        className="flex flex-col gap-3 lg:gap-4"
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          {/* Completed Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="flex items-center gap-1 border-none bg-emerald-500/90 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
              <CheckCircle2 className="h-3 w-3" />
              COMPLETED
            </Badge>
          </div>

          <div className="absolute right-3 bottom-3">
            <div className="flex h-8 w-16 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur-md dark:bg-black/80 dark:text-white">
              ₹{registration.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-2 pt-1 pb-0 lg:gap-3 lg:pt-2">
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

          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500 lg:text-sm dark:text-neutral-400">
            {event.description}
          </p>

          <div className="flex items-center justify-between border-t border-neutral-50 pt-2 lg:pt-3 dark:border-neutral-800">
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <MapPin className="h-3.5 w-3.5 text-rose-500" />
              <span className="truncate">
                {event.location ? event.location.split(",")[0] : "TBA"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500">
              <Ticket className="text-primary h-3.5 w-3.5" strokeWidth={2.5} />
              <span>
                {registration.seats_reserved} Seat
                {registration.seats_reserved > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className={cn("pt-2", hasReviewed && "px-2")}>
        <div className="border-t border-neutral-100 pt-2 dark:border-neutral-800">
          <ReviewForm
            title={`Review ${event.title}`}
            hasReviewed={hasReviewed}
            onSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </motion.div>
  );
}
