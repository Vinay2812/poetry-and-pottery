# MUDORA Theme Reskin — Design Spec

**Date:** 2026-04-14
**Type:** Visual-only theme reskin (no functional changes)
**Scope:** Poetry & Pottery frontend (`poetry-and-pottery/`)

---

## Overview

Replace the current clean/modern SaaS aesthetic with the MUDORA editorial pottery aesthetic: warm cream backgrounds, deep forest green accents, editorial serif typography, and a subtle dark chocolate page frame. All existing functionality, layout structure, videos, media, and interactive behavior remain untouched.

### Design Decisions

| Decision             | Choice                                                                    |
| -------------------- | ------------------------------------------------------------------------- |
| Layout approach      | **Theme-only reskin** — keep all current page structure/sections          |
| Dark chocolate frame | **Subtle** — 4px border, not the full 12px from reference                 |
| Dark mode            | **Drop entirely** — remove all `.dark` variants                           |
| Hero section         | **Designer's call** — cream bg, serif headline, keep existing video/media |
| Green rebrand        | **Full replacement** — all UI greens including logo shift to forest green |

### Critical Constraint

**Zero functional changes.** No layout restructuring, no new sections, no removed sections, no changes to data fetching, state management, routing, or interactive behavior. Videos and media stay exactly where they are with existing behavior. This is a CSS/font/color-only transformation.

---

## 1. Color Token Replacement

All tokens defined in `src/app/globals.css` under `:root`. The entire `.dark` block is removed.

### Primary Colors

| Token                  | Current   | New       | Role                                |
| ---------------------- | --------- | --------- | ----------------------------------- |
| `--background`         | `#FAFAF9` | `#F2EDE3` | Page background (warm cream)        |
| `--foreground`         | `#1A1A1A` | `#1A1A1A` | Primary text (unchanged)            |
| `--primary`            | `#4F6F52` | `#2D3B2D` | Primary CTA, buttons, active states |
| `--primary-hover`      | `#3D5640` | `#3A4A3A` | Button hover state                  |
| `--primary-active`     | `#2E4230` | `#1E2B1E` | Button pressed state                |
| `--primary-light`      | `#E8ECE8` | `#E8E4DC` | Subtle primary background           |
| `--primary-lighter`    | `#F4F6F4` | `#F5F0E8` | Very subtle background wash         |
| `--primary-foreground` | `#FFFFFF` | `#FFFFFF` | Text on primary (unchanged)         |

### Accent Colors

| Token                | Current   | New       | Role                                 |
| -------------------- | --------- | --------- | ------------------------------------ |
| `--terracotta`       | `#C4785A` | `#E88C3A` | Warm accent, low stock, star ratings |
| `--terracotta-hover` | `#B06847` | `#D47B2E` | Terracotta hover                     |
| `--terracotta-light` | `#F5EBE6` | `#FBF0E2` | Warm tint background                 |
| `--cream`            | `#F5F0E8` | `#F5F0E8` | Warm neutral (unchanged)             |
| `--clay`             | `#8B7355` | `#8B7355` | Earthy brown (unchanged)             |

### Neutral Scale

| Token           | Current   | New       | Notes                  |
| --------------- | --------- | --------- | ---------------------- |
| `--neutral-50`  | `#FAFAF9` | `#FAF8F4` | Warmest white          |
| `--neutral-100` | `#F5F5F4` | `#F5F0E8` | Matches cream          |
| `--neutral-200` | `#E7E5E4` | `#E8E4DC` | Warm light             |
| `--neutral-300` | `#D6D3D1` | `#D4C5B0` | Warm sand              |
| `--neutral-400` | `#A8A29E` | `#A89E8E` | Mid warm               |
| `--neutral-500` | `#737373` | `#7A7168` | Muted text (warmer)    |
| `--neutral-600` | `#525252` | `#5C554A` | Warm dark              |
| `--neutral-700` | `#404040` | `#3D3730` | Darker warm            |
| `--neutral-800` | `#262626` | `#2C2118` | Dark chocolate         |
| `--neutral-900` | `#1A1A1A` | `#1A1A1A` | Near black (unchanged) |
| `--neutral-950` | `#0A0A0A` | `#0A0A0A` | True black (unchanged) |

