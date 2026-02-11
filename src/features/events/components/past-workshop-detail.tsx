"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  CheckCircle2,
  ChevronRight,
  MapPin,
  Mic,
  Palette,
  Share2,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import type { PastWorkshopDetailProps } from "../types";
import { EventIncludes } from "./event-includes";
import { EventInstructor } from "./event-instructor";
import { EventLineup } from "./event-lineup";
import { PastWorkshopGallery } from "./past-workshop-gallery";
import { PastWorkshopHighlights } from "./past-workshop-highlights";
import { PastWorkshopReviewsSection } from "./past-workshop-reviews-section";
import { PastWorkshopSidebar } from "./past-workshop-sidebar";

export function PastWorkshopDetail({
  viewModel,
  upcomingEvents,
  selectedImageIndex,
  onOpenGallery,
  onCloseGallery,
  onReviewLike,
  onLikeUpdate,
}: PastWorkshopDetailProps) {
  const {
    title,
    description,
    level,
    imageUrl,
    includes,
    performers,
    lineupNotes,
    highlights,
    gallery,
    quickInfo,
    reviews,
    averageRating,
    isWorkshop,
    isOpenMic,
  } = viewModel;

  return (
    <>
      <MobileHeaderContainer
        title={isOpenMic ? "Past Open Mic" : "Past Workshop"}
        showBack
        backHref="/events/past"
      />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
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
          <div className="relative aspect-4/5 w-full overflow-hidden lg:aspect-21/9 lg:rounded-2xl">
            <OptimizedImage
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            <button
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Share workshop"
            >
              <Share2 className="text-foreground h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <Badge className="border-none bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Completed
              </Badge>
              {level && isWorkshop && (
                <Badge className="border-none bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-900">
                  {level}
                </Badge>
              )}
            </div>
          </div>

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
                <h1 className="font-display mb-2 text-2xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                  {title}
                </h1>

                {/* Inline Metadata */}
                <p className="mb-6 text-sm text-neutral-500 lg:text-base">
                  {quickInfo.formattedDate} · {quickInfo.formattedTime} ·{" "}
                  {quickInfo.duration}
                  {quickInfo.location && ` · ${quickInfo.location}`}
                  {` · ${quickInfo.attendees} attended`}
                </p>

                {/* About */}
                <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                  <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    About
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
                    {description}
                  </p>
                </div>

                {/* Instructor - Workshop Only */}
                {quickInfo.instructor && isWorkshop && (
                  <EventInstructor
                    instructor={quickInfo.instructor}
                    title="Instructor"
                  />
                )}

                {/* Performers - Open Mic Only */}
                {isOpenMic && performers && performers.length > 0 && (
                  <EventLineup
                    performers={performers}
                    lineupNotes={lineupNotes}
                    title="Lineup"
                  />
                )}

                {/* Location */}
                {quickInfo.location && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Location
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <MapPin className="h-5 w-5 text-neutral-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {quickInfo.location}
                        </p>
                        {quickInfo.fullLocation && (
                          <p className="text-xs text-neutral-500">
                            {quickInfo.fullLocation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* What was covered */}
                {includes && includes.length > 0 && (
                  <EventIncludes includes={includes} title="What was covered" />
                )}

                {/* Highlights */}
                {highlights.length > 0 && (
                  <PastWorkshopHighlights highlights={highlights} />
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                  <PastWorkshopGallery
                    gallery={gallery}
                    selectedImageIndex={selectedImageIndex}
                    onOpenGallery={onOpenGallery}
                    onCloseGallery={onCloseGallery}
                  />
                )}

                {/* Reviews */}
                {reviews.length > 0 && (
                  <PastWorkshopReviewsSection
                    reviews={reviews}
                    averageRating={averageRating}
                    onReviewLike={onReviewLike}
                    onLikeUpdate={onLikeUpdate}
                  />
                )}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <PastWorkshopSidebar
              isOpenMic={isOpenMic}
              attendees={quickInfo.attendees}
              reviews={reviews}
              averageRating={averageRating}
              upcomingEvents={upcomingEvents}
            />
          </div>
        </div>
      </main>
    </>
  );
}
