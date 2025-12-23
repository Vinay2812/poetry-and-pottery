"use client";

import { X } from "lucide-react";
import { useCallback, useState } from "react";

import { ImageCarousel } from "@/components/shared";
import { CarouselApi } from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <div className="min-w-0">
      <div className="group relative w-full overflow-hidden lg:rounded-2xl">
        <ImageCarousel
          images={images}
          alt={productName}
          onImageClick={handleImageClick}
          className="w-full"
          imageClassName="object-cover cursor-zoom-in"
        />
      </div>

      {/* Fullscreen Image Viewer */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && handleCloseViewer()}
      >
        <DialogContent
          className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0"
          showCloseButton={false}
        >
          <div className="flex flex-col p-4">
            {/* Header with close button */}
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-base font-medium">
                {productName}
              </DialogTitle>
              <DialogClose className="text-muted-foreground hover:text-foreground rounded-sm transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            {/* Carousel */}
            <div className="relative">
              <ImageCarousel
                images={images}
                alt={productName}
                startIndex={selectedIndex ?? 0}
                imageClassName="object-contain"
                showDots={false}
                showCounter={true}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
