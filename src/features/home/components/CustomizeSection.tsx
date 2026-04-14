"use client";
import { ArrowRight, LayoutGrid, Package, Paintbrush } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const CUSTOMIZE_STEPS = [
  {
    icon: LayoutGrid,
    title: "Choose Category",
    description: "Mug, vase, bowl, or plate",
  },
  {
    icon: Paintbrush,
    title: "Pick Your Options",
    description: "Size, color, shape & text",
  },
  {
    icon: Package,
    title: "Get Your Piece",
    description: "Handcrafted just for you",
  },
] as const;

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function StepCard({
  icon: Icon,
  title,
  description,
  step,
}: StepCardProps & { step: number }) {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/customize");
  }, [router]);
  return (
    <div
      className="group hover:border-border hover:bg-cream hover:shadow-soft flex cursor-pointer gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 md:gap-4 md:rounded-2xl md:p-4 lg:p-5"
      onClick={onClick}
    >
      <div className="bg-primary shadow-primary-sm relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] md:h-12 md:w-12 md:rounded-xl lg:h-14 lg:w-14">
        <Icon
          className="h-[22px] w-[22px] text-white md:h-6 md:w-6 lg:h-7 lg:w-7"
          strokeWidth={2}
        />
        <span className="bg-terracotta absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
          {step}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold text-neutral-900 md:text-sm lg:text-base">
          {title}
        </div>
        <div className="text-[11px] text-neutral-500 md:text-xs lg:text-sm">
          {description}
        </div>
      </div>
    </div>
  );
}

export function CustomizeSection() {
  return (
    <section>
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between lg:mb-6">
          <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
            {"Customize your piece"}
          </h2>
          <Link
            href="/customize"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 text-sm font-medium transition-colors"
          >
            Customize
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Unified Layout - Vertical on mobile, horizontal on tablet+ */}
        <div className="border-border shadow-card overflow-hidden rounded-3xl border">
          <div className="flex flex-col md:grid md:grid-cols-2">
            {/* Hero Image */}
            <div className="bg-clay relative flex aspect-[4/3] items-center justify-center overflow-hidden md:aspect-auto md:min-h-[300px]">
              <Image
                src="https://images.pexels.com/photos/6312157/pexels-photo-6312157.jpeg?w=800&h=600"
                alt="Custom pottery piece"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Steps List */}
            <div className="bg-cream flex flex-col justify-center gap-1 p-5 md:gap-2 md:p-6 lg:gap-3 lg:p-8">
              <p className="mb-1 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                How it works
              </p>
              {CUSTOMIZE_STEPS.map((step, index) => (
                <StepCard
                  key={step.title}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  step={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
