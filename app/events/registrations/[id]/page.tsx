"use client";

import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Share2,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { EVENTS, REGISTERED_EVENTS } from "@/lib/constants";

export default function RegistrationDetailPage() {
  const params = useParams();
  const registration =
    REGISTERED_EVENTS.find((r) => r.id === params.id) || REGISTERED_EVENTS[0];
  const event = EVENTS.find((e) => e.id === registration.eventId) || EVENTS[0];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader
        title="Registration Details"
        showBack
        backHref="/events/registrations"
      />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-6">
            <Link
              href="/events/registrations"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
            >
              <Ticket className="h-4 w-4" />
              My Registration
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
                  aria-label="Share registration"
                >
                  <Share2 className="text-foreground h-5 w-5" />
                </button>

                {/* Status Badge on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {registration.status === "confirmed" && (
                    <Badge className="bg-primary flex items-center gap-1 text-white">
                      <CheckCircle2 className="h-3 w-3" />
                      Confirmed
                    </Badge>
                  )}
                  {event.level && (
                    <Badge
                      variant="secondary"
                      className="text-foreground bg-white/90"
                    >
                      {event.level}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Event Title */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold lg:text-3xl">
                  {event.title}
                </h1>
              </div>

              {/* Registration Info Card */}
              <div className="bg-primary/5 mb-6 rounded-2xl p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Ticket className="text-primary h-5 w-5" />
                  <span className="font-semibold">Your Registration</span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Ticket Number
                    </p>
                    <p className="font-semibold">{registration.ticketNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Registered On
                    </p>
                    <p className="font-semibold">
                      {registration.registrationDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Status</p>
                    <p className="text-primary font-semibold capitalize">
                      {registration.status}
                    </p>
                  </div>
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
                <div className="shadow-soft rounded-xl bg-white p-4">
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <CheckCircle2 className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground text-xs">Payment</p>
                  <p className="text-primary text-sm font-semibold">
                    ₹{event.price.toFixed(2)} Paid
                  </p>
                </div>
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
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
                <div className="bg-primary/10 mb-4 flex items-center gap-2 rounded-xl p-3">
                  <Check className="text-primary h-5 w-5" />
                  <span className="text-primary font-medium">
                    You&apos;re registered!
                  </span>
                </div>

                <div className="mb-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ticket Number</span>
                    <span className="font-medium">
                      {registration.ticketNumber}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Registered On</span>
                    <span>{registration.registrationDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant="outline"
                      className="border-primary text-primary capitalize"
                    >
                      {registration.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="text-primary font-semibold">
                      ₹{event.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-border my-4 border-t" />

                <div className="space-y-3">
                  <Button className="h-12 w-full rounded-xl" size="lg">
                    View Ticket
                  </Button>
                  <Link href="/events/upcoming">
                    <Button
                      variant="outline"
                      className="h-12 w-full rounded-xl"
                      size="lg"
                    >
                      Browse More Workshops
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <Button className="h-12 w-full rounded-xl" size="lg">
          View Ticket
        </Button>
      </div>

      <MobileNav />
    </div>
  );
}
