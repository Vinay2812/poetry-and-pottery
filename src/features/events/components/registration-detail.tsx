import { MobileHeaderContainer } from "@/features/layout";
import {
  Check,
  ChevronRight,
  CopyIcon,
  Download,
  MapPin,
  Mic,
  Palette,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";

import { EventRegistrationProgress } from "@/components/events/event-registration-progress";
import { TicketDownloadDialog } from "@/components/events/ticket-download-dialog";
import { OptimizedImage, WhatsAppContactButton } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { RegistrationDetailProps } from "../types";

export function RegistrationDetail({
  viewModel,
  registration,
  onShare,
  onCopyRegistrationId,
  onWhatsAppContact,
}: RegistrationDetailProps) {
  const {
    registrationIdUpperCase,
    status,
    seatsReserved,
    totalAmount,
    amountLabel,
    copied,
    statusConfig,
    isPending,
    isApproved,
    isPaid,
    showTicketDownload,
    showWhatsAppButton,
    eventTitle,
    eventDescription,
    imageUrl,
    formattedDate,
    formattedTime,
    duration,
    location,
    fullLocation,
    level,
    instructor,
    performers,
    lineupNotes,
    includes,
    isWorkshop,
    isOpenMic,
    requestAt,
    approvedAt,
    paidAt,
    confirmedAt,
    cancelledAt,
    createdAt,
  } = viewModel;

  const StatusIcon = statusConfig.icon;

  return (
    <>
      <MobileHeaderContainer
        title="Registration Details"
        showBack
        backHref="/events/registrations"
      />

      <main className="pt-14 pb-40 lg:pt-20 lg:pb-12">
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
              href="/events/registrations"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Registrations
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
            <span className="text-foreground font-medium">{eventTitle}</span>
          </nav>

          {/* Hero Image */}
          <div className="relative aspect-4/5 w-full overflow-hidden lg:aspect-21/9 lg:rounded-2xl">
            <OptimizedImage
              src={imageUrl}
              alt={eventTitle}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Share Button */}
            <button
              onClick={onShare}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Share registration"
            >
              <Share2 className="text-foreground h-5 w-5" />
            </button>

            {/* Status Badge on Image */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <Badge
                className={cn(
                  "border-none px-3 py-1.5 text-xs font-semibold text-white",
                  statusConfig.bgColor,
                )}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {statusConfig.label}
              </Badge>
              {level && isWorkshop && (
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
                {/* Event Type Badge */}
                <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold lg:text-sm">
                  {isOpenMic ? (
                    <Mic className="h-3.5 w-3.5" />
                  ) : (
                    <Palette className="h-3.5 w-3.5" />
                  )}
                  <span>{isOpenMic ? "Open Mic" : "Workshop"}</span>
                </div>

                {/* Registration ID */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    Registration
                  </span>
                  <span className="font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    #{registrationIdUpperCase}
                  </span>
                  <button
                    onClick={onCopyRegistrationId}
                    className="inline-flex items-center justify-center rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    aria-label="Copy registration ID"
                  >
                    {copied ? (
                      <Check className="text-primary h-3.5 w-3.5" />
                    ) : (
                      <CopyIcon className="h-3.5 w-3.5 text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Title */}
                <h1 className="font-display mb-2 text-2xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                  {eventTitle}
                </h1>

                {/* Inline Metadata */}
                <p className="mb-6 text-sm text-neutral-500 lg:text-base">
                  {formattedDate} · {formattedTime} · {duration}
                  {location && ` · ${location}`}
                </p>

                {/* Mobile Registration Progress */}
                <div className="mb-6 lg:hidden">
                  <EventRegistrationProgress
                    status={status}
                    requestAt={requestAt}
                    approvedAt={approvedAt}
                    paidAt={paidAt}
                    confirmedAt={confirmedAt}
                    cancelledAt={cancelledAt}
                    createdAt={createdAt}
                  />
                </div>

                {/* About */}
                <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                  <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    About
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
                    {eventDescription}
                  </p>
                </div>

                {/* Instructor - Workshop Only */}
                {instructor && isWorkshop && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Instructor
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <User className="h-5 w-5 text-neutral-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {instructor}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Lead Facilitator
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performers - Open Mic Only */}
                {isOpenMic && performers && performers.length > 0 && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Lineup
                    </h2>
                    <ul className="space-y-3">
                      {performers.map((performer, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                            <Mic className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            {performer}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {lineupNotes && (
                      <p className="mt-3 text-sm text-neutral-500 italic">
                        {lineupNotes}
                      </p>
                    )}
                  </div>
                )}

                {/* Location */}
                {location && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Location
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <MapPin className="h-5 w-5 text-neutral-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {location}
                        </p>
                        {fullLocation && (
                          <p className="text-xs text-neutral-500">
                            {fullLocation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* What's Included */}
                {includes && includes.length > 0 && (
                  <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
                    <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      What&apos;s included
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
              </div>
            </div>

            {/* Desktop Sidebar - Minimal */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {/* Progress */}
                <div className="mb-5">
                  <EventRegistrationProgress
                    status={status}
                    requestAt={requestAt}
                    approvedAt={approvedAt}
                    paidAt={paidAt}
                    confirmedAt={confirmedAt}
                    cancelledAt={cancelledAt}
                    createdAt={createdAt}
                  />
                </div>

                <div className="mb-5 border-t border-neutral-100 dark:border-neutral-800" />

                {/* Summary */}
                <div className="mb-5 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Seats</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {seatsReserved}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">{amountLabel}</span>
                    <span className="text-primary font-semibold">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                {showTicketDownload ? (
                  <TicketDownloadDialog
                    registration={registration}
                    trigger={
                      <Button className="h-12 w-full rounded-xl text-sm font-bold">
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
                      isPaid && "bg-teal-50 dark:bg-teal-950/20",
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

                <Link href="/events/upcoming" className="mt-3 block">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl text-sm font-bold"
                  >
                    Browse More Workshops
                  </Button>
                </Link>

                {showWhatsAppButton && (
                  <div className="mt-3">
                    <WhatsAppContactButton onClick={onWhatsAppContact} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed right-0 bottom-16 left-0 z-40 bg-white/95 p-4 backdrop-blur-md lg:hidden">
        {showTicketDownload ? (
          <TicketDownloadDialog
            registration={registration}
            trigger={
              <Button className="h-12 w-full rounded-xl text-sm font-bold">
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
              <WhatsAppContactButton onClick={onWhatsAppContact} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
