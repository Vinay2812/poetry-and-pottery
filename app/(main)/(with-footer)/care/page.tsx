"use client";

import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  Flame,
  Hand,
  Heart,
  Leaf,
  Sparkles,
  Thermometer,
  XCircle,
  Zap,
} from "lucide-react";

import { MobileHeader } from "@/components/layout";
import { CTASection, SectionHeader } from "@/components/sections";

const CARE_CATEGORIES = [
  {
    icon: Droplets,
    title: "Cleaning",
    description: "Keep your pottery looking beautiful",
    tips: [
      {
        do: true,
        text: "Hand wash with warm water and mild dish soap",
      },
      {
        do: true,
        text: "Use a soft sponge or cloth to clean surfaces",
      },
      {
        do: true,
        text: "Dry thoroughly with a soft towel",
      },
      {
        do: false,
        text: "Use abrasive scrubbers or steel wool",
      },
      {
        do: false,
        text: "Soak pottery for extended periods",
      },
      {
        do: false,
        text: "Use harsh chemical cleaners or bleach",
      },
    ],
  },
  {
    icon: Flame,
    title: "Heat & Temperature",
    description: "Protect your pieces from thermal shock",
    tips: [
      {
        do: true,
        text: "Allow pottery to reach room temperature before heating",
      },
      {
        do: true,
        text: "Use trivets or mats under hot pieces",
      },
      {
        do: true,
        text: "Most pieces are oven-safe up to 400°F (204°C)",
      },
      {
        do: false,
        text: "Place cold pottery directly on high heat",
      },
      {
        do: false,
        text: "Use on direct flame or stovetop",
      },
      {
        do: false,
        text: "Subject to sudden temperature changes",
      },
    ],
  },
  {
    icon: Zap,
    title: "Microwave & Dishwasher",
    description: "Modern convenience guidelines",
    tips: [
      {
        do: true,
        text: "Most glazed pieces are microwave safe",
      },
      {
        do: true,
        text: "Place on top rack of dishwasher with mild detergent",
      },
      {
        do: true,
        text: "Check product tags for specific guidelines",
      },
      {
        do: false,
        text: "Microwave pieces with metallic glazes or accents",
      },
      {
        do: false,
        text: "Use harsh dishwasher detergents",
      },
      {
        do: false,
        text: "Overload dishwasher causing pieces to touch",
      },
    ],
  },
  {
    icon: Hand,
    title: "Handling & Storage",
    description: "Prevent chips and cracks",
    tips: [
      {
        do: true,
        text: "Handle with care, supporting from the base",
      },
      {
        do: true,
        text: "Store with felt or cloth between stacked pieces",
      },
      {
        do: true,
        text: "Keep in a stable location away from edges",
      },
      {
        do: false,
        text: "Stack heavy items on top of delicate pieces",
      },
      {
        do: false,
        text: "Pick up by handles or rims alone",
      },
      {
        do: false,
        text: "Store in areas with high humidity or moisture",
      },
    ],
  },
];

const GLAZE_TYPES = [
  {
    name: "Matte Glazes",
    icon: Leaf,
    description:
      "Our signature matte finishes have a soft, velvety texture. They may show water spots more easily than glossy glazes.",
    care: "Hand wash and dry immediately for best results. Avoid abrasive cleaners that can dull the surface.",
  },
  {
    name: "Glossy Glazes",
    icon: Sparkles,
    description:
      "High-gloss finishes are durable and easy to clean. They resist staining and are generally dishwasher safe.",
    care: "Dishwasher safe on top rack. Wipe with a soft cloth to maintain shine.",
  },
  {
    name: "Metallic Accents",
    icon: Heart,
    description:
      "Pieces with gold, platinum, or copper accents add a touch of elegance. These require special care.",
    care: "Hand wash only. Never microwave. Avoid contact with acidic foods for extended periods.",
  },
  {
    name: "Unglazed / Raw Clay",
    icon: Thermometer,
    description:
      "Unglazed sections have a natural, porous texture. They may absorb liquids if not properly cared for.",
    care: "Season before first use. Hand wash and dry immediately. Not recommended for liquids.",
  },
];

const WARNINGS = [
  {
    icon: AlertTriangle,
    title: "Thermal Shock",
    description:
      "Never move pottery directly from refrigerator to oven or vice versa. Allow pieces to gradually reach room temperature first.",
  },
  {
    icon: AlertTriangle,
    title: "Crazing",
    description:
      "Fine lines in the glaze (crazing) can develop over time and is a natural characteristic of handmade pottery. This doesn't affect functionality.",
  },
  {
    icon: AlertTriangle,
    title: "Food Safety",
    description:
      "Items marked as decorative only are not food safe. Check product descriptions before using for food or beverages.",
  },
];

export default function CarePage() {
  return (
    <>
      <MobileHeader title="Care Instructions" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-6xl">
              Care Instructions
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With proper care, your handcrafted pottery will bring joy for
              years to come. Follow these guidelines to keep your pieces
              beautiful and functional.
            </p>
          </div>
        </section>

        {/* Care Categories */}
        <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {CARE_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="shadow-soft rounded-2xl bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-subtle-green flex h-12 w-12 items-center justify-center rounded-xl">
                    <category.icon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {category.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {tip.do ? (
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      )}
                      <span className="text-sm">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Glaze Types */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeader
              title="Glaze-Specific Care"
              description="Different finishes require different care approaches."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GLAZE_TYPES.map((glaze) => (
                <div
                  key={glaze.name}
                  className="shadow-soft rounded-2xl bg-white p-6"
                >
                  <div className="bg-subtle-green mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                    <glaze.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{glaze.name}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {glaze.description}
                  </p>
                  <div className="border-border border-t pt-3">
                    <p className="text-primary text-xs font-medium">
                      Care tip:
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {glaze.care}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Warnings */}
        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <SectionHeader
            title="Important Reminders"
            description="Keep these key points in mind for the longevity of your pottery."
          />
          <div className="mx-auto max-w-3xl space-y-4">
            {WARNINGS.map((warning) => (
              <div
                key={warning.title}
                className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6"
              >
                <warning.icon className="h-6 w-6 shrink-0 text-amber-600" />
                <div>
                  <h3 className="mb-1 font-semibold">{warning.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {warning.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-white py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeader
              title="Quick Reference"
              description="At-a-glance care summary for your convenience."
            />
            <div className="bg-primary mx-auto max-w-2xl rounded-3xl p-8 text-white">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    Safe For
                  </h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Dishwasher (top rack, most pieces)</li>
                    <li>• Microwave (no metallic glazes)</li>
                    <li>• Oven up to 400°F (204°C)</li>
                    <li>• Food and beverages (glazed pieces)</li>
                    <li>• Refrigerator storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold">
                    <XCircle className="h-5 w-5" />
                    Avoid
                  </h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Direct flame or stovetop</li>
                    <li>• Sudden temperature changes</li>
                    <li>• Abrasive cleaners or scrubbers</li>
                    <li>• Microwaving metallic glazes</li>
                    <li>• Extended soaking in water</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Questions About Care?"
          description="If you have specific questions about caring for your pottery, our team is happy to help."
          primaryButtonText="Contact Us"
          primaryButtonHref="/contact"
          secondaryButtonText="Browse FAQ"
          secondaryButtonHref="/faq"
          variant="solid"
        />
      </main>
    </>
  );
}
