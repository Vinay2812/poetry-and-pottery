"use client";

import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Share2,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { MobileHeader } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { EVENTS } from "@/lib/constants";

export default function EventDetailPage() {
  const params = useParams();
  const event = EVENTS.find((e) => e.id === params.id) || EVENTS[0];

  // Get other events for recommendations
  const otherEvents = EVENTS.filter((e) => e.id !== event.id).slice(0, 2);

  return (
    <>
      <MobileHeader
        title="Event Details"
        showBack
        backHref="/events/upcoming"
      />

      <main className="pt-14 pb-40 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-6">
            <Link
              href="/events/upcoming"
              className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Upcoming Session
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl lg:rounded-3xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Share Button */}
                <button
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Share event"
                >
                  <Share2 className="text-foreground h-5 w-5" />
                </button>

                {/* Badges on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {event.level && (
                    <Badge className="bg-primary text-white">
                      {event.level}
                    </Badge>
                  )}
                  {event.spotsLeft && event.spotsLeft <= 5 && (
                    <Badge
                      variant="secondary"
                      className="text-foreground bg-white/90"
                    >
                      Only {event.spotsLeft} spots left
                    </Badge>
                  )}
                </div>
              </div>

              {/* Event Title & Price */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl font-bold lg:text-3xl">
                    {event.title}
                  </h1>
                  <span className="text-primary shrink-0 text-2xl font-bold lg:text-3xl">
                    ₹{event.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Event Info Cards */}
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Calendar className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Date</p>
                  <p className="text-sm font-semibold">{event.date}</p>
                </div>
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Time</p>
                  <p className="text-sm font-semibold">{event.time}</p>
                </div>
                {event.duration && (
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                    <p className="text-muted-foreground text-xs">Duration</p>
                    <p className="text-sm font-semibold">{event.duration}</p>
                  </div>
                )}
                {event.spotsLeft && (
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Availability
                    </p>
                    <p className="text-primary text-sm font-semibold">
                      {event.spotsLeft} spots left
                    </p>
                  </div>
                )}
              </div>

              {/* Location */}
              {event.location && (
                <div className="shadow-soft mb-6 rounded-xl bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructor */}
              {event.instructor && (
                <div className="shadow-soft mb-6 rounded-xl bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <User className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Instructor
                      </p>
                      <p className="font-semibold">{event.instructor}</p>
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
                  {event.description}
                </p>
              </div>

              {/* What's Included */}
              {event.includes && event.includes.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold">
                    What&apos;s included
                  </h2>
                  <div className="shadow-soft rounded-xl bg-white p-4">
                    <ul className="space-y-3">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            <Check className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Other Events */}
              {otherEvents.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-lg font-semibold">
                    Other workshops you might like
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {otherEvents.map((otherEvent) => (
                      <Link
                        key={otherEvent.id}
                        href={`/events/upcoming/${otherEvent.id}`}
                        className="group shadow-soft hover:shadow-card rounded-2xl bg-white p-4 transition-all"
                      >
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={otherEvent.image}
                              alt={otherEvent.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-1 line-clamp-1 text-sm font-semibold">
                              {otherEvent.title}
                            </h3>
                            <p className="text-muted-foreground mb-2 text-xs">
                              {otherEvent.date} • {otherEvent.time}
                            </p>
                            <span className="text-primary text-sm font-semibold">
                              ₹{otherEvent.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">
                  Reserve Your Spot
                </h2>

                <div className="mb-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Workshop</span>
                    <span className="text-right font-medium">
                      {event.title}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span>{event.time}</span>
                  </div>
                  {event.duration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{event.duration}</span>
                    </div>
                  )}
                  {event.spotsLeft && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Availability
                      </span>
                      <span className="text-primary">
                        {event.spotsLeft} spots left
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-border my-4 border-t" />

                <div className="mb-6 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-primary text-xl font-bold">
                    ₹{event.price.toFixed(2)}
                  </span>
                </div>

                <Button className="h-12 w-full rounded-xl" size="lg">
                  Reserve Seat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <Button className="h-12 w-full rounded-xl" size="lg">
          Reserve Seat
          <span className="ml-2 font-semibold">₹{event.price.toFixed(2)}</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
