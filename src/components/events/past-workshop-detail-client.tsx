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
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ReviewCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { ReviewsSheet } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >({});

  const { requireAuth } = useAuthAction();

  // Track carousel slide changes
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

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

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-6">
            <Link
              href="/events/past"
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              <History className="h-4 w-4" />
              Past Workshop
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl lg:rounded-3xl">
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
                  <Badge className="flex items-center gap-1 bg-emerald-500 text-white">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                  {workshop.level && (
                    <Badge
                      variant="secondary"
                      className="text-foreground bg-white/90"
                    >
                      {workshop.level}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Workshop Title */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold lg:text-3xl">
                  {workshop.title}
                </h1>
              </div>

              {/* Event Summary Card */}
              <div className="bg-primary-light mb-6 rounded-2xl p-4">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span className="font-semibold">Event Summary</span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground text-xs">Attendees</p>
                    <p className="font-semibold">{attendees} participants</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Level</p>
                    <p className="font-semibold capitalize">
                      {workshop.level || "All Levels"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Status</p>
                    <p className="text-primary-active font-semibold">
                      Completed
                    </p>
                  </div>
                </div>
              </div>

              {/* Workshop Info Cards */}
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Calendar className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Date</p>
                  <p className="text-sm font-semibold">{formattedDate}</p>
                </div>
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Time</p>
                  <p className="text-sm font-semibold">{formattedTime}</p>
                </div>
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Duration</p>
                  <p className="text-sm font-semibold">{duration}</p>
                </div>
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <IndianRupee className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Price</p>
                  <p className="text-primary text-sm font-semibold">
                    ₹{workshop.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Location */}
              {workshop.location && (
                <div className="shadow-soft mb-6 rounded-xl bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Location</p>
                      <p className="font-semibold">{workshop.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructor */}
              {workshop.instructor && (
                <div className="shadow-soft mb-6 rounded-xl bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <User className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Instructor
                      </p>
                      <p className="font-semibold">{workshop.instructor}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h2 className="mb-3 text-lg font-semibold">
                  About this workshop
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {workshop.description}
                </p>
              </div>

              {/* Highlights / What was covered */}
              {workshop.includes && workshop.includes.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold">
                    What was covered
                  </h2>
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <ul className="space-y-3">
                      {workshop.includes.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            <Check className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

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
                    {gallery.slice(0, maxVisibleImages).map((image, index) => {
                      const isLastVisible =
                        index === maxVisibleImages - 1 && remainingImages > 0;

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
                    <Carousel
                      className="w-full"
                      opts={{ startIndex: selectedImageIndex ?? 0, loop: true }}
                      setApi={setCarouselApi}
                    >
                      <CarouselContent>
                        {gallery.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="bg-muted relative aspect-square max-h-[60vh] w-full overflow-hidden rounded-lg">
                              <Image
                                src={image}
                                alt={`Workshop gallery image ${index + 1}`}
                                fill
                                className="object-contain"
                                priority
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {gallery.length > 1 && (
                        <>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </>
                      )}
                    </Carousel>

                    {/* Counter */}
                    {gallery.length > 1 && (
                      <div className="text-muted-foreground mt-4 text-center text-sm">
                        {currentSlide + 1} / {gallery.length}
                      </div>
                    )}
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
