import { Calendar, Images, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

interface PastWorkshopCardProps {
  id: string;
  title: string;
  date: string;
  attendees: number;
  image: string;
  galleryCount?: number;
  highlights?: string[];
}

export function PastWorkshopCard({
  id,
  title,
  date,
  attendees,
  image,
  galleryCount,
  highlights,
}: PastWorkshopCardProps) {
  return (
    <Link
      href={`/events/past/${id}`}
      className="group shadow-soft hover:shadow-card block overflow-hidden rounded-2xl bg-white transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Gallery Badge */}
        {galleryCount && galleryCount > 0 && (
          <div className="absolute top-3 right-3">
            <Badge className="text-foreground flex items-center gap-1 bg-white/90 backdrop-blur-sm hover:bg-white">
              <Images className="h-3 w-3" />
              {galleryCount}
            </Badge>
          </div>
        )}

        {/* Title and Date on Image */}
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-white/90">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Attendees */}
        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          <span>{attendees} participants attended</span>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {highlights.slice(0, 3).map((highlight, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary text-xs"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
