"use client";

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

const LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Workshops", href: "/events" },
      { label: "Categories", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Products", href: "/products" },
      { label: "Our Story", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help Centre",
    links: [
      { label: "Shipping Info", href: "/shipping" },
      { label: "Order Tracking", href: "/orders" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const SOCIAL_LINKS: FooterSocialLink[] = [
  {
    platform: "instagram",
    href: "https://instagram.com/poetryandpotterystudio_",
    label: "Follow us on Instagram",
  },
  {
    platform: "whatsapp",
    href: "https://wa.me/918329026762",
    label: "Chat on WhatsApp",
  },
];

const CONTACT_INFO: FooterContactItem[] = [
  {
    type: "address",
    value: "Sangli, Maharashtra, India",
  },
  {
    type: "email",
    value: "poetryandpottery.aj@gmail.com",
    href: "mailto:poetryandpottery.aj@gmail.com",
  },
  {
    type: "phone",
    value: "+91 83290 26762",
    href: "tel:+918329026762",
  },
];

const BRAND_DESCRIPTION =
  "Crafting handmade touch to life\u2019s simplest \uD83C\uDF3C joys :)";

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
