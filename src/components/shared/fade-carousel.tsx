"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { OptimizedImage } from "./optimized-image";

interface FadeCarouselProps {
  images: readonly string[];
  alt: string;
  className?: string;
  interval?: number;
  fit?: "cover" | "contain";
  kenBurns?: boolean;
  priority?: boolean;
  indicatorAlign?: "left" | "center" | "right";
  showIndicators?: boolean;
  showArrows?: boolean;
  sizes?: string;
  children?: ReactNode;
}

const CROSSFADE_SECONDS = 1.4;
const SWIPE_THRESHOLD = 40;

export function FadeCarousel({
  images,
  alt,
  className,
  interval = 5500,
  fit = "cover",
  kenBurns = true,
  priority = false,
  indicatorAlign = "right",
  showIndicators = true,
  showArrows = true,
  sizes = "100vw",
  children,
}: FadeCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = images.filter(Boolean);
  const count = slides.length;
  const hasMultiple = count > 1;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Pointer-based swipe / drag (works for both touch and mouse).
  const dragStartX = useRef<number | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  }, []);

  const handlePointerEnd = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartX.current === null) return;
      const dx = e.clientX - dragStartX.current;
      dragStartX.current = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    if (!hasMultiple || interval <= 0 || isPaused) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => window.clearInterval(id);
  }, [hasMultiple, interval, isPaused, count]);

  if (count === 0) return null;

  return (
    <div
      className={cn(
        "relative touch-pan-y overflow-hidden select-none",
        className,
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerCancel={() => (dragStartX.current = null)}
    >
      {/* Crossfading imagery */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_SECONDS, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={kenBurns ? { scale: 1.12 } : false}
            animate={kenBurns ? { scale: 1 } : undefined}
            transition={{
              duration: Math.max((interval + 2000) / 1000, 7),
              ease: "linear",
            }}
          >
            <OptimizedImage
              src={slides[index]}
              alt={alt}
              fill
              priority={priority && index === 0}
              showLoadingState={false}
              sizes={sizes}
              className={cn(
                "pointer-events-none",
                fit === "contain" ? "object-contain" : "object-cover",
              )}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Caller-provided overlay (gradients, copy, CTAs) */}
      {children}

      {/* Prev / next controls */}
      {showArrows && hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute top-1/2 left-3 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute top-1/2 right-3 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Progress indicators */}
      {showIndicators && hasMultiple && (
        <div
          className={cn(
            "absolute bottom-4 z-30 flex items-center gap-2 md:bottom-5",
            indicatorAlign === "left" && "left-5 md:left-8",
            indicatorAlign === "center" && "left-1/2 -translate-x-1/2",
            indicatorAlign === "right" && "right-5 md:right-8",
          )}
        >
          {slides.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={isActive}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1 overflow-hidden rounded-full bg-white/40 backdrop-blur-sm transition-all duration-500 hover:bg-white/70",
                  isActive ? "w-8" : "w-3",
                )}
              >
                {isActive && (
                  <motion.span
                    key={`fill-${index}-${isPaused}`}
                    className="block h-full w-full origin-left rounded-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPaused ? 0.5 : 1 }}
                    transition={{
                      duration: isPaused ? 0 : interval / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
