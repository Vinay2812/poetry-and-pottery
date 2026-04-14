# MUDORA Theme Reskin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all visual styling (colors, fonts, shadows, frame) to match the MUDORA editorial pottery aesthetic while preserving every existing feature, layout, and interaction.

**Architecture:** CSS-token-first approach — update globals.css tokens and layout.tsx fonts first, which cascades to most components automatically. Then sweep through components updating font classes and any hardcoded color values. No functional code changes.

**Tech Stack:** Tailwind CSS 4 (inline @theme), next/font/google (DM Sans, DM Serif Display, Cormorant Garamond), CSS custom properties

**Spec:** `docs/superpowers/specs/2026-04-14-mudora-theme-reskin-design.md`

---

## File Structure

No new files created. All changes are modifications to existing files.

### High Impact (2 files)

- `src/app/globals.css` — All CSS tokens, shadows, dark mode removal
- `src/app/layout.tsx` — Font imports, CSS variable classes, frame border

### Medium Impact (14 files)

- `src/features/layout/components/navbar.tsx`
- `src/features/layout/components/footer.tsx`
- `src/features/layout/components/mobile-header.tsx`
- `src/features/layout/components/mobile-nav.tsx`
- `src/components/sections/hero-section.tsx`
- `src/components/sections/explore-section.tsx`
- `src/components/sections/collections-section.tsx`
- `src/components/sections/product-carousel.tsx`
- `src/features/home/customize-section.tsx`
- `src/components/sections/workshops-section.tsx`
- `src/components/sections/behind-scenes-section.tsx`
- `src/components/sections/testimonials-section.tsx`
- `src/features/product-card/components/product-card.tsx`
- `src/components/shared/section-header.tsx`

### Low Impact (10+ files)

- `src/components/shared/rating.tsx`
- `src/components/ui/badge.tsx`
- About page components, event cards, filter sidebar, listing page header

---

### Task 1: Core Theme — globals.css

**Files:**

- Modify: `src/app/globals.css`

This is the highest-impact change. Updating CSS tokens cascades to the entire app.

- [ ] **Step 1: Update @theme inline block — fonts and new color tokens**

In `src/app/globals.css`, replace the `@custom-variant dark` line and update the `@theme inline` block:

Replace:

```css
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-display:
    var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif;
```

With:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-dm-serif), Georgia, "Times New Roman", serif;
  --font-script: var(--font-cormorant), Georgia, "Times New Roman", serif;
```

Also add new color tokens inside `@theme inline`, after the existing custom pottery colors:

```css
/* Frame and sage colors */
--color-frame: var(--frame);
--color-sage: var(--sage);
--color-light-sage: var(--light-sage);
```

- [ ] **Step 2: Update shadow tints from green to warm brown**

Replace all shadow definitions in `@theme inline`:

```css
/* Custom shadows */
--shadow-soft: 0 2px 8px rgba(44, 33, 24, 0.08);
--shadow-card: 0 4px 12px rgba(44, 33, 24, 0.1);
--shadow-float: 0 8px 24px rgba(44, 33, 24, 0.15);
--shadow-nav: 0 -2px 10px rgba(0, 0, 0, 0.05);
--shadow-header: 0 2px 10px rgba(0, 0, 0, 0.05);

/* Primary glow shadows */
--shadow-primary-sm: 0 2px 8px rgba(45, 59, 45, 0.25);
--shadow-primary-md: 0 4px 14px rgba(45, 59, 45, 0.35);
--shadow-primary-lg: 0 8px 20px rgba(45, 59, 45, 0.4);

