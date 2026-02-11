import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

interface EventHeroImageProps {
  id: string;
  imageUrl: string;
  title: string;
  level: string | null;
  isWorkshop: boolean;
  availableSeats: number | null;
  soldOut: boolean;
}

export function EventHeroImage({
  id,
  imageUrl,
  title,
  level,
  isWorkshop,
  availableSeats,
  soldOut,
}: EventHeroImageProps) {
  return (
    <div
      className="relative aspect-4/5 w-full overflow-hidden lg:aspect-21/9 lg:rounded-2xl"
      style={{ viewTransitionName: `event-image-${id}` }}
    >
      <OptimizedImage
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      {/* Level Badge on Image - Workshop Only */}
      {level && isWorkshop && (
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary rounded-lg px-3 py-1.5 text-xs font-semibold text-white">
            {level}
          </Badge>
        </div>
      )}

      {/* Low Spots Warning Badge */}
      {availableSeats != null && availableSeats <= 5 && !soldOut && (
        <div className="absolute bottom-4 left-4">
          <Badge
            variant="secondary"
            className="text-foreground rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold"
          >
            Only {availableSeats} spots left
          </Badge>
        </div>
      )}
    </div>
  );
}
