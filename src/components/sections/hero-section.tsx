"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { OptimizedImage } from "@/components/shared";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
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
  overlayGradient = "bg-gradient-to-t from-black/70 via-black/10 to-transparent",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn("container mx-auto px-4 py-4 lg:px-8 lg:py-6", className)}
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] shadow-xl lg:aspect-[2.5/1] lg:rounded-[2.5rem]">
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
        <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-16">
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
                className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase backdrop-blur-md lg:mb-5"
              >
                {badge}
              </motion.span>
            )}

            <TextGenerateEffect
              words={title}
              className="font-display mb-5 text-4xl leading-[1.1] font-bold tracking-tight text-white lg:mb-8 lg:text-7xl"
            />

            {subtitle && (
              <p className="mb-5 max-w-lg text-sm leading-relaxed font-normal text-white/85 lg:mb-7 lg:text-lg">
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
