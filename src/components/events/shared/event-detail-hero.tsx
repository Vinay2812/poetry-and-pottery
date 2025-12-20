import { Share2 } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

interface EventDetailHeroProps {
  imageSrc: string;
  imageAlt: string;
  onShare: () => void;
  badges?: ReactNode;
}

export function EventDetailHero({
  imageSrc,
  imageAlt,
  onShare,
  badges,
}: EventDetailHeroProps) {
  return (
    <div className="relative mb-0 aspect-square w-full overflow-hidden lg:mb-4 lg:aspect-video lg:rounded-2xl">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      <button
        onClick={onShare}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        aria-label="Share event"
      >
        <Share2 className="text-foreground h-5 w-5" />
      </button>

      {badges && (
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {badges}
        </div>
      )}
    </div>
  );
}
