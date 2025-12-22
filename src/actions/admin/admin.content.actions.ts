"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

// ============================================================================
// Types - Content Page Structures
// ============================================================================

// About Page Content
export interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

export interface AboutTeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface AboutProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  storyTitle: string;
  storySubtitle: string;
  storyContent: string[];
  values: AboutValue[];
  team: AboutTeamMember[];
  processSteps: AboutProcessStep[];
}

// FAQ Page Content
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  faqs: FAQItem[];
}

export interface FAQPageContent {
  categories: FAQCategory[];
}

// Shipping Page Content
export interface ShippingOption {
  icon: string;
  title: string;
  description: string;
  price: string;
}

export interface ShippingInfo {
  title: string;
  content: string;
}

export interface ReturnsPolicy {
  icon: string;
  title: string;
  description: string;
}

export interface ReturnStep {
  step: string;
  title: string;
  description: string;
}

export interface ShippingPageContent {
  shippingOptions: ShippingOption[];
  shippingInfo: ShippingInfo[];
  returnsPolicy: ReturnsPolicy[];
  returnSteps: ReturnStep[];
}

// Care Page Content
export interface GlazeType {
  name: string;
  icon: string;
  description: string;
  care: string;
}

export interface CareWarning {
  icon: string;
  title: string;
  description: string;
}

export interface CarePageContent {
  glazeTypes: GlazeType[];
  warnings: CareWarning[];
  safeFor: string[];
  avoid: string[];
}

// Generic content page type
export type ContentPageType = "about" | "faq" | "shipping" | "care";

