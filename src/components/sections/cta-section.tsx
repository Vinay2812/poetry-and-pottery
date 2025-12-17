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
          "container mx-auto px-4 py-12 lg:px-8 lg:py-20",
          className,
        )}
      >
        <div className="bg-primary relative overflow-hidden rounded-3xl p-8 lg:p-12">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
              {title}
            </h2>
            <p className="mb-6 text-white/90">{description}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                variant="secondary"
                className="text-primary w-full rounded-full bg-white transition-colors duration-150 hover:bg-white/90 sm:w-auto"
                size="lg"
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
                  className="w-full rounded-full border-white/30 bg-transparent text-white transition-colors duration-150 hover:bg-white/10 sm:w-auto"
                  size="lg"
                >
                  <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
            {children}
          </div>
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("px-4 py-6 lg:px-8", className)}>
      <div className="relative aspect-4/3 overflow-hidden rounded-3xl lg:aspect-21/9">
        {image && (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
        )}
        <div className="from-primary/90 to-primary/40 absolute inset-0 bg-linear-to-t" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          <h2 className="mb-2 text-2xl font-bold text-white lg:text-4xl">
            {title}
          </h2>
          <p className="mb-4 max-w-sm text-sm text-white/90">{description}</p>
          <Button
            asChild
            variant="secondary"
            className="text-primary w-fit rounded-full bg-white px-6 transition-colors duration-150 hover:bg-white/90"
          >
            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
