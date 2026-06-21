// Hardcoded public site content. Single source of truth — edit values here, not
// via the dashboard. The dashboard editors for these have been removed.

export interface SitePageSeo {
  title: string;
  description: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
}

export interface SiteFooterContent {
  tagline: string;
  copyright: string;
  newsletterBlurb: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
}

// All image and video URLs the site uses live here — consumers must import from
// this object instead of hardcoding URLs in component files. The dashboard
// editors for these have been removed.
export const SITE_MEDIA = {
  // Brand
  logoSvg:
    "https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.svg",
  logoPng:
    "https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.png",
  favicon:
    "https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.svg",
  appleTouchIcon:
    "https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.svg",

  // Social / OG images
  defaultSocialImage:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
  productsOgImage:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
  eventsOgImage:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",

  // Home hero carousel — handcrafted studio moments shown on the landing hero.
  homeHeroImages: [
    "https://cdn.poetryandpottery.prodapp.club/assets/IMG-20260509-WA0055.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/20260422_152745.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/20260422_160705.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/20260505_233607.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/IMG-20260509-WA0068.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/20260510_174007.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/20260510_182735.jpg",
    "https://cdn.poetryandpottery.prodapp.club/assets/20260512_191421.jpg",
  ],
  aboutStoryVideo:
    "https://cdn.poetryandpottery.prodapp.club/videos/poetry-pottery-about.mp4",
  // "Our Story" still — the founder's beginning, shown on the about story block.
  aboutStoryImage:
    "https://cdn.poetryandpottery.prodapp.club/assets/20260512_181606.png",
  aboutOpenMicImage:
    "https://images.pexels.com/photos/6919985/pexels-photo-6919985.jpeg",
  aboutTeamFounderImage:
    "https://cdn.poetryandpottery.prodapp.club/assets/600984583_17916866274236583_6231166633502430886_n.jpg",

  // Fallbacks
  categoryFallbackImage:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop",
  reviewAvatarFallback:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
} as const;

export const SITE_SEO: SitePageSeo = {
  title: "Poetry & Pottery | Handcrafted Ceramics from Sangli",
  description:
    "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Each piece tells a story — functional, decorative, and custom ceramics crafted with passion.",
  ogImage: SITE_MEDIA.logoPng,
  ogTitle: "Poetry & Pottery | Handcrafted Ceramics from Sangli",
  ogDescription:
    "Shop unique pottery and join our workshops in Sangli, Maharashtra.",
};

// Contact info, social links, and brand details. Consumers must import from
// here instead of hardcoding values in component files.
export const SITE_CONTACT = {
  email: "poetryandpottery.aj@gmail.com",
  supportEmail: "support@poetryandpottery.com",
  phoneDisplay: "+91 83290 26762",
  phoneIntl: "918329026762", // digits-only; used in tel: and wa.me URLs
  address: "Sangli, Maharashtra, India",
  instagramUrl: "https://instagram.com/poetryandpotterystudio_",
  whatsappUrl: "https://wa.me/918329026762",
  mailtoUrl: "mailto:poetryandpottery.aj@gmail.com",
  telUrl: "tel:+918329026762",
} as const;

export interface SiteFAQContent {
  categories: { title: string; faqs: { question: string; answer: string }[] }[];
}

export interface SiteShippingContent {
  shippingOptions: {
    icon: string;
    title: string;
    description: string;
    price: string;
  }[];
  shippingInfo: { title: string; content: string }[];
  returnsPolicy: { icon: string; title: string; description: string }[];
  returnSteps: { step: string; title: string; description: string }[];
}

export interface SiteCareContent {
  glazeTypes: {
    name: string;
    icon: string;
    description: string;
    care: string;
  }[];
  warnings: { icon: string; title: string; description: string }[];
  safeFor: string[];
  avoid: string[];
}

export interface SiteLegalContent {
  lastUpdated: string;
  introduction: string;
  sections: { title: string; content: string }[];
  contactEmail: string;
}

