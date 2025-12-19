"use client";

import { useAuthAction, useEventRegistration } from "@/hooks";
import type { EventWithDetails, EventWithRegistrationCount } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Share2,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { MobileHeader } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// Helper function to calculate duration from DateTime objects
function calculateDuration(startsAt: Date, endsAt: Date): string {
  const diffMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}hr`;
  return `${hours}hr ${minutes}min`;
}

interface EventDetailClientProps {
  event: EventWithDetails;
  otherEvents: EventWithRegistrationCount[];
}

export function EventDetailClient({
  event,
  otherEvents,
}: EventDetailClientProps) {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  const { requireAuth } = useAuthAction();
  const { registerForEvent, isLoading } = useEventRegistration();

  const loading = isLoading(event.id);
  const soldOut = event.available_seats === 0;

  const handleReserveSeat = useCallback(() => {
    requireAuth(async () => {
      const result = await registerForEvent(event.id, 1);
      if (result.success) {
        setRegistered(true);
        setTimeout(() => {
          router.push("/events/registrations");
        }, 2000);
      }
    });
  }, [requireAuth, registerForEvent, event.id, router]);

  // Format date and time from DateTime
  const eventDate = new Date(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const duration = calculateDuration(event.starts_at, event.ends_at);
  const imageUrl = event.image || "/placeholder.jpg";

  return (
    <>
      <MobileHeader
        title="Event Details"
        showBack
        backHref="/events/upcoming"
      />

      <main className="pt-14 pb-40 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-6">
            <Link
              href="/events/upcoming"
              className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Upcoming Session
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl lg:rounded-3xl">
                <Image
                  src={imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Share Button */}
                <button
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Share event"
                >
                  <Share2 className="text-foreground h-5 w-5" />
                </button>

                {/* Badges on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {event.level && (
                    <Badge className="bg-primary text-white">
                      {event.level}
                    </Badge>
                  )}
                  {event.available_seats && event.available_seats <= 5 && (
                    <Badge
                      variant="secondary"
                      className="text-foreground bg-white/90"
                    >
                      Only {event.available_seats} spots left
                    </Badge>
                  )}
                </div>
              </div>

              {/* Event Title & Price */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl font-bold lg:text-3xl">
                    {event.title}
                  </h1>
                  <span className="text-primary shrink-0 text-2xl font-bold lg:text-3xl">
                    ₹{event.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Event Info - Compact Layout */}
              <div className="shadow-soft mb-6 divide-y rounded-xl bg-white">
                {/* Date & Time Row */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <Calendar className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{formattedDate}</p>
                      <p className="text-muted-foreground text-xs">
                        {formattedTime} • {duration}
                      </p>
                    </div>
                  </div>
                  {event.available_seats !== undefined && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        event.available_seats <= 5
                          ? "bg-orange-100 text-orange-700"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <Users className="mr-1 h-3 w-3" />
                      {event.available_seats} spots
                    </Badge>
                  )}
                </div>

                {/* Location Row */}
                {event.location && (
                  <div className="flex items-center gap-3 p-4">
                    <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <MapPin className="text-primary h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {event.location}
                      </p>
                      <p className="text-muted-foreground text-xs">Location</p>
                    </div>
                  </div>
                )}

                {/* Instructor Row */}
                {event.instructor && (
                  <div className="flex items-center gap-3 p-4">
                    <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <User className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {event.instructor}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Instructor
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="mb-3 text-lg font-semibold">
                  About this workshop
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* What's Included */}
              {event.includes && event.includes.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold">
                    What&apos;s included
                  </h2>
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <ul className="space-y-3">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            <Check className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Other Events */}
              {otherEvents.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-lg font-semibold">
                    Other workshops you might like
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {otherEvents.map((otherEvent) => {
                      const otherEventDate = new Date(otherEvent.starts_at);
                      const otherFormattedDate =
                        otherEventDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      const otherFormattedTime =
                        otherEventDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        });
                      const otherImageUrl =
                        otherEvent.image || "/placeholder.jpg";

                      return (
                        <Link
                          key={otherEvent.id}
                          href={`/events/upcoming/${otherEvent.slug}`}
                          className="group shadow-soft hover:shadow-card rounded-2xl bg-white p-4 transition-all"
                        >
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                              <Image
                                src={otherImageUrl}
                                alt={otherEvent.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-1 line-clamp-1 text-sm font-semibold">
                                {otherEvent.title}
                              </h3>
                              <p className="text-muted-foreground mb-2 text-xs">
                                {otherFormattedDate} • {otherFormattedTime}
                              </p>
                              <span className="text-primary text-sm font-semibold">
                                ₹{otherEvent.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">
                  Reserve Your Spot
                </h2>

                <div className="mb-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Workshop</span>
                    <span className="text-right font-medium">
                      {event.title}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span>{formattedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{duration}</span>
                  </div>
                  {event.available_seats && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Availability
                      </span>
                      <span className="text-primary">
                        {event.available_seats} spots left
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-border my-4 border-t" />

                <div className="mb-6 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-primary text-xl font-bold">
                    ₹{event.price.toFixed(2)}
                  </span>
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    className={cn(
                      "h-12 w-full rounded-xl transition-all",
                      registered && "bg-green-600 hover:bg-green-700",
                    )}
                    size="lg"
                    disabled={soldOut || loading || registered}
                    onClick={handleReserveSeat}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : registered ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </motion.div>
                    ) : null}
                    {soldOut
                      ? "Sold Out"
                      : registered
                        ? "Registered!"
                        : "Reserve Seat"}
                    {!loading && !registered && !soldOut && (
                      <ArrowRight className="ml-2 h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            className={cn(
              "h-12 w-full rounded-xl transition-all",
              registered && "bg-green-600 hover:bg-green-700",
            )}
            size="lg"
            disabled={soldOut || loading || registered}
            onClick={handleReserveSeat}
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : registered ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mr-2"
              >
                <CheckCircle className="h-5 w-5" />
              </motion.div>
            ) : null}
            {soldOut ? "Sold Out" : registered ? "Registered!" : "Reserve Seat"}
            {!loading && !registered && !soldOut && (
              <>
                <span className="ml-2 font-semibold">
                  ₹{event.price.toFixed(2)}
                </span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
