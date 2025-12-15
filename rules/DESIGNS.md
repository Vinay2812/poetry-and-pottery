# Design System Rules

This document outlines the design system rules and guidelines for the Poetry & Pottery pottery e-commerce website. All components and pages must adhere to these standards for consistency across desktop and mobile views.

---

## 1. Color System

### Primary Colors

- **Primary**: `#4F6F52` (Earthy Sage/Moss Green)
- **Primary Hover**: `#3D5640`
- **Primary Active**: `#2E4230`
- **Primary Light**: `#E8ECE8` (Subtle Green - for backgrounds)
- **Primary Lighter**: `#F4F6F4` (Very subtle green)

### Secondary/Accent Colors

- **Terracotta**: `#C4785A` (Warm accent)
- **Terracotta Hover**: `#B06847`
- **Terracotta Light**: `#F5EBE6` (Subtle terracotta background)
- **Cream**: `#F5F0E8` (Warm neutral)
- **Clay**: `#8B7355` (Earthy brown)

### Neutral Colors (Gray Scale)

```css
/* Light Mode Neutrals */
--neutral-50: #fafaf9; /* Lightest background (warm white) */
--neutral-100: #f5f5f4; /* Light background */
--neutral-200: #e7e5e4; /* Border light */
--neutral-300: #d6d3d1; /* Border default */
--neutral-400: #a8a29e; /* Placeholder text */
--neutral-500: #737373; /* Secondary text (muted-foreground) */
--neutral-600: #525252; /* Body text */
--neutral-700: #404040; /* Primary text */
--neutral-800: #262626; /* Headings */
--neutral-900: #1a1a1a; /* Darkest text (foreground) */
--neutral-950: #0a0a0a; /* Near black */
```

### Background Colors

- **Background Light**: `#FAFAF9` (Warm stone white)
- **Background Dark**: `#141614` (Warm dark)
- **Surface Light**: `#FFFFFF`
- **Surface Dark**: `#1E201E`

### Text Colors

- **Foreground**: `#1a1a1a` (Main text)
- **Foreground Secondary**: `#525252` (Body text)
- **Muted Foreground**: `#737373` (Secondary text)
- **Placeholder**: `#A8A29E` (Input placeholders)
- **White**: `#FFFFFF` (On dark backgrounds)

### Border Colors

```css
/* Light Mode */
--border-default: #e7e5e4; /* neutral-200 */
--border-subtle: #f5f5f4; /* neutral-100 */
--border-strong: #d6d3d1; /* neutral-300 */
--border-emphasis: #a8a29e; /* neutral-400 */

/* Interactive */
--border-focus: #4f6f52; /* primary */
--border-error: #ef4444; /* destructive */
--border-success: #4f6f52; /* primary/in-stock */
--border-warning: #c4785a; /* terracotta */
```

### Status Colors

- **In Stock**: `#4F6F52`
- **Low Stock**: `#C4785A` (Terracotta)
- **Out of Stock**: `#737373`
- **Destructive**: `#ef4444`
- **Destructive Light**: `#FEE2E2` (Error background)
- **Success**: `#4F6F52`
- **Success Light**: `#E8ECE8`
- **Warning**: `#F59E0B`
- **Warning Light**: `#FEF3C7`
- **Info**: `#3B82F6`
- **Info Light**: `#DBEAFE`

### Usage Rules

- Use primary color for CTAs, active states, and brand elements
- Use terracotta as secondary accent for warmth (low stock, sale badges)
- Use muted foreground for secondary text and labels
- Maintain sufficient contrast ratios (WCAG AA minimum)
- Reserve destructive red only for errors and delete actions

---

## 2. Typography

### Font Family

- **Display**: Plus Jakarta Sans (for headings and UI)
- **Body**: System font stack (for content)

### Font Weights

- **Headings (H1-H3)**: `font-extrabold` (800)
- **Subheadings**: `font-bold` (700)
- **Body Text**: `font-medium` (500) or `font-normal` (400)
- **Labels**: `font-semibold` (600)

### Font Sizes

#### Mobile

- **H1**: `text-4xl` (36px) - Hero titles
- **H2**: `text-xl` (20px) - Section titles
- **H3**: `text-lg` (18px) - Card titles
- **Body**: `text-sm` (14px) or `text-base` (16px)
- **Small**: `text-xs` (12px) - Labels, badges

#### Desktop

- **H1**: `text-6xl` (60px) or `text-8xl` (96px) - Hero titles
- **H2**: `text-2xl` (24px) or `text-3xl` (30px) - Section titles
- **H3**: `text-xl` (20px) or `text-2xl` (24px) - Card titles
- **Body**: `text-base` (16px) or `text-lg` (18px)

### Line Heights

- **Tight**: `leading-tight` (1.25) - Headings
- **Relaxed**: `leading-relaxed` (1.625) - Body text
- **Snug**: `leading-snug` (1.375) - UI elements

### Letter Spacing

- **Tight**: `tracking-tight` - Headings
- **Wide**: `tracking-wide` - Uppercase labels

---

## 3. Spacing & Layout

### Spacing Token System (4px base)

| Token      | Value | Tailwind | Use Case                                    |
| ---------- | ----- | -------- | ------------------------------------------- |
| `space-0`  | 0px   | `0`      | No spacing                                  |
| `space-1`  | 4px   | `1`      | Tight spacing, icon gaps                    |
| `space-2`  | 8px   | `2`      | Small spacing, button padding (vertical)    |
| `space-3`  | 12px  | `3`      | Medium-small spacing, form field padding    |
| `space-4`  | 16px  | `4`      | Default spacing, card padding, section gaps |
| `space-5`  | 20px  | `5`      | Medium spacing                              |
| `space-6`  | 24px  | `6`      | Large spacing, modal padding                |
| `space-7`  | 28px  | `7`      | Medium-large spacing                        |
| `space-8`  | 32px  | `8`      | Section spacing                             |
| `space-10` | 40px  | `10`     | Large section spacing                       |
| `space-12` | 48px  | `12`     | Extra large spacing                         |
| `space-16` | 64px  | `16`     | Page section spacing                        |
| `space-20` | 80px  | `20`     | Major section breaks                        |
| `space-24` | 96px  | `24`     | Hero sections, major breaks                 |

