import type { EventBase } from "@/data/events/types";

import { cn } from "@/lib/utils";

import {
  EventCardContent,
  EventCardDescription,
  EventCardFooter,
  EventCardImage,
  EventCardMeta,
  EventCardWrapper,
  LevelBadge,
  PricePill,
  SoldOutBadge,
} from "./event";

interface EventCardProps {
  event: EventBase;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const availableSeats = event.available_seats;
  const isSoldOut = availableSeats === 0;

  return (
    <EventCardWrapper href={`/events/${event.id}`}>
      <EventCardImage
        src={event.image}
        alt={event.title}
        viewTransitionName={`event-image-${event.id}`}
        showOverlay={isSoldOut}
        topLeftBadge={
          <>
            {event.level && <LevelBadge level={event.level} />}
            {isSoldOut && <SoldOutBadge />}
          </>
        }
        bottomRightBadge={<PricePill price={event.price} />}
      />

      <EventCardContent>
        <EventCardMeta
          title={event.title}
          date={formattedDate}
          time={formattedTime}
        />
        <EventCardDescription description={event.description} />
        <EventCardFooter
          location={event.location}
          availableSeats={availableSeats}
        />
        <div
          className={cn(
            "mt-auto w-full rounded-lg py-2.5 text-center text-xs font-medium transition-colors lg:text-sm",
            isSoldOut
              ? "cursor-not-allowed bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
              : "bg-primary hover:bg-primary-hover text-white",
          )}
        >
          {isSoldOut ? "Sold Out" : "Book Now"}
        </div>
      </EventCardContent>
    </EventCardWrapper>
  );
}
