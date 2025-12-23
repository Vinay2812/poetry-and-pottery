"use client";

import {
  getNewsletterSubscriptionStatus,
  subscribeToNewsletter,
} from "@/actions";
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
    href: "https://instagram.com/poetryandpottery",
    label: "Follow us on Instagram",
  },
  {
    platform: "facebook",
    href: "https://facebook.com/poetryandpottery",
    label: "Follow us on Facebook",
  },
  {
    platform: "pinterest",
    href: "https://pinterest.com/poetryandpottery",
    label: "Follow us on Pinterest",
  },
];

const CONTACT_INFO: FooterContactItem[] = [
  {
    type: "address",
    value: "Sangli, Maharashtra, India",
  },
  {
    type: "hours",
    value: "Tue-Sat: 10am-6pm",
  },
  {
    type: "email",
    value: "hello@poetryandpottery.com",
    href: "mailto:hello@poetryandpottery.com",
  },
  {
    type: "phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
];

const BRAND_DESCRIPTION =
  "Hand-thrown porcelain designed to ground your daily moments in nature. Each piece is crafted with care in our studio.";

export function FooterContainer() {
  const { isSignedIn } = useAuth();

  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
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
    setIsSubscribing(true);
    setSubscriptionError(null);

    try {
      const result = await subscribeToNewsletter();

      if (result.success) {
        setSubscriptionSuccess(true);
      } else {
        setSubscriptionError(result.error ?? "Failed to subscribe");
      }
    } catch {
      setSubscriptionError("Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  }, []);

  const viewModel: FooterViewModel = useMemo(
    () => ({
      brandDescription: BRAND_DESCRIPTION,
      linkGroups: LINK_GROUPS,
      contactInfo: CONTACT_INFO,
      socialLinks: SOCIAL_LINKS,
      currentYear: new Date().getFullYear(),
      isAuthenticated: !!isSignedIn,
      isAlreadySubscribed,
      isSubscribing,
      subscriptionSuccess,
      subscriptionError,
    }),
    [
      isSignedIn,
      isAlreadySubscribed,
      isSubscribing,
      subscriptionSuccess,
      subscriptionError,
    ],
  );

  return <Footer viewModel={viewModel} onNewsletterSubmit={handleSubmit} />;
}