### Container Padding

#### Mobile

- **Page Padding**: `px-4` (16px) - Default, `px-6` (24px) - Spacious
- **Section Padding**: `py-6` (24px) or `py-8` (32px)
- **Card Padding**: `p-4` (16px) or `p-5` (20px)

#### Desktop

- **Page Padding**: `px-8` (32px) or `px-12` (48px)
- **Section Padding**: `py-12` (48px) or `py-16` (64px)
- **Card Padding**: `p-6` (24px) or `p-8` (32px)

### Gaps

| Token     | Value | Tailwind | Use Case                    |
| --------- | ----- | -------- | --------------------------- |
| `gap-xs`  | 4px   | `gap-1`  | Tight inline elements       |
| `gap-sm`  | 8px   | `gap-2`  | Icon + text, button groups  |
| `gap-md`  | 16px  | `gap-4`  | Card elements, form fields  |
| `gap-lg`  | 24px  | `gap-6`  | Section spacing, card grids |
| `gap-xl`  | 32px  | `gap-8`  | Major sections, large grids |
| `gap-2xl` | 48px  | `gap-12` | Page sections               |

### Margin Guidelines

```css
/* Text Elements */
--heading-margin-bottom: mb-2 to mb-4; /* 8px to 16px after headings */
--paragraph-margin-bottom: mb-4; /* 16px between paragraphs */
--list-margin-bottom: mb-4; /* 16px after lists */
--list-item-margin-bottom: mb-2; /* 8px between list items */

/* Components */
--component-margin-sm: my-2; /* 8px tight component spacing */
--component-margin-md: my-4; /* 16px default component spacing */
--component-margin-lg: my-6; /* 24px loose component spacing */

/* Sections */
--section-margin-sm: my-8; /* 32px small section breaks */
--section-margin-md: my-12; /* 48px medium section breaks */
--section-margin-lg: my-16; /* 64px large section breaks */
--section-margin-xl: my-24; /* 96px extra large section breaks */
```

### Container Widths

```css
--container-sm: 640px; /* Small screens */
--container-md: 768px; /* Medium screens */
--container-lg: 1024px; /* Large screens */
--container-xl: 1280px; /* Extra large screens */
--container-2xl: 1536px; /* Very large screens */
--container-prose: 65ch; /* Optimal reading width */
```

### Safe Areas (Mobile)

- **Bottom Safe Area**: `pb-safe` or `pb-safe-area` - For fixed bottom nav
- **Top Safe Area**: `pt-safe` or `pt-safe-top` - For fixed headers
- **Mobile Header Offset**: `pt-14` (56px) - Accounts for fixed mobile header
- **Bottom Nav Offset**: `pb-20` (80px) - Accounts for fixed bottom nav + CTA

---

## 4. Border Radius

### Standard Radius Tokens

- **Small**: `rounded-lg` (0.5rem / 8px) - Buttons, inputs
- **Medium**: `rounded-xl` (0.75rem / 12px) - Cards, images
- **Large**: `rounded-2xl` (1rem / 16px) - Large cards
- **Extra Large**: `rounded-3xl` (1.5rem / 24px) - Hero sections
- **Full**: `rounded-full` (9999px) - Pills, circular buttons

### Component-Specific

- **Hero Sections**: `rounded-[2.5rem]` (40px)
- **Category Icons**: `rounded-2xl` (16px)
- **Product Cards**: `rounded-2xl` (16px)
- **Buttons**: `rounded-full` (for primary) or `rounded-xl` (for secondary)

---

## 5. Border Width & Style

### Border Width Scale

| Token      | Value | Tailwind   | Use Case                 |
| ---------- | ----- | ---------- | ------------------------ |
| `border-0` | 0px   | `border-0` | No border                |
| `border-1` | 1px   | `border`   | Default borders          |
| `border-2` | 2px   | `border-2` | Emphasized borders       |
| `border-4` | 4px   | `border-4` | Heavy/decorative borders |

### Border Styles

- **Solid**: `border-solid` - Default for all borders
- **Dashed**: `border-dashed` - Upload areas, empty states
- **Dotted**: `border-dotted` - Rarely used, special cases

### Component Borders

```css
/* Inputs */
--input-border: border border-border; /* Default */
--input-border-hover: border border-neutral-400; /* Hover state */
--input-border-focus: border border-primary; /* Focus state */
--input-border-error: border border-destructive; /* Error state */
--input-border-disabled: border border-neutral-200; /* Disabled state */

/* Cards */
--card-border-none: border-0;
--card-border-subtle: border border-neutral-100;
--card-border-default: border border-border;
--card-border-strong: border border-neutral-300;

/* Dividers */
--divider-light: border-t border-neutral-100;
--divider-default: border-t border-border;
--divider-heavy: border-t-2 border-neutral-300;
```

### Focus Rings

```css
/* Primary Focus Ring */
--focus-ring: ring-2 ring-primary/30 ring-offset-2;

/* Component-specific focus */
--button-focus: focus: ring-2 focus: ring-primary/30 focus: ring-offset-2;
--input-focus: focus: ring-2 focus: ring-primary/20 focus: border-primary;
--link-focus: focus: outline-none focus: ring-2 focus: ring-primary/30
  focus: ring-offset-2 rounded;

/* Visible focus for accessibility */
--focus-visible: focus-visible: ring-2 focus-visible: ring-primary/30
  focus-visible: ring-offset-2;
```

