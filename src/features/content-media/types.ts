export const CONTENT_MEDIA_PAGES = [
  { slug: "home", label: "Home" },
  { slug: "store", label: "Store" },
  { slug: "events", label: "Events" },
  { slug: "about", label: "About" },
  { slug: "contact", label: "Contact" },
  { slug: "faq", label: "FAQ" },
  { slug: "customize", label: "Customize" },
  { slug: "shipping", label: "Shipping" },
  { slug: "care", label: "Care" },
  { slug: "privacy", label: "Privacy" },
  { slug: "terms", label: "Terms" },
] as const;

export const CONTENT_MEDIA_GLOBALS = [
  { slug: "brand", label: "Brand" },
  { slug: "footer", label: "Footer" },
] as const;

export type ContentMediaPageSlug = (typeof CONTENT_MEDIA_PAGES)[number]["slug"];
export type ContentMediaGlobalSlug =
  (typeof CONTENT_MEDIA_GLOBALS)[number]["slug"];
export type ContentMediaSelection =
  | ContentMediaPageSlug
  | ContentMediaGlobalSlug;
