import { AnimatedCounter } from "@/components/shared";

const STATS = [
  { value: 100, suffix: "+", label: "Happy Customers" },
  { value: 200, suffix: "+", label: "Pieces Crafted" },
  { value: 10, suffix: "+", label: "Workshops Hosted" },
  { value: 5, suffix: "+", label: "Open Mic Nights" },
];

export function AboutStatsSection() {
  return (
    <section className="bg-primary-lighter py-10 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-primary text-3xl font-bold lg:text-4xl"
              />
              <p className="text-muted-foreground mt-1 text-sm lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
