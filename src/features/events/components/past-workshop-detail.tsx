"use client";

import { MobileHeaderContainer } from "@/features/layout";
import type { EventWithRegistrationCount } from "@/types";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  History,
  MapPin,
  Share2,
  Star,
  Timer,
  User,
  Users,
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
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Participant Reviews</h2>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length})</span>
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
  event: EventWithRegistrationCount;
}

function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const eventDate = new Date(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const imageUrl = event.image || "/placeholder.jpg";

  return (
    <Link
      href={`/events/upcoming/${event.slug}`}
      className="group border-border hover:border-primary/30 block rounded-xl border bg-white p-3 transition-all"
    >
      <div className="flex gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <OptimizedImage
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 line-clamp-1 text-sm font-medium">
            {event.title}
          </h4>
          <p className="text-muted-foreground text-xs">
            {formattedDate} • {formattedTime}
          </p>
          <p className="text-primary text-sm font-semibold">
            ₹{event.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface DesktopSidebarProps {
  viewModel: PastWorkshopDetailViewModel;
  upcomingEvents: EventWithRegistrationCount[];
}

function DesktopSidebar({ viewModel, upcomingEvents }: DesktopSidebarProps) {
  const { quickInfo, reviews, averageRating } = viewModel;

  return (
    <div className="hidden lg:block">
      <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span className="font-medium text-emerald-700">
            Workshop Completed
          </span>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Attendees</span>
            <span className="font-medium">{quickInfo.attendees}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span>{quickInfo.formattedDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span>{quickInfo.duration}</span>
          </div>
          {reviews.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({reviews.length})
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="border-border my-4 border-t" />

        <h3 className="mb-2 font-semibold">Interested in similar workshops?</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Check out our upcoming pottery sessions and reserve your spot!
        </p>

        {upcomingEvents.length > 0 && (
          <div className="mb-4 space-y-3">
            {upcomingEvents.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <Link href="/events/upcoming">
          <Button className="h-12 w-full rounded-xl" size="lg">
            View All Workshops
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
    price,
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

                <button
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Share workshop"
                >
                  <Share2 className="text-foreground h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <Badge className="border-none bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                  {level && (
                    <Badge className="border-none bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-neutral-900 uppercase shadow-lg backdrop-blur-md">
                      {level}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="px-4 pt-8 lg:px-0 lg:pt-0">
                {/* Workshop Header & Price */}
                <div className="mb-8 border-b border-neutral-100 pb-6 dark:border-neutral-800">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                      <History className="h-3 w-3" />
                      Past Workshop
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
                        Original Price
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 items-center justify-center rounded-full bg-neutral-100 px-4 text-[10px] font-bold tracking-widest text-neutral-500 uppercase dark:bg-neutral-800">
                        {quickInfo.attendees} Participants
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workshop Quick Info */}
                <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-neutral-100 py-6 sm:grid-cols-4 dark:border-neutral-800">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Date
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {quickInfo.formattedDate}
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
                        {quickInfo.formattedTime}
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
                        {quickInfo.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Price
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        ₹{price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location & Instructor */}
                <div className="mb-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {quickInfo.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          Location
                        </p>
                        <p className="text-sm leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
                          {quickInfo.location}
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-400">
                          {quickInfo.fullLocation}
                        </p>
                      </div>
                    </div>
                  )}
                  {quickInfo.instructor && (
                    <div className="flex items-start gap-3">
                      <User className="mt-1 h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          Instructor
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {quickInfo.instructor}
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-400">
                          Lead Facilitator
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description & Covered */}
                <div className="mb-10 grid gap-10 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      About this workshop
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {description}
                    </p>
                  </div>
                  {includes && includes.length > 0 && (
                    <div>
                      <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                        What was covered
                      </h2>
                      <ul className="grid gap-3">
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

                {/* Workshop Highlights */}
                {highlights.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 text-lg font-semibold">
                      Workshop Highlights
                    </h2>
                    <div className="shadow-soft rounded-xl bg-white p-4">
                      <ul className="space-y-3">
                        {highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                              <Star className="text-primary h-4 w-4" />
                            </div>
                            <span className="text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Gallery Section */}
                {gallery.length > 0 && (
                  <div className="mb-8">
                    <div className="mb-4 flex items-center gap-2">
                      <h2 className="text-lg font-semibold">Gallery</h2>
                      <span className="text-muted-foreground text-sm">
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

                {/* Reviews Section */}
                <ReviewsSection
                  reviews={reviews}
                  averageRating={averageRating}
                  onReviewLike={onReviewLike}
                  onLikeUpdate={onLikeUpdate}
                />
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
