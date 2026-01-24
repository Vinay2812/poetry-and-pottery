"use client";

import type { EventBase } from "@/data/events/types";
import { MobileHeaderContainer } from "@/features/layout";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Share2,
  Star,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

import { ReviewCard } from "@/components/cards";
import {
  ImageCarousel,
  OptimizedImage,
  ReviewsSheet,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import type {
  FormattedReview,
  PastWorkshopDetailProps,
  PastWorkshopDetailViewModel,
} from "../types";
import { formatEventDate } from "../types";

const MAX_VISIBLE_IMAGES = 4;

interface GalleryGridProps {
  gallery: string[];
  onOpenGallery: (index: number) => void;
}

function GalleryGrid({ gallery, onOpenGallery }: GalleryGridProps) {
  const remainingImages = gallery.length - MAX_VISIBLE_IMAGES;

  return (
    <div className="grid grid-cols-2 gap-3">
      {gallery.slice(0, MAX_VISIBLE_IMAGES).map((image, index) => {
        const isLastVisible =
          index === MAX_VISIBLE_IMAGES - 1 && remainingImages > 0;

        return (
          <button
            key={index}
            onClick={() => onOpenGallery(index)}
            className="group focus:ring-primary relative aspect-square overflow-hidden rounded-xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <OptimizedImage
              src={image}
              alt={`Workshop gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

            {isLastVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-2xl font-bold text-white">
                  +{remainingImages}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface ReviewsSectionProps {
  reviews: FormattedReview[];
  averageRating: number;
  currentUserId?: number | null;
  onReviewLike: (reviewId: string) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

function ReviewsSection({
  reviews,
  averageRating,
  currentUserId,
  onReviewLike,
  onLikeUpdate,
}: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
            Reviews
          </h2>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-neutral-500">({reviews.length})</span>
          </div>
        </div>
        {reviews.length > 2 && (
          <ReviewsSheet
            reviews={reviews}
            averageRating={averageRating}
            totalReviews={reviews.length}
            currentUserId={currentUserId}
            onLikeUpdate={onLikeUpdate}
          >
            <button className="text-primary text-sm hover:underline">
              View All →
            </button>
          </ReviewsSheet>
        )}
      </div>
      <div className="space-y-3">
        {reviews.slice(0, 2).map((review) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            avatar={review.avatar}
            rating={review.rating}
            content={review.content}
            date={review.date}
            likes={review.likes}
            isLiked={review.isLikedByCurrentUser}
            isOwnReview={
              currentUserId != null && review.authorId === currentUserId
            }
            images={review.images}
            onLike={() => onReviewLike(review.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface UpcomingEventCardProps {
  event: EventBase;
}

function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const formattedDate = formatEventDate(event.starts_at);
  const imageUrl = event.image || "/placeholder.jpg";

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex gap-3 py-2 transition-colors"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        <OptimizedImage
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {event.title}
        </h4>
        <p className="text-xs text-neutral-500">{formattedDate}</p>
      </div>
      <span className="text-primary shrink-0 text-sm font-semibold">
        ₹{event.price.toLocaleString()}
      </span>
    </Link>
  );
}

interface DesktopSidebarProps {
  viewModel: PastWorkshopDetailViewModel;
  upcomingEvents: EventBase[];
}

function DesktopSidebar({ viewModel, upcomingEvents }: DesktopSidebarProps) {
  const { quickInfo, reviews, averageRating } = viewModel;

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        {/* Completed Status */}
        <div className="mb-4 flex items-center gap-2 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-semibold">Workshop Completed</span>
        </div>

        {/* Summary */}
        <div className="mb-5 space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Attendees</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {quickInfo.attendees}
            </span>
          </div>
          {reviews.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-5 border-t border-neutral-100 dark:border-neutral-800" />

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-4 space-y-1">
            {upcomingEvents.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <Link href="/events/upcoming">
          <Button className="h-12 w-full rounded-xl text-sm font-bold">
            View Upcoming →
          </Button>
        </Link>
      </div>
    </div>
  );
}

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
    highlights,
    gallery,
    quickInfo,
    reviews,
    averageRating,
  } = viewModel;

  return (
    <>
      <MobileHeaderContainer
        title="Past Workshop"
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
              {level && (
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
                  <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                    About
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
                    {description}
                  </p>
                </div>

                {/* Instructor */}
                {quickInfo.instructor && (
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
                          {quickInfo.instructor}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Lead Facilitator
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {quickInfo.location && (
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
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      What was covered
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

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      Highlights
                    </h2>
                    <ul className="space-y-3">
                      {highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <div className="mb-3 flex items-center gap-2">
                      <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                        Gallery
                      </h2>
                      <span className="text-xs text-neutral-400">
                        ({gallery.length} photos)
                      </span>
                    </div>
                    <GalleryGrid
                      gallery={gallery}
                      onOpenGallery={onOpenGallery}
                    />
                  </div>
                )}

                {/* Gallery Lightbox */}
                <Dialog
                  open={selectedImageIndex !== null}
                  onOpenChange={(open) => !open && onCloseGallery()}
                >
                  <DialogContent
                    className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0"
                    showCloseButton={false}
                  >
                    <div className="flex flex-col p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <DialogTitle className="text-base font-medium">
                          Gallery
                        </DialogTitle>
                        <DialogClose className="text-muted-foreground hover:text-foreground rounded-sm transition-colors">
                          <X className="h-5 w-5" />
                          <span className="sr-only">Close</span>
                        </DialogClose>
                      </div>

                      <div className="relative">
                        <ImageCarousel
                          images={gallery}
                          alt="Workshop gallery image"
                          startIndex={selectedImageIndex ?? 0}
                          imageClassName="object-contain"
                          showDots={false}
                          showCounter={true}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Reviews */}
                {reviews.length > 0 && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <ReviewsSection
                      reviews={reviews}
                      averageRating={averageRating}
                      onReviewLike={onReviewLike}
                      onLikeUpdate={onLikeUpdate}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <DesktopSidebar
              viewModel={viewModel}
              upcomingEvents={upcomingEvents}
            />
          </div>
        </div>
      </main>
    </>
  );
}
