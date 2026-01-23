import { MapPin, Ticket, Users } from "lucide-react";

interface EventCardFooterProps {
  location?: string | null;
  availableSeats?: number;
  seatsReserved?: number;
  attendees?: number;
  rightContent?: React.ReactNode;
}

export function EventCardFooter({
  location,
  availableSeats,
  seatsReserved,
  attendees,
  rightContent,
}: EventCardFooterProps) {
  return (
    <div className="mt-auto flex items-center justify-between pt-2 lg:pt-3">
      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
        {location !== undefined && (
          <>
            <MapPin className="h-3.5 w-3.5 text-rose-500" />
            <span className="truncate">
              {location ? location.split(",")[0] : "TBA"}
            </span>
          </>
        )}
        {attendees !== undefined && (
          <>
            <Users className="h-3.5 w-3.5" />
            <span>{attendees} attended</span>
          </>
        )}
      </div>

      {rightContent ? (
        rightContent
      ) : availableSeats !== undefined ? (
        <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500">
          <Users className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span>{availableSeats} spots</span>
        </div>
      ) : seatsReserved !== undefined ? (
        <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500">
          <Ticket className="text-primary h-3.5 w-3.5" strokeWidth={2.5} />
          <span>
            {seatsReserved} Seat{seatsReserved > 1 ? "s" : ""}
          </span>
        </div>
      ) : null}
    </div>
  );
}