export interface ContentPage {
  id: number;
  slug: string;
  title: string;
  content:
    | AboutPageContent
    | FAQPageContent
    | ShippingPageContent
    | CarePageContent;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ContentPageListItem {
  slug: string;
  title: string;
  is_active: boolean;
  updated_at: Date;
}

export interface ContentActionResult {
  success: boolean;
  error?: string;
}

// ============================================================================
// Default Content
// ============================================================================

const DEFAULT_ABOUT_CONTENT: AboutPageContent = {
  storyTitle: "Where Clay Meets Soul",
  storySubtitle: "Handcrafted Since 2018 - Over 5,000 pieces created with love",
  storyContent: [
    "Poetry & Pottery began in 2018 in a small garage studio, born from a simple belief: that handmade objects carry a special kind of magic. What started as a personal meditation practice at the pottery wheel grew into something much larger.",
    "Today, we're a collective of passionate artisans dedicated to creating functional art that brings beauty to everyday moments. Every mug, bowl, and vase that leaves our studio carries with it hours of careful craftsmanship and a piece of our hearts.",
    "We believe that in a world of mass production, there's profound value in slowing down, in feeling the weight of a hand-thrown cup, in knowing the story behind the objects we surround ourselves with.",
  ],
  values: [
    {
      icon: "leaf",
      title: "Sustainable Craft",
      description:
        "We source our clay locally and use eco-friendly glazes. Every piece is made with respect for the earth.",
    },
    {
      icon: "heart",
      title: "Made with Love",
      description:
        "Each creation passes through the hands of our artisans who pour their passion into every detail.",
    },
    {
      icon: "flame",
      title: "Fired to Perfection",
      description:
        "Our kilns run on renewable energy, firing each piece to temperatures that ensure lasting beauty.",
    },
    {
      icon: "sparkles",
      title: "Unique Every Time",
      description:
        "No two pieces are identical. Embrace the beautiful imperfections that make handmade special.",
    },
  ],
  team: [
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
  ],
  processSteps: [
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
  ],
};

const DEFAULT_FAQ_CONTENT: FAQPageContent = {
  categories: [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days within India. Express shipping (2-3 business days) and same-day delivery (select cities) are also available. You'll receive tracking information via email once your order ships.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Currently, we only ship within India. We're working on expanding our shipping options and plan to offer international shipping soon. Sign up for our newsletter to be notified when this becomes available.",
        },
        {
          question: "How are items packaged?",
          answer:
            "Each piece is carefully wrapped in protective materials and cushioned packaging to ensure it arrives safely. We use eco-friendly materials whenever possible while maintaining the highest standards of protection.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes! Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account on our website.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy on all unused items in their original condition. If you're not completely satisfied with your purchase, contact us to initiate a return for a full refund.",
        },
        {
          question: "What if my item arrives damaged?",
          answer:
            "We're sorry to hear that! Please contact us within 48 hours of delivery with photos of the damage. We'll arrange for a replacement or full refund at no additional cost to you.",
        },
        {
          question: "How do I exchange an item?",
          answer:
            "To exchange an item, please contact our customer service team. We'll guide you through the process and help you select a replacement. The exchange item will ship once we receive the original.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.",
        },
      ],
    },
    {
      title: "Products & Care",
      faqs: [
        {
          question: "Are your products food safe?",
          answer:
            "Yes, all our glazed pottery is food safe and lead-free. Our glazes are specially formulated for tableware and tested to meet food safety standards. Items marked as decorative only are not intended for food use.",
        },
        {
          question: "Can I put pottery in the dishwasher?",
          answer:
            "Most of our pieces are dishwasher safe on the top rack with mild detergent. However, we recommend hand washing for items with delicate glazes or gold/platinum accents to preserve their finish.",
        },
        {
          question: "Is your pottery microwave safe?",
          answer:
            "Our standard glazed pieces are microwave safe. However, items with metallic accents (gold, platinum) should not be microwaved. Check the product description for specific care instructions.",
        },
        {
          question: "How should I care for my pottery?",
          answer:
            "Avoid sudden temperature changes, hand wash when possible, and store carefully to prevent chips. For detailed care instructions, visit our Care Instructions page.",
        },
      ],
    },
    {
      title: "Custom Orders",
      faqs: [
        {
          question: "Do you accept custom orders?",
          answer:
            "Yes! We love creating custom pieces for special occasions. Contact us with your ideas, and we'll discuss design options, timeline, and pricing. Custom orders typically take 4-6 weeks.",
        },
        {
          question: "Can I request a specific color or glaze?",
          answer:
            "Absolutely! We can work with you to create pieces in colors that match your vision. Some custom glazes may require additional time and cost. We'll provide a detailed quote before proceeding.",
        },
        {
          question: "Do you offer bulk or wholesale pricing?",
          answer:
            "Yes, we offer wholesale pricing for qualified retailers and bulk discounts for events like weddings. Contact us at wholesale@poetryandpottery.com for more information.",
        },
        {
          question: "Can I commission a set for my wedding?",
          answer:
            "We'd be honored to create pottery for your special day! Whether it's table settings, favors, or centerpieces, we can design pieces that match your wedding theme. Start the conversation at least 3-4 months in advance.",
        },
      ],
    },
    {
      title: "Workshops & Events",
      faqs: [
        {
          question: "What skill level are workshops for?",
          answer:
            "We offer workshops for all skill levels, from complete beginners to experienced potters. Each workshop listing indicates the skill level required. Beginners are always welcome!",
        },
        {
          question: "What's included in a workshop?",
          answer:
            "All materials, tools, and instruction are included. You'll create pieces during the workshop, which we'll fire and glaze. Finished pieces can be picked up or shipped to you within 2-3 weeks.",
        },
        {
          question: "Can I book a private workshop?",
          answer:
            "Yes! Private workshops are perfect for team building, birthday parties, or special gatherings. Contact us to discuss group size, date, and customization options.",
        },
        {
          question: "What's your cancellation policy for workshops?",
          answer:
            "Full refunds are available for cancellations made 7+ days before the workshop. Cancellations within 7 days receive a credit for a future workshop. No-shows forfeit the registration fee.",
        },
      ],
    },
  ],
};

