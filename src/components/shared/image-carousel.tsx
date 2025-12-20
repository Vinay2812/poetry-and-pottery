"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  onImageClick?: (index: number) => void;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  dotsClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  startIndex?: number;
  loop?: boolean;
  onIndexChange?: (index: number) => void;
}

export function ImageCarousel({
  images,
  alt,
  onImageClick,
  priority = false,
  className,
  imageClassName,
  dotsClassName,
  showArrows = true,
  showDots = true,
  showCounter = false,
  startIndex = 0,
  loop = true,
  onIndexChange,
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    if (!api) return;

    // Set initial slide
    if (startIndex !== 0) {
      api.scrollTo(startIndex, true);
    }

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrent(index);
      onIndexChange?.(index);
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800",
          className,
        )}
      >
        <div className="relative aspect-square w-full">
          <Image
            src="/placeholder.jpg"
            alt={alt}
            fill
            className={cn("object-cover", imageClassName)}
            priority={priority}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800",
        className,
      )}
    >
      <Carousel setApi={setApi} opts={{ startIndex, loop }} className="w-full">
        <CarouselContent className="ml-0">
          {images.map((url, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "relative aspect-square basis-full overflow-hidden pl-0",
                onImageClick && "cursor-pointer",
              )}
              onClick={() => onImageClick?.(index)}
            >
              <Image
                src={url || "/placeholder.jpg"}
                alt={alt}
                fill
                className={cn(
                  "object-cover transition-transform duration-700 ease-in-out group-hover:scale-105",
                  imageClassName,
                )}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                priority={priority && index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMultipleImages && (
          <>
            {showArrows && (
              <>
                <CarouselPrevious
                  className="left-2 z-20 border-none bg-white/70 text-neutral-900 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-black/70 dark:text-white dark:hover:bg-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    api?.scrollPrev();
                  }}
                />
                <CarouselNext
                  className="right-2 z-20 border-none bg-white/70 text-neutral-900 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-black/70 dark:text-white dark:hover:bg-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    api?.scrollNext();
                  }}
                />
              </>
            )}

            {showDots && (
              <div
                className={cn(
                  "absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-sm transition-all duration-300",
                  dotsClassName,
                )}
              >
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      api?.scrollTo(idx);
                    }}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      idx === current
                        ? "w-5 bg-white"
                        : "bg-white/50 hover:bg-white/80",
                    )}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Carousel>

      {showCounter && hasMultipleImages && (
        <div className="absolute top-4 left-4 z-20 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Overlay Gradient for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
