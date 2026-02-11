import { Calendar, Check, Clock, MapPin, Printer, User } from "lucide-react";
import { forwardRef } from "react";
import QRCode from "react-qr-code";

import {
  calculateDuration,
  formatEventTime,
  formatTicketDate,
} from "@/lib/date";

import type { EventRegistration } from "@/graphql/generated/types";

import { TicketDetailRow, TicketDetailRowEmoji } from "./ticket-detail-row";

interface EventTicketProps {
  registration: EventRegistration;
  onPrint?: () => void;
}

// Using inline styles with hex colors for print compatibility
const colors = {
  primary: "#4f6f52",
  primaryLight: "#e8ece8",
  muted: "#6b7280",
  gray600: "#4b5563",
  gray50: "#f9fafb",
};

// Option A: Classic Ticket with Torn Edge
// Traditional ticket design with decorative torn/perforated edges.
// QR code at the bottom. Classic vertical layout that feels like a real event ticket.
export const EventTicket = forwardRef<HTMLDivElement, EventTicketProps>(
  function EventTicket({ registration, onPrint }, ref) {
    const { event, user } = registration;

    const formattedDate = formatTicketDate(event.starts_at);
    const formattedTime = formatEventTime(event.starts_at);
    const duration = calculateDuration(event.starts_at, event.ends_at);
    const registrationId = `REG-${registration.id.slice(0, 8).toUpperCase()}`;

    // Get user initials for avatar
    const initials = user.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "G";

    return (
      <div
        ref={ref}
        className="relative mx-auto w-full max-w-md print:max-w-full"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Main Ticket */}
        <div
          className="overflow-hidden rounded-2xl bg-white shadow-xl print:shadow-none"
          style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)" }}
        >
          {/* Header with brand */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, #3d5640 100%)`,
              padding: "20px 24px",
              color: "#ffffff",
            }}
          >
            <div className="mb-4 text-sm font-semibold tracking-wide opacity-90">
              Poetry & Pottery
            </div>
            <h2 className="font-display text-xl leading-tight font-bold">
              {event.title}
            </h2>
          </div>

          {/* Confirmed Badge */}
          <div className="-mt-3 flex items-center justify-center">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                backgroundColor: "#dcfce7",
                color: "#15803d",
              }}
            >
              <Check className="h-4 w-4" />
              Confirmed
            </div>
          </div>

          {/* Attendee Info */}
          <div className="border-b border-neutral-100 p-6 pb-5">
            <div className="flex items-center gap-4">
              {/* Avatar with initials */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: colors.primaryLight,
                  color: colors.primary,
                }}
              >
                {initials}
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-900">
                  {user.name || "Guest"}
                </p>
                <p className="text-sm text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4 p-6">
            <TicketDetailRow
              icon={Calendar}
              label="Date"
              value={formattedDate}
            />

            <TicketDetailRow
              icon={Clock}
              label="Time"
              value={`${formattedTime} (${duration})`}
            />

            {event.location && (
              <TicketDetailRow
                icon={MapPin}
                label="Location"
                value={event.location}
              />
            )}

            {event.instructor && (
              <TicketDetailRow
                icon={User}
                label="Instructor"
                value={event.instructor}
              />
            )}

            {event.level && (
              <TicketDetailRowEmoji
                emoji={"\u{1F3FA}"}
                label="Skill Level"
                value={event.level.toLowerCase().replace("_", " ")}
                capitalize
              />
            )}
          </div>

          {/* Torn Edge / Dashed Divider */}
          <div className="relative px-6">
            <div className="border-t-2 border-dashed border-neutral-200" />
            {/* Notches */}
            <div className="absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded-full bg-neutral-100 print:bg-white" />
            <div className="absolute top-1/2 -right-3 h-6 w-6 -translate-y-1/2 rounded-full bg-neutral-100 print:bg-white" />
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center p-6 pt-5">
            {/* QR Code */}
            <div
              className="mb-3 rounded-lg p-3"
              style={{ backgroundColor: colors.gray50 }}
            >
              <QRCode
                value={registrationId}
                size={100}
                level="M"
                style={{ display: "block" }}
              />
            </div>

            {/* Registration ID */}
            <p
              className="mb-2 font-mono text-sm font-semibold"
              style={{ color: colors.gray600 }}
            >
              {registrationId}
            </p>
          </div>

          {/* Print Button */}
          {onPrint && (
            <div className="border-t border-neutral-100 p-4 print:hidden">
              <button
                onClick={onPrint}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                <Printer className="h-4 w-4" />
                Print Ticket
              </button>
            </div>
          )}

          {/* Footer Note */}
          <div
            className="px-6 py-4 text-center text-xs"
            style={{
              backgroundColor: "#f4f6f4",
              color: colors.muted,
            }}
          >
            Present this ticket at the venue for check-in
          </div>
        </div>
      </div>
    );
  },
);
