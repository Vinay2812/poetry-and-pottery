"use client";

import { ContactForm } from "@/components/forms";
import { Footer, MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { CTASection } from "@/components/sections";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <Navbar />
      <MobileHeader title="Contact Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-6xl">Get in Touch</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a question about our pottery, want to discuss a custom order,
              or interested in our workshops? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Visit Our Workshop"
          description="Come experience the art of pottery making firsthand. Book a workshop and create your own masterpiece."
          primaryButtonText="Browse Workshops"
          primaryButtonHref="/events"
          secondaryButtonText="Shop Collection"
          secondaryButtonHref="/products"
          variant="solid"
        />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
