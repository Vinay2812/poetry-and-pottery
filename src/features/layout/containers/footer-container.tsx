"use client";

import { useSubscribeToNewsletter } from "@/data/newsletter/gateway/client";
import { getNewsletterSubscriptionStatus } from "@/data/newsletter/gateway/server";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Footer } from "../components/footer";
import type {
  FooterContactItem,
  FooterLinkGroup,
  FooterSocialLink,
  FooterViewModel,
} from "../types";

const LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Vases", href: "/products?category=vases" },
      { label: "Plates", href: "/products?category=plates" },
      { label: "Mugs", href: "/products?category=mugs" },
      { label: "Planters", href: "/products?category=planters" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Workshops", href: "/events" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const SOCIAL_LINKS: FooterSocialLink[] = [
  {
    platform: "instagram",
    href: "https://instagram.com/poetryandpottery_",
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
  "Handcrafted pottery with a touch of poetry. Each piece tells a story, shaped with passion and the beauty of letting go. From Sangli, Maharashtra since 2024.";

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
      currentYear: new Date().getFullYear(),
      isAuthenticated: !!isSignedIn,
      isAlreadySubscribed,
      subscriptionSuccess,
      subscriptionError,
    }),
    [isSignedIn, isAlreadySubscribed, subscriptionSuccess, subscriptionError],
  );

  return <Footer viewModel={viewModel} onNewsletterSubmit={handleSubmit} />;
}
