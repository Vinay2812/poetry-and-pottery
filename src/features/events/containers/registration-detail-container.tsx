"use client";

import {
  EventRegistrationStatus as ERS,
  type EventRegistrationStatus,
} from "@/data/events/types";
import { useShare } from "@/hooks";
import {
  Ban,
  Check,
  CheckCircle2,
  Clock,
  HourglassIcon,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { openWhatsAppFollowUp } from "@/lib/contact-business";
import {
  calculateDuration,
  formatEventDate,
  formatEventTime,
} from "@/lib/date";

import { RegistrationDetail } from "../components/registration-detail";
import type {
  RegistrationDetailContainerProps,
  RegistrationDetailViewModel,
  RegistrationStatusConfig,
} from "../types";

function getStatusConfig(
  status: EventRegistrationStatus,
): RegistrationStatusConfig {
  switch (status) {
    case ERS.Pending:
      return {
        label: "Pending",
        icon: HourglassIcon,
        bgColor: "bg-amber-500",
        textColor: "text-amber-500",
        borderColor: "border-amber-500",
        message: "Awaiting approval",
      };
    case ERS.Approved:
      return {
        label: "Approved",
        icon: ThumbsUp,
        bgColor: "bg-blue-500",
        textColor: "text-blue-500",
        borderColor: "border-blue-500",
        message: "Please complete payment",
      };
    case ERS.Paid:
      return {
        label: "Paid",
        icon: Check,
        bgColor: "bg-teal-500",
        textColor: "text-teal-500",
        borderColor: "border-teal-500",
        message: "Payment received",
      };
    case ERS.Confirmed:
      return {
        label: "Confirmed",
        icon: CheckCircle2,
        bgColor: "bg-emerald-500",
        textColor: "text-emerald-500",
        borderColor: "border-emerald-500",
        message: "You're registered!",
      };
    case ERS.Rejected:
      return {
        label: "Rejected",
        icon: XCircle,
        bgColor: "bg-red-500",
        textColor: "text-red-500",
        borderColor: "border-red-500",
        message: "Registration rejected",
      };
    case ERS.Cancelled:
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

export function RegistrationDetailContainer({
  registration,
}: RegistrationDetailContainerProps) {
  const { event, status } = registration;
  const { share } = useShare();

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

  const handleWhatsAppContact = useCallback(() => {
    openWhatsAppFollowUp({
      type: "event-followup",
      registrationId: registration.id.toUpperCase(),
      eventTitle: event.title,
      eventDate: event.starts_at,
      registrationStatus: getStatusConfig(status).label,
      customerName: registration.user.name || registration.user.email,
      customerEmail: registration.user.email,
    });
  }, [registration, event, status]);

  const viewModel = useMemo((): RegistrationDetailViewModel => {
    const statusConfig = getStatusConfig(status);
    const isConfirmed = status === ERS.Confirmed;
    const isPending = status === ERS.Pending;
    const isApproved = status === ERS.Approved;
    const isPaid = status === ERS.Paid;
    const isWorkshop = event.event_type === "POTTERY_WORKSHOP";
    const isOpenMic = event.event_type === "OPEN_MIC";
    const totalAmount = (
      event.price * registration.seats_reserved
    ).toLocaleString();

    return {
      // Registration
      registrationId: registration.id,
      registrationIdUpperCase: registration.id.toUpperCase(),
      status,
      seatsReserved: registration.seats_reserved,
      totalAmount,
      amountLabel: isPaid || isConfirmed ? "Amount Paid" : "Total Amount",
      copied,

      // Status
      statusConfig,
      isConfirmed,
      isPending,
      isApproved,
      isPaid,
      showTicketDownload: isConfirmed,
      showWhatsAppButton: !isConfirmed,

      // Event details
      eventTitle: event.title,
      eventDescription: event.description,
      imageUrl: event.image || "/placeholder.jpg",
      formattedDate: formatEventDate(event.starts_at),
      formattedTime: formatEventTime(event.starts_at),
      duration: calculateDuration(event.starts_at, event.ends_at),
      location: event.location || null,
      fullLocation: event.full_location || null,
      level: event.level ?? null,
      instructor: event.instructor ?? null,
      performers: event.performers || [],
      lineupNotes: event.lineup_notes ?? null,
      includes: event.includes || [],
      isWorkshop,
      isOpenMic,

      // Registration progress props
      requestAt: registration.request_at,
      approvedAt: registration.approved_at,
      paidAt: registration.paid_at,
      confirmedAt: registration.confirmed_at,
      cancelledAt: registration.cancelled_at,
      createdAt: registration.created_at,
    };
  }, [registration, event, status, copied]);

  return (
    <RegistrationDetail
      viewModel={viewModel}
      registration={registration}
      onShare={handleShare}
      onCopyRegistrationId={handleCopyRegistrationId}
      onWhatsAppContact={handleWhatsAppContact}
    />
  );
}
