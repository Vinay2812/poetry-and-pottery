import type { EventBase } from "@/data/events/types";

import { Rating } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import {
  EventCardContent,
  EventCardDescription,
  EventCardFooter,
  EventCardImage,
  EventCardMeta,
  EventCardWrapper,
  GalleryBadge,
} from "./event";

interface PastWorkshopCardProps {
  event: EventBase;
}

export function PastWorkshopCard({ event }: PastWorkshopCardProps) {
  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = event.image || "/placeholder.jpg";
  const attendees = event.registrations_count;
  const highlights = event.highlights || [];
  const gallery = event.gallery || [];

  return (
    <EventCardWrapper href={`/events/${event.id}`}>
      <EventCardImage
        src={imageUrl}
        alt={event.title}
        topLeftBadge={
          gallery.length > 0 ? <GalleryBadge count={gallery.length} /> : null
        }
      />

      <EventCardContent>
        <EventCardMeta title={event.title} date={formattedDate} />
        <EventCardDescription description={event.description} />

        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {highlights.slice(0, 2).map((highlight, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        )}

        <EventCardFooter
          attendees={attendees}
          rightContent={
            event.avg_rating ? (
              <Rating
                rating={event.avg_rating}
                reviewCount={event.reviews_count}
                size="sm"
                className="origin-right scale-90"
              />
            ) : null
          }
        />
      </EventCardContent>
    </EventCardWrapper>
  );
}