### Semantic Tokens

| Token                | Current           | New       | Role                         |
| -------------------- | ----------------- | --------- | ---------------------------- |
| `--surface`          | `#FFFFFF`         | `#FFFFFF` | Card surfaces (unchanged)    |
| `--muted`            | neutral-100 based | `#F5F0E8` | Muted backgrounds            |
| `--muted-foreground` | `#737373`         | `#7A7168` | Secondary text (warmer)      |
| `--border`           | `#E7E5E4`         | `#D4C5B0` | Borders/dividers (warm sand) |
| `--ring`             | primary based     | `#2D3B2D` | Focus rings                  |
| `--destructive`      | `#EF4444`         | `#EF4444` | Error (unchanged)            |

### New Tokens (Added)

| Token           | Value                   | Role                                      |
| --------------- | ----------------------- | ----------------------------------------- |
| `--frame`       | `#2C2118`               | Dark chocolate page frame border          |
| `--sage`        | `#6B7F5E`               | Sage green for panels, decorative accents |
| `--light-sage`  | `#8B9F76`               | Lighter sage green                        |
| `--font-script` | `var(--font-cormorant)` | Script/decorative typeface variable       |

### Shadow Tint Change

All custom shadows change tint from green to warm brown:

```
Before: rgba(79, 111, 82, 0.08)  /* green tint */
After:  rgba(44, 33, 24, 0.08)   /* warm brown tint */
```

Applies to: `--shadow-soft`, `--shadow-card`, `--shadow-float`, and all glow shadow variants.

### Chart Colors (Updated)

| Token       | New Value                            |
| ----------- | ------------------------------------ |
| `--chart-1` | `#2D3B2D` (Forest Green)             |
| `--chart-2` | `#6B7F5E` (Sage)                     |
| `--chart-3` | `#E88C3A` (Terracotta)               |
| `--chart-4` | `#D4A574` (Honeyed Gold — unchanged) |
| `--chart-5` | `#8B7355` (Clay — unchanged)         |

---

## 2. Font Replacement

### Font Swap

| Role                | Current                 | New                                      | CSS Variable          |
| ------------------- | ----------------------- | ---------------------------------------- | --------------------- |
| Display / Headlines | Plus Jakarta Sans (700) | **DM Serif Display** (400, italic)       | `--font-display`      |
| Decorative / Script | _(none)_                | **Cormorant Garamond** (300-600, italic) | `--font-script` (NEW) |
| Body / UI           | Outfit (300-800)        | **DM Sans** (300-700)                    | `--font-sans`         |

### Implementation in `layout.tsx`

Replace current font imports:

```tsx
// REMOVE
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
// ADD
import {
  Cormorant_Garamond,
  DM_Sans,
  DM_Serif_Display,
} from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
```

### Typography Mapping Rules

| Element               | Font               | Weight     | Additional                                     |
| --------------------- | ------------------ | ---------- | ---------------------------------------------- |
| Hero titles           | DM Serif Display   | 400        | `tracking-tight`, key word in Cormorant italic |
| Section headings      | DM Serif Display   | 400        | `tracking-tight`                               |
| Product names (cards) | DM Serif Display   | 400        | —                                              |
| Testimonial quotes    | Cormorant Garamond | 400 italic | `text-lg`, `leading-relaxed`                   |
| Decorative labels     | Cormorant Garamond | 400 italic | Accent text, signatures                        |
| Navigation links      | DM Sans            | 400        | `text-sm`                                      |
| Body text             | DM Sans            | 400        | `text-sm` to `text-base`, `leading-relaxed`    |
| Labels / metadata     | DM Sans            | 500        | `text-xs`, `uppercase`, `tracking-widest`      |
| Buttons               | DM Sans            | 500        | `text-sm`                                      |
| Prices                | DM Sans            | 600        | `text-base`                                    |
| Badges                | DM Sans            | 500        | `text-xs`                                      |

### CSS Variable Updates in `globals.css`

```css
@theme inline {
  --font-sans: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-dm-serif), Georgia, serif;
  --font-script: var(--font-cormorant), Georgia, serif;
}
```

---

## 3. Page Frame

A subtle 4px dark chocolate border wrapping the entire page content.

### Implementation

