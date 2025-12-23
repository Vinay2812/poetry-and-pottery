"use client";

import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react";
import { useCallback, useState } from "react";

import { ImageCarousel, OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

interface DashboardImagePreviewProps {
  images: string[];
  alt: string;
  aspectRatio?: "square" | "video";
  emptyIcon?: React.ReactNode;
  emptyText?: string;
  className?: string;
}

export function DashboardImagePreview({
  images,
  alt,
  aspectRatio = "square",
  emptyIcon,
  emptyText = "No image",
  className,
}: DashboardImagePreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = useCallback(() => {
    setSelectedIndex(currentIndex);
  }, [currentIndex]);

  const handleCloseViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length],
  );

  const handleDotClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  const aspectClass =
    aspectRatio === "video" ? "aspect-video" : "aspect-square";
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  if (!hasImages) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-center bg-neutral-100 text-neutral-400",
          aspectClass,
          className,
        )}
      >
        {emptyIcon || <span className="text-sm">{emptyText}</span>}
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "relative w-full cursor-zoom-in overflow-hidden bg-neutral-100",
          aspectClass,
          className,
        )}
        onClick={handleImageClick}
      >
        <OptimizedImage
          src={images[currentIndex]}
          alt={alt}
          fill
          className="object-cover transition-transform hover:scale-105"
        />

        {hasMultipleImages && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 z-10 size-8 -translate-y-1/2 rounded-full border-none bg-white/70 text-neutral-900 shadow-sm backdrop-blur-sm hover:bg-white"
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 z-10 size-8 -translate-y-1/2 rounded-full border-none bg-white/70 text-neutral-900 shadow-sm backdrop-blur-sm hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRightIcon className="size-4" />
            </Button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleDotClick(e, idx)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    idx === currentIndex
                      ? "w-5 bg-white"
                      : "bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && handleCloseViewer()}
      >
        <DialogContent
          className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0"
          showCloseButton={false}
        >
          <div className="flex flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-base font-medium">{alt}</DialogTitle>
              <DialogClose className="text-muted-foreground hover:text-foreground rounded-sm transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="relative">
              {hasMultipleImages ? (
                <ImageCarousel
                  images={images}
                  alt={alt}
                  startIndex={selectedIndex ?? 0}
                  imageClassName="object-contain"
                  showDots={false}
                  showCounter={true}
                />
              ) : (
                <div className="relative aspect-square w-full">
                  <OptimizedImage
                    src={images[0]}
                    alt={alt}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