/* Terracotta glow shadows */
--shadow-terracotta-sm: 0 2px 8px rgba(232, 140, 58, 0.25);
--shadow-terracotta-md: 0 4px 14px rgba(232, 140, 58, 0.35);
```

- [ ] **Step 3: Replace entire :root block with new MUDORA colors**

Replace the entire `:root { ... }` block (lines 117-205) with:

```css
:root {
  --radius: 0.5rem;

  /* Background colors */
  --background: #f2ede3;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #ffffff;
  --popover-foreground: #1a1a1a;

  /* Primary colors - Forest Green */
  --primary: #2d3b2d;
  --primary-hover: #3a4a3a;
  --primary-active: #1e2b1e;
  --primary-foreground: #ffffff;
  --primary-light: #e8e4dc;
  --primary-lighter: #f5f0e8;

  /* Secondary colors */
  --secondary: #f5f0e8;
  --secondary-foreground: #1a1a1a;

  /* Muted colors */
  --muted: #f5f0e8;
  --muted-foreground: #7a7168;

  /* Accent colors */
  --accent: #e8e4dc;
  --accent-foreground: #1a1a1a;

  /* Status colors */
  --destructive: #ef4444;
  --destructive-light: #fee2e2;
  --success: #2d3b2d;
  --success-light: #e8e4dc;
  --warning: #f59e0b;
  --warning-light: #fef3c7;
  --info: #3b82f6;
  --info-light: #dbeafe;

  /* Border colors */
  --border: #d4c5b0;
  --border-subtle: #e8e4dc;
  --border-strong: #bfb19c;
  --input: #d4c5b0;
  --ring: #2d3b2d;

  /* Pottery brand colors */
  --subtle-green: #e8e4dc;
  --surface: #ffffff;
  --cream: #f5f0e8;
  --terracotta: #e88c3a;
  --terracotta-hover: #d47b2e;
  --terracotta-light: #fbf0e2;
  --clay: #8b7355;
  --low-stock: #e88c3a;
  --in-stock: #2d3b2d;

  /* Frame and sage */
  --frame: #2c2118;
  --sage: #6b7f5e;
  --light-sage: #8b9f76;

  /* Neutral color scale - warm tones */
  --neutral-50: #faf8f4;
  --neutral-100: #f5f0e8;
  --neutral-200: #e8e4dc;
  --neutral-300: #d4c5b0;
  --neutral-400: #a89e8e;
  --neutral-500: #7a7168;
  --neutral-600: #5c554a;
  --neutral-700: #3d3730;
  --neutral-800: #2c2118;
  --neutral-900: #1a1a1a;
  --neutral-950: #0a0a0a;

  /* Chart colors */
  --chart-1: #2d3b2d;
  --chart-2: #6b7f5e;
  --chart-3: #e88c3a;
  --chart-4: #d4a574;
  --chart-5: #8b7355;

  /* Sidebar colors */
  --sidebar: #f2ede3;
  --sidebar-foreground: #1a1a1a;
  --sidebar-primary: #2d3b2d;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e8e4dc;
  --sidebar-accent-foreground: #1a1a1a;
  --sidebar-border: #d4c5b0;
  --sidebar-ring: #2d3b2d;
}
```

- [ ] **Step 4: Remove entire .dark block**

Delete the entire `.dark { ... }` block (everything from `.dark {` through its closing `}`). This removes all dark mode token overrides.

- [ ] **Step 5: Add frame border to body and remove dark mode references**

In the `@layer base` section, update the body styles. Find:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  html,
  body {
    @apply overflow-x-hidden;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

Replace with:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  html,
  body {
    @apply overflow-x-hidden;
  }
  body {
    @apply bg-background text-foreground antialiased;
    border-left: 4px solid var(--frame);
    border-right: 4px solid var(--frame);
  }
}
```

Also remove the duplicate `@layer base` block at the bottom of the file if it exists (lines 532-539).

- [ ] **Step 6: Add responsive frame width**

Add after the `@media (prefers-reduced-motion: reduce)` block:

```css
@media (max-width: 1023px) {
  body {
    border-left-width: 2px;
    border-right-width: 2px;
  }
}
```

- [ ] **Step 7: Verify the file compiles**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run tsc`

Expected: No errors related to globals.css (CSS files don't affect TypeScript).

- [ ] **Step 8: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/app/globals.css
git commit -m "feat: replace all CSS tokens with MUDORA theme colors and shadows

- Update all :root color tokens to MUDORA palette (forest green, warm cream)
- Remove entire .dark block (dropping dark mode)
- Add new tokens: --frame, --sage, --light-sage
- Update shadow tints from green to warm brown
- Add 4px dark chocolate frame border on body
- Update font variables for DM Sans, DM Serif Display, Cormorant Garamond"
```

