"use client";

import { SITE_CONTACT, SITE_FOOTER_CONTENT } from "@/consts/site-content";
import { useSubscribeToNewsletter } from "@/data/newsletter/gateway/client";
import { getNewsletterSubscriptionStatus } from "@/data/newsletter/gateway/server";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createDate } from "@/lib/date";

import { Footer } from "../components/footer";
import type {
  FooterContactItem,
  FooterLinkGroup,
  FooterSocialLink,
  FooterViewModel,
} from "../types";

const LINK_GROUPS: FooterLinkGroup[] = SITE_FOOTER_CONTENT.columns.map((c) => ({
  title: c.title,
  links: c.links.map((l) => ({ label: l.label, href: l.href })),
}));

const SOCIAL_LINKS: FooterSocialLink[] = [
  {
    platform: "instagram",
    href: SITE_CONTACT.instagramUrl,
    label: "Follow us on Instagram",
  },
  {
    platform: "whatsapp",
    href: SITE_CONTACT.whatsappUrl,
    label: "Chat on WhatsApp",
  },
];

const CONTACT_INFO: FooterContactItem[] = [
  {
    type: "address",
    value: SITE_CONTACT.address,
  },
  {
    type: "email",
    value: SITE_CONTACT.email,
    href: SITE_CONTACT.mailtoUrl,
  },
  {
    type: "phone",
    value: SITE_CONTACT.phoneDisplay,
    href: SITE_CONTACT.telUrl,
  },
];

const BRAND_DESCRIPTION = SITE_FOOTER_CONTENT.tagline;

export function FooterContainer() {
  const { isSignedIn } = useAuth();
  const { mutate: subscribeMutate } = useSubscribeToNewsletter();

  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null,
  );

  // Fetch subscription status on mount
  useEffect(() => {
    if (isSignedIn) {
      getNewsletterSubscriptionStatus().then((status) => {
        setIsAlreadySubscribed(status.isSubscribed);
      });
    }
  }, [isSignedIn]);

  const handleSubmit = useCallback(async () => {
    setSubscriptionError(null);

    try {
      const result = await subscribeMutate();

      if (result.success) {
        setSubscriptionSuccess(true);
      } else {
        setSubscriptionError(result.error ?? "Failed to subscribe");
      }
    } catch {
      setSubscriptionError("Something went wrong. Please try again.");
    }
  }, [subscribeMutate]);

  const viewModel: FooterViewModel = useMemo(
    () => ({
      brandDescription: BRAND_DESCRIPTION,
      linkGroups: LINK_GROUPS,
      contactInfo: CONTACT_INFO,
      socialLinks: SOCIAL_LINKS,
      currentYear: createDate().getFullYear(),
      isAuthenticated: !!isSignedIn,
      isAlreadySubscribed,
      subscriptionSuccess,
      subscriptionError,
    }),
    [isSignedIn, isAlreadySubscribed, subscriptionSuccess, subscriptionError],
  );

  return <Footer viewModel={viewModel} onNewsletterSubmit={handleSubmit} />;
}