export const SITE_FAQ_CONTENT: SiteFAQContent = {
  categories: [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days within India. Express shipping (2-3 business days) is also available at checkout.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "No, we currently deliver within India only. We do not offer international shipping at this time.",
        },
        {
          question: "How is my order packaged?",
          answer:
            "Each piece is carefully wrapped in biodegradable tissue, cushioned with recycled paper, and placed in a sturdy box. We take extra care to ensure your pottery arrives safely.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes! You can track your order through our website under the Orders section in your account. For any queries, please reach out to us directly on WhatsApp.",
        },
      ],
    },
    {
      title: "Products & Care",
      faqs: [
        {
          question: "Are your products food-safe?",
          answer:
            "Yes, all our functional pottery is made with food-safe glazes and is safe for everyday use. Decorative pieces are clearly marked as such.",
        },
        {
          question: "Can I put your pottery in the dishwasher?",
          answer:
            "Most of our pieces are dishwasher-safe (top rack recommended). However, hand washing is always gentler and helps preserve the glaze longer. Check the product description for specific care instructions.",
        },
        {
          question: "Are your pieces microwave-safe?",
          answer:
            "Most pieces without metallic glazes are microwave-safe. Always check for any metallic lusters or decorations before microwaving. Never microwave pieces with gold or platinum accents.",
        },
        {
          question: "How do I care for my pottery?",
          answer:
            "Avoid sudden temperature changes (thermal shock), hand wash when possible, and store carefully to prevent chipping. See our Care Instructions page for detailed guidance.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "All sales are final. We do not offer returns or exchanges. Please review your order carefully before purchasing.",
        },
        {
          question: "What if my item arrives damaged?",
          answer:
            "Please contact us on WhatsApp within 48 hours of delivery with photos of the damage. We will review your case and assist you accordingly.",
        },
        {
          question: "Do you offer Cash on Delivery (COD)?",
          answer:
            "No, we accept online payments only. Cash on Delivery is not available for any orders.",
        },
      ],
    },
    {
      title: "Workshops & Events",
      faqs: [
        {
          question: "Do you offer pottery workshops?",
          answer:
            "Yes! We host regular workshops for all skill levels, from beginner wheel-throwing classes to advanced glazing techniques. Check our Events page for upcoming sessions.",
        },
        {
          question: "Can I book a private workshop?",
          answer:
            "Absolutely! Private workshops are perfect for team building, birthdays, or special occasions. Contact us to discuss your needs and we'll create a custom experience.",
        },
        {
          question: "What should I wear to a workshop?",
          answer:
            "Wear comfortable clothes that can get dirty—clay has a way of finding its way onto everything! We provide aprons, but closed-toe shoes are recommended.",
        },
      ],
    },
    {
      title: "Custom Orders",
      faqs: [
        {
          question: "Do you accept custom orders?",
          answer:
            "Yes, we love bringing your ideas to life! Custom orders typically take 4-6 weeks depending on complexity. Contact us with your vision and we'll provide a quote.",
        },
        {
          question: "Can you match a specific color?",
          answer:
            "We can often create custom glazes to match your color preferences. Keep in mind that handmade glazes may have natural variations that add to their beauty.",
        },
        {
          question: "Do you offer wholesale or bulk orders?",
          answer:
            "Yes, we work with restaurants, hotels, and retailers. Minimum order quantities apply. Contact us at wholesale@poetryandpottery.com for pricing and details.",
        },
      ],
    },
  ],
};

export const SITE_SHIPPING_CONTENT: SiteShippingContent = {
  shippingOptions: [
    {
      icon: "truck",
      title: "Standard Shipping",
      description: "5-7 business days",
      price: "Free on orders over ₹2,000",
    },
    {
      icon: "zap",
      title: "Express Shipping",
      description: "2-3 business days",
      price: "₹199 flat rate",
    },
    {
      icon: "map-pin",
      title: "India-Only Delivery",
      description: "Domestic shipping across eligible Indian PIN codes",
      price: "International shipping not available",
    },
  ],
  shippingInfo: [
    {
      title: "Processing Time",
      content:
        "Orders are processed within 1-2 business days. During peak seasons or for custom orders, processing may take up to 3-4 business days.",
    },
    {
      title: "Order Tracking",
      content:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order through your account dashboard.",
    },
    {
      title: "Packaging",
      content:
        "We take great care in packaging your pottery. Each piece is wrapped in biodegradable tissue, cushioned with recycled paper, and placed in sturdy boxes designed for fragile items.",
    },
    {
      title: "Delivery Areas",
      content:
        "We currently deliver within India only. International shipping is not available at this time. Remote areas may require additional delivery time.",
    },
  ],
  returnsPolicy: [
    {
      icon: "refresh-cw",
      title: "No Returns or Exchanges",
      description:
        "All sales are final. We do not offer returns or exchanges once an order is placed.",
    },
    {
      icon: "shield",
      title: "Damage Protection",
      description:
        "If your item arrives damaged, contact us within 48 hours of delivery with clear photos so we can assist.",
    },
    {
      icon: "message-circle",
      title: "Support for Delivery Issues",
      description:
        "For shipping or delivery concerns, reach out via WhatsApp or email and our team will guide you.",
    },
  ],
  returnSteps: [
    {
      step: "01",
      title: "Contact Us",
      description:
        "If an item arrives damaged, contact us within 48 hours of delivery with your order number and photos on WhatsApp or email.",
    },
    {
      step: "02",
      title: "Case Review",
      description:
        "Our team will review your case and confirm the next steps based on the damage and order details.",
    },
    {
      step: "03",
      title: "Resolution",
      description:
        "If eligible, we will provide a replacement or another suitable resolution. Returns/exchanges are not offered for non-damaged items.",
    },
    {
      step: "04",
      title: "Follow-up Support",
      description:
        "Need further help with shipping or delivery? Contact support and we will assist you promptly.",
    },
  ],
};

