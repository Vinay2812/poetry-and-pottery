import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { Event } from "@/lib/constants";

interface RegisteredEventCardProps {
  event: Event;
  status: "confirmed" | "pending" | "completed";
  ticketNumber: string;
  registrationDate: string;
}

export function RegisteredEventCard({
  event,
  status,
  ticketNumber,
  registrationDate,
}: RegisteredEventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="shadow-soft hover:shadow-card focus-visible:ring-primary/30 block rounded-2xl bg-white p-4 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="flex gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl lg:h-32 lg:w-32">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-primary font-semibold">{event.title}</h3>
            {status === "confirmed" && (
              <span className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />
                Confirmed
              </span>
            )}
          </div>
          <div className="text-muted-foreground mb-3 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {event.date} • {event.time}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
            {event.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.duration}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-xs"
            >
              <Ticket className="h-3 w-3" />
              {ticketNumber}
            </Badge>
            <span className="text-muted-foreground text-xs">
              Registered on {registrationDate}
            </span>
          </div>
        </div>
        <ArrowRight className="text-muted-foreground h-5 w-5 shrink-0 self-center" />
      </div>
    </Link>
  );
}
