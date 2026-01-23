"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";

import { CTASection, SectionHeader } from "@/components/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { FaqPageContent } from "@/graphql/generated/types";

interface FAQPageClientProps {
  content: FaqPageContent;
}

export function FAQPageClient({ content }: FAQPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="FAQ" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display mb-4 text-4xl font-bold lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Find answers to common questions about our products, shipping,
              returns, and more. Can&apos;t find what you&apos;re looking for?
              Contact us anytime.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="bg-subtle-green py-8 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Mobile Layout */}
            <div className="space-y-12 lg:hidden">
              {content.categories.map((category) => (
                <div key={category.title}>
                  <h2 className="mb-6 text-xl font-bold">{category.title}</h2>
                  <div className="shadow-soft rounded-2xl bg-white p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.title}-${index}`}
                        >
                          <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Layout */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {/* Info Card */}
              <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
                <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                  Help Center
                </p>
                <h2 className="mb-6 text-4xl font-bold">
                  Frequently Asked Questions
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-white/90">
                  Find answers to common questions about our products, shipping,
                  returns, and more.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {content.categories.length} Categories
                      </p>
                      <p className="text-sm text-white/80">
                        Covering all your questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Quick Answers</p>
                      <p className="text-sm text-white/80">
                        Get help in seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="max-h-[600px] space-y-8 overflow-y-auto pr-2">
                {content.categories.map((category) => (
                  <div key={category.title}>
                    <h2 className="mb-4 text-xl font-bold">{category.title}</h2>
                    <div className="shadow-soft rounded-2xl bg-white p-6">
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.title}-${index}`}
                          >
                            <AccordionTrigger className="text-left font-medium">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <SectionHeader
                title="Still Have Questions?"
                description="Our team is here to help. Reach out and we'll get back to you within 24 hours."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:hello@poetryandpottery.com"
                  className="group shadow-soft hover:shadow-card rounded-2xl bg-white p-6 transition-shadow"
                >
                  <h3 className="group-hover:text-primary mb-2 font-semibold">
                    Email Us
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    hello@poetryandpottery.com
                  </p>
                </a>
                <a
                  href="tel:+919876543210"
                  className="group shadow-soft hover:shadow-card rounded-2xl bg-white p-6 transition-shadow"
                >
                  <h3 className="group-hover:text-primary mb-2 font-semibold">
                    Call Us
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    +91 98765 43210
                  </p>
                </a>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {/* Info Card */}
              <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
                <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                  Need More Help?
                </p>
                <h2 className="mb-6 text-4xl font-bold">
                  Still Have Questions?
                </h2>
                <p className="text-lg leading-relaxed text-white/90">
                  Our team is here to help. Reach out and we&apos;ll get back to
                  you within 24 hours.
                </p>
              </div>

              {/* Contact Options */}
              <div className="flex flex-col justify-center gap-4">
                <a
                  href="mailto:hello@poetryandpottery.com"
                  className="group shadow-soft hover:shadow-card flex items-center gap-4 rounded-2xl bg-white p-6 transition-shadow"
                >
                  <div className="bg-subtle-green flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="group-hover:text-primary mb-1 font-semibold">
                      Email Us
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      hello@poetryandpottery.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+919876543210"
                  className="group shadow-soft hover:shadow-card flex items-center gap-4 rounded-2xl bg-white p-6 transition-shadow"
                >
                  <div className="bg-subtle-green flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="group-hover:text-primary mb-1 font-semibold">
                      Call Us
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Shop?"
          description="Explore our collection of handcrafted pottery and find the perfect piece for your home."
          primaryButtonText="Shop Collection"
          primaryButtonHref="/products"
          secondaryButtonText="Contact Us"
          secondaryButtonHref="/contact"
          variant="solid"
        />
      </main>
    </>
  );
}
