import type { EventRegistration } from "@/data/events/types";

import {
  calculateDuration,
  formatEventDateFull,
  formatEventTime,
} from "@/lib/date";

interface TicketData {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  eventDescription: string | null;
  eventLocation: string | null;
  eventInstructor: string | null;
  eventLevel: string | null;
  eventIncludes: string[];
  eventPrice: number;
  seatsReserved: number;
  formattedDate: string;
  formattedTime: string;
  duration: string;
  userName: string;
  userEmail: string;
}

function extractTicketData(registration: EventRegistration): TicketData {
  const { event, user } = registration;
  return {
    ticketId: registration.id.toUpperCase(),
    eventId: event.id,
    eventTitle: event.title,
    eventDescription: event.description || null,
    eventLocation: event.location || null,
    eventInstructor: event.instructor || null,
    eventLevel: event.level || null,
    eventIncludes: event.includes ?? [],
    eventPrice: event.price,
    seatsReserved: registration.seats_reserved,
    formattedDate: formatEventDateFull(event.starts_at),
    formattedTime: formatEventTime(event.starts_at),
    duration: calculateDuration(event.starts_at, event.ends_at),
    userName: user.name || "Guest",
    userEmail: user.email,
  };
}

function buildIncludesHtml(includes: string[]): string {
  if (includes.length === 0) return "";
  return `
    <div style="margin-top: 24px;">
      <h3 style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 12px;">What's Included</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${includes
          .map(
            (item) => `
          <span style="background-color: #f4f6f4; color: #374151; padding: 6px 12px; border-radius: 6px; font-size: 13px;">
            ${item}
          </span>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function buildInstructorHtml(instructor: string | null): string {
  if (!instructor) return "";
  return `
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="width: 36px; height: 36px; border-radius: 8px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div>
        <p style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">Instructor</p>
        <p style="font-size: 13px; font-weight: 600; color: #374151;">${instructor}</p>
      </div>
    </div>
  `;
}

function buildLevelHtml(level: string | null): string {
  if (!level) return "";
  return `
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="width: 36px; height: 36px; border-radius: 8px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
        </svg>
      </div>
      <div>
        <p style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">Level</p>
        <p style="font-size: 13px; font-weight: 600; color: #374151;">${level}</p>
      </div>
    </div>
  `;
}

// Generate the full HTML document for a printable event ticket.
export function generateTicketHtml(registration: EventRegistration): string {
  const data = extractTicketData(registration);
  const includesHtml = buildIncludesHtml(data.eventIncludes);
  const instructorHtml = buildInstructorHtml(data.eventInstructor);
  const levelHtml = buildLevelHtml(data.eventLevel);

  const locationHtml = data.eventLocation
    ? `
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 44px; height: 44px; border-radius: 10px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
      <div>
        <p style="font-size: 12px; color: #6b7280; margin-bottom: 2px;">Location</p>
        <p style="font-size: 15px; font-weight: 600; color: #374151;">${data.eventLocation}</p>
      </div>
    </div>
    `
    : "";

  const descriptionHtml = data.eventDescription
    ? `
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 12px;">About this Workshop</h3>
      <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">${data.eventDescription}</p>
    </div>
    `
    : "";

  const totalAmount = data.eventPrice * data.seatsReserved;

  return `<!DOCTYPE html>
<html>
  <head>
    <title>${data.eventId}</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      html, body {
        width: 100%;
        height: 100%;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #ffffff;
      }
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
      }
    </style>
  </head>
  <body>
    <div style="width: 100%; min-height: 100vh; background-color: #ffffff; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f6f52 0%, #3d5640 100%); padding: 40px; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                  <path d="M13 5v2"/>
                  <path d="M13 17v2"/>
                  <path d="M13 11v2"/>
                </svg>
                <span style="font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
                  Event Ticket
                </span>
              </div>
              <p style="font-size: 14px; opacity: 0.8;">Ticket ID: #${data.ticketId}</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 14px; opacity: 0.8; margin-bottom: 4px;">Seats Reserved</p>
              <p style="font-size: 48px; font-weight: 700; line-height: 1;">${data.seatsReserved}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div style="max-width: 600px; margin: 0 auto; padding: 40px;">
        <!-- Event Title -->
        <h1 style="font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.3;">
          ${data.eventTitle}
        </h1>

        <!-- Status Badge -->
        <div style="margin-bottom: 32px;">
          <span style="background-color: #dcfce7; color: #15803d; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block;">
            ✓ Confirmed
          </span>
        </div>

        <!-- Event Details Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;">
          <!-- Date -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <div>
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 2px;">Date</p>
              <p style="font-size: 15px; font-weight: 600; color: #374151;">${data.formattedDate}</p>
            </div>
          </div>

          <!-- Time -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 2px;">Time</p>
              <p style="font-size: 15px; font-weight: 600; color: #374151;">${data.formattedTime} (${data.duration})</p>
            </div>
          </div>

          <!-- Location -->
          ${locationHtml}

          ${instructorHtml ? `<div style="display: flex; align-items: center; gap: 12px;">${instructorHtml}</div>` : ""}
        </div>

        ${levelHtml ? `<div style="margin-bottom: 24px;">${levelHtml}</div>` : ""}

        <!-- Description -->
        ${descriptionHtml}

        ${includesHtml}

        <!-- Divider -->
        <div style="border-top: 2px dashed #e5e7eb; margin: 32px 0;"></div>

        <!-- Attendee Info -->
        <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; margin-bottom: 32px;">
          <h3 style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Attendee Details</h3>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #e8ece8; display: flex; align-items: center; justify-content: center;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p style="font-size: 18px; font-weight: 600; color: #111827;">${data.userName}</p>
              <p style="font-size: 14px; color: #6b7280;">${data.userEmail}</p>
            </div>
          </div>
        </div>

        <!-- Payment Info -->
        <div style="background-color: #f4f6f4; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Total Amount Paid</p>
            <p style="font-size: 28px; font-weight: 700; color: #4f6f52;">₹${totalAmount.toLocaleString()}</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Price per seat</p>
            <p style="font-size: 16px; font-weight: 600; color: #374151;">₹${data.eventPrice.toLocaleString()} × ${data.seatsReserved}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; margin-top: auto;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <p style="font-size: 12px; color: #6b7280;">
            Please present this ticket at the venue. For any queries, contact us at support@poetryandpottery.com
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
}
