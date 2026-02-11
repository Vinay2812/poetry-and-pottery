"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  ArrowLeftRight,
  Calendar,
  Clock,
  CreditCard,
  Gift,
  Globe,
  HelpCircle,
  type LucideIcon,
  MapPin,
  Package,
  Palette,
  RefreshCw,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Truck,
  Utensils,
} from "lucide-react";

import { ContactCtaBanner } from "@/components/pages/contact-cta-banner";
import { ListingPageHeader } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { FaqPageContent } from "@/graphql/generated/types";

// Keyword patterns to match questions to icons
const QUESTION_ICON_PATTERNS: Array<{ keywords: string[]; icon: LucideIcon }> =
  [
    // Time-related
    { keywords: ["how long", "when", "time", "duration"], icon: Clock },
    // International/location
    {
      keywords: ["international", "worldwide", "country", "abroad"],
      icon: Globe,
    },
    // Tracking
    { keywords: ["track", "tracking", "where is", "status"], icon: MapPin },
    // Cost/payment
    { keywords: ["charge", "cost", "price", "pay", "fee"], icon: CreditCard },
    // Food safety
    {
      keywords: ["food safe", "microwave", "dishwasher", "oven"],
      icon: Utensils,
    },
    // Customization
    {
      keywords: ["custom", "personalize", "engrave", "special order"],
      icon: Palette,
    },
    // Care/maintenance
    { keywords: ["care", "clean", "maintain", "wash"], icon: Sparkles },
    // Returns
    { keywords: ["return", "send back"], icon: RotateCcw },
    // Refunds
    { keywords: ["refund", "money back"], icon: CreditCard },
    // Exchange
    { keywords: ["exchange", "swap", "replace"], icon: ArrowLeftRight },
    // Gift
    { keywords: ["gift", "wrap", "present"], icon: Gift },
    // Warranty/guarantee
    { keywords: ["warranty", "guarantee", "damage", "broken"], icon: Shield },
    // Workshop/events
    { keywords: ["workshop", "event", "class", "book"], icon: Calendar },
    // Safety/quality
    {
      keywords: ["safe", "quality", "handmade", "material"],
      icon: ShieldCheck,
    },
    // Shipping general
    { keywords: ["ship", "deliver", "dispatch"], icon: Truck },
    // Product general
    { keywords: ["product", "item", "piece"], icon: Package },
  ];

function getQuestionIcon(question: string): LucideIcon {
  const normalizedQuestion = question.toLowerCase();

  for (const pattern of QUESTION_ICON_PATTERNS) {
    if (
      pattern.keywords.some((keyword) => normalizedQuestion.includes(keyword))
    ) {
      return pattern.icon;
    }
  }

  return HelpCircle;
}

interface FAQPageClientProps {
  content: FaqPageContent;
}

export function FAQPageClient({ content }: FAQPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="FAQ" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="Frequently Asked Questions"
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Help", href: "/faq" },
                { label: "FAQ" },
              ]}
            />
          </div>

          {/* Mobile Page Header */}
          <div className="mb-6 pt-4 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h1>
            <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
          </div>

          {/* FAQ Content */}
          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {content.categories.map((category) => (
                <div key={category.title}>
                  {/* Category Heading */}
                  <h2 className="font-display mb-4 border-b border-neutral-200 pb-2 text-lg font-semibold text-neutral-900">
                    {category.title}
                  </h2>

                  {/* Accordion Items */}
                  <div className="space-y-3">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => {
                        const QuestionIcon = getQuestionIcon(faq.question);
                        return (
                          <AccordionItem
                            key={index}
                            value={`${category.title}-${index}`}
                            className="shadow-soft hover:shadow-card mb-3 overflow-hidden rounded-xl border-0 bg-white transition-shadow"
                          >
                            <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline data-[state=open]:bg-neutral-50">
                              <span className="flex items-center gap-3">
                                <QuestionIcon className="text-primary size-5 shrink-0" />
                                <span>{faq.question}</span>
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-4">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Policies */}
            <div className="mt-12 mb-8">
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
                Important Policies
              </h2>
              <div className="shadow-soft grid gap-4 rounded-2xl bg-white p-5 sm:grid-cols-3 lg:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">No COD</h4>
                    <p className="text-muted-foreground text-sm">
                      Online payments only
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <RefreshCw className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">No Returns</h4>
                    <p className="text-muted-foreground text-sm">
                      All sales are final
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-lighter flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Truck className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">India Only</h4>
                    <p className="text-muted-foreground text-sm">
                      No international shipping
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <ContactCtaBanner
              title="Still have questions?"
              description="Can't find the answer you're looking for? Please reach out to us on WhatsApp."
            />
          </div>
        </div>
      </main>
    </>
  );
}
