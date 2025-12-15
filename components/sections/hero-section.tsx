import Image from "next/image";
import { ReactNode } from "react";

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
  overlayGradient = "bg-linear-to-t from-black/70 via-black/30 to-transparent",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn("container mx-auto px-4 py-6 lg:px-8 lg:py-12", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          aspectRatio === "portrait"
            ? "aspect-[4/5] lg:aspect-21/9"
            : "aspect-4/3 lg:aspect-21/9",
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className={cn("absolute inset-0", overlayGradient)} />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          {badge && (
            <span className="bg-primary text-primary-foreground mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium">
              {badge}
            </span>
          )}
          <h1 className="mb-2 text-4xl font-bold text-white lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-lg text-sm text-white/90 lg:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
