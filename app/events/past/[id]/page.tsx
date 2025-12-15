"use client";

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
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { ReviewCard } from "@/components/review-card";
import { ReviewsSheet } from "@/components/reviews-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { EVENTS, PAST_WORKSHOPS } from "@/lib/constants";

export default function PastWorkshopDetailPage() {
  const params = useParams();
  const workshop =
    PAST_WORKSHOPS.find((w) => w.id === params.id) || PAST_WORKSHOPS[0];

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!workshop.reviews || workshop.reviews.length === 0) return 0;
    const total = workshop.reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / workshop.reviews.length;
  }, [workshop.reviews]);

  // Get upcoming events for recommendations
  const upcomingEvents = EVENTS.slice(0, 2);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
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
                  src={workshop.image}
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
                  {workshop.galleryImages &&
                    workshop.galleryImages.length > 0 && (
                      <Badge className="text-foreground flex items-center gap-1 bg-white/90 backdrop-blur-sm">
                        <Images className="h-3 w-3" />
                        {workshop.galleryImages.length} photos
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
                  {workshop.reviews && workshop.reviews.length > 0 && (
                    <div className="flex shrink-0 items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ({workshop.reviews.length})
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
                  <p className="text-sm font-semibold">{workshop.date}</p>
                </div>
                {workshop.duration && (
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                    <p className="text-muted-foreground text-xs">Duration</p>
                    <p className="text-sm font-semibold">{workshop.duration}</p>
                  </div>
                )}
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Users className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Attendees</p>
                  <p className="text-primary text-sm font-semibold">
                    {workshop.attendees} participated
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
              {workshop.highlights && workshop.highlights.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold">
                    What was covered
                  </h2>
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <ul className="space-y-3">
                      {workshop.highlights.map((highlight, index) => (
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

              {/* Gallery */}
              {workshop.galleryImages && workshop.galleryImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-lg font-semibold">Gallery</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {workshop.galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-xl"
                      >
                        <Image
                          src={image}
                          alt={`${workshop.title} gallery ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {workshop.reviews && workshop.reviews.length > 0 && (
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
                          ({workshop.reviews.length})
                        </span>
                      </div>
                    </div>
                    {workshop.reviews.length > 2 && (
                      <ReviewsSheet
                        reviews={workshop.reviews}
                        averageRating={averageRating}
                        totalReviews={workshop.reviews.length}
                      >
                        <button className="text-primary text-sm hover:underline">
                          View All →
                        </button>
                      </ReviewsSheet>
                    )}
                  </div>
                  <div className="space-y-3">
                    {workshop.reviews.slice(0, 2).map((review) => (
                      <ReviewCard
                        key={review.id}
                        author={review.author}
                        avatar={review.avatar}
                        rating={review.rating}
                        content={review.content}
                        date={review.date}
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
                    {upcomingEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/upcoming/${event.id}`}
                        className="group border-border hover:border-primary/30 block rounded-xl border bg-white p-3 transition-all"
                      >
                        <div className="flex gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={event.image}
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
                              {event.date} • {event.time}
                            </p>
                            <p className="text-primary text-sm font-semibold">
                              ₹{event.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </Link>
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
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
