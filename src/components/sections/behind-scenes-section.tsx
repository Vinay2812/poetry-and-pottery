"use client";

import { HERO_VIDEOS } from "@/consts/client";

export function BehindScenesSection() {
  return (
    <div>
      <h2 className="font-display mb-5 text-xl font-bold tracking-tight lg:mb-6 lg:text-2xl">
        Behind the Scenes
      </h2>

      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl md:aspect-5/3 lg:rounded-[20px]">
        <video
          src={HERO_VIDEOS.behindTheScenes}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-label="Behind the scenes at Poetry & Pottery studio"
        />
      </div>

      <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed lg:text-base">
        A glimpse into how we throw, shape, and glaze each piece by hand in our
        Sangli studio.
      </p>
    </div>
  );
}
