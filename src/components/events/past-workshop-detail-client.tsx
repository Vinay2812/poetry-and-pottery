"use client";

import { toggleReviewLike } from "@/actions";
import { useAuthAction } from "@/hooks";
import type { EventWithDetails, EventWithRegistrationCount } from "@/types";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  History,
  IndianRupee,
  MapPin,
  Share2,
  Star,
  Timer,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ReviewCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { ReviewsSheet } from "@/components/shared";
import { ImageCarousel } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarouselApi } from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// Helper function to calculate duration from DateTime objects
function calculateDuration(startsAt: Date, endsAt: Date): string {
  const diffMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}hr`;
  return `${hours}hr ${minutes}min`;
}

interface PastWorkshopDetailClientProps {
  workshop: EventWithDetails;
  upcomingEvents: EventWithRegistrationCount[];
  currentUserId?: number | null;
}

export function PastWorkshopDetailClient({
  workshop,
  upcomingEvents,
  currentUserId,
}: PastWorkshopDetailClientProps) {
  // Format date and time from DateTime
  const workshopDate = new Date(workshop.starts_at);
  const formattedDate = workshopDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = workshopDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const duration = calculateDuration(workshop.starts_at, workshop.ends_at);
  const imageUrl = workshop.image || "/placeholder.jpg";
  const attendees = workshop._count?.event_registrations || 0;
  const highlights = workshop.highlights || [];
  const gallery = workshop.gallery || [];
  const maxVisibleImages = 4;
  const remainingImages = gallery.length - maxVisibleImages;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >({});

  const { requireAuth } = useAuthAction();

  const handleOpenGallery = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleLikeUpdate = useCallback(
    (reviewId: string, likes: number, isLiked: boolean) => {
      setReviewLikeUpdates((prev) => ({
        ...prev,
        [reviewId]: { likes, isLiked },
      }));
    },
    [],
  );

  const handleReviewLike = useCallback(
    async (reviewId: string, currentLikes: number, currentIsLiked: boolean) => {
      // Optimistically update UI
      const newIsLiked = !currentIsLiked;
      const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;
      handleLikeUpdate(reviewId, newLikes, newIsLiked);

      // Call server action
      const result = await toggleReviewLike(Number(reviewId));

      if (!result.success) {
        // Revert on failure
        handleLikeUpdate(reviewId, currentLikes, currentIsLiked);
      } else if (result.likesCount !== undefined) {
        // Sync with server count
        handleLikeUpdate(reviewId, result.likesCount, newIsLiked);
      }
    },
    [handleLikeUpdate],
  );

  // Format reviews for the ReviewCard and ReviewsSheet components
  const formattedReviews = useMemo(() => {
    return (workshop.reviews || []).map((review) => {
      const reviewId = String(review.id);
      const likeUpdate = reviewLikeUpdates[reviewId];
      const baseLikes = review.likes?.length || 0;
      const baseIsLiked = currentUserId
        ? (review.likes?.some((like) => like.user_id === currentUserId) ??
          false)
        : false;

      return {
        id: reviewId,
        authorId: review.user_id,
        author: review.user?.name || "Anonymous",
        avatar: review.user?.image || "",
        rating: review.rating,
        content: review.review || "",
        date: new Date(review.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        likes: likeUpdate?.likes ?? baseLikes,
        isLikedByCurrentUser: likeUpdate?.isLiked ?? baseIsLiked,
        images: [] as string[],
      };
    });
  }, [workshop.reviews, currentUserId, reviewLikeUpdates]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!formattedReviews || formattedReviews.length === 0) return 0;
    const total = formattedReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / formattedReviews.length;
  }, [formattedReviews]);

  return (
    <>
      <MobileHeader title="Past Workshop" showBack backHref="/events/past" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-0 py-0 lg:px-8 lg:py-12">
          <div className="grid gap-0 lg:grid-cols-3 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-0 aspect-square w-full overflow-hidden lg:mb-4 lg:aspect-video lg:rounded-2xl">
                <Image
                  src={imageUrl}
                  alt={workshop.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Share Button */}
                <button
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Share workshop"
                >
                  <Share2 className="text-foreground h-5 w-5" />
                </button>

                {/* Status Badge on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <Badge className="border-none bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                  {workshop.level && (
                    <Badge className="border-none bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-neutral-900 uppercase shadow-lg backdrop-blur-md">
                      {workshop.level}
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
                    {workshop.title}
                  </h1>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                        ₹{workshop.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                        Original Price
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 items-center justify-center rounded-full bg-neutral-100 px-4 text-[10px] font-bold tracking-widest text-neutral-500 uppercase dark:bg-neutral-800">
                        {attendees} Participants
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
                        Price
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        ₹{workshop.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location & Instructor */}
                <div className="mb-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {workshop.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          Location
                        </p>
                        <p className="text-sm leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
                          {workshop.location}
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-400">
                          {workshop.full_location}
                        </p>
                      </div>
                    </div>
                  )}
                  {workshop.instructor && (
                    <div className="flex items-start gap-3">
                      <User className="mt-1 h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          Instructor
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {workshop.instructor}
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
                      {workshop.description}
                    </p>
                  </div>
                  {workshop.includes && workshop.includes.length > 0 && (
                    <div>
                      <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                        What was covered
                      </h2>
                      <ul className="grid gap-3">
                        {workshop.includes.map((highlight, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                              <Check className="h-3 w-3 text-emerald-500" />
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {highlight}
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
                    <div className="grid grid-cols-2 gap-3">
                      {gallery
                        .slice(0, maxVisibleImages)
                        .map((image, index) => {
                          const isLastVisible =
                            index === maxVisibleImages - 1 &&
                            remainingImages > 0;

                          return (
                            <button
                              key={index}
                              onClick={() => handleOpenGallery(index)}
                              className="group focus:ring-primary relative aspect-square overflow-hidden rounded-xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
                            >
                              <Image
                                src={image}
                                alt={`Workshop gallery image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

                              {/* Show +X overlay on last visible image */}
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
                  </div>
                )}

                {/* Gallery Lightbox with Carousel */}
                <Dialog
                  open={selectedImageIndex !== null}
                  onOpenChange={(open) => !open && handleCloseGallery()}
                >
                  <DialogContent
                    className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0"
                    showCloseButton={false}
                  >
                    <div className="flex flex-col p-4">
                      {/* Header with close button */}
                      <div className="mb-4 flex items-center justify-between">
                        <DialogTitle className="text-base font-medium">
                          Gallery
                        </DialogTitle>
                        <DialogClose className="text-muted-foreground hover:text-foreground rounded-sm transition-colors">
                          <X className="h-5 w-5" />
                          <span className="sr-only">Close</span>
                        </DialogClose>
                      </div>

                      {/* Carousel */}
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
                {formattedReviews && formattedReviews.length > 0 && (
                  <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">
                          Participant Reviews
                        </h2>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {averageRating.toFixed(1)}
                          </span>
                          <span className="text-muted-foreground">
                            ({formattedReviews.length})
                          </span>
                        </div>
                      </div>
                      {formattedReviews.length > 2 && (
                        <ReviewsSheet
                          reviews={formattedReviews}
                          averageRating={averageRating}
                          totalReviews={formattedReviews.length}
                          currentUserId={currentUserId}
                          onLikeUpdate={handleLikeUpdate}
                        >
                          <button className="text-primary text-sm hover:underline">
                            View All →
                          </button>
                        </ReviewsSheet>
                      )}
                    </div>
                    <div className="space-y-3">
                      {formattedReviews.slice(0, 2).map((review) => (
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
                            currentUserId != null &&
                            review.authorId === currentUserId
                          }
                          images={review.images}
                          onLike={() =>
                            requireAuth(() =>
                              handleReviewLike(
                                review.id,
                                review.likes,
                                review.isLikedByCurrentUser,
                              ),
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Sidebar */}
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
                    <span className="font-medium">{attendees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{duration}</span>
                  </div>
                  {formattedReviews.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {averageRating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({formattedReviews.length})
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-border my-4 border-t" />

                <h3 className="mb-2 font-semibold">
                  Interested in similar workshops?
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Check out our upcoming pottery sessions and reserve your spot!
                </p>

                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                  <div className="mb-4 space-y-3">
                    {upcomingEvents.map((event) => {
                      const eventDate = new Date(event.starts_at);
                      const eventFormattedDate = eventDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        },
                      );
                      const eventFormattedTime = eventDate.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        },
                      );
                      const eventImageUrl = event.image || "/placeholder.jpg";

                      return (
                        <Link
                          key={event.id}
                          href={`/events/upcoming/${event.slug}`}
                          className="group border-border hover:border-primary/30 block rounded-xl border bg-white p-3 transition-all"
                        >
                          <div className="flex gap-3">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={eventImageUrl}
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
                                {eventFormattedDate} • {eventFormattedTime}
                              </p>
                              <p className="text-primary text-sm font-semibold">
                                ₹{event.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                <Link href="/events/upcoming">
                  <Button className="h-12 w-full rounded-xl" size="lg">
                    View All Workshops
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
