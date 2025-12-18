"use client";

import type { EventWithDetails, EventWithRegistrationCount } from "@/types";
import {
  Calendar,
  CheckCircle,
  Clock,
  History,
  Images,
  MapPin,
  Share2,
  Star,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { ReviewCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { ReviewsSheet } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
}

export function PastWorkshopDetailClient({
  workshop,
  upcomingEvents,
}: PastWorkshopDetailClientProps) {
  // Format date from DateTime
  const workshopDate = new Date(workshop.ends_at);
  const formattedDate = workshopDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const duration = calculateDuration(workshop.starts_at, workshop.ends_at);
  const imageUrl = workshop.image || "/placeholder.jpg";
  const attendees = workshop._count?.event_registrations || 0;
  const highlights = workshop.highlights || [];

  // Format reviews for the ReviewCard and ReviewsSheet components
  const formattedReviews = useMemo(() => {
    return (workshop.reviews || []).map((review) => ({
      id: String(review.id),
      author: review.user?.name || "Anonymous",
      avatar: review.user?.image || "",
      rating: review.rating,
      content: review.review || "",
      date: new Date(review.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      likes: review.likes?.length || 0,
      images: [],
    }));
  }, [workshop.reviews]);

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

                {/* Badges on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <Badge className="text-foreground bg-white/90 backdrop-blur-sm">
                    <CheckCircle className="text-primary mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                  {highlights.length > 0 && (
                    <Badge className="text-foreground flex items-center gap-1 bg-white/90 backdrop-blur-sm">
                      <Images className="h-3 w-3" />
                      {highlights.length} highlights
                    </Badge>
                  )}
                </div>
              </div>

              {/* Workshop Title */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl font-bold lg:text-3xl">
                    {workshop.title}
                  </h1>
                  {formattedReviews && formattedReviews.length > 0 && (
                    <div className="flex shrink-0 items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ({formattedReviews.length})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Workshop Info Cards */}
              <div className="mb-6 grid grid-cols-3 gap-3">
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
                  <p className="text-muted-foreground text-xs">Duration</p>
                  <p className="text-sm font-semibold">{duration}</p>
                </div>
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Users className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Attendees</p>
                  <p className="text-primary text-sm font-semibold">
                    {attendees} participated
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
                            <CheckCircle className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

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
                        images={review.images}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
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
