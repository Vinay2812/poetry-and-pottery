"use client";
import { ArrowRight, LayoutGrid, Package, Paintbrush } from "lucide-react";
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
      className="group hover:bg-cream flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all duration-200 md:gap-4 md:rounded-2xl md:p-3.5"
      onClick={onClick}
    >
      <div className="bg-primary shadow-primary-sm relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] md:h-12 md:w-12 md:rounded-xl">
        <Icon
          className="h-[22px] w-[22px] text-white md:h-6 md:w-6"
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
      <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-500" />
    </div>
  );
}

export function CustomizeSection() {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          Customize your piece
        </h2>
        <Link
          href="/customize"
          className="text-primary hover:text-primary-hover text-sm font-semibold transition-colors"
        >
          Customize →
        </Link>
      </div>

      <p className="text-muted-foreground mb-5 text-sm leading-6">
        Choose a shape, pick your colors and finish, then add a personal note —
        we&apos;ll handcraft a piece made just for you.
      </p>

      <div className="border-border shadow-card rounded-3xl border p-3 md:p-4">
        <p className="mb-1 px-3 pt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
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
    </section>
  );
}
