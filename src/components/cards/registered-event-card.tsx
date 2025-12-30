import type { EventRegistration } from "@/data/events/types";

import {
  EventCardContent,
  EventCardDescription,
  EventCardFooter,
  EventCardImage,
  EventCardMeta,
  EventCardWrapper,
  PricePill,
  StatusBadge,
} from "./event";

interface RegisteredEventCardProps {
  registration: EventRegistration;
}

export function RegisteredEventCard({
  registration,
}: RegisteredEventCardProps) {
  const { event, status } = registration;

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

  const imageUrl = event.image || "/placeholder.jpg";

  return (
    <EventCardWrapper href={`/events/${event.id}`}>
      <EventCardImage
        src={imageUrl}
        alt={event.title}
        topLeftBadge={<StatusBadge status={status} />}
        bottomRightBadge={<PricePill price={registration.price} />}
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
          seatsReserved={registration.seats_reserved}
        />
      </EventCardContent>
    </EventCardWrapper>
  );
}
