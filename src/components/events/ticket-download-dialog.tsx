"use client";

import type { RegistrationWithEvent } from "@/types";
import { Download } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import {
  calculateDuration,
  formatEventDateFull,
  formatEventTime,
} from "@/lib/date";

interface TicketDownloadDialogProps {
  registration: RegistrationWithEvent;
  trigger?: React.ReactNode;
}

export function TicketDownloadDialog({
  registration,
  trigger,
}: TicketDownloadDialogProps) {
  const { event, user } = registration;

  const formattedDate = formatEventDateFull(event.starts_at);
  const formattedTime = formatEventTime(event.starts_at);
  const duration = calculateDuration(event.starts_at, event.ends_at);
  const ticketId = registration.id.toUpperCase();

  const handleDownload = useCallback(() => {
    const includesHtml =
      event.includes && event.includes.length > 0
        ? `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 12px;">What's Included</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${event.includes
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
      `
        : "";

    const instructorHtml = event.instructor
      ? `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <p style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">Instructor</p>
            <p style="font-size: 13px; font-weight: 600; color: #374151;">${event.instructor}</p>
          </div>
        </div>
      `
      : "";

    const levelHtml = event.level
      ? `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background-color: #f4f6f4; display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6f52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>
          </div>
          <div>
            <p style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">Level</p>
            <p style="font-size: 13px; font-weight: 600; color: #374151;">${event.level}</p>
          </div>
        </div>
      `
      : "";

    // Create hidden iframe for printing without navigating away
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc || !iframe.contentWindow) {
      document.body.removeChild(iframe);
      return;
    }

    const iframeWindow = iframe.contentWindow;

    iframeDoc.open();
    iframeDoc.writeln(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${event.id}</title>
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
                    <p style="font-size: 14px; opacity: 0.8;">Ticket ID: #${ticketId}</p>
                  </div>
                  <div style="text-align: right;">
                    <p style="font-size: 14px; opacity: 0.8; margin-bottom: 4px;">Seats Reserved</p>
                    <p style="font-size: 48px; font-weight: 700; line-height: 1;">${registration.seats_reserved}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div style="max-width: 600px; margin: 0 auto; padding: 40px;">
              <!-- Event Title -->
              <h1 style="font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.3;">
                ${event.title}
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
                    <p style="font-size: 15px; font-weight: 600; color: #374151;">${formattedDate}</p>
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
                    <p style="font-size: 15px; font-weight: 600; color: #374151;">${formattedTime} (${duration})</p>
                  </div>
                </div>

                <!-- Location -->
                ${
                  event.location
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
                    <p style="font-size: 15px; font-weight: 600; color: #374151;">${event.location}</p>
                  </div>
                </div>
                `
                    : ""
                }

                ${instructorHtml ? `<div style="display: flex; align-items: center; gap: 12px;">${instructorHtml}</div>` : ""}
              </div>

              ${levelHtml ? `<div style="margin-bottom: 24px;">${levelHtml}</div>` : ""}

              <!-- Description -->
              ${
                event.description
                  ? `
              <div style="margin-bottom: 32px;">
                <h3 style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 12px;">About this Workshop</h3>
                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">${event.description}</p>
              </div>
              `
                  : ""
              }

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
                    <p style="font-size: 18px; font-weight: 600; color: #111827;">${user.name || "Guest"}</p>
                    <p style="font-size: 14px; color: #6b7280;">${user.email}</p>
                  </div>
                </div>
              </div>

              <!-- Payment Info -->
              <div style="background-color: #f4f6f4; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Total Amount Paid</p>
                  <p style="font-size: 28px; font-weight: 700; color: #4f6f52;">₹${(event.price * registration.seats_reserved).toLocaleString()}</p>
                </div>
                <div style="text-align: right;">
                  <p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Price per seat</p>
                  <p style="font-size: 16px; font-weight: 600; color: #374151;">₹${event.price.toLocaleString()} × ${registration.seats_reserved}</p>
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
      </html>
    `);

    iframeDoc.close();

    // Wait for content to load, then print
    setTimeout(() => {
      // Temporarily change parent document title for PDF filename
      const originalTitle = document.title;
      document.title = event.id;

      iframeWindow.focus();
      iframeWindow.print();

      // Restore original title after print dialog
      setTimeout(() => {
        document.title = originalTitle;
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);
  }, [
    event.id,
    event.title,
    event.description,
    event.location,
    event.instructor,
    event.level,
    event.includes,
    event.price,
    formattedDate,
    formattedTime,
    duration,
    ticketId,
    registration.seats_reserved,
    user.name,
    user.email,
  ]);

  return (
    <div onClick={handleDownload} style={{ cursor: "pointer" }}>
      {trigger || (
        <Button className="h-12 w-full rounded-xl" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download Ticket
        </Button>
      )}
    </div>
  );
}