---

### Task 2: Core Theme — layout.tsx Font Imports

**Files:**

- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace font imports and definitions**

In `src/app/layout.tsx`, replace the font imports and configurations:

Replace:

```tsx
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
```

With:

```tsx
import {
  Cormorant_Garamond,
  DM_Sans,
  DM_Serif_Display,
} from "next/font/google";
```

Replace:

```tsx
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
```

With:

```tsx
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});
```

- [ ] **Step 2: Update body className to use new font variables**

Replace:

```tsx
        className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased`}
```

With:

```tsx
        className={`${dmSans.variable} ${dmSerifDisplay.variable} ${cormorantGaramond.variable} font-sans antialiased`}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run tsc`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/app/layout.tsx
git commit -m "feat: replace fonts with DM Sans, DM Serif Display, Cormorant Garamond

- Swap Outfit → DM Sans (body/UI)
- Swap Plus Jakarta Sans → DM Serif Display (headlines)
- Add Cormorant Garamond (decorative script)"
```

---

### Task 3: Navbar — Remove Glassmorphism, Update Colors

**Files:**

- Modify: `src/features/layout/components/navbar.tsx`

- [ ] **Step 1: Update header background — solid cream, remove blur and dark mode**

Replace:

```tsx
<div className="bg-background/85 absolute inset-0 border-b border-neutral-300/30 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-black/80" />
```

With:

```tsx
<div className="bg-background border-border absolute inset-0 border-b" />
```

- [ ] **Step 2: Update nav pills container — remove backdrop blur and dark mode**

Replace:

```tsx
          <nav className="hidden items-center gap-1 rounded-full bg-neutral-100/50 p-1.5 backdrop-blur-sm lg:flex dark:bg-neutral-800/50">
```

With:

```tsx
          <nav className="hidden items-center gap-1 rounded-full bg-neutral-100 p-1.5 lg:flex">
```

- [ ] **Step 3: Update active nav pill background — remove dark mode**

Replace:

```tsx
                    <motion.div
                      layoutId="navbar-active"
                      className="bg-card absolute inset-0 rounded-full shadow-sm dark:bg-neutral-700"
```

With:

```tsx
                    <motion.div
                      layoutId="navbar-active"
                      className="bg-card absolute inset-0 rounded-full shadow-sm"
```

- [ ] **Step 4: Update icon link hover — remove dark mode**

Replace:

```tsx
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
```

With:

```tsx
          : "hover:bg-neutral-100",
```

- [ ] **Step 5: Update count badge — remove dark ring**

Replace:

```tsx
        <span className="bg-primary absolute top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
```

With:

```tsx
        <span className="bg-primary absolute top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
```

- [ ] **Step 6: Update search button — remove dark mode**

Replace:

```tsx
className =
  "hidden h-10 w-48 items-center gap-2 rounded-full bg-neutral-100/50 px-4 text-sm transition-colors hover:bg-neutral-200/50 xl:flex dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50";
```

With:

```tsx
className =
  "hidden h-10 w-48 items-center gap-2 rounded-full bg-neutral-100 px-4 text-sm transition-colors hover:bg-neutral-200 xl:flex";
```

- [ ] **Step 7: Update divider — remove dark mode**

Replace:

```tsx
<div className="mx-1 h-6 w-px bg-neutral-200 dark:bg-neutral-700" />
```

With:

```tsx
<div className="bg-border mx-1 h-6 w-px" />
```

- [ ] **Step 8: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/features/layout/components/navbar.tsx
git commit -m "feat: update navbar to MUDORA theme — solid cream bg, remove dark mode"
```

---

### Task 4: Mobile Header & Mobile Nav

**Files:**

- Modify: `src/features/layout/components/mobile-header.tsx`
- Modify: `src/features/layout/components/mobile-nav.tsx`

- [ ] **Step 1: Update mobile-header.tsx — solid cream bg, remove dark mode**

Replace:

```tsx
        "bg-background/85 fixed top-0 right-0 left-0 z-50 backdrop-blur-xl transition-shadow duration-200 lg:hidden dark:bg-black/80",
        "border-b border-neutral-300/30 dark:border-neutral-700/50",
