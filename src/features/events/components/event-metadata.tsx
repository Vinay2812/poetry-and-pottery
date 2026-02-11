import { Calendar, Clock, MapPin, Users } from "lucide-react";

import { cn } from "@/lib/utils";

interface EventMetadataProps {
  formattedDate: string;
  formattedTime: string;
  duration: string;
  location: string | null;
  fullLocation: string | null;
  availableSeats: number | null;
}

export function EventMetadata({
  formattedDate,
  formattedTime,
  duration,
  location,
  fullLocation,
  availableSeats,
}: EventMetadataProps) {
  return (
    <div className="mb-5 space-y-2.5">
      <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
        <Calendar className="h-4 w-4 text-neutral-400" />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
        <Clock className="h-4 w-4 text-neutral-400" />
        <span>
          {formattedTime} ({duration})
        </span>
      </div>
      {location && (
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <MapPin className="h-4 w-4 text-neutral-400" />
          <span>{fullLocation || location}</span>
        </div>
      )}
      {availableSeats != null && (
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <Users className="h-4 w-4 text-neutral-400" />
          <span
            className={cn(availableSeats <= 5 && "font-medium text-amber-600")}
          >
            {availableSeats} spots remaining
          </span>
        </div>
      )}
    </div>
  );
}
