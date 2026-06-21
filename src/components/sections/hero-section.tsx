"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { FadeCarousel, OptimizedImage } from "@/components/shared";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image?: string;
  images?: readonly string[];
  video?: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  /** Overlay rendered on top of the media frame (e.g. an "Our Story" button). */
  mediaOverlay?: ReactNode;
  className?: string;
}

export function HeroSection({
  image,
  images,
  video,
  imageAlt,
  title,
  subtitle,
  badge,
  children,
  mediaOverlay,
  className,
}: HeroSectionProps) {
  const hasCarousel = !!images && images.length > 0;

  return (
    <section
      className={cn(
        "container mx-auto px-4 pt-3 pb-8 lg:px-8 lg:pt-4 lg:pb-12",
        className,
      )}
    >
      <div className="grid items-center gap-8 md:grid-cols-[340px_1fr] md:gap-10 lg:grid-cols-[440px_1fr] lg:gap-16">
        {/* Portrait media — full-bleed cover, sized to the studio photography */}
        <div className="relative mx-auto w-full max-w-[400px] md:mx-0 md:max-w-none">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-black/5">
            {hasCarousel ? (
              <FadeCarousel
                images={images}
                alt={imageAlt}
                className="absolute inset-0"
                priority
                indicatorAlign="right"
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 340px, 90vw"
              >
                {/* Subtle base gradient keeps the controls legible */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
              </FadeCarousel>
            ) : (
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {video ? (
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    aria-label={imageAlt}
                  />
                ) : image ? (
                  <OptimizedImage
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover"
                    showLoadingState={false}
                  />
                ) : null}
              </motion.div>
            )}

            {mediaOverlay}
          </div>
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col justify-center md:pr-2 lg:pr-6"
        >
          {badge && (
            <span className="bg-primary-light text-primary mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase md:mb-5 md:px-4 md:py-1.5 md:text-[11px]">
              <span className="bg-primary inline-block h-1.5 w-1.5 rounded-full" />
              {badge}
            </span>
          )}

          <TextGenerateEffect
            words={title}
            className="font-display mb-4 text-3xl leading-[1.1] font-bold tracking-tight text-neutral-900 md:mb-5 md:text-4xl lg:text-5xl xl:text-6xl"
          />

          {subtitle && (
            <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed md:mb-7 md:text-base">
              {subtitle}
            </p>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
