"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { useShare } from "@/hooks";
import { EventRegistrationStatus, type RegistrationWithEvent } from "@/types";
import {
  Ban,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CopyIcon,
  Download,
  HourglassIcon,
  MapPin,
  Share2,
  ThumbsUp,
  Timer,
  User,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { OptimizedImage, WhatsAppContactButton } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { openWhatsAppFollowUp } from "@/lib/contact-business";
import { cn } from "@/lib/utils";

import { EventRegistrationProgress } from "./event-registration-progress";
import { TicketDownloadDialog } from "./ticket-download-dialog";

function getStatusConfig(status: EventRegistrationStatus) {
  switch (status) {
    case EventRegistrationStatus.PENDING:
      return {
        label: "Pending",
        icon: HourglassIcon,
        bgColor: "bg-amber-500",
        textColor: "text-amber-500",
        borderColor: "border-amber-500",
        message: "Awaiting approval",
      };
    case EventRegistrationStatus.APPROVED:
      return {
        label: "Approved",
        icon: ThumbsUp,
        bgColor: "bg-blue-500",
        textColor: "text-blue-500",
        borderColor: "border-blue-500",
        message: "Please complete payment",
      };
    case EventRegistrationStatus.PAID:
      return {
        label: "Paid",
        icon: Check,
        bgColor: "bg-teal-500",
        textColor: "text-teal-500",
        borderColor: "border-teal-500",
        message: "Payment received",
      };
    case EventRegistrationStatus.CONFIRMED:
      return {
        label: "Confirmed",
        icon: CheckCircle2,
        bgColor: "bg-emerald-500",
        textColor: "text-emerald-500",
        borderColor: "border-emerald-500",
        message: "You're registered!",
      };
    case EventRegistrationStatus.REJECTED:
      return {
        label: "Rejected",
        icon: XCircle,
        bgColor: "bg-red-500",
        textColor: "text-red-500",
        borderColor: "border-red-500",
        message: "Registration rejected",
      };
    case EventRegistrationStatus.CANCELLED:
      return {
        label: "Cancelled",
        icon: Ban,
        bgColor: "bg-neutral-500",
        textColor: "text-neutral-500",
        borderColor: "border-neutral-500",
        message: "Registration cancelled",
      };
    default:
      return {
        label: "Unknown",
        icon: Clock,
        bgColor: "bg-neutral-500",
        textColor: "text-neutral-500",
        borderColor: "border-neutral-500",
        message: "",
      };
  }
}

interface RegistrationDetailClientProps {
  registration: RegistrationWithEvent;
}

export function RegistrationDetailClient({
  registration,
}: RegistrationDetailClientProps) {
  const { event } = registration;
  const { share } = useShare();

  const status = registration.status as EventRegistrationStatus;
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;
  const isConfirmed = status === EventRegistrationStatus.CONFIRMED;
  const isPending = status === EventRegistrationStatus.PENDING;
  const isApproved = status === EventRegistrationStatus.APPROVED;
  const isPaid = status === EventRegistrationStatus.PAID;
  const showTicketDownload = isConfirmed;

  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    share({
      title: `My registration for ${event.title}`,
      text: `I'm attending ${event.title}! Check out this workshop.`,
      url: window.location.href,
    });
  }, [share, event.title]);

  const handleCopyRegistrationId = useCallback(() => {
    navigator.clipboard.writeText(registration.id.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [registration.id]);

  const showWhatsAppButton = !isConfirmed;

  const handleWhatsAppContact = useCallback(() => {
    openWhatsAppFollowUp({
      type: "event-followup",
      registrationId: registration.id.toUpperCase(),
      eventTitle: event.title,
      eventDate: event.starts_at,
      registrationStatus: statusConfig.label,
      customerName: registration.user.name || registration.user.email,
      customerEmail: registration.user.email,
    });
  }, [registration, event, statusConfig.label]);

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
      <MobileHeaderContainer
        title="Registration Details"
        showBack
        backHref="/events/registrations"
      />

      <main className="pt-14 pb-40 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-0 py-0 lg:px-8 lg:py-12">
          <div className="grid gap-0 lg:grid-cols-3 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-0 aspect-square w-full overflow-hidden lg:mb-4 lg:aspect-video lg:rounded-2xl">
                <OptimizedImage
                  src={imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Share registration"
                >
                  <Share2 className="text-foreground h-5 w-5" />
                </button>

                {/* Status Badge on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <Badge
                    className={cn(
                      "border-none px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md",
                      statusConfig.bgColor,
                    )}
                  >
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusConfig.label}
                  </Badge>
                  {event.level && (
                    <Badge className="border-none bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-neutral-900 uppercase shadow-lg backdrop-blur-md">
                      {event.level}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="px-4 pt-4 lg:px-0 lg:pt-0">
                {/* Registration Header & Price */}
                <div className="mb-4 border-b border-neutral-100 pb-4 dark:border-neutral-800">
                  <p className="mb-1 flex items-center gap-2 pl-1 text-xs font-bold text-neutral-400 uppercase">
                    <span>
                      Registration ID: #{registration.id.toUpperCase()}
                    </span>
                    <button
                      onClick={handleCopyRegistrationId}
                      className="inline-flex items-center justify-center rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      aria-label="Copy registration ID"
                    >
                      {copied ? (
                        <Check className="text-primary h-3.5 w-3.5" />
                      ) : (
                        <CopyIcon className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </p>

                  <div className="mb-2 flex items-center gap-2">
                    <h1 className="text-3xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-5xl dark:text-white">
                      {event.title}
                    </h1>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      ₹
                      {(
                        event.price * registration.seats_reserved
                      ).toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                      {isPaid || isConfirmed ? "Amount Paid" : "Total Amount"}
                    </span>
                  </div>
                </div>

                {/* Mobile Registration Progress */}
                <div className="mb-6 pl-2 lg:hidden">
                  <EventRegistrationProgress
                    status={status}
                    requestAt={registration.request_at}
                    approvedAt={registration.approved_at}
                    paidAt={registration.paid_at}
                    confirmedAt={registration.confirmed_at}
                    cancelledAt={registration.cancelled_at}
                    createdAt={registration.created_at}
                  />
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
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="shadow-soft sticky top-24 space-y-6">
                {/* Status Card */}
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <EventRegistrationProgress
                    status={status}
                    requestAt={registration.request_at}
                    approvedAt={registration.approved_at}
                    paidAt={registration.paid_at}
                    confirmedAt={registration.confirmed_at}
                    cancelledAt={registration.cancelled_at}
                    createdAt={registration.created_at}
                  />
                </div>

                {/* Summary Card */}
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                    Registration Summary
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Seats Reserved
                      </span>
                      <span className="font-medium">
                        {registration.seats_reserved}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Registered On
                      </span>
                      <span>{registrationDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isPaid || isConfirmed ? "Amount Paid" : "Total Amount"}
                      </span>
                      <span className="text-primary font-semibold">
                        ₹
                        {(event.price * registration.seats_reserved).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-border my-4 border-t" />

                  <div className="space-y-3">
                    {showTicketDownload ? (
                      <TicketDownloadDialog
                        registration={registration}
                        trigger={
                          <Button className="h-12 w-full rounded-xl" size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Download Ticket
                          </Button>
                        }
                      />
                    ) : (
                      <div
                        className={cn(
                          "flex items-center gap-2 rounded-xl p-3",
                          isPending && "bg-amber-50 dark:bg-amber-950/20",
                          isApproved && "bg-blue-50 dark:bg-blue-950/20",
                        )}
                      >
                        <StatusIcon
                          className={cn("h-5 w-5", statusConfig.textColor)}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium",
                            statusConfig.textColor,
                          )}
                        >
                          {statusConfig.message}
                        </span>
                      </div>
                    )}
                    <Link href="/events/upcoming">
                      <Button
                        variant="outline"
                        className="h-12 w-full rounded-xl"
                        size="lg"
                      >
                        Browse More Workshops
                      </Button>
                    </Link>
                    {showWhatsAppButton && (
                      <WhatsAppContactButton onClick={handleWhatsAppContact} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        {showTicketDownload ? (
          <TicketDownloadDialog
            registration={registration}
            trigger={
              <Button className="h-12 w-full rounded-xl" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            <div
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl p-3",
                isPending && "bg-amber-50 dark:bg-amber-950/20",
                isApproved && "bg-blue-50 dark:bg-blue-950/20",
                isPaid && "bg-teal-50 dark:bg-teal-950/20",
              )}
            >
              <StatusIcon className={cn("h-5 w-5", statusConfig.textColor)} />
              <span className={cn("font-medium", statusConfig.textColor)}>
                {statusConfig.message}
              </span>
            </div>
            {showWhatsAppButton && (
              <WhatsAppContactButton onClick={handleWhatsAppContact} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