Implement via globals.css (centralized, no component changes needed):

```css
body {
  border-left: 4px solid var(--frame);
  border-right: 4px solid var(--frame);
}

@media (max-width: 1023px) {
  body {
    border-left-width: 2px;
    border-right-width: 2px;
  }
}
```

The frame appears on left and right sides only (matching MUDORA's vertical frame feel). Thinner on mobile (2px) for screen real estate.

---

## 4. Component-by-Component Changes

### Critical Constraint Reminder

Every change below is **visual-only**: CSS classes, font classes, color values, and Tailwind utilities. No changes to props, state, data fetching, event handlers, conditional logic, or component structure.

---

### 4.1 Core Theme Files (HIGH IMPACT)

#### `src/app/globals.css`

**Changes:**

- Replace all color values in `:root` per Section 1 token map
- Remove entire `.dark` selector block and all dark mode tokens
- Remove `@custom-variant dark` line
- Update `@theme inline` block: add `--font-script`, update `--font-sans` and `--font-display`
- Add new tokens: `--frame`, `--sage`, `--light-sage`
- Update all shadow definitions: change `rgba(79, 111, 82, ...)` → `rgba(44, 33, 24, ...)`
- Update neutral scale values

#### `src/app/layout.tsx`

**Changes:**

- Replace font imports: `Outfit` + `Plus_Jakarta_Sans` → `DM_Sans` + `DM_Serif_Display` + `Cormorant_Garamond`
- Update font variable names in className
- Add frame border to body/wrapper element
- Remove any dark mode class toggling if present

---

### 4.2 Layout Components (MEDIUM IMPACT)

#### `navbar.tsx`

| Property        | Current                        | New                                             |
| --------------- | ------------------------------ | ----------------------------------------------- |
| Background      | `bg-white/70 backdrop-blur-xl` | `bg-[var(--background)]` (solid cream, no blur) |
| Logo icon bg    | `#4F6F52` green                | `var(--primary)` (forest green)                 |
| Nav link font   | Outfit/system                  | `font-sans` (DM Sans)                           |
| Active nav link | `#4F6F52`                      | `var(--primary)` (forest green)                 |
| Sign In button  | `bg-primary rounded-full`      | Same pattern, new color via token               |
| Shadow          | Green-tinted                   | Warm brown via token                            |

#### `mobile-header.tsx`

| Property   | Current   | New                         |
| ---------- | --------- | --------------------------- |
| Background | White     | Cream (`var(--background)`) |
| Logo tint  | Old green | Forest green via token      |

#### `mobile-nav.tsx`

| Property    | Current          | New                             |
| ----------- | ---------------- | ------------------------------- |
| Background  | White            | Cream (`var(--background)`)     |
| Active icon | Old green        | Forest green via token          |
| Shadow      | Green nav shadow | Warm brown nav shadow via token |

#### `footer.tsx`

| Property          | Current                | New                                                 |
| ----------------- | ---------------------- | --------------------------------------------------- |
| Background        | White/neutral          | Cream (`var(--background)`)                         |
| Brand name font   | Plus Jakarta Sans Bold | `font-display` (DM Serif Display)                   |
| Column title font | System                 | `font-sans` (DM Sans), uppercase, `tracking-widest` |
| Link font         | System                 | `font-sans` (DM Sans)                               |
| Link color        | Neutral                | `var(--muted-foreground)` (warm gray)               |
| Divider           | Neutral gray           | `var(--border)` (warm sand)                         |
| Frame border      | None                   | 4px sides continue from body                        |

---

### 4.3 Homepage Sections (MEDIUM IMPACT)

#### `hero-section.tsx`

| Property      | Current                          | New                                                                                                                                                                                                                                          |
| ------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Background    | Dark image overlay with gradient | Cream (`var(--background)`)                                                                                                                                                                                                                  |
| Title font    | Plus Jakarta Sans Bold, white    | `font-display` (DM Serif Display), dark text                                                                                                                                                                                                 |
| Title color   | White on dark                    | `var(--foreground)` on cream                                                                                                                                                                                                                 |
| Badge         | Green glassmorphic pill          | Outline pill: `border border-foreground rounded-full`, DM Sans uppercase                                                                                                                                                                     |
| Subtitle      | White text                       | `var(--muted-foreground)` warm gray                                                                                                                                                                                                          |
| CTA Primary   | Green filled rounded-full        | Forest green filled pill: same structure, new color                                                                                                                                                                                          |
| CTA Secondary | White outline                    | Dark outline pill: `border border-foreground rounded-full`                                                                                                                                                                                   |
| Image/Video   | Behind text with overlay         | **Keep existing video/image exactly as-is** — same position, same overlay approach. Only update overlay gradient colors to use cream-compatible warm tones and update text colors on top. No structural/layout changes to the media element. |

**Key constraint:** Existing video element and its playback logic must remain unchanged. Only the surrounding styling (background, text colors, button classes) changes.

#### `explore-section.tsx` / `explore-section-container.tsx`

| Property        | Current                         | New                                                                                                       |
| --------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Section title   | Plus Jakarta Sans Bold          | `font-display` (DM Serif Display)                                                                         |
| Category pills  | Filled/outlined with old colors | Outline pills: `border border-[var(--border)] rounded-full`, active: `bg-primary text-primary-foreground` |
| "View All" link | Old green                       | `var(--muted-foreground)` with underline                                                                  |

#### `collections-section.tsx` / `collections-section-container.tsx`

| Property           | Current           | New                               |
| ------------------ | ----------------- | --------------------------------- |
| Section title      | Plus Jakarta Sans | `font-display` (DM Serif Display) |
| Collection card bg | White             | Cream (`var(--cream)`)            |
| Card shadow        | Green-tinted      | Warm brown-tinted via token       |
| Badge style        | Old colors        | Updated via token                 |

#### `product-carousel.tsx`

| Property      | Current                | New                               |
| ------------- | ---------------------- | --------------------------------- |
| Section title | Plus Jakarta Sans Bold | `font-display` (DM Serif Display) |
| Subtitle      | System font            | `font-sans` (DM Sans), warm gray  |
| Carousel dots | Old green              | Forest green via token            |
| Arrow buttons | Old styling            | Updated via token                 |

#### `customize-section.tsx`

| Property          | Current           | New                                              |
| ----------------- | ----------------- | ------------------------------------------------ |
| Section title     | Plus Jakarta Sans | `font-display` (DM Serif Display)                |
| Step number/title | System            | DM Sans (font-sans), step title DM Serif Display |
| Card bg           | White             | Cream (`var(--cream)`)                           |
| CTA link          | Old green         | Forest green via token                           |

#### `workshops-section.tsx` / `workshops-section-container.tsx`

| Property      | Current           | New                                                 |
| ------------- | ----------------- | --------------------------------------------------- |
| Section title | Plus Jakarta Sans | `font-display` (DM Serif Display)                   |
| Pricing cards | White bg          | Cream bg, warm sand border                          |
| Price text    | System            | `font-display` (DM Serif Display) for price amounts |
| Button        | Old green         | Forest green via token                              |

#### `behind-scenes-section.tsx`

| Property   | Current           | New                                                           |
| ---------- | ----------------- | ------------------------------------------------------------- |
| Overlay    | Dark gradient     | Lighter warm overlay or keep dark — **video stays untouched** |
| Title font | Plus Jakarta Sans | `font-display` (DM Serif Display)                             |
| Button     | Old styling       | Updated pill button                                           |

**Key constraint:** Existing video/image and its behavior stays exactly as-is.

#### `testimonials-section.tsx` / `testimonials-section-container.tsx`

| Property      | Current            | New                                                          |
| ------------- | ------------------ | ------------------------------------------------------------ |
| Section title | Plus Jakarta Sans  | `font-display` (DM Serif Display)                            |
| Quote text    | Italic system font | `font-script` (Cormorant Garamond Italic)                    |
| Star color    | Amber/yellow       | Terracotta (`var(--terracotta)`)                             |
| Card bg       | White              | White with warm sand border: `border border-[var(--border)]` |
| Card shadow   | Green-tinted soft  | Minimal/none, rely on border                                 |
| Author name   | System             | `font-sans` (DM Sans) SemiBold                               |

---

### 4.4 Product Card (MEDIUM IMPACT)

#### `product-card.tsx`

| Property           | Current                    | New                                                           |
| ------------------ | -------------------------- | ------------------------------------------------------------- |
| Card bg            | White                      | Cream (`var(--cream)` or `#F8F5F0`)                           |
| Card shadow        | `shadow-soft` (green tint) | `shadow-soft` (warm brown tint via token update) or no shadow |
| Hover shadow       | `shadow-card`              | `shadow-card` (warm tint)                                     |
| Product name font  | Plus Jakarta Sans SemiBold | `font-display` (DM Serif Display)                             |
| Category label     | System text                | `font-sans` (DM Sans) `text-xs uppercase tracking-widest`     |
| Star rating color  | Amber                      | Terracotta via token                                          |
| Price font         | System                     | `font-sans` (DM Sans) SemiBold                                |
| Add to Cart button | `bg-primary rounded-full`  | Same — new color via token                                    |
| Wishlist heart     | Old styling                | Updated colors via token                                      |
| Image              | `aspect-square rounded-xl` | Same structure (unchanged)                                    |

---

### 4.5 Shared Components (MEDIUM IMPACT)

#### `section-header.tsx`

| Property      | Current                | New                               |
| ------------- | ---------------------- | --------------------------------- |
| Title font    | Plus Jakarta Sans Bold | `font-display` (DM Serif Display) |
| Subtitle font | System                 | `font-sans` (DM Sans), warm gray  |
| Link color    | Old green              | Updated via token                 |

#### `rating.tsx`

| Property        | Current      | New                              |
| --------------- | ------------ | -------------------------------- |
| Star fill color | Amber/yellow | Terracotta (`var(--terracotta)`) |

#### `sign-in-modal.tsx`

| Property      | Current   | New                                  |
| ------------- | --------- | ------------------------------------ |
| Modal bg      | White     | White (unchanged, overlays are fine) |
| Button colors | Old green | Forest green via token               |

---

### 4.6 UI Primitives (LOW IMPACT)

These mostly inherit from CSS tokens, so changes are minimal.

#### `button.tsx`

Colors update automatically via `--primary` token. Verify `rounded-full` is already applied for primary variant.

#### `badge.tsx`

Update default variant to use pill outline style: `border border-[var(--border)] rounded-full` for outline variant. Green variant uses new `--primary`.

#### `input.tsx`

Border color updates via `--border` token (warm sand). Background via `--background` token (cream).

#### `card.tsx`

Background and shadow update via tokens. No new variants needed — components that need cream backgrounds will use `bg-[var(--cream)]` directly in their className.

#### `tabs.tsx`

Active tab indicator color updates via `--primary` token.

#### `dialog.tsx` / `sheet.tsx`

Background overlay and content bg update via tokens.

---

### 4.7 Page Components (LOW IMPACT)

These pages use shared components (section-header, cards, buttons) that inherit the theme automatically. Font class updates needed:

#### About page (`about-*.tsx` — 6 files)

- Section headings → `font-display`
- Body text → `font-sans`
- Stats numbers → `font-display`
- Quote/motto text → `font-script` (Cormorant Garamond Italic)

#### Product detail page

- Product name → `font-display`
- Tab labels → `font-sans`
- Colors via tokens

#### Events page / event cards

- Event title → `font-display`
- Metadata → `font-sans`
- Colors via tokens

#### Filter sidebar / listing page header

- Heading → `font-display`
- Labels → `font-sans` uppercase
- Slider/checkbox accent → via `--primary` token

#### Care, Shipping, FAQ, Privacy, Terms pages

- Headings → `font-display`
- Body → `font-sans`
- Colors via tokens

---

## 5. Files Affected — Complete List

### High Impact (2 files)

| File                  | Changes                                                                   |
| --------------------- | ------------------------------------------------------------------------- |
| `src/app/globals.css` | All CSS variables, shadows, dark mode removal, new tokens, font variables |
| `src/app/layout.tsx`  | Font imports (3 new), CSS variable classes, frame border                  |

### Medium Impact (~14 files)

| File                                                    | Changes                                       |
| ------------------------------------------------------- | --------------------------------------------- |
| `src/features/layout/components/navbar.tsx`             | Solid cream bg, remove blur, font classes     |
| `src/features/layout/components/footer.tsx`             | Font classes, brand name serif, divider color |
| `src/features/layout/components/mobile-header.tsx`      | Cream bg, logo tint                           |
| `src/features/layout/components/mobile-nav.tsx`         | Cream bg, active icon color                   |
| `src/components/sections/hero-section.tsx`              | Cream bg, serif title, pill buttons, badge    |
| `src/components/sections/explore-section.tsx`           | Category pill border styling                  |
| `src/components/sections/collections-section.tsx`       | Card bg, shadow, fonts                        |
| `src/components/sections/product-carousel.tsx`          | Section title font, dot colors                |
| `src/features/home/customize-section.tsx`               | Colors, fonts, step cards                     |
| `src/components/sections/workshops-section.tsx`         | Pricing card colors, fonts                    |
| `src/components/sections/behind-scenes-section.tsx`     | Overlay, title font                           |
| `src/components/sections/testimonials-section.tsx`      | Script font quotes, card borders, star color  |
| `src/features/product-card/components/product-card.tsx` | Card bg, serif name, star color               |
| `src/components/shared/section-header.tsx`              | Serif title font                              |

### Low Impact (~16 files)

| File                                            | Changes                               |
| ----------------------------------------------- | ------------------------------------- |
| `src/components/ui/button.tsx`                  | Verify pill radius, colors via tokens |
| `src/components/ui/badge.tsx`                   | Pill outline variant                  |
| `src/components/ui/input.tsx`                   | Border/bg via tokens                  |
| `src/components/ui/card.tsx`                    | Shadow/bg via tokens                  |
| `src/components/ui/tabs.tsx`                    | Active color via tokens               |
| `src/components/ui/dialog.tsx`                  | Bg via tokens                         |
| `src/components/ui/sheet.tsx`                   | Bg via tokens                         |
| `src/components/shared/rating.tsx`              | Star color → terracotta               |
| `src/components/shared/sign-in-modal.tsx`       | Button colors via tokens              |
| `src/components/shared/filter-sidebar.tsx`      | Checkbox, slider accent               |
| `src/components/shared/listing-page-header.tsx` | Serif heading                         |
| `src/components/pages/about-*.tsx` (6)          | Font classes, color classes           |
| `src/components/cards/event-card.tsx`           | Font/color classes                    |

**Total: ~32 files**

---

## 6. What Does NOT Change

This list is as important as the change list:

- **No layout changes** — All grid structures, flex layouts, and section ordering stay identical
- **No functionality changes** — Data fetching, state management, event handlers, routing all untouched
- **No video/media changes** — All existing videos, images, and their playback behavior remain as-is
- **No component API changes** — Props, types, interfaces unchanged
- **No new components** — No new files created
- **No removed components** — Nothing deleted
- **No GraphQL/API changes** — Backend completely untouched
- **No dependency changes** — No new npm packages (Google Fonts loaded via next/font)
- **No responsive breakpoints changed** — Same mobile/tablet/desktop breakpoints
- **No animation logic changed** — Framer Motion animations, transitions stay the same (only color values within them may update)

---

## 7. Testing Checklist

After implementation, verify:

- [ ] Homepage loads with cream background and frame border
- [ ] All 3 fonts render correctly (DM Serif Display, Cormorant Garamond, DM Sans)
- [ ] Hero section displays with serif title, pill buttons, existing video/image works
- [ ] Category pills show outline styling, active state is forest green
- [ ] Product cards show cream bg, serif names, terracotta stars
- [ ] Add to Cart functionality works (forest green button)
- [ ] Wishlist toggle works
- [ ] Product carousel scrolls, dots show forest green
- [ ] Testimonials show Cormorant italic quotes
- [ ] Newsletter form submits correctly
- [ ] Footer renders with serif brand name, warm sand dividers
- [ ] Mobile nav works with cream bg, forest green active icons
- [ ] Products page filters work, slider works
- [ ] Events page loads, registration works
- [ ] About page renders with new fonts
- [ ] Sign-in modal opens and functions
- [ ] Cart operations work end-to-end
- [ ] No dark mode class/toggle visible anywhere
- [ ] No console errors related to fonts or missing variables
- [ ] `bun run tsc` passes with no type errors
- [ ] `bun run build` succeeds
