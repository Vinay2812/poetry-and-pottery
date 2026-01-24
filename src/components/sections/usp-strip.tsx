"use client";

import { Heart, Leaf, RotateCcw, Truck } from "lucide-react";

const USP_ITEMS = [
  { icon: Truck, label: "Free Shipping \u20B9500+" },
  { icon: Heart, label: "Handcrafted with Love" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: Leaf, label: "Sustainable Materials" },
];

export function USPStrip() {
  return (
    <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-neutral-200 py-5 lg:gap-x-12 lg:py-6">
        {USP_ITEMS.map((item) => (
          <div
            key={item.label}
            className="text-muted-foreground flex items-center gap-2 text-[13px] font-medium"
          >
            <item.icon className="text-primary h-4 w-4" strokeWidth={2} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