---

## 6. Shadows

### Shadow Scale

| Token         | Value                                   | Use Case                     |
| ------------- | --------------------------------------- | ---------------------------- |
| `shadow-none` | none                                    | No shadow                    |
| `shadow-xs`   | `0 1px 2px rgba(0, 0, 0, 0.05)`         | Subtle depth, small elements |
| `shadow-sm`   | `0 1px 3px rgba(0, 0, 0, 0.1)`          | Buttons, inputs              |
| `shadow-md`   | `0 4px 6px -1px rgba(0, 0, 0, 0.1)`     | Cards, dropdowns             |
| `shadow-lg`   | `0 10px 15px -3px rgba(0, 0, 0, 0.1)`   | Modals, popovers             |
| `shadow-xl`   | `0 20px 25px -5px rgba(0, 0, 0, 0.1)`   | Large modals, dialogs        |
| `shadow-2xl`  | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` | High emphasis overlays       |

### Brand Shadow Tokens (Primary-tinted)

```css
/* Custom shadows with primary color tint */
--shadow-soft: 0 2px 8px rgba(79, 111, 82, 0.08); /* Cards, subtle elevation */
--shadow-card: 0 4px 12px rgba(79, 111, 82, 0.1); /* Elevated cards */
--shadow-float: 0 8px 24px rgba(79, 111, 82, 0.15); /* Modals, overlays */
--shadow-nav: 0 -2px 10px rgba(0, 0, 0, 0.05); /* Bottom navigation */
--shadow-header: 0 2px 10px rgba(0, 0, 0, 0.05); /* Fixed headers */
```

### Colored Shadows (Glow Effects)

```css
/* Primary glow - for CTA buttons */
--shadow-primary-sm: 0 2px 8px rgba(79, 111, 82, 0.25);
--shadow-primary-md: 0 4px 14px rgba(79, 111, 82, 0.35);
--shadow-primary-lg: 0 8px 20px rgba(79, 111, 82, 0.4);

/* Terracotta glow - for accent elements */
--shadow-terracotta-sm: 0 2px 8px rgba(196, 120, 90, 0.25);
--shadow-terracotta-md: 0 4px 14px rgba(196, 120, 90, 0.35);

/* Error glow - for destructive actions */
--shadow-error: 0 4px 14px rgba(239, 68, 68, 0.3);

/* Success glow */
--shadow-success: 0 4px 14px rgba(79, 111, 82, 0.3);
```

### Tailwind Usage

```css
/* Primary button with glow */
.btn-primary {
  @apply shadow-primary/20 hover:shadow-primary/40 shadow-lg;
}

/* Card hover effect */
.card-hover {
  @apply shadow-soft hover:shadow-card transition-shadow duration-200;
}
```

### Dark Mode Shadows

```css
/* In dark mode, reduce shadow intensity and add subtle glow */
--shadow-dark-sm:
  0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03);
--shadow-dark-md:
  0 4px 6px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
--shadow-dark-lg:
  0 10px 15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03);
```

### Component Shadow Mapping

| Component      | Default                       | Hover               | Active/Focus   |
| -------------- | ----------------------------- | ------------------- | -------------- |
| Product Card   | `shadow-soft`                 | `shadow-card`       | -              |
| Primary Button | `shadow-lg shadow-primary/20` | `shadow-primary/40` | `shadow-sm`    |
| Modal          | `shadow-float`                | -                   | -              |
| Dropdown       | `shadow-lg`                   | -                   | -              |
| Input          | `shadow-none`                 | -                   | `ring` (focus) |
| Bottom Nav     | `shadow-nav`                  | -                   | -              |
| Header         | `shadow-header`               | -                   | -              |

---

## 7. Z-Index Scale

### Z-Index Tokens

| Token        | Value | Use Case                            |
| ------------ | ----- | ----------------------------------- |
| `z-negative` | -1    | Behind everything                   |
| `z-0`        | 0     | Default layer                       |
| `z-10`       | 10    | Slightly elevated elements          |
| `z-20`       | 20    | Fixed CTAs, floating buttons        |
| `z-30`       | 30    | Sticky headers                      |
| `z-40`       | 40    | Modal backdrop                      |
| `z-50`       | 50    | Navigation, modals                  |
| `z-60`       | 60    | Popovers, dropdowns                 |
| `z-70`       | 70    | Tooltips                            |
| `z-80`       | 80    | Notifications, toasts               |
| `z-max`      | 9999  | Override everything (use sparingly) |

### Component Z-Index Mapping

```css
/* Navigation */
--z-mobile-header: 50; /* Fixed mobile header */
--z-mobile-nav: 50; /* Fixed bottom navigation */
--z-desktop-header: 50; /* Sticky desktop header */

/* Overlays */
--z-modal-backdrop: 40; /* Modal/drawer backdrop */
--z-modal: 50; /* Modal content */
--z-drawer: 50; /* Side drawer */

/* Floating Elements */
--z-dropdown: 60; /* Dropdown menus */
--z-popover: 60; /* Popovers */
--z-tooltip: 70; /* Tooltips */

/* Notifications */
--z-toast: 80; /* Toast notifications */
--z-notification: 80; /* Alert banners */

