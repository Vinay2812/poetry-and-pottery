"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { OptimizedImage } from "@/components/shared";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image?: string;
  video?: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function HeroSection({
  image,
  video,
  imageAlt,
  title,
  subtitle,
  badge,
  children,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "md:container md:mx-auto md:px-4 md:py-4 lg:px-8 lg:py-6",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-5/3 md:rounded-[2rem] md:shadow-xl lg:aspect-21/9 lg:rounded-[2.5rem]">
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
              className="object-cover"
            />
          ) : null}
        </motion.div>

        {/* Gradient overlay: bottom-up on mobile, left-right on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.85)] via-[rgba(26,26,26,0.3)] to-transparent lg:bg-gradient-to-r lg:from-[rgba(26,26,26,0.85)] lg:via-[rgba(26,26,26,0.4)] lg:to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 lg:p-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-xl"
          >
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md md:mb-3 md:px-4 md:py-1.5 md:text-[11px] lg:mb-5"
              >
                {badge}
              </motion.span>
            )}

            <TextGenerateEffect
              words={title}
              className="font-display mb-3 max-w-[70%] text-2xl leading-[1.15] font-bold tracking-tight text-white md:mb-4 md:max-w-none md:text-4xl lg:mb-6 lg:text-6xl"
            />

            {subtitle && (
              <p className="mb-4 hidden max-w-[260px] text-xs leading-normal font-normal text-white/80 md:mb-4 md:block md:max-w-md md:text-sm md:leading-relaxed md:text-white/85 lg:mb-6 lg:text-base">
                {subtitle}
              </p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
