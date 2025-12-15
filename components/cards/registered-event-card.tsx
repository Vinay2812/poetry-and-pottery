import { Calendar, CheckCircle2, Clock, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { Event } from "@/lib/constants";

interface RegisteredEventCardProps {
  registrationId: string;
  event: Event;
  status: "confirmed" | "pending" | "completed";
  ticketNumber: string;
  registrationDate: string;
}

export function RegisteredEventCard({
  registrationId,
  event,
  status,
  ticketNumber,
  registrationDate,
}: RegisteredEventCardProps) {
  return (
    <Link
      href={`/events/registrations/${registrationId}`}
      className="group shadow-soft hover:shadow-card block overflow-hidden rounded-2xl bg-white transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Status Badge */}
        {status === "confirmed" && (
          <div className="absolute top-3 right-3">
            <Badge className="flex items-center gap-1 bg-white/90 text-green-600 backdrop-blur-sm hover:bg-white">
              <CheckCircle2 className="h-3 w-3" />
              Confirmed
            </Badge>
          </div>
        )}

        {/* Title and Date on Image */}
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3 className="mb-1 text-lg font-semibold text-white">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-white/90">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Time and Duration */}
        <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          {event.duration && (
            <div className="flex items-center gap-1.5">
              <span>•</span>
              <span>{event.duration}</span>
            </div>
          )}
        </div>

        {/* Registration Info */}
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary flex items-center gap-1 text-xs"
          >
            <Ticket className="h-3 w-3" />
            {ticketNumber}
          </Badge>
          <Badge variant="secondary" className="text-muted-foreground text-xs">
            Registered {registrationDate}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