/* Page Elements */
--z-sticky-cta: 20; /* Sticky add-to-cart buttons */
--z-floating-button: 20; /* FAB buttons */
```

---

## 8. Opacity

### Opacity Scale

| Token         | Value | Use Case                           |
| ------------- | ----- | ---------------------------------- |
| `opacity-0`   | 0     | Hidden/invisible                   |
| `opacity-5`   | 0.05  | Very subtle overlays               |
| `opacity-10`  | 0.10  | Hover background overlays          |
| `opacity-20`  | 0.20  | Light overlays, disabled icons     |
| `opacity-30`  | 0.30  | Medium overlays                    |
| `opacity-40`  | 0.40  | Backdrop blur backgrounds          |
| `opacity-50`  | 0.50  | Disabled elements, modal backdrops |
| `opacity-60`  | 0.60  | Placeholder text opacity           |
| `opacity-70`  | 0.70  | Secondary content                  |
| `opacity-80`  | 0.80  | De-emphasized content              |
| `opacity-90`  | 0.90  | Slightly muted                     |
| `opacity-100` | 1     | Full opacity (default)             |

### Opacity Usage Guidelines

```css
/* Disabled states */
--disabled-opacity: 0.5; /* opacity-50 */

/* Placeholder text */
--placeholder-opacity: 0.6; /* opacity-60 */

/* Modal/drawer backdrops */
--backdrop-opacity: 0.5; /* bg-black/50 */

/* Hover overlays */
--hover-overlay-opacity: 0.1; /* bg-primary/10 */

/* Ghost button backgrounds */
--ghost-bg-opacity: 0.1; /* bg-primary/10 on hover */

/* Image overlays (gradients) */
--image-overlay-light: 0.3; /* from-black/30 */
--image-overlay-medium: 0.5; /* from-black/50 */
--image-overlay-heavy: 0.7; /* from-black/70 */

