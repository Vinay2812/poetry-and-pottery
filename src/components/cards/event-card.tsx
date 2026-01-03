import type { EventBase } from "@/data/events/types";

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
      </EventCardContent>
    </EventCardWrapper>
  );
}
