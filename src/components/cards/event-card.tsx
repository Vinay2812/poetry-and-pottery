import type { EventWithRegistrationCount } from "@/types";

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
  event: EventWithRegistrationCount;
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

  const totalSeats = event.total_seats;
  const registrations = event._count?.event_registrations || 0;
  const isSoldOut = registrations >= totalSeats;

  return (
    <EventCardWrapper href={`/events/upcoming/${event.slug}`}>
      <EventCardImage
        src={event.image}
        alt={event.title}
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
          seatsInfo={{ current: registrations, total: totalSeats }}
        />
      </EventCardContent>
    </EventCardWrapper>
  );
}