/* Frosted glass effect */
--glass-bg-opacity: 0.95; /* bg-white/95 backdrop-blur */
```

---

## 9. Mobile Navigation Patterns

### Mobile Header

- **Height**: `h-14` (56px) with `px-4` padding
- **Background**: `bg-white/95 backdrop-blur-md` with `border-b border-border`
- **Position**: `fixed top-0 left-0 right-0 z-50 lg:hidden`
- **Elements** (left to right):
  1. Back button (when applicable) or Logo + Brand name
  2. Page title (when `showBack` is true)
  3. Search icon button (`w-11 h-11`)
  4. Wishlist icon (Heart) with badge (`w-11 h-11`)
  5. Profile icon (UserButton or User icon) (`w-11 h-11`)
- **Icon Size**: `h-6 w-6` (24px) for all header icons
- **Logo**: `w-7 h-7` rounded circle with initial

### Mobile Bottom Navigation

- **Height**: `h-16` (64px)
- **Background**: `bg-white` with `border-t border-border`
- **Position**: `fixed bottom-0 left-0 right-0 z-50 lg:hidden`
- **Layout**: `grid grid-cols-4` with 4 items
- **Items**: Home, Store (Products), Events, Cart
- **Active State**: Primary color with `bg-primary/10` background on icon container
- **Icon Container**: `w-11 h-11 rounded-full`
- **Icon Size**: `h-6 w-6` (24px)
- **Active Icon**: `stroke-[2.5px]` for bolder appearance
- **No Labels**: Icons only, no text labels

### Fixed Bottom CTAs

- **Position**: `fixed bottom-[80px]` (to account for nav height + spacing)
- **Padding**: `p-4`
- **Background**: `bg-white border-t border-border`
- **Z-Index**: `z-20` (below nav which is `z-50`)

---

## 10. Desktop Navigation Patterns

### Desktop Header

- **Height**: `h-16` (64px)
- **Background**: `bg-white/95 backdrop-blur-md` with `border-b border-border/50`
- **Position**: `sticky top-0 z-50 hidden lg:block`
- **Container**: `container mx-auto px-4 lg:px-8`
- **Layout**: Logo | Navigation Pills | Search | Wishlist | Cart | Auth
- **Logo**: `w-8 h-8` rounded circle with initial, brand name `font-semibold text-lg`
- **Navigation Pills**:
  - Container: `bg-muted/80 rounded-full px-1.5 py-1.5`
  - Links: `px-4 py-2 rounded-full text-sm font-medium`
  - Active: `bg-white text-foreground shadow-sm`
  - Inactive: `text-muted-foreground hover:text-foreground hover:bg-white/50`
- **Search Input**: `w-40 xl:w-48 h-9 rounded-full bg-muted border-0` with `pl-10` for icon
- **Icon Buttons**: `w-11 h-11 rounded-full hover:bg-muted`
- **Icon Size**: `h-6 w-6` (24px)

### Desktop Footer

- **Layout**: Grid with `grid-cols-2 lg:grid-cols-4 gap-8`
- **Container**: `container mx-auto` with `px-4 pt-12 pb-24 lg:pb-12`
- **Columns**: Brand (col-span-2 lg:col-span-1), Shop, Company, Support
- **Section Titles**: `font-semibold mb-4`
- **Links**: `text-sm text-muted-foreground hover:text-foreground`
- **Link Spacing**: `space-y-2` within each column
- **Separator**: `border-t border-border` above and below content
- **Copyright**: `text-center text-sm text-muted-foreground` with `pt-8 lg:pt-16`

---

## 11. Component Guidelines

### Product Cards

#### Variants

- **Default**: `aspect-square` - Square format for grid layouts
- **Compact**: `aspect-4/3` - Landscape format for compact views

#### Image

- **Aspect Ratio**: `aspect-square` (default) or `aspect-4/3` (compact variant)
- **Border Radius**: `rounded-xl md:rounded-2xl`
- **Background**: `bg-muted`
- **Hover Effect**: `group-hover:scale-105` with `transition-transform duration-300`

#### Wishlist Button

- **Position**: `absolute top-2 right-2 md:top-3 md:right-3`
- **Size**: `h-8 w-8` (all breakpoints)
- **Style**: `bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm`
- **Border Radius**: `rounded-full`
- **Visibility**: Always visible (no opacity toggle on hover)
- **Icon**: Heart icon `h-4 w-4 text-muted-foreground`
- **Hover Effect**: `hover:scale-105` with `transition-transform duration-200`

#### Content

- **Container**: `mt-2 md:mt-3 space-y-0.5`
- **Layout**: Flex row with `items-start justify-between gap-2`
- **Title**: `font-medium text-sm leading-tight line-clamp-1`
- **Price**: `font-semibold text-sm text-primary shrink-0`
- **Vendor**: `text-xs text-muted-foreground`

### Category Pills (Filter Pills)

- **Padding**: `px-4 py-2`
- **Border Radius**: `rounded-full`
- **Font**: `text-sm font-medium whitespace-nowrap`
- **Active State**: `bg-primary text-primary-foreground`
- **Inactive State**: `bg-white border border-border text-foreground hover:bg-muted`
- **Transition**: `transition-colors`

### Category Icons (Home Page)

#### Mobile

- **Container Size**: `w-16 h-16` (64px)
- **Border Radius**: `rounded-2xl`
- **Background**: `bg-subtle-green hover:bg-accent`
- **Icon Size**: `h-6 w-6` (Lucide)
- **Icon Color**: `text-primary`
- **Label**: `text-xs font-medium` below icon
- **Min Width**: `min-w-[72px]`
- **Gap Between Items**: `gap-4`
- **Layout**: Horizontal scroll with `overflow-x-auto scrollbar-hide`

#### Desktop

- **Container Size**: `w-20 h-20` (80px) or larger
- **Border Radius**: `rounded-2xl`
- **Icon Size**: `h-8 w-8` (Lucide)

### Buttons

#### Primary Button

- **Padding**: `px-6 py-3` (mobile) or `px-10 py-4` (desktop)
- **Border Radius**: `rounded-full`
- **Font**: `font-bold text-base` (mobile) or `text-lg` (desktop)
- **Shadow**: `shadow-lg shadow-primary/20`
- **Hover**: `hover:bg-primary-hover` with `shadow-primary/40`

#### Secondary Button

- **Variant**: `variant="outline"` or `variant="ghost"`
- **Border Radius**: `rounded-full` or `rounded-xl`

#### Icon Button

- **Size**: `h-9 w-9` (mobile) or `h-11 w-11` (desktop)
- **Border Radius**: `rounded-full`

### Headers

#### Mobile Page Headers

- **Height**: `h-14` (56px)
- **Padding**: `px-4`
- **Title**: `font-semibold` or `font-bold text-lg`
- **Back Button**: `p-2 -ml-2` with arrow icon

#### Desktop Page Headers

- **Height**: `h-20` (80px)
- **Padding**: `px-6 lg:px-12`
- **Title**: `text-4xl font-extrabold` with `mb-2`

### Hero Sections

#### Mobile

- **Aspect Ratio**: `aspect-[4/5]`
- **Border Radius**: `rounded-3xl`
- **Gradient**: `bg-linear-to-t from-black/50 to-transparent`
- **Content Padding**: `p-6`
- **Content Position**: `flex flex-col justify-end`
- **Badge**: `px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-fit mb-4`
- **Title**: `text-4xl font-bold text-white mb-2`
- **Description**: `text-white/90 text-sm mb-6 max-w-md`
- **CTA Button**: `w-fit rounded-full px-6` size="lg"

#### Desktop

- **Aspect Ratio**: `aspect-[21/9]`
- **Border Radius**: `rounded-3xl`
- **Content Padding**: `p-12`
- **Title**: `text-6xl font-bold text-white`
- **Description**: `text-base`

#### Secondary Hero (Our Story CTA)

- **Aspect Ratio**: `aspect-4/3 md:aspect-[21/9]`
- **Gradient**: `bg-linear-to-t from-primary/90 to-primary/40`
- **Title**: `text-2xl md:text-4xl font-bold text-white`
- **Description**: `text-white/90 text-sm max-w-sm`
- **CTA Button**: `variant="secondary"` with `bg-white text-primary hover:bg-white/90`

---

## 12. Icon Usage

### Icon Libraries

- **Primary**: Lucide React (for React components)
- **Design Reference**: Material Symbols (for design mockups)

### Icon Sizes

#### Mobile

- **Small**: `h-4 w-4` (16px) - Inline with text
- **Medium**: `h-5 w-5` (20px) - Buttons, nav items
- **Large**: `h-6 w-6` (24px) - Headers, prominent actions

#### Desktop

- **Small**: `h-4 w-4` (16px) - Inline with text
- **Medium**: `h-5 w-5` (20px) - Buttons, nav items
- **Large**: `h-6 w-6` (24px) or `h-8 w-8` (32px) - Headers

### Icon Usage Rules

- Use consistent icon sizes within the same component
- Maintain visual weight balance
- Use `fill-current` for filled icons (e.g., active wishlist)

---

## 13. Responsive Breakpoints

### Breakpoint System (Tailwind Defaults)

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large Desktop**: `xl:` (≥ 1280px)

### Mobile-First Approach

- Design for mobile first
- Use `md:` prefix for tablet/desktop overrides
- Test at common breakpoints: 375px, 768px, 1024px, 1440px

---

## 14. Badge & Notification Patterns

### Cart/Wishlist Badge

- **Position**: `absolute -top-0.5 -right-0.5`
- **Size**: `min-w-[22px] h-[22px]` (all breakpoints)
- **Style**: `bg-primary text-white rounded-full`
- **Font**: `text-xs font-bold`
- **Layout**: `flex items-center justify-center`

### Status Badges

- **In Stock**: `text-in-stock` (green)
- **Low Stock**: `text-low-stock` (terracotta)
- **Out of Stock**: `text-muted-foreground`

### Tag Badges (Workshop, etc.)

- **Style**: `text-xs font-medium text-primary bg-subtle-green px-2 py-0.5 rounded`

---

## 15. Event Cards

### Upcoming Event Card (Home Page)

- **Container**: `bg-white rounded-2xl p-4 shadow-soft`
- **Layout**: `flex gap-4`
- **Image**:
  - Size: `w-24 h-24`
  - Border Radius: `rounded-xl`
  - Overflow: `overflow-hidden shrink-0`
- **Content**: `flex-1`
- **Header**: `flex items-center gap-2 mb-1`
- **Tag**: Workshop badge (see Tag Badges above)
- **Date**: `text-xs text-muted-foreground`
- **Title**: `font-semibold text-sm mb-1`
- **Description**: `text-xs text-muted-foreground line-clamp-2 mb-2`
- **CTA Link**: `text-xs font-medium text-primary flex items-center gap-1`

---

## 16. Form Elements

### Input Fields

- **Height**: `h-9` (mobile) or `h-10` (desktop)
- **Border Radius**: `rounded-full` (search) or `rounded-lg` (forms)
- **Background**: `bg-muted` (search) or `bg-white` (forms)
- **Border**: `border-0` (search) or `border border-input` (forms)

### Select Dropdowns

- **Height**: `h-9` (mobile) or `h-10` (desktop)
- **Border Radius**: `rounded-full` (mobile) or `rounded-lg` (desktop)

---

## 17. Animation & Transitions

### Duration Scale

| Token           | Value  | Use Case                             |
| --------------- | ------ | ------------------------------------ |
| `duration-0`    | 0ms    | Instant (no transition)              |
| `duration-75`   | 75ms   | Instant feedback (button press)      |
| `duration-100`  | 100ms  | Quick micro-interactions             |
| `duration-150`  | 150ms  | Fast transitions (hover colors)      |
| `duration-200`  | 200ms  | Default transitions                  |
| `duration-300`  | 300ms  | Standard animations (cards, modals)  |
| `duration-500`  | 500ms  | Slower animations (page transitions) |
| `duration-700`  | 700ms  | Slow emphasis animations             |
| `duration-1000` | 1000ms | Long animations (loading cycles)     |

### Easing Functions

```css
/* Standard easings */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1); /* Accelerate */
--ease-out: cubic-bezier(0, 0, 0.2, 1); /* Decelerate (most common) */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Default for transitions */

