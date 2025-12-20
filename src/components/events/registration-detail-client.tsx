"use client";

import type { RegistrationWithEvent } from "@/types";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Share2,
  Ticket,
  Timer,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MobileHeader } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TicketDownloadDialog } from "./ticket-download-dialog";

// Helper function to calculate duration from DateTime objects
function calculateDuration(startsAt: Date, endsAt: Date): string {
  const diffMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}hr`;
  return `${hours}hr ${minutes}min`;
}

interface RegistrationDetailClientProps {
  registration: RegistrationWithEvent;
}

export function RegistrationDetailClient({
  registration,
}: RegistrationDetailClientProps) {
  const { event } = registration;
  // Registrations are always confirmed once they exist
  const status: "confirmed" | "pending" | "completed" = "confirmed";

  // Format date and time from DateTime
  const eventDate = new Date(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const duration = calculateDuration(event.starts_at, event.ends_at);
  const registrationDate = new Date(registration.created_at).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const imageUrl = event.image || "/placeholder.jpg";

  return (
    <>
      <MobileHeader
        title="Registration Details"
        showBack
        backHref="/events/registrations"
      />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-12">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl lg:aspect-video">
                <Image
                  src={imageUrl}
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
                  <Badge className="border-none bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Confirmed
                  </Badge>
                  {event.level && (
                    <Badge className="border-none bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-neutral-900 uppercase shadow-lg backdrop-blur-md">
                      {event.level}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Registration Header & Price */}
              <div className="mb-8 border-b border-neutral-100 pb-6 dark:border-neutral-800">
                <div className="mb-3">
                  <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    <Ticket className="h-3 w-3" />
                    My Registration
                  </span>
                </div>

                <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-5xl dark:text-white">
                  {event.title}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      ₹
                      {(
                        event.price * registration.seats_reserved
                      ).toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                      Amount Paid
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="border-none bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white capitalize uppercase shadow-sm">
                      {status}
                    </Badge>
                  </div>
                </div>
                <p className="mt-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  Order ID: #{registration.id.toUpperCase()}
                </p>
              </div>

              {/* Registration & Quick Info */}
              <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-neutral-100 py-6 sm:grid-cols-4 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <Users className="mt-1 h-4 w-4 text-neutral-400" />
                  <div>
                    <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                      Seats
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {registration.seats_reserved}
                    </p>
                  </div>
                </div>
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
                      Total Paid
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      ₹
                      {(
                        event.price * registration.seats_reserved
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location & Instructor */}
              <div className="mb-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Location
                      </p>
                      <p className="text-sm leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
                        {event.location}
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        {event.full_location}
                      </p>
                    </div>
                  </div>
                )}
                {event.instructor && (
                  <div className="flex items-start gap-3">
                    <User className="mt-1 h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                        Instructor
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {event.instructor}
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        Lead Artist
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                  About this workshop
                </h2>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {event.description}
                </p>
              </div>

              {/* What's Included */}
              {event.includes && event.includes.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    What&apos;s included
                  </h2>
                  <div className="shadow-soft rounded-2xl border border-neutral-50 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          </div>
                          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            {item}
                          </span>
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
                    <span className="text-muted-foreground">
                      Seats Reserved
                    </span>
                    <span className="font-medium">
                      {registration.seats_reserved}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Registered On</span>
                    <span>{registrationDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant="outline"
                      className="border-primary text-primary capitalize"
                    >
                      {status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="text-primary font-semibold">
                      ₹{(event.price * registration.seats_reserved).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-border my-4 border-t" />

                <div className="space-y-3">
                  <TicketDownloadDialog
                    registration={registration}
                    trigger={
                      <Button className="h-12 w-full rounded-xl" size="lg">
                        <Download className="mr-2 h-4 w-4" />
                        Download Ticket
                      </Button>
                    }
                  />
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
        <TicketDownloadDialog
          registration={registration}
          trigger={
            <Button className="h-12 w-full rounded-xl" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
          }
        />
      </div>
    </>
  );
}
