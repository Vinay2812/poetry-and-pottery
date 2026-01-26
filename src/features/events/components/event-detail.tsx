"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronRight,
  Loader2,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { EventDetailProps } from "../types";
import { formatEventDate } from "../types";

export function EventDetail({
  viewModel,
  otherEvents,
  onReserveSeat,
  onShare,
}: EventDetailProps) {
  const {
    title,
    description,
    price,
    level,
    imageUrl,
    includes,
    quickInfo,
    soldOut,
    isLoading,
    registered,
  } = viewModel;

  const {
    formattedDate,
    formattedTime,
    duration,
    availableSeats,
    location,
    fullLocation,
    instructor,
  } = quickInfo;

  return (
    <>
      <MobileHeaderContainer
        title="Event Details"
        showBack
        backHref="/events/upcoming"
      />

      <main className="pt-14 pb-40 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-0 py-0 lg:px-8 lg:py-12">
          {/* Desktop Breadcrumbs */}
          <nav className="mb-6 hidden items-center gap-2 text-sm lg:flex">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
            <Link
              href="/events"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Events
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
            <span className="text-foreground font-medium">{title}</span>
          </nav>

          {/* Hero Image */}
          <div
            className="relative aspect-4/5 w-full overflow-hidden lg:aspect-21/9 lg:rounded-2xl"
            style={{ viewTransitionName: `event-image-${viewModel.id}` }}
          >
            <OptimizedImage
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Share Button */}
            <button
              onClick={onShare}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Share event"
            >
              <Share2 className="text-foreground h-5 w-5" />
            </button>

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {level && (
                <Badge className="bg-primary rounded-lg px-3 py-1.5 text-xs font-semibold text-white">
                  {level}
                </Badge>
              )}
              {availableSeats && availableSeats <= 5 && (
                <Badge
                  variant="secondary"
                  className="text-foreground rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold"
                >
                  Only {availableSeats} spots left
                </Badge>
              )}
            </div>
          </div>

          {/* Content Grid: 3fr 1fr */}
          <div className="mt-0 grid gap-0 lg:mt-8 lg:grid-cols-[3fr_1fr] lg:gap-8">
            {/* Main Content */}
            <div>
              <div className="px-4 pt-6 lg:px-0 lg:pt-0">
                {/* Title */}
                <h1 className="font-display mb-2 text-2xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                  {title}
                </h1>

                {/* Inline Metadata */}
                <p className="mb-6 text-sm text-neutral-500 lg:text-base">
                  {formattedDate} · {formattedTime} · {duration}
                  {location && ` · ${location}`}
                  {availableSeats && ` · ${availableSeats} spots left`}
                </p>

                {/* About */}
                <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                  <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                    About
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
                    {description}
                  </p>
                </div>

                {/* Instructor */}
                {instructor && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      Instructor
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <User className="h-5 w-5 text-neutral-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {instructor}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Lead Facilitator
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {location && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      Location
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <MapPin className="h-5 w-5 text-neutral-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {location}
                        </p>
                        {fullLocation && (
                          <p className="text-xs text-neutral-500">
                            {fullLocation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* What's Included */}
                {includes && includes.length > 0 && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      What&apos;s included
                    </h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                            <Check className="h-3 w-3 text-emerald-500" />
                          </div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Sidebar - Minimal */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="text-primary mb-1 text-2xl font-extrabold">
                  ₹{price.toLocaleString()}
                </div>
                <p className="mb-5 text-xs text-neutral-500">per seat</p>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    className={cn(
                      "h-12 w-full rounded-xl text-sm font-bold transition-all",
                      registered && "bg-green-600 hover:bg-green-700",
                    )}
                    size="lg"
                    disabled={soldOut || isLoading || registered}
                    onClick={onReserveSeat}
                  >
                    {isLoading ? (
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
                    {!isLoading && !registered && !soldOut && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </motion.div>

                {availableSeats && !soldOut && !registered && (
                  <p className="mt-3 text-center text-xs font-semibold text-emerald-600">
                    ✓ {availableSeats} seats available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Other Events */}
          {otherEvents.length > 0 && (
            <div className="mt-12 border-t border-neutral-100 px-4 pt-10 lg:mt-16 lg:px-0 lg:pt-12 dark:border-neutral-800">
              <h2 className="font-display mb-6 text-xl font-bold tracking-tight text-neutral-900 lg:text-2xl dark:text-white">
                Other workshops you might like
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
                {otherEvents.map((otherEvent) => {
                  const otherFormattedDate = formatEventDate(
                    otherEvent.starts_at,
                  );
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
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed right-0 bottom-16 left-0 z-40 bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            className={cn(
              "h-12 w-full rounded-xl transition-all",
              registered && "bg-green-600 hover:bg-green-700",
            )}
            size="lg"
            disabled={soldOut || isLoading || registered}
            onClick={onReserveSeat}
          >
            {isLoading ? (
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
            {!isLoading && !registered && !soldOut && (
              <>
                <span className="ml-1 text-sm font-normal opacity-90">
                  · ₹{price.toLocaleString()}
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
