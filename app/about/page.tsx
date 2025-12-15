"use client";

import { ArrowRight, Flame, Heart, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer, MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";

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
    <div className="bg-background">
      <Navbar />
      <MobileHeader title="About Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
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
        <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
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
        </section>

        {/* Values Section */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold lg:mb-12 lg:text-3xl">
              What We Stand For
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="shadow-soft rounded-2xl bg-white p-6"
                  >
                    <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                      <Icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="mb-2 text-2xl font-bold lg:text-3xl">Our Process</h2>
            <p className="text-muted-foreground">
              From raw clay to finished piece, every step is done by hand.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="shadow-soft rounded-2xl bg-white p-6"
              >
                <span className="text-primary mb-2 block text-3xl font-bold opacity-30">
                  {step.step}
                </span>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 text-center lg:mb-12">
              <h2 className="mb-2 text-2xl font-bold lg:text-3xl">
                Meet Our Artisans
              </h2>
              <p className="text-muted-foreground">
                The hands and hearts behind every piece.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
              {TEAM.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full lg:h-40 lg:w-40">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-primary mb-2 text-sm font-medium">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Visit CTA */}
        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <div className="bg-primary relative overflow-hidden rounded-3xl p-8 lg:p-12">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
                Visit Our Studio
              </h2>
              <p className="mb-6 text-white/90">
                Come see where the magic happens. Book a studio tour, join a
                workshop, or simply stop by for a cup of tea and a chat about
                clay.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  variant="secondary"
                  className="text-primary w-full rounded-full bg-white hover:bg-white/90 sm:w-auto"
                  size="lg"
                >
                  <Link href="/events">
                    Book a Workshop
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                  size="lg"
                >
                  <Link href="/products">Browse Collection</Link>
                </Button>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 text-center lg:mb-12">
              <h2 className="mb-2 text-2xl font-bold lg:text-3xl">
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Have a question? We&apos;d love to hear from you. Our team will
                get back to you within 24 hours.
              </p>
            </div>

            <div className="mx-auto max-w-2xl">
              <div className="shadow-card overflow-hidden rounded-3xl bg-white p-8 lg:p-10">
                <form className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="border-border bg-muted/30 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border px-4 text-sm transition-colors focus:bg-white focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        className="border-border bg-muted/30 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border px-4 text-sm transition-colors focus:bg-white focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="border-border bg-muted/30 focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border px-4 text-sm transition-colors focus:bg-white focus:ring-2 focus:outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="products">Product Inquiry</option>
                      <option value="workshops">Workshop Question</option>
                      <option value="custom">Custom Order</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="border-border bg-muted/30 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full resize-none rounded-xl border px-4 py-3 text-sm transition-colors focus:bg-white focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="shadow-primary/20 h-12 w-full rounded-full shadow-lg"
                    size="lg"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
