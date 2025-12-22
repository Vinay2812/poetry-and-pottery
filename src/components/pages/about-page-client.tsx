"use client";

import type { AboutPageContent } from "@/actions/admin";
import { MobileHeaderContainer } from "@/features/layout";
import {
  Flame,
  Heart,
  Leaf,
  type LucideIcon,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";

import { ProcessStepCard, TeamMemberCard, ValueCard } from "@/components/cards";
import { ContactForm } from "@/components/forms";
import { CTASection, SectionHeader } from "@/components/sections";

interface AboutPageClientProps {
  content: AboutPageContent;
  heroImage: string;
}

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  flame: Flame,
  sparkles: Sparkles,
  star: Star,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName.toLowerCase()] || Sparkles;
}

export function AboutPageClient({ content, heroImage }: AboutPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="About Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-21/9">
            <Image
              src={heroImage}
              alt="Our Story"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
              <h1 className="mb-2 text-4xl font-bold text-white lg:text-6xl">
                Our Story
              </h1>
              <p className="max-w-lg text-sm text-white/90 lg:text-lg">
                From humble beginnings in a small studio to a community of
                artisans and pottery lovers, discover the journey of Poetry &
                Pottery.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 pb-8 lg:px-8 lg:py-16">
          {/* Mobile Layout */}
          <div className="mx-auto max-w-3xl p-4 lg:hidden lg:p-8">
            <h2 className="mb-6 w-full text-center text-2xl font-bold">
              {content.storyTitle}
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              {content.storyContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-2">
            {/* Info Card */}
            <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
              <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                Our Story
              </p>
              <h2 className="mb-6 text-4xl font-bold">{content.storyTitle}</h2>
              <p className="text-lg leading-relaxed text-white/90">
                Every piece we create is a meditation in form — a conversation
                between earth, water, fire, and the human hand.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{content.storySubtitle}</p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <div className="text-muted-foreground space-y-5 text-lg leading-relaxed">
                {content.storyContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold lg:mb-12 lg:text-3xl">
              What We Stand For
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.values.map((value) => (
                <ValueCard
                  key={value.title}
                  icon={getIcon(value.icon)}
                  title={value.title}
                  description={value.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <SectionHeader
            title="Our Process"
            description="From raw clay to finished piece, every step is done by hand."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.processSteps.map((processStep) => (
              <ProcessStepCard
                key={processStep.step}
                step={processStep.step}
                title={processStep.title}
                description={processStep.description}
              />
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeader
              title="Meet Our Artisans"
              description="The hands and hearts behind every piece."
            />
            <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
              {content.team.map((member) => (
                <TeamMemberCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Studio Visit CTA */}
        <CTASection
          title="Visit Our Studio"
          description="Come see where the magic happens. Book a studio tour, join a workshop, or simply stop by for a cup of tea and a chat about clay."
          primaryButtonText="Book a Workshop"
          primaryButtonHref="/events/upcoming"
          secondaryButtonText="Browse Collection"
          secondaryButtonHref="/products"
          variant="solid"
        />

        {/* Contact Form */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="lg:hidden">
              <SectionHeader
                title="Get in Touch"
                description="Have a question? We'd love to hear from you. Our team will get back to you within 24 hours."
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Info Card - Hidden on mobile */}
              <div className="bg-primary hidden flex-col justify-between rounded-3xl p-8 text-white lg:flex lg:p-10">
                <div>
                  <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
                  <p className="mb-8 text-lg text-white/90">
                    Have a question? We&apos;d love to hear from you. Our team
                    will get back to you within 24 hours.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Leaf className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Visit Our Studio</p>
                        <p className="text-sm text-white/80">
                          123 Potter&apos;s Lane, Artisan District
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Email Us</p>
                        <p className="text-sm text-white/80">
                          hello@poetryandpottery.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Flame className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-white/80">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-white/20 pt-6">
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
          </div>
        </section>
      </main>
    </>
  );
}
