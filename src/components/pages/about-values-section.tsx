import { Heart, Leaf, type LucideIcon, Sparkles } from "lucide-react";

const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Leaf,
    title: "Trust the Process",
    description:
      "Every piece of pottery teaches patience. From wedging clay to the final glaze, we embrace the journey and let the clay guide us.",
  },
  {
    icon: Heart,
    title: "Handmade with Heart",
    description:
      "Each piece is shaped by hand, carrying subtle variations that make it unique - just like handwritten notes and poems.",
  },
  {
    icon: Sparkles,
    title: "The Beauty of Letting Go",
    description:
      "Pottery teaches us to embrace uncertainty and find beauty in imperfection. Not every piece survives the kiln, and that's part of the art.",
  },
];

export function AboutValuesSection() {
  return (
    <section className="bg-background container mx-auto px-4 py-12 lg:px-8 lg:py-20">
      <div className="mb-8 text-center lg:mb-12">
        <p className="text-primary mb-2 text-sm font-medium tracking-wider uppercase">
          Our Values
        </p>
        <h2 className="font-display text-2xl font-bold text-neutral-900 lg:text-3xl">
          What We Stand For
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="shadow-soft rounded-2xl bg-white p-6 text-center"
            >
              <div className="bg-primary-lighter text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display mb-2 text-lg font-semibold text-neutral-900">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
