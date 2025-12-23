import { EventRegistrationStatus, type RegistrationWithEvent } from "@/types";

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
  registration: RegistrationWithEvent;
}

export function RegisteredEventCard({
  registration,
}: RegisteredEventCardProps) {
  const { event } = registration;
  const status = registration.status as EventRegistrationStatus;

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