/* Natural/Spring-like easings */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy overshoot */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful bounce */

/* Custom easings */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1); /* Smooth deceleration */
--ease-snappy: cubic-bezier(0.5, 0, 0.1, 1); /* Quick and snappy */
```

### Tailwind Transition Classes

```css
/* Property-specific */
transition-none          /* No transition */
transition-all           /* All properties */
transition-colors        /* Color, background-color, border-color */
transition-opacity       /* Opacity only */
transition-shadow        /* Box-shadow only */
transition-transform     /* Transform only */

/* Commonly used combinations */
.btn-transition {
  @apply transition-all duration-150 ease-in-out;
}
.card-transition {
  @apply transition-all duration-300 ease-in-out;
}
.modal-transition {
  @apply transition-all duration-200 ease-out;
}
```

### Animation Keyframes

```css
/* Fade */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Scale */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* Slide */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Pulse (for loading/attention) */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Spin (for loading) */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Shake (for errors) */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Bounce (for attention) */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

### Standard Transitions

- **Color**: `transition-colors duration-150`
- **Transform**: `transition-transform duration-300`
- **All**: `transition-all duration-200`

### Hover Effects

- **Scale**: `hover:scale-105` (images, cards)
- **Shadow**: Increase shadow on hover
- **Opacity**: `opacity-0 group-hover:opacity-100` (desktop-only elements)
- **Lift**: `hover:-translate-y-1` with `transition-transform`

### Active States

- **Buttons**: `active:scale-95` for tactile feedback
- **Links**: Color change on hover/active

### Animation Usage Guidelines

| Interaction Type      | Duration  | Easing      |
| --------------------- | --------- | ----------- |
| Hover effects (color) | 150ms     | ease-in-out |
| Button press          | 75-100ms  | ease-out    |
| Dropdown open         | 150ms     | ease-out    |
| Dropdown close        | 100ms     | ease-in     |
| Modal appear          | 200-300ms | ease-out    |
| Modal disappear       | 150-200ms | ease-in     |
| Page transition       | 300-500ms | ease-in-out |
| Loading spinner       | 1000ms    | linear      |
| Skeleton pulse        | 1500ms    | ease-in-out |
| Card hover lift       | 200ms     | ease-out    |
| Image zoom            | 300ms     | ease-out    |

### Reduced Motion

Always respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 18. Accessibility Guidelines

### Color Contrast

- Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI)
- Test with color contrast checkers

### Focus States

- All interactive elements must have visible focus states
- Use `outline-ring/50` for focus rings

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use semantic elements (nav, main, footer, section)
- Include alt text for all images

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Logical tab order
- Skip links for main content

---

## 19. Performance Considerations

### Image Optimization

- Use Next.js Image component with proper sizing
- Lazy load images below the fold
- Use appropriate image formats (WebP when possible)

### Loading States

- Show skeleton loaders for async content
- Provide loading feedback for user actions

---

## 20. Dark Mode Support

### Dark Mode Color Palette