const DEFAULT_SHIPPING_CONTENT: ShippingPageContent = {
  shippingOptions: [
    {
      icon: "truck",
      title: "Standard Shipping",
      description: "5-7 business days",
      price: "Free on orders over ₹2,000",
    },
    {
      icon: "package",
      title: "Express Shipping",
      description: "2-3 business days",
      price: "₹199",
    },
    {
      icon: "clock",
      title: "Same Day Delivery",
      description: "Available in select cities",
      price: "₹399",
    },
  ],
  shippingInfo: [
    {
      title: "Processing Time",
      content:
        "Orders are processed within 1-2 business days. During peak seasons or sales, processing may take up to 3-4 business days. You will receive a confirmation email once your order has shipped.",
    },
    {
      title: "Packaging",
      content:
        "Each piece is carefully wrapped in protective materials and placed in custom-designed boxes. We use eco-friendly packaging materials whenever possible to minimize environmental impact.",
    },
    {
      title: "Tracking",
      content:
        "Once your order ships, you will receive an email with tracking information. You can track your package directly from the link provided or by logging into your account.",
    },
    {
      title: "International Shipping",
      content:
        "We currently ship within India only. International shipping is coming soon. Sign up for our newsletter to be notified when we expand our shipping options.",
    },
  ],
  returnsPolicy: [
    {
      icon: "refresh-cw",
      title: "30-Day Returns",
      description:
        "Not satisfied? Return unused items within 30 days of delivery for a full refund.",
    },
    {
      icon: "shield",
      title: "Quality Guarantee",
      description:
        "Every piece is inspected before shipping. If you receive a damaged item, we'll replace it free of charge.",
    },
    {
      icon: "package",
      title: "Easy Process",
      description:
        "Initiate returns through your account or contact us. We'll provide a prepaid shipping label.",
    },
  ],
  returnSteps: [
    {
      step: "01",
      title: "Contact Us",
      description:
        "Email us at returns@poetryandpottery.com or use the return form in your account within 30 days of delivery.",
    },
    {
      step: "02",
      title: "Pack Your Item",
      description:
        "Place the item in its original packaging. If original packaging is unavailable, use secure packaging to prevent damage.",
    },
    {
      step: "03",
      title: "Ship It Back",
      description:
        "Use the prepaid shipping label we provide. Drop off the package at any courier pickup point.",
    },
    {
      step: "04",
      title: "Receive Refund",
      description:
        "Once we receive and inspect the item, your refund will be processed within 5-7 business days.",
    },
  ],
};

const DEFAULT_CARE_CONTENT: CarePageContent = {
  glazeTypes: [
    {
      name: "Matte Glazes",
      icon: "leaf",
      description:
        "Our signature matte finishes have a soft, velvety texture. They may show water spots more easily than glossy glazes.",
      care: "Hand wash and dry immediately for best results. Avoid abrasive cleaners that can dull the surface.",
    },
    {
      name: "Glossy Glazes",
      icon: "sparkles",
      description:
        "High-gloss finishes are durable and easy to clean. They resist staining and are generally dishwasher safe.",
      care: "Dishwasher safe on top rack. Wipe with a soft cloth to maintain shine.",
    },
    {
      name: "Metallic Accents",
      icon: "heart",
      description:
        "Pieces with gold, platinum, or copper accents add a touch of elegance. These require special care.",
      care: "Hand wash only. Never microwave. Avoid contact with acidic foods for extended periods.",
    },
    {
      name: "Unglazed / Raw Clay",
      icon: "thermometer",
      description:
        "Unglazed sections have a natural, porous texture. They may absorb liquids if not properly cared for.",
      care: "Season before first use. Hand wash and dry immediately. Not recommended for liquids.",
    },
  ],
  warnings: [
    {
      icon: "alert-triangle",
      title: "Thermal Shock",
      description:
        "Never move pottery directly from refrigerator to oven or vice versa. Allow pieces to gradually reach room temperature first.",
    },
    {
      icon: "alert-triangle",
      title: "Crazing",
      description:
        "Fine lines in the glaze (crazing) can develop over time and is a natural characteristic of handmade pottery. This doesn't affect functionality.",
    },
    {
      icon: "alert-triangle",
      title: "Food Safety",
      description:
        "Items marked as decorative only are not food safe. Check product descriptions before using for food or beverages.",
    },
  ],
  safeFor: [
    "Dishwasher (top rack, most pieces)",
    "Microwave (no metallic glazes)",
    "Oven up to 400°F (204°C)",
    "Food and beverages (glazed pieces)",
    "Refrigerator storage",
    "Hand washing with mild soap",
    "Soft sponge or cloth cleaning",
  ],
  avoid: [
    "Direct flame or stovetop",
    "Sudden temperature changes",
    "Abrasive cleaners or scrubbers",
    "Microwaving metallic glazes",
    "Extended soaking in water",
    "Steel wool or harsh chemicals",
    "Stacking without protection",
  ],
};

// Page configuration
const PAGE_CONFIG: Record<
  ContentPageType,
  {
    title: string;
    defaultContent:
      | AboutPageContent
      | FAQPageContent
      | ShippingPageContent
      | CarePageContent;
  }
> = {
  about: { title: "About Us", defaultContent: DEFAULT_ABOUT_CONTENT },
  faq: { title: "FAQ", defaultContent: DEFAULT_FAQ_CONTENT },
  shipping: {
    title: "Shipping & Returns",
    defaultContent: DEFAULT_SHIPPING_CONTENT,
  },
  care: { title: "Care Instructions", defaultContent: DEFAULT_CARE_CONTENT },
};

// ============================================================================
// Actions
// ============================================================================

/**
 * Get all content pages (list view).
 */
