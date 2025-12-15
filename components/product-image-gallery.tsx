"use client";

import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-w-0">
      <div className="bg-muted/30 group relative mb-4 aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-contain"
          priority
        />

        {/* Full Screen Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 opacity-100 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="View full screen"
            >
              <Maximize2 className="text-foreground h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="h-full max-h-[90vh] w-full max-w-[90vw] border-none bg-black/95 p-0 sm:max-w-screen-xl">
            <DialogTitle className="sr-only">Product Image</DialogTitle>
            <div className="relative flex h-full w-full items-center justify-center p-4">
              <Image
                src={images[selectedImage]}
                alt={productName}
                fill
                className="object-contain"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === selectedImage
                  ? "bg-primary"
                  : "bg-muted-foreground/30",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
