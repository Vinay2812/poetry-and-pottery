import type { RegistrationWithEvent } from "@/types";
import { Calendar, Clock, MapPin, Ticket, User } from "lucide-react";
import { forwardRef } from "react";

import {
  calculateDuration,
  formatEventTime,
  formatTicketDate,
} from "@/lib/date";

interface EventTicketProps {
  registration: RegistrationWithEvent;
}

// Using inline styles with hex colors for print compatibility
const colors = {
  primary: "#4f6f52",
  primaryLight: "#e8ece8",
  primaryLighter: "#f4f6f4",
  muted: "#6b7280",
  border: "#e5e7eb",
  background: "#ffffff",
  green: "#16a34a",
  gray900: "#111827",
  gray700: "#374151",
  gray50: "#f9fafb",
};

export const EventTicket = forwardRef<HTMLDivElement, EventTicketProps>(
  function EventTicket({ registration }, ref) {
    const { event, user } = registration;

    const formattedDate = formatTicketDate(event.starts_at);
    const formattedTime = formatEventTime(event.starts_at);
    const duration = calculateDuration(event.starts_at, event.ends_at);
    const ticketId = registration.id.slice(-8).toUpperCase();

    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: colors.background,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, #3d5640 100%)`,
            padding: "24px",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <Ticket style={{ height: "20px", width: "20px" }} />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Event Ticket
                </span>
              </div>
              <p style={{ fontSize: "11px", opacity: 0.8 }}>#{ticketId}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{ fontSize: "11px", opacity: 0.8, marginBottom: "2px" }}
              >
                Seats
              </p>
              <p style={{ fontSize: "32px", fontWeight: 700, lineHeight: 1 }}>
                {registration.seats_reserved}
              </p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          style={{
            padding: "0 24px",
            backgroundColor: colors.background,
          }}
        >
          <div
            style={{
              borderTop: "2px dashed #d1d5db",
              marginTop: "-1px",
            }}
          />
        </div>

        {/* Content Section */}
        <div style={{ padding: "20px 24px 24px" }}>
          {/* Event Title */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: colors.gray900,
              marginBottom: "20px",
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </h2>

          {/* Event Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            {/* Date & Time Row */}
            <div style={{ display: "flex", gap: "24px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: colors.primaryLighter,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Calendar
                    style={{
                      width: "18px",
                      height: "18px",
                      color: colors.primary,
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: colors.muted,
                      marginBottom: "2px",
                    }}
                  >
                    Date
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.gray700,
                    }}
                  >
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: colors.primaryLighter,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Clock
                    style={{
                      width: "18px",
                      height: "18px",
                      color: colors.primary,
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: colors.muted,
                      marginBottom: "2px",
                    }}
                  >
                    Time
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.gray700,
                    }}
                  >
                    {formattedTime} ({duration})
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: colors.primaryLighter,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin
                    style={{
                      width: "18px",
                      height: "18px",
                      color: colors.primary,
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: colors.muted,
                      marginBottom: "2px",
                    }}
                  >
                    Location
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.gray700,
                    }}
                  >
                    {event.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Attendee Card */}
          <div
            style={{
              backgroundColor: colors.gray50,
              borderRadius: "12px",
              padding: "14px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: colors.primaryLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User
                  style={{
                    width: "20px",
                    height: "20px",
                    color: colors.primary,
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: colors.muted,
                    marginBottom: "2px",
                  }}
                >
                  Attendee
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: colors.gray900,
                  }}
                >
                  {user.name || "Guest"}
                </p>
                <p style={{ fontSize: "12px", color: colors.muted }}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: colors.primaryLighter,
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                color: colors.muted,
                marginBottom: "2px",
              }}
            >
              Total Amount
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: colors.primary,
              }}
            >
              ₹{(event.price * registration.seats_reserved).toLocaleString()}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#15803d",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Confirmed
          </div>
        </div>
      </div>
    );
  },
);
