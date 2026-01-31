"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  Hand,
  Heart,
  Leaf,
  type LucideIcon,
  Mic2,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

import {
  AnimatedCounter,
  ListingPageHeader,
  OptimizedImage,
} from "@/components/shared";

import type { AboutPageContent } from "@/graphql/generated/types";

interface AboutPageClientProps {
  content: AboutPageContent;
  heroImage: string;
}

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  hand: Hand,
  sparkles: Sparkles,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName.toLowerCase()] || Sparkles;
}

// Stats data
const STATS = [
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 1000, suffix: "+", label: "Pieces Crafted" },
  { value: 50, suffix: "+", label: "Workshops Hosted" },
  { value: 30, suffix: "+", label: "Open Mic Nights" },
];

export function AboutPageClient({ content, heroImage }: AboutPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="About Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="Our Story"
              subtitle="Crafting beauty from clay since 2018. Discover the passion and craftsmanship behind every piece."
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "About Us" },
              ]}
            />
          </div>

          {/* Mobile Page Header */}
          <div className="pt-4 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Our Story
            </h1>
            <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
            <p className="text-muted-foreground mt-3 text-sm">
              Crafting beauty from clay since 2018
            </p>
          </div>
        </div>

        {/* Story Section - 50/50 Split */}
        <section className="container mx-auto px-4 py-12 lg:px-8 lg:pt-0 lg:pb-20">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Video */}
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <video
                src="https://cdn.poetryandpottery.prodapp.club/videos/poetry-pottery-about.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 rounded-full px-3 py-1 text-xs font-medium text-white">
                  The Beginning
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">
                {content.storyTitle || "From a Small Workshop to Your Home"}
              </h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                {content.storyContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary-lighter py-10 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-display text-primary text-3xl font-bold lg:text-4xl"
                  />
                  <p className="text-muted-foreground mt-1 text-sm lg:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-background container mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <div className="mb-8 text-center lg:mb-12">
            <p className="text-primary mb-2 text-sm font-medium tracking-wider uppercase">
              Our Values
            </p>
            <h2 className="font-display text-2xl font-bold text-neutral-900 lg:text-3xl">
              What We Stand For
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.values.slice(0, 3).map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <div
                  key={value.title}
                  className="shadow-soft rounded-2xl bg-white p-6 text-center"
                >
                  <div className="bg-primary-lighter text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mb-2 text-lg font-semibold text-neutral-900">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Mic Section */}
        <section className="bg-primary-lighter py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Content */}
              <div>
                <p className="text-primary mb-2 text-sm font-medium tracking-wider uppercase">
                  Poetry & Expression
                </p>
                <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">
                  Open Mic Nights
                </h2>
                <div className="text-muted-foreground space-y-4 leading-relaxed">
                  <p>
                    Beyond pottery, our studio comes alive with the rhythm of
                    words and melodies. Our Open Mic nights bring together
                    poets, musicians, storytellers, and dreamers in a warm,
                    intimate setting surrounded by handcrafted art.
                  </p>
                  <p>
                    Whether you&apos;re a seasoned performer or stepping up to
                    the mic for the first time, our community welcomes all
                    voices. Share your poetry, strum your guitar, or simply come
                    to listen and be inspired.
                  </p>
                </div>

                {/* Features */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                      <Mic2 className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium text-neutral-700">
                      Live Poetry
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                      <Music className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium text-neutral-700">
                      Acoustic Music
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                      <Users className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium text-neutral-700">
                      Community
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square">
                <OptimizedImage
                  src="https://images.pexels.com/photos/6919985/pexels-photo-6919985.jpeg"
                  alt="Open mic night at Poetry & Pottery"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/90 rounded-full px-3 py-1 text-xs font-medium text-white">
                    Every Month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-background py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 text-center lg:mb-12">
              <p className="text-primary mb-2 text-sm font-medium tracking-wider uppercase">
                Meet the Team
              </p>
              <h2 className="font-display text-2xl font-bold text-neutral-900 lg:text-3xl">
                The Hands Behind the Clay
              </h2>
            </div>

            <div className="mx-auto grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              {content.team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative mx-auto mb-4 aspect-square w-32 overflow-hidden rounded-full lg:w-40">
                    <OptimizedImage
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-neutral-900">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background py-12 text-white lg:py-20">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">
              Visit Our Studio
            </h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-lg">
              Come see where the magic happens. Book a studio tour, join a
              workshop, or simply stop by for a cup of tea and a chat about
              clay.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/events/upcoming"
                className="bg-primary text-primary-foreground hover:bg-primary-hover w-full rounded-lg px-6 py-3 font-medium transition-colors sm:w-auto"
              >
                Book a Workshop
              </Link>
              <Link
                href="/products"
                className="border-primary text-primary hover:bg-primary/10 w-full rounded-lg border px-6 py-3 font-medium transition-colors sm:w-auto"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
