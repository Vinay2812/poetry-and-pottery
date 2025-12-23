import type {
  AboutPageContent,
  CarePageContent,
  ContentPageListItem,
  ContentPageType,
  FAQPageContent,
  ShippingPageContent,
} from "@/actions/admin";

import { formatContentDate } from "@/lib/date";

/**
 * View model for the content pages list.
 */
export interface ContentPagesListViewModel {
  pages: ContentPageRowViewModel[];
}

export interface ContentPageRowViewModel {
  slug: string;
  title: string;
  isActive: boolean;
  lastUpdated: string;
}

/**
 * Props for the presentational ContentPagesList component.
 */
export interface ContentPagesListProps {
  viewModel: ContentPagesListViewModel;
  isPending: boolean;
  onToggleActive: (slug: ContentPageType) => void;
}

/**
 * Props for the ContentPagesListContainer.
 */
export interface ContentPagesListContainerProps {
  data: ContentPageListItem[];
}

/**
 * View model for a single content page editor.
 */
export interface ContentPageEditorViewModel {
  slug: ContentPageType;
  title: string;
  content:
    | AboutPageContent
    | FAQPageContent
    | ShippingPageContent
    | CarePageContent;
}

/**
 * Props for the ContentPageEditor component.
 */
export interface ContentPageEditorProps {
  viewModel: ContentPageEditorViewModel;
  isPending: boolean;
  onSave: (
    content:
      | AboutPageContent
      | FAQPageContent
      | ShippingPageContent
      | CarePageContent,
  ) => void;
  onCancel: () => void;
}

/**
 * Props for the ContentPageEditorContainer.
 */
export interface ContentPageEditorContainerProps {
  slug: ContentPageType;
  title: string;
  content:
    | AboutPageContent
    | FAQPageContent
    | ShippingPageContent
    | CarePageContent;
}

/**
 * Build content pages list view model.
 */
export function buildContentPagesListViewModel(
  data: ContentPageListItem[],
): ContentPagesListViewModel {
  return {
    pages: data.map((page) => ({
      slug: page.slug,
      title: page.title,
      isActive: page.is_active,
      lastUpdated: formatContentDate(page.updated_at),
    })),
  };
}

/**
 * Build content page editor view model.
 */
export function buildContentPageEditorViewModel(
  slug: ContentPageType,
  title: string,
  content:
    | AboutPageContent
    | FAQPageContent
    | ShippingPageContent
    | CarePageContent,
): ContentPageEditorViewModel {
  return {
    slug,
    title,
    content,
  };
}

/**
 * Page descriptions for the list.
 */
export const PAGE_DESCRIPTIONS: Record<ContentPageType, string> = {
  about: "Team members, values, and process steps",
  faq: "Frequently asked questions and answers",
  shipping: "Shipping options, policies, and return process",
  care: "Product care instructions and glaze information",
};

/**
 * Available icon options for content editors.
 */
export const ICON_OPTIONS = [
  { value: "leaf", label: "Leaf" },
  { value: "heart", label: "Heart" },
  { value: "flame", label: "Flame" },
  { value: "sparkles", label: "Sparkles" },
  { value: "star", label: "Star" },
  { value: "truck", label: "Truck" },
  { value: "package", label: "Package" },
  { value: "clock", label: "Clock" },
  { value: "refresh-cw", label: "Refresh" },
  { value: "shield", label: "Shield" },
  { value: "alert-triangle", label: "Warning" },
  { value: "thermometer", label: "Thermometer" },
  { value: "droplets", label: "Droplets" },
  { value: "hand", label: "Hand" },
  { value: "zap", label: "Zap" },
];
