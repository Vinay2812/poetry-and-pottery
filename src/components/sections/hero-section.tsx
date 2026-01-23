"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { OptimizedImage } from "@/components/shared";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  aspectRatio?: "portrait" | "landscape";
  overlayGradient?: string;
  className?: string;
}

export function HeroSection({
  image,
  imageAlt,
  title,
  subtitle,
  badge,
  children,
  aspectRatio = "portrait",
  overlayGradient = "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn("container mx-auto px-4 py-4 lg:px-8 lg:py-12", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[2.5rem] shadow-2xl",
          aspectRatio === "portrait"
            ? "aspect-square lg:aspect-[21/9]"
            : "aspect-[4/3] lg:aspect-[21/9]",
        )}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <OptimizedImage
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </motion.div>

        <div className={cn("absolute inset-0", overlayGradient)} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl"
          >
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-wider text-white backdrop-blur-md"
              >
                {badge}
              </motion.span>
            )}

            <h1 className="font-display mb-4 text-4xl leading-tight font-bold tracking-tight text-white lg:mb-6 lg:text-7xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mb-6 max-w-xl text-lg leading-relaxed font-medium text-white/90 lg:mb-10 lg:text-xl">
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