```

With:

```tsx
        "bg-background fixed top-0 right-0 left-0 z-50 transition-shadow duration-200 lg:hidden",
        "border-b border-border",
```

- [ ] **Step 2: Remove dark mode from mobile-header buttons**

Replace all instances of `dark:hover:bg-white/10` with nothing. Specifically:

Replace `hover:bg-black/5 focus:outline-none active:bg-black/10 dark:hover:bg-white/10` with `hover:bg-neutral-200 focus:outline-none active:bg-neutral-300` (3 occurrences in mobile-header.tsx).

Replace `text-neutral-600 dark:text-neutral-300` with `text-muted-foreground`.

Replace `dark:hover:bg-neutral-800` with nothing (remove it from the cn() call).

Replace `ring-2 ring-white dark:ring-black` with `ring-2 ring-background`.

- [ ] **Step 3: Update mobile-nav.tsx — solid cream bg, remove dark mode**

Replace:

```tsx
<div className="bg-background/80 absolute inset-0 border-t border-white/20 backdrop-blur-xl dark:border-white/10 dark:bg-black/80" />
```

With:

```tsx
<div className="bg-background border-border absolute inset-0 border-t" />
```

Replace:

```tsx
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-x-2 top-1 bottom-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800"
```

With:

```tsx
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-x-2 top-1 bottom-1 rounded-2xl bg-neutral-100"
```

Replace:

```tsx
className =
  "bg-primary absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-black";
```

With:

```tsx
className =
  "bg-primary absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-1 ring-background";
```

- [ ] **Step 4: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/features/layout/components/mobile-header.tsx src/features/layout/components/mobile-nav.tsx
git commit -m "feat: update mobile header and nav to MUDORA theme — solid cream bg, remove dark mode"
```

---

### Task 5: Footer — Serif Brand Name, Remove Dark Mode

**Files:**

- Modify: `src/features/layout/components/footer.tsx`

- [ ] **Step 1: Update footer background — remove dark mode**

Replace:

```tsx
    <footer className="mt-auto bg-neutral-50 dark:bg-neutral-900">
```

With:

```tsx
    <footer className="mt-auto bg-background">
```

- [ ] **Step 2: Update newsletter section bg — remove dark mode**

Replace:

```tsx
      <section className="bg-primary/5 dark:bg-primary/10">
```

With:

```tsx
      <section className="bg-cream">
```

- [ ] **Step 3: Update newsletter subscribed state — remove dark mode**

Replace:

```tsx
      <div className="bg-card flex items-center justify-center gap-2 rounded-full px-6 py-3 dark:bg-neutral-800">
```

With:

```tsx
      <div className="bg-card flex items-center justify-center gap-2 rounded-full px-6 py-3">
```

Replace:

```tsx
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
```

With:

```tsx
        <span className="text-sm font-medium text-foreground">
```

- [ ] **Step 4: Update brand section — serif name, remove dark mode**

Replace:

```tsx
<span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-lg font-bold text-transparent dark:from-neutral-100 dark:to-neutral-400">
  Poetry & Pottery
</span>
```

With:

```tsx
<span className="font-display text-foreground text-lg">Poetry & Pottery</span>
```

- [ ] **Step 5: Update social links — remove dark mode**

Replace:

```tsx
className =
  "text-muted-foreground hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition-colors duration-150 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700";
```

With:

```tsx
className =
  "text-muted-foreground hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition-colors duration-150 hover:bg-neutral-200";
```

- [ ] **Step 6: Update column titles — remove dark mode**

Replace all instances of:

```tsx
              <h4 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
```

With:

```tsx
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
```

(There are 3 occurrences — the two link group titles and the Contact title.)

- [ ] **Step 7: Update bottom bar — remove dark mode**

Replace:

```tsx
        <div className="my-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 lg:mt-16 lg:mb-0 lg:flex-row lg:pt-8 dark:border-neutral-800">
```

With:

```tsx
        <div className="my-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 lg:mt-16 lg:mb-0 lg:flex-row lg:pt-8">
```

