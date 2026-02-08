"use client";

import type { DailyWorkshopPricingTier } from "@/data/daily-workshops/types";
import { ArrowRight, Clock3, Users } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface WorkshopsSectionProps {
  pricingTiers: DailyWorkshopPricingTier[];
}

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function WorkshopsSection({ pricingTiers }: WorkshopsSectionProps) {
  const sortedTiers = [...pricingTiers].sort((a, b) => a.hours - b.hours);
  const featuredTiers = sortedTiers.slice(0, 4);

  return (
    <section>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          Daily Workshops
        </h2>
        <Link
          href="/events/daily-workshops"
          className="text-primary hover:text-primary-hover text-sm font-semibold transition-colors"
        >
          Book Now →
        </Link>
      </div>

      <p className="text-muted-foreground mb-5 text-sm leading-6">
        Pick your own days, choose your own hours, and build pottery at your
        pace between 1 PM and 7 PM.
      </p>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2.5">
          {featuredTiers.map((tier, index) => (
            <Link
              key={tier.id}
              href="/events/daily-workshops"
              className={cn(
                "hover:border-primary/40 block rounded-2xl border bg-white px-4 py-3 shadow-sm transition-colors",
                index === 1 && "border-primary/60 bg-primary-lighter",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {tier.hours} Hour Session
                  </p>
                  <p className="text-xs text-neutral-500">
                    {tier.pieces_per_person} pieces per person
                  </p>
                </div>
                <p className="text-primary text-lg font-bold">
                  {formatCurrency(tier.price_per_person)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/events/daily-workshops"
          className="group block rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="bg-primary-lighter text-primary rounded-full px-3 py-1 text-xs font-semibold uppercase">
              Flexible Booking
            </span>
            <ArrowRight className="text-primary h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>

          <h3 className="font-display mb-2 text-xl font-bold tracking-tight text-neutral-900">
            Design Your Own Pottery Schedule
          </h3>
          <p className="text-muted-foreground mb-4 text-sm leading-6">
            Select one or more hourly slots across multiple days, then reserve
            in one booking.
          </p>

          <div className="space-y-2 text-sm text-neutral-700">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-neutral-500" />
              <span>Daily slots from 1:00 PM to 7:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-neutral-500" />
              <span>Book for solo or group sessions</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
