import { X } from "lucide-react";

import { ImageCarousel, OptimizedImage } from "@/components/shared";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const MAX_VISIBLE_IMAGES = 4;

interface GalleryGridProps {
  gallery: string[];
  onOpenGallery: (index: number) => void;
}

function GalleryGrid({ gallery, onOpenGallery }: GalleryGridProps) {
  const remainingImages = gallery.length - MAX_VISIBLE_IMAGES;

  return (
    <div className="grid grid-cols-2 gap-3">
      {gallery.slice(0, MAX_VISIBLE_IMAGES).map((image, index) => {
        const isLastVisible =
          index === MAX_VISIBLE_IMAGES - 1 && remainingImages > 0;

        return (
          <button
            key={index}
            onClick={() => onOpenGallery(index)}
            className="group focus:ring-primary relative aspect-square overflow-hidden rounded-xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <OptimizedImage
              src={image}
              alt={`Workshop gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

            {isLastVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-2xl font-bold text-white">
                  +{remainingImages}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface PastWorkshopGalleryProps {
  gallery: string[];
  selectedImageIndex: number | null;
  onOpenGallery: (index: number) => void;
  onCloseGallery: () => void;
}

export function PastWorkshopGallery({
  gallery,
  selectedImageIndex,
  onOpenGallery,
  onCloseGallery,
}: PastWorkshopGalleryProps) {
  return (
    <>
      <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Gallery
          </h2>
          <span className="text-xs text-neutral-400">
            ({gallery.length} photos)
          </span>
        </div>
        <GalleryGrid gallery={gallery} onOpenGallery={onOpenGallery} />
      </div>

      {/* Gallery Lightbox */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && onCloseGallery()}
      >
        <DialogContent
          className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0"
          showCloseButton={false}
        >
          <div className="flex flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-base font-medium">
                Gallery
              </DialogTitle>
              <DialogClose className="text-muted-foreground hover:text-foreground rounded-sm transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="relative">
              <ImageCarousel
                images={gallery}
                alt="Workshop gallery image"
                startIndex={selectedImageIndex ?? 0}
                imageClassName="object-contain"
                showDots={false}
                showCounter={true}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