- [ ] **Step 8: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/features/layout/components/footer.tsx
git commit -m "feat: update footer to MUDORA theme — serif brand name, cream bg, remove dark mode"
```

---

### Task 6: Hero Section — Cream Background with Overlay

**Files:**

- Modify: `src/components/sections/hero-section.tsx`

The hero keeps its existing video/image and overlay structure. We update colors so it works with the cream-background page while keeping the dark overlay for readability on the media.

- [ ] **Step 1: Update badge style — outline pill instead of glassmorphic**

Replace:

```tsx
className =
  "mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md md:mb-3 md:px-4 md:py-1.5 md:text-[11px] lg:mb-5";
```

With:

```tsx
className =
  "mb-3 inline-flex items-center rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md md:mb-3 md:px-4 md:py-1.5 md:text-[11px] lg:mb-5";
```

- [ ] **Step 2: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/sections/hero-section.tsx
git commit -m "feat: update hero badge to MUDORA outline pill style"
```

---

### Task 7: Explore Section — Outline Category Pills

**Files:**

- Modify: `src/components/sections/explore-section.tsx`

- [ ] **Step 1: Read current explore-section.tsx**

Read `src/components/sections/explore-section.tsx` to get exact current code.

- [ ] **Step 2: Update category pill styling**

Replace the category pill class (the `<Link>` or `<button>` inside the scroll container):

Find: `hover:border-primary/30 hover:bg-primary/5 bg-card flex shrink-0 items-center gap-2 rounded-full border border-stone-200 px-4 py-2.5`

Replace with: `hover:border-primary hover:bg-primary/5 bg-transparent flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2.5`

- [ ] **Step 3: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/sections/explore-section.tsx
git commit -m "feat: update explore category pills to MUDORA outline style"
```

---

### Task 8: Testimonials — Script Font, Terracotta Stars

**Files:**

- Modify: `src/components/sections/testimonials-section.tsx`

- [ ] **Step 1: Update star colors from amber to terracotta**

Replace:

```tsx
i < rating
  ? "fill-amber-400 text-amber-400"
  : "fill-neutral-200 text-neutral-200";
```

With:

```tsx
i < rating
  ? "fill-terracotta text-terracotta"
  : "fill-neutral-200 text-neutral-200";
```

- [ ] **Step 2: Update card styling — add border, use script font for quote**

Replace:

```tsx
    <div className="bg-card flex w-[300px] shrink-0 flex-col gap-3 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
```

With:

```tsx
    <div className="flex w-[300px] shrink-0 flex-col gap-3 rounded-2xl border border-border bg-white p-6">
```

- [ ] **Step 3: Update quote text to use script font**

Replace:

```tsx
      <p className="text-[13px] leading-relaxed text-neutral-600">
```

With:

```tsx
      <p className="font-script text-base leading-relaxed italic text-neutral-600">
```

- [ ] **Step 4: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/sections/testimonials-section.tsx
git commit -m "feat: update testimonials to MUDORA — script font quotes, terracotta stars, border cards"
```

---

### Task 9: Rating Component — Terracotta Stars

**Files:**

- Modify: `src/components/shared/rating.tsx`

- [ ] **Step 1: Update star colors from primary green to terracotta**

Replace:

```tsx
                isFilled || isHalf
                  ? "fill-primary text-primary"
                  : "fill-[#D4E5D6] text-[#D4E5D6]",
```

With:

```tsx
                isFilled || isHalf
                  ? "fill-terracotta text-terracotta"
                  : "fill-neutral-200 text-neutral-200",
```

- [ ] **Step 2: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/shared/rating.tsx
git commit -m "feat: update rating stars to terracotta color"
```

---

### Task 10: Product Card — Cream BG, Serif Name

**Files:**

- Modify: `src/features/product-card/components/product-card.tsx`

- [ ] **Step 1: Read current product-card.tsx for exact class strings**

Read `src/features/product-card/components/product-card.tsx` to find exact strings.

- [ ] **Step 2: Update card container background**

Find: `bg-card relative flex h-full flex-col overflow-hidden rounded-2xl`

Replace with: `bg-cream relative flex h-full flex-col overflow-hidden rounded-2xl`

- [ ] **Step 3: Update product name to serif font**

Find the product name element (usually has `line-clamp-2` and `font-semibold` or `font-bold`). Add `font-display` class to it.

- [ ] **Step 4: Remove dark mode classes throughout the file**

Search for all `dark:` prefixed classes in the file and remove them. This includes `dark:bg-red-900/20`, `dark:ring-black`, etc.

- [ ] **Step 5: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/features/product-card/components/product-card.tsx
git commit -m "feat: update product card to MUDORA — cream bg, serif name, remove dark mode"
```

