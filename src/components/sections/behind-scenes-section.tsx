"use client";

import { HERO_VIDEOS } from "@/consts/client";
import Link from "next/link";

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

        {/* Overlay button */}
        <Link
          href="/about"
          className="absolute bottom-4 left-4 inline-flex h-9 items-center rounded-lg bg-white/90 px-4 text-[13px] font-semibold text-neutral-900 shadow-lg backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-white lg:bottom-5 lg:left-5 lg:h-10 lg:px-5 lg:text-sm"
        >
          Our Story
        </Link>
      </div>

      <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed lg:text-base">
        A glimpse into how we throw, shape, and glaze each piece by hand in our
        Sangli studio.
      </p>
    </div>
  );
}
