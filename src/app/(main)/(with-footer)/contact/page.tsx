"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms";
import { CTASection } from "@/components/sections";

export default function ContactPage() {
  return (
    <>
      <MobileHeaderContainer title="Contact Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section - Mobile only */}
        <section className="container mx-auto px-4 py-6 lg:hidden">
          <div className="text-center">
            <h1 className="font-display mb-4 text-4xl font-bold">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a question about our pottery, want to discuss a custom order,
              or interested in our workshops? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Info Card - Hidden on mobile */}
            <div className="bg-primary hidden flex-col justify-between rounded-3xl p-8 text-white lg:flex lg:p-10">
              <div>
                <h1 className="font-display mb-4 text-4xl font-bold">
                  Get in Touch
                </h1>
                <p className="mb-10 text-lg text-white/90">
                  Have a question about our pottery, want to discuss a custom
                  order, or interested in our workshops? We&apos;d love to hear
                  from you.
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Visit Our Studio</p>
                      <p className="text-sm text-white/80">
                        123 Potter&apos;s Lane, Artisan District
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-white/80">
                        hello@poetryandpottery.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-white/80">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-3 border-t border-white/20 pt-6">
                <Clock className="h-5 w-5 text-white/80" />
                <p className="text-sm text-white/80">
                  Studio Hours: Mon-Sat, 10am - 6pm
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Visit Our Workshop"
          description="Come experience the art of pottery making firsthand. Book a workshop and create your own masterpiece."
          primaryButtonText="Browse Workshops"
          primaryButtonHref="/events/upcoming"
          secondaryButtonText="Shop Collection"
          secondaryButtonHref="/products"
          variant="solid"
        />
      </main>
    </>
  );
}
