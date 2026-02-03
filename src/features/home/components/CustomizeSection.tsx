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

function StepCard({ icon: Icon, title, description }: StepCardProps) {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/customize");
  }, [router]);
  return (
    <div
      className="shadow-soft flex gap-3 rounded-xl bg-white p-3 md:gap-4 md:rounded-2xl md:p-4 lg:p-5"
      onClick={onClick}
    >
      <div className="bg-primary-light flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] md:h-12 md:w-12 md:rounded-xl lg:h-14 lg:w-14">
        <Icon
          className="text-primary h-[22px] w-[22px] md:h-6 md:w-6 lg:h-7 lg:w-7"
          strokeWidth={2}
        />
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
    <section className="bg-neutral-100">
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
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:gap-10">
          {/* Hero Image */}
          <div className="bg-clay relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl md:aspect-auto md:min-h-[240px] md:rounded-[20px]">
            <Image
              src="https://images.pexels.com/photos/6312157/pexels-photo-6312157.jpeg?w=800&h=600"
              alt="Custom pottery piece"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Steps List */}
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            {CUSTOMIZE_STEPS.map((step) => (
              <StepCard
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
