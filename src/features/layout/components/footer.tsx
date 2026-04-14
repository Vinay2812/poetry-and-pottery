"use client";

import {
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import type { FooterProps } from "../types";
import { socialIcons } from "./social-icons";

const contactIcons = {
  address: MapPin,
  hours: Clock,
  email: Mail,
  phone: Phone,
};

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
      <div className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3">
        <Check className="h-5 w-5 text-emerald-300" />
        <span className="text-sm font-medium text-white/90">
          You&apos;re subscribed to our newsletter
        </span>
      </div>
    );
  }

  // Not authenticated
  if (!viewModel.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <p className="text-sm text-white/60">
          Sign in to subscribe to our newsletter
        </p>
        <Button
          asChild
          className="h-10 rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 hover:bg-white/90"
        >
          <Link href="/sign-in">
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  // Authenticated but not subscribed
  return (
    <form
      action={onNewsletterSubmit}
      className="flex flex-col items-center gap-3"
    >
      <NewsletterSubmitButton />
      {viewModel.subscriptionError && (
        <p className="text-sm text-red-300">{viewModel.subscriptionError}</p>
      )}
    </form>
  );
}

function NewsletterSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-11 rounded-full bg-white px-7 text-sm font-semibold text-neutral-900 shadow-lg transition-transform duration-200 hover:scale-[1.03] hover:bg-white/90 lg:h-12 lg:px-8 lg:text-base"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Subscribing...
        </>
      ) : (
        <>
          Subscribe to Newsletter
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function Footer({ viewModel, onNewsletterSubmit }: FooterProps) {
  return (
    <footer className="bg-primary relative mt-auto overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="relative">
        {/* Top Section — Brand + Newsletter */}
        <div className="container mx-auto px-4 pt-16 pb-12 lg:px-8 lg:pt-20 lg:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Large Brand Name */}
            <h2 className="font-display mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Poetry & Pottery
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/60 lg:mb-10 lg:text-base">
              {viewModel.brandDescription}
            </p>

            {/* Newsletter — integrated */}
            <div className="mb-8 lg:mb-10">
              <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Join our community
              </p>
              <NewsletterContent
                viewModel={viewModel}
                onNewsletterSubmit={onNewsletterSubmit}
              />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              {viewModel.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-150 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto w-[90%] border-t border-white/10" />

        {/* Middle Section — Links + Contact */}
        <div className="container mx-auto px-4 py-10 lg:px-8 lg:py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Link Groups */}
            {viewModel.linkGroups.map((group) => (
              <div key={group.title} className="lg:col-span-3">
                <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="col-span-2 lg:col-span-3">
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Contact
              </h4>
              <ul className="space-y-3">
                {viewModel.contactInfo.map((contact) => {
                  const Icon = contactIcons[contact.type];
                  const content = (
                    <span className="flex items-start gap-2">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                      <span className="text-sm text-white/60">
                        {contact.value}
                      </span>
                    </span>
                  );

                  if (contact.href) {
                    return (
                      <li key={contact.type}>
                        <a
                          href={contact.href}
                          className="transition-colors duration-150 hover:text-white [&_span]:hover:text-white"
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return <li key={contact.type}>{content}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto w-[90%] border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="container mx-auto px-4 py-6 pb-20 lg:px-8 lg:pb-6">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-center text-xs text-white/40">
              © {viewModel.currentYear} Poetry & Pottery. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              <Link
                href="/privacy"
                className="text-xs text-white/40 transition-colors duration-150 hover:text-white/70"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-white/40 transition-colors duration-150 hover:text-white/70"
              >
                Terms of Service
              </Link>
              <Link
                href="/shipping"
                className="text-xs text-white/40 transition-colors duration-150 hover:text-white/70"
              >
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
