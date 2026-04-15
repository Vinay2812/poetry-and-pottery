"use client";

import {
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

import type { FooterProps } from "../types";
import { socialIcons } from "./social-icons";

const contactIcons = {
  address: MapPin,
  hours: Clock,
  email: Mail,
  phone: Phone,
};

/* ─── Newsletter ─────────────────────────────────────────────── */

function NewsletterContent({
  viewModel,
  onNewsletterSubmit,
}: {
  viewModel: FooterProps["viewModel"];
  onNewsletterSubmit: () => Promise<void>;
}) {
  // Already subscribed
  if (viewModel.isAlreadySubscribed || viewModel.subscriptionSuccess) {
    return (
      <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <Check className="text-light-sage h-4 w-4" />
        <span className="text-sm text-white/60">
          You&apos;re subscribed to our newsletter
        </span>
      </div>
    );
  }

  // Not authenticated
  if (!viewModel.isAuthenticated) {
    return (
      <Link
        href="/sign-in"
        className="group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
      >
        <span className="flex-1 text-sm text-white/35">
          Sign in to subscribe
        </span>
        <span className="bg-light-sage/80 group-hover:bg-light-sage flex h-9 w-9 items-center justify-center rounded-md text-white transition-colors duration-200">
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    );
  }

  // Authenticated but not subscribed
  return (
    <div>
      <form
        action={onNewsletterSubmit}
        className="flex items-center rounded-lg border border-white/10 bg-white/[0.03]"
      >
        <span className="flex-1 px-4 py-3 text-sm text-white/35">
          Enter your mail
        </span>
        <NewsletterSubmitButton />
      </form>
      {viewModel.subscriptionError && (
        <p className="mt-2 text-xs text-red-400/80">
          {viewModel.subscriptionError}
        </p>
      )}
    </div>
  );
}

function NewsletterSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-light-sage hover:bg-sage m-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white transition-all duration-200 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
    </button>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

export function Footer({ viewModel, onNewsletterSubmit }: FooterProps) {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#1d1913]">
      <div className="relative">
        {/* ── Main content: two-column layout ── */}
        <div className="container mx-auto px-5 pt-14 pb-10 lg:px-10 lg:pt-20 lg:pb-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
            {/* ── Left column: Brand + Tagline + Social ── */}
            <div className="lg:col-span-4">
              {/* Oversized brand name */}
              <h2 className="font-display text-light-sage text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.02em]">
                Poetry &amp;
                <br />
                Pottery
              </h2>

              {/* Tagline — italic serif */}
              <p className="font-script mt-6 max-w-sm text-xl leading-snug text-white/60 italic lg:mt-8 lg:text-2xl">
                {viewModel.brandDescription}
              </p>

              {/* Social row */}
              <div className="mt-8 flex items-center gap-3 lg:mt-10">
                <span className="mr-1 text-sm font-medium tracking-wide text-white/50">
                  Social
                </span>
                {viewModel.socialLinks.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="h-[16px] w-[16px]" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ── Vertical separator ── */}
            <div className="hidden lg:col-span-1 lg:flex lg:justify-center">
              <div className="w-px self-stretch bg-white/[0.08]" />
            </div>

            {/* ── Right column: Link groups + Newsletter ── */}
            <div className="lg:col-span-6">
              {/* Link columns */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
                {viewModel.linkGroups.map((group) => (
                  <div key={group.title}>
                    <h4 className="mb-4 text-[15px] font-semibold text-white/90">
                      {group.title}
                    </h4>
                    <ul className="space-y-2.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-white/45 transition-colors duration-200 hover:text-white/80"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="mt-10 max-w-md lg:mt-12">
                <h4 className="mb-4 text-[15px] font-semibold text-white/90">
                  Subscribe Our Newsletter
                </h4>
                <NewsletterContent
                  viewModel={viewModel}
                  onNewsletterSubmit={onNewsletterSubmit}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="mx-5 border-t border-white/[0.06] lg:mx-10" />

        {/* ── Bottom bar ── */}
        <div className="container mx-auto px-5 py-5 pb-20 lg:px-10 lg:pb-5">
          <div className="flex flex-col items-center justify-between gap-3 text-[12px] tracking-wide text-white/30 sm:flex-row">
            {/* Left: credit */}
            <p>
              Crafted by{" "}
              <span className="font-semibold text-white/45">
                Poetry &amp; Pottery
              </span>
            </p>

            {/* Center: legal links */}
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="transition-colors duration-200 hover:text-white/60"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-white/60"
              >
                Policy
              </Link>
              <Link
                href="/about"
                className="transition-colors duration-200 hover:text-white/60"
              >
                About
              </Link>
            </div>

            {/* Right: copyright */}
            <p>
              © All Rights Reserved by Poetry &amp; Pottery -{" "}
              {viewModel.currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