```css
/* Primary Colors (Dark Mode) */
--dark-primary: #6b8f6e; /* Lighter sage for dark backgrounds */
--dark-primary-hover: #7da080;
--dark-primary-light: #1e2b1f; /* Very dark green tint */

/* Background Colors (Dark Mode) */
--dark-bg-primary: #141614; /* Main background (warm dark) */
--dark-bg-secondary: #1e201e; /* Card background */
--dark-bg-tertiary: #262826; /* Elevated surfaces */
--dark-bg-elevated: #2e302e; /* Highest elevation */

/* Surface Colors (Dark Mode) */
--dark-surface-0: #141614; /* Base background */
--dark-surface-1: #1e201e; /* Cards */
--dark-surface-2: #262826; /* Elevated cards */
--dark-surface-3: #2e302e; /* Highest elevation */

/* Text Colors (Dark Mode) */
--dark-text-primary: #fafaf9; /* Primary text */
--dark-text-secondary: #a8a29e; /* Secondary text */
--dark-text-muted: #737373; /* Muted text */
--dark-text-placeholder: #525252; /* Placeholder text */

/* Border Colors (Dark Mode) */
--dark-border-default: #3d3f3d; /* Default borders */
--dark-border-subtle: #2e302e; /* Subtle borders */
--dark-border-strong: #4a4c4a; /* Strong borders */
--dark-border-emphasis: #525452; /* Emphasized borders */

/* Status Colors (Dark Mode) */
--dark-success: #6b8f6e; /* Adjusted primary */
--dark-success-light: #1e2b1f; /* Dark success background */
--dark-warning: #f5a623; /* Brighter warning */
--dark-warning-light: #2b2418; /* Dark warning background */
--dark-error: #f87171; /* Brighter error */
--dark-error-light: #2b1818; /* Dark error background */
--dark-info: #60a5fa; /* Brighter info */
--dark-info-light: #1a2633; /* Dark info background */
```

### Component Color Mapping (Dark Mode)

| Element             | Light Mode | Dark Mode |
| ------------------- | ---------- | --------- |
| Page background     | `#FAFAF9`  | `#141614` |
| Card background     | `#FFFFFF`  | `#1E201E` |
| Primary text        | `#1A1A1A`  | `#FAFAF9` |
| Secondary text      | `#737373`  | `#A8A29E` |
| Border              | `#E7E5E4`  | `#3D3F3D` |
| Primary button      | `#4F6F52`  | `#6B8F6E` |
| Primary button text | `#FFFFFF`  | `#141614` |
| Input background    | `#FFFFFF`  | `#262826` |
| Muted background    | `#F5F5F4`  | `#1E201E` |

### Implementation

```css
/* Tailwind dark mode classes */
.card {
  @apply dark:bg-surface-dark bg-white;
}

.text-primary {
  @apply text-foreground dark:text-dark-text-primary;
}

.border-default {
  @apply border-border dark:border-dark-border;
}

/* Using CSS variables */
:root {
  --background: #fafaf9;
  --foreground: #1a1a1a;
  --primary: #4f6f52;
}

.dark {
  --background: #141614;
  --foreground: #fafaf9;
  --primary: #6b8f6e;
}
```

### Dark Mode Best Practices

- Use `dark:` prefix for dark mode styles
- Maintain contrast ratios in both modes (WCAG AA minimum)
- Test readability in both themes
- Reduce shadow intensity in dark mode
- Consider using subtle borders instead of shadows in dark mode
- Primary colors should be slightly lighter/more saturated for dark backgrounds
- Avoid pure black (`#000000`) - use warm dark (`#141614`) instead

---

## 21. Page Layout Patterns

### Main Container

- **Wrapper**: `bg-background`
- **Main Content**: `container mx-auto`
- **Mobile Offset**: `pt-14 lg:pt-0` (accounts for fixed mobile header)

### Section Spacing

- **Mobile**: `px-4 py-4` or `px-4 py-6`
- **Desktop**: `md:px-8` or `md:px-8 md:py-12`

### Product Grids

- **Layout**: `grid grid-cols-2 md:grid-cols-4 gap-4`
- **Alternative**: `grid grid-cols-2 lg:grid-cols-3 gap-4` for larger cards

### Section Headers

- **Container**: `flex items-center justify-between mb-4`
- **Title**: `text-lg font-semibold`
- **See All Link**: `text-sm text-muted-foreground hover:text-foreground flex items-center gap-1`
- **Arrow Icon**: `h-3 w-3`

---

## 22. Decision Trees

Use these decision trees to make consistent styling choices for the Poetry & Pottery e-commerce site.

### Choosing Border Radius

```
Is it a button?
├── Primary CTA: rounded-full (pill style)
├── Secondary/Ghost: rounded-full or rounded-xl
└── Icon button: rounded-full

Is it an input/form field?
├── Search bar: rounded-full
├── Standard input: rounded-lg
└── Textarea: rounded-lg

Is it a card?
├── Product card: rounded-xl md:rounded-2xl
├── Event card: rounded-2xl
├── Small info card: rounded-xl
└── Feature/Hero card: rounded-3xl

Is it an image?
├── Product image: rounded-xl md:rounded-2xl
├── Avatar: rounded-full
├── Thumbnail: rounded-xl
└── Hero image: rounded-3xl

Is it a badge/tag?
├── Status badge: rounded (4px)
├── Category pill: rounded-full
└── Notification dot: rounded-full

Default: rounded-xl (12px)
```

### Choosing Spacing

```
Is it inline content (icon + text)?
├── Tight: gap-1 (4px) - Very small icons
├── Default: gap-2 (8px) - Most icon+text combos
└── Loose: gap-3 (12px) - Larger icons

Is it a button group or nav?
├── Tight: gap-1 (4px)
├── Default: gap-2 (8px)
└── Loose: gap-4 (16px)

Is it between form fields?
├── Default: gap-4 (16px)
└── Compact form: gap-3 (12px)

Is it card internal padding?
├── Mobile: p-4 (16px)
├── Desktop: p-5 or p-6 (20-24px)
└── Feature card: p-6 or p-8 (24-32px)

Is it between sections?
├── Mobile: py-6 to py-8 (24-32px)
├── Desktop: py-12 to py-16 (48-64px)
└── Major break: py-20 to py-24 (80-96px)

Is it page container padding?
├── Mobile: px-4 (16px)
├── Tablet: px-6 (24px)
└── Desktop: px-8 or px-12 (32-48px)
```