---

### Task 11: Collections, Workshops, Behind Scenes, Customize Sections

**Files:**

- Modify: `src/components/sections/collections-section.tsx`
- Modify: `src/components/sections/workshops-section.tsx`
- Modify: `src/components/sections/behind-scenes-section.tsx`
- Modify: `src/features/home/customize-section.tsx`

- [ ] **Step 1: Read all four files for exact code**

Read each file to identify exact class strings and dark mode references.

- [ ] **Step 2: Remove all dark: prefixed classes from all four files**

In each file, search for `dark:` and remove every dark mode class variant. This is the primary change for these components since they inherit most styling from CSS tokens.

- [ ] **Step 3: Update any hardcoded color references**

In collections-section.tsx:

- If there are hardcoded `bg-primary-light` or `bg-primary-lighter` references, these will inherit the new warm cream values from tokens automatically.

In workshops-section.tsx:

- Pricing cards inherit from tokens. Verify no hardcoded hex values.

In behind-scenes-section.tsx:

- The video stays exactly as-is. Only update the overlay button if it has dark mode classes.

In customize-section.tsx:

- Update any dark mode classes, inherit the rest from tokens.

- [ ] **Step 4: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/sections/collections-section.tsx src/components/sections/workshops-section.tsx src/components/sections/behind-scenes-section.tsx src/features/home/customize-section.tsx
git commit -m "feat: update homepage sections to MUDORA — remove dark mode, inherit new tokens"
```

---

### Task 12: Sweep All Remaining Dark Mode References

**Files:**

- All files in `src/` that contain `dark:` class prefixes

- [ ] **Step 1: Find all files with dark mode references**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && grep -rl "dark:" src/ --include="*.tsx" --include="*.ts" | head -50`

- [ ] **Step 2: For each file, remove all dark: prefixed Tailwind classes**

Go through each file found in Step 1 and remove all `dark:` prefixed classes. Do NOT change any logic, props, or state — only remove the dark: utility class strings.

Common patterns to remove:

- `dark:bg-*` → remove
- `dark:text-*` → remove
- `dark:border-*` → remove
- `dark:hover:*` → remove
- `dark:ring-*` → remove

If a class is ONLY a dark variant (e.g., `dark:bg-neutral-800` as a standalone), remove the entire class. If it's part of a string like `bg-white dark:bg-black`, remove only the `dark:bg-black` portion.

- [ ] **Step 3: Verify TypeScript still compiles**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run tsc`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add -A
git commit -m "feat: remove all dark mode classes from codebase"
```

---

### Task 13: Product Carousel & Section Header Font Updates

**Files:**

- Modify: `src/components/sections/product-carousel.tsx`
- Modify: `src/components/shared/section-header.tsx`

- [ ] **Step 1: section-header.tsx is already using font-display — verify**

Read `src/components/shared/section-header.tsx`. The title already uses `font-display` class, which now maps to DM Serif Display via the token change. No changes needed if it already uses `font-display`.

- [ ] **Step 2: product-carousel.tsx — verify font-display usage**

Read `src/components/sections/product-carousel.tsx`. If the section title uses `font-display`, no changes needed. If it uses hardcoded font classes, update to `font-display`.

- [ ] **Step 3: Commit if changes made**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/sections/product-carousel.tsx src/components/shared/section-header.tsx
git commit -m "feat: verify section header and carousel fonts use font-display token"
```

---

### Task 14: UI Primitives — Badge Outline Style

**Files:**

- Modify: `src/components/ui/badge.tsx`

- [ ] **Step 1: Read current badge.tsx**

Read `src/components/ui/badge.tsx` to see variant definitions.

- [ ] **Step 2: Ensure outline variant uses warm sand border**

If the badge has an outline variant, verify it uses `border-border` (which now maps to warm sand `#D4C5B0`). If any variant has hardcoded colors or dark mode classes, update them.

