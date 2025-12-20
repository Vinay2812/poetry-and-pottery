"use client";

import { Flame, Heart, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";

import { ProcessStepCard, TeamMemberCard, ValueCard } from "@/components/cards";
import { ContactForm } from "@/components/forms";
import { MobileHeader } from "@/components/layout";
import { CTASection, SectionHeader } from "@/components/sections";

import { HERO_IMAGES } from "@/lib/constants";

const VALUES = [
  {
    icon: Leaf,
    title: "Sustainable Craft",
    description:
      "We source our clay locally and use eco-friendly glazes. Every piece is made with respect for the earth.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Each creation passes through the hands of our artisans who pour their passion into every detail.",
  },
  {
    icon: Flame,
    title: "Fired to Perfection",
    description:
      "Our kilns run on renewable energy, firing each piece to temperatures that ensure lasting beauty.",
  },
  {
    icon: Sparkles,
    title: "Unique Every Time",
    description:
      "No two pieces are identical. Embrace the beautiful imperfections that make handmade special.",
  },
];

const TEAM = [
  {
    name: "Maya Thompson",
    role: "Founder & Lead Potter",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "With over 15 years at the wheel, Maya founded Poetry & Pottery to share her love of ceramic art.",
  },
  {
    name: "James Chen",
    role: "Master Glazer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "James brings chemistry and creativity together, developing our signature glaze recipes.",
  },
  {
    name: "Sarah Mitchell",
    role: "Workshop Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Sarah ensures every workshop participant leaves with skills, confidence, and a smile.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Sourcing",
    description:
      "We carefully select locally-sourced clay, ensuring quality and sustainability in every batch.",
  },
  {
    step: "02",
    title: "Throwing",
    description:
      "Each piece is hand-thrown on the wheel, shaped by skilled hands with years of experience.",
  },
  {
    step: "03",
    title: "Drying & Trimming",
    description:
      "Pieces rest and dry slowly, then are trimmed and refined to their final form.",
  },
  {
    step: "04",
    title: "Bisque Firing",
    description:
      "The first firing transforms clay into ceramic, preparing it for glazing.",
  },
  {
    step: "05",
    title: "Glazing",
    description:
      "Our signature glazes are applied by hand, each piece receiving individual attention.",
  },
  {
    step: "06",
    title: "Final Firing",
    description:
      "A final high-temperature firing brings out the beautiful colors and seals each piece.",
  },
];

export default function AboutPage() {
  return (
    <>
      <MobileHeader title="About Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-21/9">
            <Image
              src={HERO_IMAGES.ourStory}
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
              Where Clay Meets Soul
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Poetry & Pottery began in 2018 in a small garage studio, born
                from a simple belief: that handmade objects carry a special kind
                of magic. What started as a personal meditation practice at the
                pottery wheel grew into something much larger.
              </p>
              <p>
                Today, we&apos;re a collective of passionate artisans dedicated
                to creating functional art that brings beauty to everyday
                moments. Every mug, bowl, and vase that leaves our studio
                carries with it hours of careful craftsmanship and a piece of
                our hearts.
              </p>
              <p>
                We believe that in a world of mass production, there&apos;s
                profound value in slowing down, in feeling the weight of a
                hand-thrown cup, in knowing the story behind the objects we
                surround ourselves with.
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-2">
            {/* Info Card */}
            <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
              <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                Our Story
              </p>
              <h2 className="mb-6 text-4xl font-bold">Where Clay Meets Soul</h2>
              <p className="text-lg leading-relaxed text-white/90">
                Every piece we create is a meditation in form — a conversation
                between earth, water, fire, and the human hand.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Handcrafted Since 2018</p>
                  <p className="text-sm text-white/80">
                    Over 5,000 pieces created with love
                  </p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <div className="text-muted-foreground space-y-5 text-lg leading-relaxed">
                <p>
                  Poetry & Pottery began in 2018 in a small garage studio, born
                  from a simple belief: that handmade objects carry a special
                  kind of magic. What started as a personal meditation practice
                  at the pottery wheel grew into something much larger.
                </p>
                <p>
                  Today, we&apos;re a collective of passionate artisans
                  dedicated to creating functional art that brings beauty to
                  everyday moments. Every mug, bowl, and vase that leaves our
                  studio carries with it hours of careful craftsmanship and a
                  piece of our hearts.
                </p>
                <p>
                  We believe that in a world of mass production, there&apos;s
                  profound value in slowing down, in feeling the weight of a
                  hand-thrown cup, in knowing the story behind the objects we
                  surround ourselves with.
                </p>
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
              {VALUES.map((value) => (
                <ValueCard
                  key={value.title}
                  icon={value.icon}
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
            {PROCESS_STEPS.map((processStep) => (
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
              {TEAM.map((member) => (
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
