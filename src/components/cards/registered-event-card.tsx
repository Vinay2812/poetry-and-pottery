import type { RegistrationWithEvent } from "@/types";
import { Calendar, CheckCircle2, Clock, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

interface RegisteredEventCardProps {
  registration: RegistrationWithEvent;
}

// Helper function to calculate duration from DateTime objects
function calculateDuration(startsAt: Date, endsAt: Date): string {
  const diffMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}hr`;
  return `${hours}hr ${minutes}min`;
}

export function RegisteredEventCard({
  registration,
}: RegisteredEventCardProps) {
  const { event } = registration;
  // Registrations are always confirmed once they exist
  const isConfirmed = true;

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

  const duration = calculateDuration(event.starts_at, event.ends_at);
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
    <Link
      href={`/events/registrations/${registration.id}`}
      className="group shadow-soft hover:shadow-card block overflow-hidden rounded-2xl bg-white transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Status Badge */}
        {isConfirmed && (
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
            {formattedDate}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Time and Duration */}
        <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Registration Info */}
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary flex items-center gap-1 text-xs"
          >
            <Ticket className="h-3 w-3" />
            {registration.seats_reserved} seat
            {registration.seats_reserved > 1 ? "s" : ""}
          </Badge>
          <Badge variant="secondary" className="text-muted-foreground text-xs">
            Registered {registrationDate}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
