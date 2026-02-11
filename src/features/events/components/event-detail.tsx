"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  Bookmark,
  ChevronRight,
  MapPin,
  Mic,
  Palette,
  Share2,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { EventDetailProps } from "../types";
import { EventHeroImage } from "./event-hero-image";
import { EventIncludes } from "./event-includes";
import { EventInstructor } from "./event-instructor";
import { EventLineup } from "./event-lineup";
import { EventMetadata } from "./event-metadata";
import { EventMobileCTA } from "./event-mobile-cta";
import { EventReserveSidebar } from "./event-reserve-sidebar";
import { OtherEventsList } from "./other-events-list";

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
    performers,
    lineupNotes,
    quickInfo,
    soldOut,
    isLoading,
    registered,
    isWorkshop,
    isOpenMic,
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
          {/* Mobile Breadcrumbs */}
          <nav className="flex items-center gap-1.5 px-4 py-3 text-xs lg:hidden">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            <Link
              href="/events"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Events
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-foreground line-clamp-1 font-medium">
              {title}
            </span>
          </nav>

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

          <EventHeroImage
            id={viewModel.id}
            imageUrl={imageUrl}
            title={title}
            level={level}
            isWorkshop={isWorkshop}
            availableSeats={availableSeats}
            soldOut={soldOut}
          />

          {/* Content Grid: 3fr 1fr */}
          <div className="mt-0 grid gap-0 lg:mt-8 lg:grid-cols-[3fr_1fr] lg:gap-8">
            {/* Main Content */}
            <div>
              <div className="px-4 pt-6 lg:px-0 lg:pt-0">
                {/* Event Type Badge */}
                <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold lg:text-sm">
                  {isOpenMic ? (
                    <Mic className="h-3.5 w-3.5" />
                  ) : (
                    <Palette className="h-3.5 w-3.5" />
                  )}
                  <span>{isOpenMic ? "Open Mic" : "Workshop"}</span>
                </div>

                {/* Title */}
                <h1 className="font-display mb-4 text-2xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                  {title}
                </h1>

                <EventMetadata
                  formattedDate={formattedDate}
                  formattedTime={formattedTime}
                  duration={duration}
                  location={location}
                  fullLocation={fullLocation}
                  availableSeats={availableSeats}
                />

                {/* Share & Save Buttons */}
                <div className="mb-6 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-lg px-4"
                    onClick={onShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-lg px-4"
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>

                {/* About This Event */}
                <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                  <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                    {isOpenMic ? "About This Event" : "About This Workshop"}
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
                    {description}
                  </p>
                </div>

                {instructor && isWorkshop && (
                  <EventInstructor instructor={instructor} />
                )}

                {isOpenMic && performers && performers.length > 0 && (
                  <EventLineup
                    performers={performers}
                    lineupNotes={lineupNotes}
                  />
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

                {includes && includes.length > 0 && (
                  <EventIncludes includes={includes} />
                )}
              </div>
            </div>

            <EventReserveSidebar
              price={price}
              availableSeats={availableSeats}
              soldOut={soldOut}
              isLoading={isLoading}
              registered={registered}
              isOpenMic={isOpenMic}
              onReserveSeat={onReserveSeat}
            />
          </div>

          <OtherEventsList events={otherEvents} />
        </div>
      </main>

      <EventMobileCTA
        price={price}
        soldOut={soldOut}
        isLoading={isLoading}
        registered={registered}
        isOpenMic={isOpenMic}
        onReserveSeat={onReserveSeat}
      />
    </>
  );
}
