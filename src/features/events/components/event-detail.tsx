"use client";

import { MobileHeaderContainer } from "@/features/layout";
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
  Timer,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { EventDetailProps } from "../types";
import { formatEventDate, formatEventTime } from "../types";

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
          <div className="grid gap-0 lg:grid-cols-3 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-0 aspect-square w-full overflow-hidden lg:mb-4 lg:aspect-video lg:rounded-2xl">
                <OptimizedImage
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
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
                    <Badge className="bg-primary text-white">{level}</Badge>
                  )}
                  {availableSeats && availableSeats <= 5 && (
                    <Badge
                      variant="secondary"
                      className="text-foreground bg-white/90"
                    >
                      Only {availableSeats} spots left
                    </Badge>
                  )}
                </div>
              </div>

              <div className="px-4 pt-8 lg:px-0 lg:pt-0">
                {/* Event Header & Price */}
                <div className="mb-8 border-b border-neutral-100 pb-6 dark:border-neutral-800">
                  <div className="mb-3">
                    <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                      <Sparkles className="h-3 w-3" />
                      Upcoming Session
                    </span>
                  </div>

                  <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-5xl dark:text-white">
                    {title}
                  </h1>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                        Per Seat
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-neutral-100 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-600 uppercase dark:bg-neutral-800 dark:text-neutral-400"
                      >
                        {level}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Event Quick Info */}
                <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-6 border-b border-neutral-100 pb-6 sm:grid-cols-4 dark:border-neutral-800">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Date
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Time
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {formattedTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Timer className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Duration
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Availability
                      </p>
                      <p className="text-sm font-semibold tracking-tight text-emerald-600 uppercase">
                        {availableSeats} spots
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location & Instructor */}
                <div className="mb-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          Location
                        </p>
                        <p className="text-sm leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
                          {location}
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-400">
                          {fullLocation}
                        </p>
                      </div>
                    </div>
                  )}
                  {instructor && (
                    <div className="flex items-start gap-3">
                      <User className="mt-1 h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          Instructor
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {instructor}
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-400">
                          Lead Facilitator
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    About this workshop
                  </h2>
                  <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {description}
                  </p>
                </div>

                {/* What's Included */}
                {includes && includes.length > 0 && (
                  <div className="mb-10">
                    <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                      What&apos;s included
                    </h2>
                    <div className="shadow-soft rounded-2xl border border-neutral-50 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                      <ul className="grid gap-4 sm:grid-cols-2">
                        {includes.map((item, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="shadow-soft sticky top-24 rounded-2xl border border-neutral-50 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h2 className="mb-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Reserve Your Spot
                </h2>

                <div className="mb-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                      Workshop
                    </span>
                    <span className="text-right font-bold text-neutral-900 dark:text-neutral-100">
                      {title}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                      Date
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                      Time
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">
                      {formattedTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                      Duration
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">
                      {duration}
                    </span>
                  </div>
                  {availableSeats && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                        Availability
                      </span>
                      <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
                        {availableSeats} seats left
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-border my-6 border-t" />

                <div className="mb-8 flex items-baseline justify-between">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    Total
                  </span>
                  <span className="text-primary text-2xl font-black">
                    ₹{price.toLocaleString()}
                  </span>
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    className={cn(
                      "h-14 w-full rounded-2xl text-base font-bold shadow-lg transition-all",
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
                      <ArrowRight className="ml-2 h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Other Events */}
          {otherEvents.length > 0 && (
            <div className="mt-16 border-t border-neutral-100 px-4 pt-12 lg:mt-24 lg:px-0 lg:pt-16 dark:border-neutral-800">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl dark:text-white">
                Other workshops you might like
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {otherEvents.map((otherEvent) => {
                  const otherFormattedDate = formatEventDate(
                    otherEvent.starts_at,
                  );
                  const otherImageUrl = otherEvent.image || "/placeholder.jpg";

                  return (
                    <Link
                      key={otherEvent.id}
                      href={`/events/upcoming/${otherEvent.slug}`}
                      className="group flex flex-col gap-4"
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
                        <h3 className="line-clamp-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
                          {otherEvent.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-neutral-500">
                            {otherFormattedDate}
                          </p>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">
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
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
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
                <span className="ml-2 font-semibold">₹{price.toFixed(2)}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