### Choosing Shadows

```
Is it a button?
├── Default/Ghost: shadow-none
├── Primary CTA: shadow-lg shadow-primary/20
├── Hover: shadow-primary/40
└── Active: shadow-sm

Is it a card?
├── Flat with border: shadow-none + border
├── Subtle: shadow-soft
├── Elevated: shadow-card
├── Floating: shadow-float
└── Hover enhancement: shadow-card (from shadow-soft)

Is it a dropdown/popover?
└── shadow-lg

Is it a modal/dialog?
└── shadow-float

Is it navigation?
├── Mobile bottom nav: shadow-nav
├── Mobile header: shadow-header (on scroll)
└── Desktop header: shadow-sm or border only

Is it a tooltip?
└── shadow-md
```

### Choosing Typography

```
Is it a page title?
├── Mobile hero: text-4xl font-bold
├── Desktop hero: text-6xl or text-8xl font-extrabold
├── Section title: text-lg md:text-2xl font-semibold
└── Card title: text-sm md:text-base font-medium

Is it body text?
├── Primary content: text-base font-normal
├── Secondary/description: text-sm text-muted-foreground
├── Small labels: text-xs font-medium
└── Price: text-sm md:text-base font-semibold text-primary

Is it a button label?
├── Primary CTA: text-base font-bold
├── Secondary: text-sm font-medium
└── Small button: text-sm font-medium

Is it navigation?
├── Desktop nav: text-sm font-medium
├── Mobile nav: icons only (no text)
└── Footer links: text-sm text-muted-foreground
```

### Choosing Animation Duration

```
Is it a hover effect (color change)?
└── duration-150 ease-in-out

Is it a button press?
└── duration-75 to duration-100 ease-out

Is it a card hover (scale/shadow)?
└── duration-200 to duration-300 ease-out

Is it a dropdown/menu opening?
└── duration-150 ease-out

Is it a modal appearing?
└── duration-200 to duration-300 ease-out

Is it an image zoom?
└── duration-300 ease-out

Is it a page/route transition?
└── duration-300 to duration-500 ease-in-out

Is it a loading animation?
└── duration-1000+ linear (continuous)
```

### E-commerce Specific Decisions

```
Product card layout:
├── Grid (default): grid-cols-2 md:grid-cols-4
├── Larger cards: grid-cols-2 lg:grid-cols-3
└── List view: flex flex-col

Product image aspect:
├── Default grid: aspect-square
├── Compact view: aspect-4/3
└── Detail page: aspect-square or aspect-4/3

Price display:
├── On card: text-sm font-semibold text-primary
├── On detail: text-2xl md:text-3xl font-bold text-primary
└── Sale price: original struck through + new in primary

Stock status:
├── In stock: text-in-stock (primary green)
├── Low stock: text-low-stock (terracotta) + "Only X left"
└── Out of stock: text-muted-foreground + disabled CTA

Add to cart button:
├── Mobile (fixed): full width at bottom
├── Desktop: prominent primary button
└── Quick add (on card): icon button on hover

Wishlist button:
├── Position: absolute top-2 right-2 md:top-3 md:right-3
├── Size: h-8 w-8
├── Active state: Heart filled with primary color
└── Always visible (no opacity toggle)
```

---

## Checklist for New Components

When creating new components, ensure:

- [ ] Colors use design tokens (no hardcoded values)
- [ ] Typography follows scale and weight guidelines
- [ ] Spacing uses consistent gap/padding tokens
- [ ] Border radius matches component type
- [ ] Shadows use appropriate elevation
- [ ] Icons are consistent size and style
- [ ] Responsive breakpoints are properly implemented
- [ ] Hover/active states are defined
- [ ] Transitions use standard duration/easing
- [ ] Focus states are accessible and visible
- [ ] Accessibility attributes are included (aria-\*, role, etc.)
- [ ] Dark mode styles are implemented
- [ ] Mobile and desktop patterns are followed
- [ ] Z-index follows the established scale
- [ ] Opacity uses defined tokens for overlays/disabled states

---

## Version History

- **v1.2** (2025) - Comprehensive design token update:
  - Added complete neutral color scale (50-950)
  - Added secondary/accent colors (terracotta, cream, clay)
  - Added spacing token system with Tailwind mappings
  - Added border width and style tokens
  - Added focus ring specifications
  - Added comprehensive shadow scale with colored glows
  - Added z-index scale with component mapping
  - Added opacity scale with usage guidelines
  - Added animation duration scale and easing functions
  - Added animation keyframes for common patterns
  - Added complete dark mode color palette
  - Added decision trees for design choices
  - Updated checklist with additional items
- **v1.1** (2025) - Updated to match current implementation:
  - Updated Product Cards: aspect-square default, rounded-xl md:rounded-2xl, duration-300 transitions
  - Updated Mobile Navigation: icons-only without labels, h-16, h-6 w-6 icons
  - Updated Mobile Header: fixed positioning, search/wishlist/profile icons
  - Updated Desktop Navigation: pill navigation with bg-muted container
  - Added Category Pills (filter pills) vs Category Icons patterns
  - Added Event Cards section
  - Added Page Layout Patterns section
  - Updated Badge patterns: min-w-[22px] h-[22px] for all breakpoints
  - Updated Hero Sections: rounded-3xl, aspect-[21/9] for desktop
  - Updated Footer: grid layout with 4 columns
- **v1.0** (2024) - Initial design system documentation
