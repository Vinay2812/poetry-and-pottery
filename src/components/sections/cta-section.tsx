"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  image?: string;
  imageAlt?: string;
  variant?: "image" | "solid";
  className?: string;
  children?: ReactNode;
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  image,
  imageAlt,
  variant = "image",
  className,
  children,
}: CTASectionProps) {
  if (variant === "solid") {
    return (
      <section
        className={cn(
          "container mx-auto px-4 py-8 lg:px-8 lg:py-20",
          className,
        )}
      >
        <div className="bg-primary relative overflow-hidden rounded-[2.5rem] p-6 shadow-2xl lg:p-16">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white lg:mb-6 lg:text-5xl">
              {title}
            </h2>
            <p className="mb-6 text-lg text-white/90 lg:mb-8 lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                variant="secondary"
                className="text-primary h-12 rounded-full bg-white px-8 text-base font-medium shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white/95"
              >
                <Link href={primaryButtonHref}>
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {secondaryButtonText && secondaryButtonHref && (
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-white/30 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:bg-white/10"
                >
                  <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
            {children}
          </div>

          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("container mx-auto px-4 py-4 lg:px-8 lg:py-12", className)}
    >
      <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[21/9]">
        {image && (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl">
              {title}
            </h2>
            <p className="mb-8 max-w-lg text-base text-white/90 lg:text-lg">
              {description}
            </p>
            <Button
              asChild
              className="text-primary h-12 rounded-full bg-white px-8 text-base font-medium shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white/95"
            >
              <Link href={primaryButtonHref}>{primaryButtonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