- [ ] **Step 3: Commit if changes made**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/ui/badge.tsx
git commit -m "feat: update badge outline to use MUDORA warm sand border"
```

---

### Task 15: About Page Components — Font Updates

**Files:**

- All `src/components/pages/about-*.tsx` files

- [ ] **Step 1: Read about page component files**

Read each about page component to identify font and dark mode classes.

- [ ] **Step 2: Update headings to font-display, quotes to font-script**

For each file:

- Any section heading using old font should use `font-display`
- Any decorative/quote text should use `font-script italic`
- Remove all `dark:` classes
- Stats numbers should use `font-display`

- [ ] **Step 3: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/pages/about-*.tsx
git commit -m "feat: update about page components to MUDORA fonts and remove dark mode"
```

---

### Task 16: Event Cards, Filter Sidebar, Listing Header

**Files:**

- Modify: `src/components/cards/event-card.tsx`
- Modify: `src/components/shared/filter-sidebar.tsx`
- Modify: `src/components/shared/listing-page-header.tsx`

- [ ] **Step 1: Read each file**

Read the three files to identify dark mode and font issues.

- [ ] **Step 2: Remove dark mode classes and update fonts**

For each file:

- Remove all `dark:` prefixed classes
- Ensure headings use `font-display` where appropriate
- Ensure body/labels use `font-sans` (already default)

- [ ] **Step 3: Commit**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add src/components/cards/event-card.tsx src/components/shared/filter-sidebar.tsx src/components/shared/listing-page-header.tsx
git commit -m "feat: update event cards, filter sidebar, listing header to MUDORA theme"
```

---

### Task 17: Format, Type Check, Build Verify

**Files:**

- All modified files

- [ ] **Step 1: Run Prettier formatting on entire codebase**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run prettier:format`

Expected: Files formatted successfully.

- [ ] **Step 2: Run TypeScript type checking**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run tsc`

Expected: No type errors.

- [ ] **Step 3: Run build**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run build`

Expected: Build succeeds. There may be lint warnings but no errors.

- [ ] **Step 4: Fix any build errors if found**

If TypeScript or build errors occur, fix them. Common issues:

- Missing font variable names (check layout.tsx matches globals.css)
- Tailwind class names not recognized (check @theme inline has new color tokens)

- [ ] **Step 5: Commit any formatting/fix changes**

```bash
cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery
git add -A
git commit -m "chore: format code and fix any build issues after MUDORA theme reskin"
```

---

### Task 18: Visual Verification with Browser

- [ ] **Step 1: Start the dev server if not running**

Run: `cd /Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery && bun run dev` (if not already running on port 3005)

- [ ] **Step 2: Verify homepage visually using agent-browser**

Open http://localhost:3005 and verify:

- Cream background (`#F2EDE3`) visible
- Dark chocolate frame border on left and right
- DM Serif Display font on hero title, section headings
- DM Sans font on body text, navigation
- Forest green (`#2D3B2D`) on primary buttons
- Terracotta (`#E88C3A`) on star ratings
- Warm sand borders on cards and dividers
- No dark mode artifacts or references

- [ ] **Step 3: Verify products page**

Navigate to http://localhost:3005/products and verify:

- Product cards have cream background
- Product names are in serif font
- Star ratings are terracotta
- Filters and sidebar use warm colors
- Add to Cart buttons are forest green

- [ ] **Step 4: Verify events page and about page**

Navigate to http://localhost:3005/events and http://localhost:3005/about:

- Section headings are serif
- No dark mode artifacts
- All colors are warm/cream/forest green

- [ ] **Step 5: Verify mobile views**

Check responsive views at 375px width:

- Mobile header has cream background (no blur)
- Bottom nav has cream background
- Frame border is 2px on mobile
- All text is readable

- [ ] **Step 6: Fix any visual issues found**

If any component still shows old colors, dark mode artifacts, or wrong fonts, fix and commit.
