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
          {/* Mobile Layout */}
          <div className="mx-auto max-w-3xl text-center lg:hidden">
            <h1 className="mb-4 text-4xl font-bold">Care Instructions</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With proper care, your handcrafted pottery will bring joy for
              years to come. Follow these guidelines to keep your pieces
              beautiful and functional.
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-2">
            {/* Info Card */}
            <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
              <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                Pottery Care Guide
              </p>
              <h1 className="mb-6 text-4xl font-bold">Care Instructions</h1>
              <p className="mb-6 text-lg leading-relaxed text-white/90">
                With proper care, your handcrafted pottery will bring joy for
                years to come.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Cleaning</p>
                    <p className="text-xs text-white/70">
                      Hand wash with mild soap
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Temperature</p>
                    <p className="text-xs text-white/70">Avoid thermal shock</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Appliances</p>
                    <p className="text-xs text-white/70">
                      Check glaze type first
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Hand className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Handling</p>
                    <p className="text-xs text-white/70">Store with care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="grid grid-cols-2 gap-4">
              <div className="shadow-soft rounded-2xl bg-white p-6">
                <h4 className="text-primary mb-4 flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Safe For
                </h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Dishwasher (top rack, most pieces)</li>
                  <li>• Microwave (no metallic glazes)</li>
                  <li>• Oven up to 400°F (204°C)</li>
                  <li>• Food and beverages (glazed pieces)</li>
                  <li>• Refrigerator storage</li>
                  <li>• Hand washing with mild soap</li>
                  <li>• Soft sponge or cloth cleaning</li>
                </ul>
              </div>
              <div className="shadow-soft rounded-2xl bg-white p-6">
                <h4 className="text-primary mb-4 flex items-center gap-2 font-semibold">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Avoid
                </h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Direct flame or stovetop</li>
                  <li>• Sudden temperature changes</li>
                  <li>• Abrasive cleaners or scrubbers</li>
                  <li>• Microwaving metallic glazes</li>
                  <li>• Extended soaking in water</li>
                  <li>• Steel wool or harsh chemicals</li>
                  <li>• Stacking without protection</li>
                </ul>
              </div>
            </div>
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
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <SectionHeader
                title="Important Reminders"
                description="Keep these key points in mind for the longevity of your pottery."
              />
              <div className="space-y-4">
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
            </div>

            {/* Desktop Layout */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {/* Info Card */}
              <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
                <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                  Please Note
                </p>
                <h2 className="mb-6 text-4xl font-bold">Important Reminders</h2>
                <p className="mb-8 text-lg leading-relaxed text-white/90">
                  Keep these key points in mind for the longevity of your
                  pottery.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Handle With Care</p>
                      <p className="text-sm text-white/80">
                        Protect your investment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Made to Last</p>
                      <p className="text-sm text-white/80">
                        With proper care, a lifetime of beauty
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warnings Content */}
              <div className="flex flex-col justify-center space-y-4">
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
