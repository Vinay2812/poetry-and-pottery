"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    onSelect();

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <div className="min-w-0">
      <div className="bg-muted/30 group relative mb-4 w-full overflow-hidden rounded-2xl">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <button
                  type="button"
                  onClick={() => handleImageClick(index)}
                  className="relative aspect-square w-full cursor-zoom-in"
                >
                  <Image
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4 border-none bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white" />
              <CarouselNext className="right-4 border-none bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white" />
            </>
          )}
        </Carousel>
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
            <Carousel
              className="w-full"
              opts={{ startIndex: selectedIndex ?? 0 }}
              setApi={setCarouselApi}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-muted relative aspect-square max-h-[60vh] w-full overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${productName} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>

            {/* Counter */}
            {images.length > 1 && (
              <div className="text-muted-foreground mt-4 text-center text-sm">
                {currentSlide + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
