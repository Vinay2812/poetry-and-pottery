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
      <div className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 dark:bg-neutral-800">
        <Check className="text-primary h-5 w-5" />
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          You&apos;re subscribed to our newsletter
        </span>
      </div>
    );
  }

  // Not authenticated
  if (!viewModel.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <p className="text-muted-foreground text-sm">
          Sign in to subscribe to our newsletter
        </p>
        <Button asChild className="h-10 rounded-full">
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
        <p className="text-sm text-red-500">{viewModel.subscriptionError}</p>
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
      className="bg-primary hover:bg-primary-hover shadow-primary/20 h-121 rounded-full px-7 text-sm font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.03] lg:h-12 lg:px-8 lg:text-base"
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
    <footer className="mt-auto bg-neutral-50 dark:bg-neutral-900">
      {/* Newsletter Section */}
      <section className="bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display mb-3 text-2xl font-bold tracking-tight lg:text-3xl">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed lg:text-base">
              Subscribe to receive updates on new collections, workshops, and
              exclusive offers.
            </p>
            <NewsletterContent
              viewModel={viewModel}
              onNewsletterSubmit={onNewsletterSubmit}
            />
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
                <span className="text-sm font-bold text-white">P</span>
              </div>
              <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-lg font-bold text-transparent dark:from-neutral-100 dark:to-neutral-400">
                Poetry & Pottery
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs text-sm leading-relaxed">
              {viewModel.brandDescription}
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {viewModel.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition-colors duration-150 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Groups */}
          {viewModel.linkGroups.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h4 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Contact
            </h4>
            <ul className="space-y-3">
              {viewModel.contactInfo.map((contact) => {
                const Icon = contactIcons[contact.type];
                const content = (
                  <span className="flex items-start gap-2">
                    <Icon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {contact.value}
                    </span>
                  </span>
                );

                if (contact.href) {
                  return (
                    <li key={contact.type}>
                      <a
                        href={contact.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-150"
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

        {/* Bottom Bar */}
        <div className="my-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 lg:mt-16 lg:mb-0 lg:flex-row lg:pt-8 dark:border-neutral-800">
          <p className="text-muted-foreground text-center text-sm">
            © {viewModel.currentYear} Poetry & Pottery. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
            >
              Terms of Service
            </Link>
            <Link
              href="/shipping"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
            >
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
