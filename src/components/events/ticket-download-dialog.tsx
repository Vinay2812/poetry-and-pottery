"use client";

import type { EventRegistration } from "@/data/events/types";
import { Download } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { printHtmlDocument } from "@/lib/print-utils";
import { generateTicketHtml } from "@/lib/ticket-template";

interface TicketDownloadDialogProps {
  registration: EventRegistration;
  trigger?: React.ReactNode;
}

export function TicketDownloadDialog({
  registration,
  trigger,
}: TicketDownloadDialogProps) {
  const handleDownload = useCallback(() => {
    const html = generateTicketHtml(registration);
    printHtmlDocument(html, registration.event.id);
  }, [registration]);

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
