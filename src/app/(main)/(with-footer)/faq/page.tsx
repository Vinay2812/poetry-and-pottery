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

const FAQ_CATEGORIES = [
  {
    title: "Orders & Shipping",
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days within India. Express shipping (2-3 business days) and same-day delivery (select cities) are also available. You'll receive tracking information via email once your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within India. We're working on expanding our shipping options and plan to offer international shipping soon. Sign up for our newsletter to be notified when this becomes available.",
      },
      {
        question: "How are items packaged?",
        answer:
          "Each piece is carefully wrapped in protective materials and cushioned packaging to ensure it arrives safely. We use eco-friendly materials whenever possible while maintaining the highest standards of protection.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account on our website.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy on all unused items in their original condition. If you're not completely satisfied with your purchase, contact us to initiate a return for a full refund.",
      },
      {
        question: "What if my item arrives damaged?",
        answer:
          "We're sorry to hear that! Please contact us within 48 hours of delivery with photos of the damage. We'll arrange for a replacement or full refund at no additional cost to you.",
      },
      {
        question: "How do I exchange an item?",
        answer:
          "To exchange an item, please contact our customer service team. We'll guide you through the process and help you select a replacement. The exchange item will ship once we receive the original.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.",
      },
    ],
  },
  {
    title: "Products & Care",
    faqs: [
      {
        question: "Are your products food safe?",
        answer:
          "Yes, all our glazed pottery is food safe and lead-free. Our glazes are specially formulated for tableware and tested to meet food safety standards. Items marked as decorative only are not intended for food use.",
      },
      {
        question: "Can I put pottery in the dishwasher?",
        answer:
          "Most of our pieces are dishwasher safe on the top rack with mild detergent. However, we recommend hand washing for items with delicate glazes or gold/platinum accents to preserve their finish.",
      },
      {
        question: "Is your pottery microwave safe?",
        answer:
          "Our standard glazed pieces are microwave safe. However, items with metallic accents (gold, platinum) should not be microwaved. Check the product description for specific care instructions.",
      },
      {
        question: "How should I care for my pottery?",
        answer:
          "Avoid sudden temperature changes, hand wash when possible, and store carefully to prevent chips. For detailed care instructions, visit our Care Instructions page.",
      },
    ],
  },
  {
    title: "Custom Orders",
    faqs: [
      {
        question: "Do you accept custom orders?",
        answer:
          "Yes! We love creating custom pieces for special occasions. Contact us with your ideas, and we'll discuss design options, timeline, and pricing. Custom orders typically take 4-6 weeks.",
      },
      {
        question: "Can I request a specific color or glaze?",
        answer:
          "Absolutely! We can work with you to create pieces in colors that match your vision. Some custom glazes may require additional time and cost. We'll provide a detailed quote before proceeding.",
      },
      {
        question: "Do you offer bulk or wholesale pricing?",
        answer:
          "Yes, we offer wholesale pricing for qualified retailers and bulk discounts for events like weddings. Contact us at wholesale@poetryandpottery.com for more information.",
      },
      {
        question: "Can I commission a set for my wedding?",
        answer:
          "We'd be honored to create pottery for your special day! Whether it's table settings, favors, or centerpieces, we can design pieces that match your wedding theme. Start the conversation at least 3-4 months in advance.",
      },
    ],
  },
  {
    title: "Workshops & Events",
    faqs: [
      {
        question: "What skill level are workshops for?",
        answer:
          "We offer workshops for all skill levels, from complete beginners to experienced potters. Each workshop listing indicates the skill level required. Beginners are always welcome!",
      },
      {
        question: "What's included in a workshop?",
        answer:
          "All materials, tools, and instruction are included. You'll create pieces during the workshop, which we'll fire and glaze. Finished pieces can be picked up or shipped to you within 2-3 weeks.",
      },
      {
        question: "Can I book a private workshop?",
        answer:
          "Yes! Private workshops are perfect for team building, birthday parties, or special gatherings. Contact us to discuss group size, date, and customization options.",
      },
      {
        question: "What's your cancellation policy for workshops?",
        answer:
          "Full refunds are available for cancellations made 7+ days before the workshop. Cancellations within 7 days receive a credit for a future workshop. No-shows forfeit the registration fee.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <MobileHeaderContainer title="FAQ" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-6xl">
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
              {FAQ_CATEGORIES.map((category) => (
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
                      <p className="font-semibold">5 Categories</p>
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
                {FAQ_CATEGORIES.map((category) => (
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