export const SITE_CARE_CONTENT: SiteCareContent = {
  glazeTypes: [
    {
      name: "Matte Glazes",
      icon: "leaf",
      description:
        "Our signature matte finishes have a soft, velvety texture. They may show water spots more easily than glossy glazes.",
      care: "Hand wash and dry immediately for best results. Use a soft cloth to maintain the smooth finish.",
    },
    {
      name: "Glossy Glazes",
      icon: "sparkles",
      description:
        "Our high-shine glazes are durable and easy to clean. They resist staining and are perfect for everyday use.",
      care: "Dishwasher safe on top rack. Avoid abrasive scrubbers that may scratch the surface.",
    },
    {
      name: "Reactive Glazes",
      icon: "palette",
      description:
        "These artistic glazes create unique patterns where colors blend and flow. Each piece is truly one-of-a-kind.",
      care: "Hand wash recommended to preserve the unique patterns. Some color variation is normal and adds character.",
    },
    {
      name: "Unglazed/Raw Clay",
      icon: "layers",
      description:
        "Some pieces feature exposed clay for a natural, earthy aesthetic. These areas are porous and require special care.",
      care: "Keep dry when not in use. Season with food-safe oil occasionally. Not recommended for liquids.",
    },
  ],
  warnings: [
    {
      icon: "alert-triangle",
      title: "Thermal Shock",
      description:
        "Never move pottery directly from refrigerator to oven or vice versa. Allow pieces to come to room temperature first.",
    },
    {
      icon: "flame",
      title: "Direct Heat",
      description:
        "Never place pottery directly on stovetop burners or open flames. Our pieces are oven-safe but not stovetop-safe.",
    },
    {
      icon: "droplets",
      title: "Prolonged Soaking",
      description:
        "Avoid leaving pieces soaking in water for extended periods, especially those with unglazed areas.",
    },
    {
      icon: "hammer",
      title: "Impact Damage",
      description:
        "Handle with care. Chips and cracks can develop from impacts. Store pieces with padding between them.",
    },
  ],
  safeFor: [
    "Dishwasher (top rack, most pieces)",
    "Microwave (no metallic glazes)",
    "Oven up to 220°C (check product details)",
    "Refrigerator and freezer",
    "Food storage and serving",
  ],
  avoid: [
    "Direct flame or stovetop",
    "Sudden temperature changes",
    "Abrasive cleaners or scrubbers",
    "Prolonged soaking in water",
    "Stacking without protection",
  ],
};

export const SITE_PRIVACY_CONTENT: SiteLegalContent = {
  lastUpdated: "January 2025",
  introduction:
    "At Poetry & Pottery, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.",
  sections: [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, make a purchase, sign up for our newsletter, or contact us. This may include your name, email address, shipping address, phone number, and payment information.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to process orders, communicate with you about your purchases, send promotional emails (with your consent), improve our website and services, and comply with legal obligations.",
    },
    {
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We may share your data with service providers who help us operate our business (payment processors, shipping carriers), and when required by law.",
    },
    {
      title: "Cookies and Tracking",
      content:
        "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time by clicking the unsubscribe link in our emails.",
    },
    {
      title: "Data Retention",
      content:
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the 'Last Updated' date.",
    },
  ],
  contactEmail: "privacy@poetryandpottery.com",
};

export const SITE_TERMS_CONTENT: SiteLegalContent = {
  lastUpdated: "January 2025",
  introduction:
    "Welcome to Poetry & Pottery. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before making a purchase or using our services.",
  sections: [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.",
    },
    {
      title: "Products and Pricing",
      content:
        "All products are handmade and may have slight variations in color, size, and pattern. These variations are not defects but rather the unique characteristics of handcrafted pottery. Prices are listed in Indian Rupees (INR) and are subject to change without notice.",
    },
    {
      title: "Orders and Payment",
      content:
        "By placing an order, you are making an offer to purchase. We reserve the right to refuse or cancel any order for any reason. Payment must be received in full before orders are processed. We accept major credit cards, debit cards, and UPI payments.",
    },
    {
      title: "Shipping and Delivery",
      content:
        "We make every effort to deliver your order within the estimated timeframe. However, delivery times are not guaranteed and may be affected by factors beyond our control. Risk of loss passes to you upon delivery to the carrier.",
    },
    {
      title: "Returns and Refunds",
      content:
        "Please refer to our Shipping & Returns page for detailed information about our return policy. Custom or personalized items cannot be returned unless they arrive damaged or defective.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content on this website, including images, text, designs, and logos, is the property of Poetry & Pottery and is protected by copyright laws. You may not reproduce, distribute, or use our content without written permission.",
    },
    {
      title: "User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized use of your account.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Poetry & Pottery shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product in question.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions about these Terms of Service, please contact us at legal@poetryandpottery.com or through our Contact page.",
    },
  ],
  contactEmail: "legal@poetryandpottery.com",
};

export const SITE_FOOTER_CONTENT: SiteFooterContent = {
  tagline: "Crafting handmade touch to life’s simplest 🌼 joys :)",
  copyright: "© Poetry & Pottery. All rights reserved.",
  newsletterBlurb:
    "Subscribe for new collection drops, workshop announcements, and studio stories.",
  columns: [
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
  ],
};
