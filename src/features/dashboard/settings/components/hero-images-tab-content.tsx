"use client";

import { useState } from "react";

import { OptimizedImage } from "@/components/shared";
import { Input } from "@/components/ui/input";

import type { HeroImagesViewModel } from "../types";

interface ImagePreviewProps {
  src: string;
  alt: string;
}

function ImagePreview({ src, alt }: ImagePreviewProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return null;
  }

  return (
    <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg border bg-neutral-100">
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

interface HeroImagesTabContentProps {
  heroImages: HeroImagesViewModel;
  onHeroImagesChange: (images: HeroImagesViewModel) => void;
}

export function HeroImagesTabContent({
  heroImages,
  onHeroImagesChange,
}: HeroImagesTabContentProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Home Page Hero</label>
        <Input
          value={heroImages.home}
          onChange={(e) =>
            onHeroImagesChange({ ...heroImages, home: e.target.value })
          }
          placeholder="https://example.com/image.jpg"
        />
        <ImagePreview src={heroImages.home} alt="Home page hero" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">About Page Hero</label>
        <Input
          value={heroImages.ourStory}
          onChange={(e) =>
            onHeroImagesChange({ ...heroImages, ourStory: e.target.value })
          }
          placeholder="https://example.com/image.jpg"
        />
        <ImagePreview src={heroImages.ourStory} alt="About page hero" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Products Page Hero</label>
        <Input
          value={heroImages.products}
          onChange={(e) =>
            onHeroImagesChange({ ...heroImages, products: e.target.value })
          }
          placeholder="https://example.com/image.jpg"
        />
        <ImagePreview src={heroImages.products} alt="Products page hero" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Events Page Hero</label>
        <Input
          value={heroImages.events}
          onChange={(e) =>
            onHeroImagesChange({ ...heroImages, events: e.target.value })
          }
          placeholder="https://example.com/image.jpg"
        />
        <ImagePreview src={heroImages.events} alt="Events page hero" />
      </div>
    </div>
  );
}