export async function getContentPages(): Promise<ContentPageListItem[]> {
  await requireAdmin();

  const pages = await prisma.contentPage.findMany({
    select: {
      slug: true,
      title: true,
      is_active: true,
      updated_at: true,
    },
    orderBy: { slug: "asc" },
  });

  // Merge with default pages
  const existingPages = new Map(pages.map((p) => [p.slug, p]));
  const allPages: ContentPageListItem[] = [];

  for (const [slug, config] of Object.entries(PAGE_CONFIG)) {
    const existing = existingPages.get(slug);
    allPages.push({
      slug,
      title: config.title,
      is_active: existing?.is_active ?? true,
      updated_at: existing?.updated_at ?? new Date(),
    });
  }

  return allPages;
}

/**
 * Get a specific content page by slug.
 */
export async function getContentPageBySlug(
  slug: ContentPageType,
): Promise<ContentPage | null> {
  await requireAdmin();

  const config = PAGE_CONFIG[slug];
  if (!config) {
    return null;
  }

  const page = await prisma.contentPage.findUnique({
    where: { slug },
  });

  if (page) {
    return {
      ...page,
      content: page.content as
        | AboutPageContent
        | FAQPageContent
        | ShippingPageContent
        | CarePageContent,
    };
  }

  // Return default content if page doesn't exist in DB
  return {
    id: 0,
    slug,
    title: config.title,
    content: config.defaultContent,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

/**
 * Update content page.
 */
export async function updateContentPage(
  slug: ContentPageType,
  content:
    | AboutPageContent
    | FAQPageContent
    | ShippingPageContent
    | CarePageContent,
): Promise<ContentActionResult> {
  await requireAdmin();

  const config = PAGE_CONFIG[slug];
  if (!config) {
    return { success: false, error: "Invalid page slug" };
  }

  try {
    await prisma.contentPage.upsert({
      where: { slug },
      create: {
        slug,
        title: config.title,
        content: content as object,
        is_active: true,
      },
      update: {
        content: content as object,
      },
    });

    revalidatePath("/dashboard/content");
    revalidatePath(`/dashboard/content/${slug}`);
    revalidatePath(`/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update content page:", error);
    return { success: false, error: "Failed to update content page" };
  }
}

/**
 * Toggle content page active status.
 */
export async function toggleContentPageActive(
  slug: ContentPageType,
): Promise<ContentActionResult> {
  await requireAdmin();

  const config = PAGE_CONFIG[slug];
  if (!config) {
    return { success: false, error: "Invalid page slug" };
  }

  try {
    const existing = await prisma.contentPage.findUnique({
      where: { slug },
    });

    if (existing) {
      await prisma.contentPage.update({
        where: { slug },
        data: { is_active: !existing.is_active },
      });
    } else {
      await prisma.contentPage.create({
        data: {
          slug,
          title: config.title,
          content: config.defaultContent as object,
          is_active: false,
        },
      });
    }

    revalidatePath("/dashboard/content");
    revalidatePath(`/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to toggle content page:", error);
    return { success: false, error: "Failed to toggle content page" };
  }
}

// ============================================================================
// Public Actions (for frontend pages)
// ============================================================================

/**
 * Get about page content (public).
 */
export async function getPublicAboutContent(): Promise<AboutPageContent> {
  const page = await prisma.contentPage.findUnique({
    where: { slug: "about" },
  });

  if (page && page.is_active) {
    return page.content as AboutPageContent;
  }

  return DEFAULT_ABOUT_CONTENT;
}

/**
 * Get FAQ page content (public).
 */
export async function getPublicFAQContent(): Promise<FAQPageContent> {
  const page = await prisma.contentPage.findUnique({
    where: { slug: "faq" },
  });

  if (page && page.is_active) {
    return page.content as FAQPageContent;
  }

  return DEFAULT_FAQ_CONTENT;
}

/**
 * Get shipping page content (public).
 */
export async function getPublicShippingContent(): Promise<ShippingPageContent> {
  const page = await prisma.contentPage.findUnique({
    where: { slug: "shipping" },
  });

  if (page && page.is_active) {
    return page.content as ShippingPageContent;
  }

  return DEFAULT_SHIPPING_CONTENT;
}

/**
 * Get care page content (public).
 */
export async function getPublicCareContent(): Promise<CarePageContent> {
  const page = await prisma.contentPage.findUnique({
    where: { slug: "care" },
  });

  if (page && page.is_active) {
    return page.content as CarePageContent;
  }

  return DEFAULT_CARE_CONTENT;
}
