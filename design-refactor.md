# UI Design Refactoring Plan - Poetry & Pottery

## Design Philosophy

This document outlines a **wireframe-first** design refactoring approach. Every component/page design goes through a strict approval workflow before any code is written.

### Workflow Phases

| Phase                 | Description                                                        | Prompt File           |
| --------------------- | ------------------------------------------------------------------ | --------------------- |
| 1. **Wireframe**      | Create 3-4 design options (A, B, C, D) for each viewport           | `prompt-wireframe.md` |
| 2. **Approval**       | User selects preferred option per device (mobile, tablet, desktop) | `prompt-wireframe.md` |
| 3. **Implementation** | Build ONLY the approved design, verify with agent-browser          | `prompt-implement.md` |

### URLs (Already Running)

| Resource   | URL                                                    |
| ---------- | ------------------------------------------------------ |
| Wireframes | `http://127.0.0.1:5500/poetry-and-pottery/wireframes/` |
| Website    | `http://127.0.0.1:3005/`                               |

### Key Tool: agent-browser

Use `agent-browser` for all visual verification:

```bash
agent-browser open http://127.0.0.1:5500/poetry-and-pottery/wireframes/index.html
agent-browser set viewport 375 812    # Mobile
agent-browser set viewport 768 1024   # Tablet
agent-browser set viewport 1440 900   # Desktop
agent-browser screenshot <path>       # Capture screenshot
agent-browser snapshot                # Get accessibility tree
```

### Status Legend

**Phase Status:**

| Status           | Meaning                                                    |
| ---------------- | ---------------------------------------------------------- |
| `🔲 Not Started` | Phase has not been started yet                             |
| `🚧 In Progress` | Phase is actively being worked on — agent(s) claimed tasks |
| `✅ Completed`   | All tasks in phase are done                                |

**Task Status:**

| Status                 | Meaning                                                |
| ---------------------- | ------------------------------------------------------ |
| `🔲 Not Started`       | Task not started yet (non-UI or pending setup work)    |
| `🔲 Wireframe Pending` | Task available — pick this up                          |
| `🚧 In Progress`       | Agent is actively working on this — **SKIP** (claimed) |
| `⏳ Awaiting Approval` | Wireframes created, waiting for user to select options |
| `✅ Approved`          | User approved designs, ready for implementation        |
| `✔️ Completed`         | Implementation done and verified                       |

### Approval Requirements

For each task, the user MUST select their preferred option for EACH viewport:

- **Mobile** (375 × 812): Option A / B / C / D
- **Tablet** (768 × 1024): Option A / B / C / D
- **Desktop** (1440 × 900): Option A / B / C / D

**CRITICAL:** No implementation begins until explicit approval is received for all viewports.

---

## Forest Theme (MANDATORY)

All designs MUST use the existing forest theme. Do NOT introduce new colors.

### Primary Colors

| Token             | Hex       | Usage                      |
| ----------------- | --------- | -------------------------- |
| `primary`         | `#4F6F52` | CTAs, links, active states |
| `primary-hover`   | `#3D5640` | Hover states               |
| `primary-active`  | `#2E4230` | Pressed states             |
| `primary-light`   | `#E8ECE8` | Light backgrounds, badges  |
| `primary-lighter` | `#F4F6F4` | Subtle background fills    |

### Accent Colors

| Token              | Hex       | Usage                             |
| ------------------ | --------- | --------------------------------- |
| `terracotta`       | `#C4785A` | Warm accents, low stock indicator |
| `terracotta-light` | `#F5EBE6` | Warm background tint              |
| `clay`             | `#8B7355` | Earthy brown, pottery imagery     |
| `cream`            | `#F5F0E8` | Warm neutral backgrounds          |

### Neutrals

| Token         | Hex       | Usage             |
| ------------- | --------- | ----------------- |
| `neutral-50`  | `#FAFAF9` | Page background   |
| `neutral-100` | `#F5F5F4` | Card backgrounds  |
| `neutral-200` | `#E7E5E4` | Borders, dividers |
| `neutral-500` | `#737373` | Muted text        |
| `neutral-900` | `#1A1A1A` | Primary text      |

### Typography

| Font              | Usage                         |
| ----------------- | ----------------------------- |
| Plus Jakarta Sans | Display font (`font-display`) |
| Outfit            | Body font (`font-sans`)       |

---

## Design Consistency Requirements

### Page Header Pattern (ALL Pages)

Every page MUST follow this consistent header pattern:

```
┌─────────────────────────────────────────────────────────────┐
│  [Back Arrow] Page Title                        [Actions]   │  ← Mobile Header (h-14)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Breadcrumbs: Home / Category / Current Page               │  ← Desktop only
│                                                             │
│  Page Title                                                 │  ← font-display, text-2xl lg:text-4xl
│  ═══════════                                               │  ← Green underline accent (w-12, h-[3px])
│                                                             │
│  Optional subtitle or result count                         │  ← text-muted, max-w-lg
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Required Elements:**

- Mobile: `MobileHeaderContainer` with back button and title
- Desktop: `ListingPageHeader` with breadcrumbs, title, underline, optional subtitle
- Green underline accent below title (3px height, 48px width, primary color)
- Consistent spacing: `pt-4 lg:pt-8` below header

### Card Pattern (ALL Cards)

- No borders (flat design)
- Soft shadows: `shadow-soft` default, `shadow-card` on hover
- Rounded corners: `rounded-2xl`
- White background
- Consistent padding: `p-4` mobile, `p-6` desktop

### Button Pattern

- CTA buttons: `rounded-lg` (not rounded-full)
- Icon buttons: `rounded-full`
- Primary: `bg-primary text-white`
- Secondary: `bg-neutral-100 text-foreground`

### Animation Guidelines (ALL Components)

Every component MUST include subtle, performant animations. These are **mandatory** for all implementations.

**Interaction Animations:**
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Buttons | Scale down on press | `150ms` | `ease-out` |
| Cards | Lift + shadow on hover | `200ms` | `ease-out` |
| Links | Underline slide-in | `200ms` | `ease-out` |
| Icons | Subtle rotate/bounce | `200ms` | `spring` |
| Inputs | Border color + ring | `150ms` | `ease-out` |

**Enter/Exit Animations:**
| Element | Enter | Exit | Duration |
|---------|-------|------|----------|
| Modals/Sheets | Fade + slide up | Fade + slide down | `200ms` |
| Dropdowns | Fade + scale from origin | Fade + scale to origin | `150ms` |
| Toasts | Slide in from edge | Slide out + fade | `300ms` |
| Page sections | Fade in + slide up | - | `400ms` |

**Scroll Animations (All Devices):**

- Staggered reveals: `staggerChildren: 0.1`
- Fade in from bottom: `opacity: 0 → 1`, `y: 20 → 0`, `duration: 200ms`, `ease: easeOut`
- Trigger: `whileInView` with `viewport: { once: true, amount: 0.1 }`
- Use `StaggeredGrid` wrapper component with child `variants: { hidden, visible }`

**Performance Rules:**

1. **Use CSS transforms only** - Never animate `width`, `height`, `top`, `left`
2. **Prefer `transform` and `opacity`** - GPU-accelerated, no layout thrashing
3. **Use `will-change` sparingly** - Only on elements that will animate
4. **Respect reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
5. **Mobile optimization:**
   - Disable scroll-triggered animations on mobile (battery/performance)
   - Keep interaction animations (hover → tap feedback)
   - Use shorter durations on mobile (`150ms` max)

**Tailwind Animation Classes:**

```css
/* Add to globals.css or tailwind.config */
.animate-fade-in {
  animation: fadeIn 200ms ease-out;
}
.animate-slide-up {
  animation: slideUp 200ms ease-out;
}
.animate-scale-in {
  animation: scaleIn 150ms ease-out;
}
.animate-press {
  transform: scale(0.97);
}

/* Hover lift effect for cards */
.hover-lift {
  transition:
    transform 200ms ease-out,
    box-shadow 200ms ease-out;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}
```

**Framer Motion Defaults:**

```tsx
// Use consistent spring config across the app
const springConfig = { type: "spring", stiffness: 300, damping: 25 };
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
```

---

## Wireframe Workflow

### Device Breakpoints

| Device  | Width  | Height | Viewport Class |
| ------- | ------ | ------ | -------------- |
| Mobile  | 375px  | 812px  | Default        |
| Tablet  | 768px  | 1024px | `md:`          |
| Desktop | 1440px | 900px  | `lg:` / `xl:`  |

### Wireframe Files

Wireframes are stored in: `poetry-and-pottery/wireframes/`

**File Structure:**

```
wireframes/
├── _shared-styles.css           # Common styles, forest theme
├── index.html                   # Navigation index
├── task-X-X-component-name.html # One file per task
└── ...
```

**Workflow:**

1. **Create:** Add new wireframe file `task-X-X-name.html` in wireframes/
2. **Serve:** `cd wireframes && npx serve -l 5500`
3. **Capture:** Use `agent-browser` to capture screenshots at all viewports
4. **Present:** Show screenshots and ask for user approval per viewport
5. **Record:** Update wireframe with approval status
6. **Implement:** Use `prompt-implement.md` to build and verify

### Wireframe Section Template

Each wireframe file should follow this layout:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TASK X.X: Component Name                                                   │
│  Status: 🔲 AWAITING APPROVAL                                              │
│  ───────────────────────────────────────────────────────────────────────── │
│                                                                             │
│  📱 MOBILE (375 × 812)                                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                        │
│  │Option A │  │Option B │  │Option C │  │Option D │                        │
│  │         │  │         │  │         │  │(optional)│                        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘                        │
│                                                                             │
│  📱 TABLET (768 × 1024)                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                         │
│  │  Option A   │  │  Option B   │  │  Option C   │                         │
│  └─────────────┘  └─────────────┘  └─────────────┘                         │
│                                                                             │
│  🖥️ DESKTOP (1440 × 900)                                                    │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐       │
│  │     Option A      │  │     Option B      │  │     Option C      │       │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘       │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  📋 APPROVAL SECTION                                                        │
│  Select your preferred option for each viewport:                           │
│                                                                             │
│  Mobile:  [ ] Option A  [ ] Option B  [ ] Option C  [ ] Option D           │
│  Tablet:  [ ] Option A  [ ] Option B  [ ] Option C  [ ] Option D           │
│  Desktop: [ ] Option A  [ ] Option B  [ ] Option C  [ ] Option D           │
│                                                                             │
│  Notes/Feedback: ________________________________________________          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### After Approval

Once user approves, the section is updated to:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TASK X.X: Component Name                                                   │
│  Status: ✅ APPROVED                                                        │
│  ───────────────────────────────────────────────────────────────────────── │
│  Approved Selections:                                                       │
│  • Mobile: Option B                                                         │
│  • Tablet: Option A                                                         │
│  • Desktop: Option A                                                        │
│  ───────────────────────────────────────────────────────────────────────── │
│  [Only approved designs remain - non-selected options removed]              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Prompt Files

| File                  | Purpose                                               | When to Use                              |
| --------------------- | ----------------------------------------------------- | ---------------------------------------- |
| `prompt-wireframe.md` | Create wireframe options & get approval               | Tasks with `🔲 Wireframe Pending` status |
| `prompt-implement.md` | Implement approved designs & verify via agent-browser | Tasks with `✅ Approved` status          |

**Usage:**

1. Use `prompt-wireframe.md` to create 3-4 wireframe options and get user approval for each viewport
2. Use `prompt-implement.md` after designs are approved to implement and verify

**Verification Flow:**

1. Capture wireframe screenshots with `agent-browser`
2. Implement the approved design
3. Capture implementation screenshots with `agent-browser`
4. Compare wireframe vs implementation at all viewports (mobile, tablet, desktop)
5. Fix any discrepancies until UI matches wireframe

---

## Phases & Tasks

> **Parallel Execution Guide:**
>
> - **Phase 4** (Foundation) MUST complete first - all other phases depend on these components
> - **Phases 5-10** can run in parallel - each owns its files with no cross-dependencies
> - **Phase 11** (Polish) should run last - it touches files across multiple phases
> - **Phases 12-13** can run anytime independently

---

### Phase 4: Foundation Components (PREREQUISITE)

**Phase Status:** 🚧 In Progress

> ⚠️ **BLOCKING:** Complete this phase before starting Phases 5-10. These components are dependencies for all feature phases.

#### Task 4.1: Button Styles

**Status:** ✔️ Completed
**Wireframe:** [task-4-1-button-styles.html](wireframes/task-4-1-button-styles.html)
**Approved Selection:**

- Mobile: Option A - rounded-lg (8px)
- Tablet: Option A - rounded-lg (8px)
- Desktop: Option A - rounded-lg (8px)

**Scope:**

- Change CTA buttons from `rounded-full` to `rounded-lg`
- Keep `rounded-full` for icon buttons only
- Update all button variants

**Design Specifications:**

- Primary CTA: `rounded-lg`, `bg-primary`, `text-white`
- Secondary: `rounded-lg`, `bg-neutral-100`, `text-foreground`
- Outline: `rounded-lg`, `border-primary`, `text-primary`
- Icon buttons: Keep `rounded-full`
- Sizes: `h-9` (sm), `h-10` (default), `h-11` (lg)

**Files to Modify (after approval):**

- `src/components/ui/button.tsx`

---

#### Task 4.2: Badge Component

**Status:** ✔️ Completed
**Wireframe:** [task-4-2-badge-component.html](wireframes/task-4-2-badge-component.html)
**Approved Selection:**

- Mobile: Option A - Pill shape (rounded-full)
- Tablet: Option A - Pill shape (rounded-full)
- Desktop: Option A - Pill shape (rounded-full)

**Scope:**

- Consistent badge/pill design
- Color variants for all statuses

**Design Specifications:**

- Size: `text-xs`, `px-2.5 py-0.5`, `rounded-full`
- Variants: default, primary, warning, error, info
- Status badges (forest theme):
  - Pending: `bg-amber-100 text-amber-800`
  - Approved: `bg-primary-lighter text-primary`
  - Confirmed: `bg-blue-100 text-blue-800`
  - Cancelled: `bg-red-100 text-red-800`
  - Completed: `bg-neutral-100 text-neutral-600`

**Files to Modify (after approval):**

- `src/components/ui/badge.tsx`

---

#### Task 4.3: Form Inputs

**Status:** ✔️ Completed
**Wireframe:** [task-4-3-form-inputs.html](wireframes/task-4-3-form-inputs.html)
**Approved Selection:**

- Mobile: Option A - rounded-lg (8px)
- Tablet: Option A - rounded-lg (8px)
- Desktop: Option A - rounded-lg (8px)

**Scope:**

- Input, select, textarea consistency
- Label, error, focus states

**Design Specifications:**

- Input: `rounded-lg`, `h-10`, focus ring primary
- Label: `font-medium text-sm`, muted
- Error: Red border + message below
- Select: Custom dropdown indicator
- Textarea: `min-h-[120px]`, resize handle

**Files to Modify (after approval):**

- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/forms/form-input.tsx`
- `src/components/forms/form-select.tsx`

---

#### Task 4.4: Rating Component

**Status:** ✔️ Completed
**Wireframe:** [task-4-4-rating-component.html](wireframes/task-4-4-rating-component.html)
**Approved Selection:**

- Mobile: Option B - Forest Green Stars
- Tablet: Option B - Forest Green Stars
- Desktop: Option B - Forest Green Stars

**Scope:**

- Star rating display and input
- Size variants

**Design Specifications:**

- Display: Filled forest green (#4F6F52), empty muted (#D4E5D6)
- Interactive: Hover preview, cursor pointer
- Sizes: sm (12px), md (16px), lg (20px)
- Count: "(X reviews)" muted text

**Files to Modify:**

- `src/components/shared/rating.tsx`

---

#### Task 4.5: Quantity Selector

**Status:** ✔️ Completed
**Wireframe:** [task-4-5-quantity-selector.html](wireframes/task-4-5-quantity-selector.html)
**Approved Selection:**

- Mobile: Option B - Connected Pill
- Tablet: Option B - Connected Pill
- Desktop: Option B - Connected Pill

**Scope:**

- Compact +/- quantity controls
- Disabled states

**Design Specifications:**

- Style: Connected pill shape with embedded buttons
- Number: Centered, `font-medium`
- Disabled: Minus at qty=1, plus at max
- Mobile: Larger touch targets (36px min)

**Files to Modify:**

- `src/components/shared/quantity-selector.tsx`

---

#### Task 4.6: Empty States

**Status:** ✔️ Completed
**Wireframe:** [task-4-6-empty-states.html](wireframes/task-4-6-empty-states.html)
**Approved Selection:**

- Mobile: Option B - Colored Circle
- Tablet: Option B - Colored Circle
- Desktop: Option B - Colored Circle

**Scope:**

- Consistent empty state design
- Icon, heading, description, CTA

**Design Specifications:**

- Icon: Large icon in primary-colored circle background (64px)
- Heading: `font-display font-semibold`, centered
- Description: Muted, centered, `max-w-sm`
- CTA: Primary or outline button, centered

**Files to Modify:**

- `src/components/sections/empty-state.tsx`

---

#### Task 4.7: Dialog & Sheet

**Status:** ✔️ Completed
**Wireframe:** [task-4-7-dialog-sheet.html](wireframes/task-4-7-dialog-sheet.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Consistent modal and sheet design
- Header, body, footer patterns

**Design Specifications:**

- Dialog: `rounded-2xl`, shadow-xl, backdrop blur
- Sheet: Right slide (desktop), bottom slide (mobile)
- Header: Title in `font-display`, close X
- Footer: Actions right-aligned
- Mobile sheet: Rounded top, drag handle

**Files to Modify (after approval):**

- `src/components/ui/dialog.tsx`
- `src/components/ui/sheet.tsx`

---

#### Task 4.8: Accordion

**Status:** ✔️ Completed
**Wireframe:** [task-4-8-accordion.html](wireframes/task-4-8-accordion.html)
**Approved Selection:**

- Mobile: Option A - Clean Minimal
- Tablet: Option A - Clean Minimal
- Desktop: Option A - Clean Minimal

**Scope:**

- Clean accordion without heavy borders
- Smooth expand/collapse
- Contextual icons before each trigger title

**Design Specifications:**

- No borders between items
- Header: `font-medium`, hover bg subtle
- Chevron: Rotate animation on expand
- Content: Proper padding, muted text
- Icons: 20×20px, primary color (`#4F6F52`), contextual per section
- Clean minimal style with subtle hover background

**Files to Modify:**

- `src/components/ui/accordion.tsx`

---

#### Task 4.9: Tabs

**Status:** ✔️ Completed
**Wireframe:** [task-4-9-tabs.html](wireframes/task-4-9-tabs.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Clean tabs with underline indicator
- Content transitions

**Design Specifications:**

- Triggers: `font-medium`, no borders
- Active: Primary underline (2px)
- Content: Top padding, smooth transition
- Mobile: Horizontal scroll if many tabs

**Files to Modify (after approval):**

- `src/components/ui/tabs.tsx`

---

### Phase 5: Product Experience

**Phase Status:** 🚧 In Progress

> 🛒 **Customer Impact: HIGH** - Primary revenue driver
> **Files owned by this phase:** `src/features/product-detail/`, `src/components/products/`, `src/components/shared/review-*.tsx`

#### Task 5.1: Product Detail Layout

**Status:** ✔️ Completed
**Wireframe:** [task-5-1-product-detail-layout.html](wireframes/task-5-1-product-detail-layout.html)
**Approved Option:** Option B (Modern Gallery) — All Viewports (Mobile, Tablet, Desktop)

**Scope:**

- Mobile-first product detail redesign
- Full-width images, prominent CTA

**Design Specifications:**

- Mobile: Full-width image carousel, stacked info, full-width CTA
- Desktop: 55/45 split (image larger)
- Breadcrumbs: Home > Shop > Category > Product
- Title: `font-display`, price prominent
- Page header: Consistent with other pages

**Files to Modify (after approval):**

- `src/features/product-detail/components/product-detail.tsx`

---

#### Task 5.2: Product Image Gallery

**Status:** ❌ Discarded
**Wireframe:** [task-5-2-product-image-gallery.html](wireframes/task-5-2-product-image-gallery.html)

**Scope:**

- Redesign image gallery with thumbnails
- Mobile carousel, desktop thumbnail strip

**Design Specifications:**

- Mobile: Full-width carousel, dots below, swipe
- Desktop: Main image (3:4) + vertical thumbnails left
- Thumbnails: Small squares, active border (primary)
- Zoom: Optional Aceternity Lens component

**Files to Modify (after approval):**

- `src/components/products/product-image-gallery.tsx`

---

#### Task 5.3: Trust Badges

**Status:** ✔️ Completed
**Wireframe:** [task-5-3-trust-badges.html](wireframes/task-5-3-trust-badges.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- Add trust indicators below Add to Cart button
- Secure Payments, Free Shipping, Handmade icons

**Design Specifications:**

- Icons: Lock, Truck, Hand (lucide-react)
- Layout: Horizontal row with dividers
- Text: Small, muted color
- Background: Optional subtle `bg-primary-lighter`

**Files to Modify (after approval):**

- `src/features/product-detail/components/trust-badges.tsx` (new)

---

#### Task 5.4: Product Info Tabs

**Status:** ✔️ Completed
**Wireframe:** [task-5-4-product-info-tabs.html](wireframes/task-5-4-product-info-tabs.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Convert accordions to tabs
- Materials & Care and Reviews tabs only (2 tabs)
- Description displayed inline in product info header (not in tabs)

**Design Specifications:**

- Tabs: Underlined active indicator (primary color)
- Mobile: Horizontally scrollable tab list
- Content: Smooth fade transition
- Default active tab: Materials & Care
- Description: Shown inline below price in `ProductInfoHeader`, not as a tab

**Implementation Notes:**

- Description was removed from tabs and placed inline in `ProductInfoHeader` below the price
- `ProductTabs` component only has 2 tabs: Materials & Care (default) and Reviews
- `description` prop was removed from `ProductTabsProps` interface

**Files Modified:**

- `src/features/product-detail/components/product-tabs.tsx` (new)
- `src/features/product-detail/components/product-detail.tsx` (description inline)

---

#### Task 5.5: Related Products Grid

**Status:** ✔️ Completed
**Wireframe:** [task-5-5-related-products-grid.html](wireframes/task-5-5-related-products-grid.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- Replace carousel with grid layout
- "You might also like" section

**Design Specifications:**

- Mobile: 2-column grid (4 products)
- Desktop: 4-column grid (4-8 products)
- Section header: `font-display`, "You Might Also Like"
- No carousel controls, static grid

**Files to Modify (after approval):**

- `src/features/product-detail/components/related-products.tsx`

---

#### Task 5.6: Sticky Mobile CTA

**Status:** ✔️ Completed
**Wireframe:** [task-5-6-sticky-mobile-cta.html](wireframes/task-5-6-sticky-mobile-cta.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Fixed bottom bar with price + Add to Cart
- Shows when user scrolls past main CTA

**Design Specifications:**

- Position: Fixed bottom, above mobile nav
- Content: Price (left) + Add to Cart button (right)
- Background: White with backdrop blur, top shadow
- Safe area: Bottom padding for notch devices
- Visibility: IntersectionObserver trigger

**Files to Modify (after approval):**

- `src/features/product-detail/components/sticky-cta.tsx` (new)

---

#### Task 5.7: Review Cards

**Status:** ✔️ Completed
**Wireframe:** [task-5-7-review-cards.html](wireframes/task-5-7-review-cards.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Clean review card design
- No borders, spacing-based separation

**Design Specifications:**

- Reviewer name: `font-display font-medium`
- Stars: Inline with name
- Date: Muted, right-aligned or below name
- Text: Proper line-height, spacing
- Verified badge: Optional "Verified Purchase"
- Mobile: Full-width, stacked
- Desktop: Contained within tab panel

**Files to Modify (after approval):**

- `src/components/shared/review-card.tsx`

---

#### Task 5.8: Review Form

**Status:** ✔️ Completed
**Wireframe:** [task-5-8-review-form.html](wireframes/task-5-8-review-form.html)
**Approved Selection:**

- Mobile: Option C (Compact Inline) + Collapsible Image Upload
- Tablet: Option C (Compact Inline) + Collapsible Image Upload + Product Preview
- Desktop: Option C (Compact Inline) + Collapsible Image Upload + Product Preview

**Scope:**

- Compact inline review form with collapsible photo upload
- Interactive star rating selector inline with title
- Product preview on tablet/desktop

**Design Specifications:**

- Title: "Rate this product" inline with stars (compact layout)
- Star selector: 28px mobile, 40px tablet/desktop, inline with title, hover preview
- Textarea: `rounded-lg`, min-height 80px, 500 char limit with live counter
- Photo Upload: Collapsible behind "Add Photos" button, expands to dashed dropzone
- Max Photos: 3, 5MB each (JPG, PNG)
- Product Preview: Tablet (60px image) / Desktop (80px image) with name + purchase date
- Submit: Primary button `rounded-lg`, full-width mobile, inline right-aligned tablet/desktop
- Card Style: `bg-neutral-50`, `rounded-2xl`, `p-5` mobile / `p-6` tablet/desktop

**Files to Modify:**

- `src/components/shared/review-form.tsx`

---

#### Task 5.9: Reviews Sheet

**Status:** ✔️ Completed
**Wireframe:** [task-5-9-reviews-sheet.html](wireframes/task-5-9-reviews-sheet.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Slide-over panel for all reviews
- Sort/filter controls

**Design Specifications:**

- Sheet: Right slide (desktop), bottom slide (mobile)
- Header: "All Reviews" + count badge + close X
- Sort: Most Recent, Highest Rated dropdown
- Reviews: List with spacing separators
- Mobile: Full-screen, safe-area padding

**Files to Modify (after approval):**

- `src/components/shared/reviews-sheet.tsx`

---

### Phase 5A: Collections & Archive

**Phase Status:** 🚧 In Progress

> 🧩 **Customer Impact: HIGH** - Merchandising and product lifecycle
> **Central Factor:** Collections with archive
> **Files owned by this phase:** `src/features/products/`, `src/app/(main)/products/`, `src/app/(main)/(with-footer)/page.tsx`, `src/features/dashboard/products/`, `src/app/dashboard/collections/`

#### Task 5A.1: Collections Filter + Archive Tabs + Homepage Collections

**Status:** ⏳ Awaiting Approval
**Wireframe:** [task-5a-1-collections-archive.html](wireframes/task-5a-1-collections-archive.html)

**Scope:**

- Add collections filter on products listing
- Add archive tab/section for inactive, sold-out, or out-of-window collections
- Add homepage collections section (grid/carousel)

**Design Specifications:**

- Collections filter: consistent with existing filter UI patterns
- Archive: tabbed layout (Active | Archive) with clear counts
- Homepage: section title + short subtitle, collection cards consistent with forest theme

**Files to Modify (after approval):**

- `src/app/(main)/products/page.tsx`
- `src/features/products/hooks/use-products-filter-v2.ts`
- `src/app/(main)/(with-footer)/page.tsx`
- `src/components/sections/` (new section component)
- `src/app/dashboard/collections/page.tsx`
- `src/features/dashboard/products/components/product-form.tsx`

---

### Phase 6: Cart & Checkout

**Phase Status:** 🚧 In Progress

> 💰 **Customer Impact: CRITICAL** - Conversion funnel
> **Files owned by this phase:** `src/features/cart/`, `src/components/cards/cart-*.tsx`, `src/components/orders/order-summary.tsx`, `src/components/address/`

#### Task 6.1: Cart Page

**Status:** ✔️ Completed
**Wireframe:** [task-6-1-cart-page.html](wireframes/task-6-1-cart-page.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Cart page layout redesign
- Consistent page header

**Design Specifications:**

- Page header: "Shopping Cart", breadcrumbs, consistent styling
- Mobile: Full-width items, summary below
- Desktop: 3-column grid (items left 2/3, summary right 1/3)
- CTA: "Place Order" full-width mobile, `rounded-lg`

**Files to Modify (after approval):**

- `src/features/cart/components/cart.tsx`

---

#### Task 6.2: Cart Item Card

**Status:** ✔️ Completed
**Wireframe:** [task-6-2-cart-item-card.html](wireframes/task-6-2-cart-item-card.html)

**Scope:**

- Horizontal cart item card
- Quantity controls, remove action

**Design Specifications:**

- Layout: Image left (80px), info right
- Info: Name, category, price, quantity
- Quantity: Compact +/- controls
- Remove: Trash icon, muted
- No borders, spacing-based separation

**Files to Modify (after approval):**

- `src/components/cards/cart-item-card.tsx`

---

#### Task 6.3: Order Summary Component

**Status:** ✔️ Completed
**Wireframe:** [task-6-3-order-summary.html](wireframes/task-6-3-order-summary.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Order/cart summary sidebar
- Line items, totals, coupon

**Design Specifications:**

- Card: `bg-neutral-50` or subtle shadow
- Line items: Product + qty + price
- Subtotal, shipping, discount rows
- Total: `font-display font-bold`, larger
- Coupon: Input + "Apply" button inline

**Files to Modify (after approval):**

- `src/components/orders/order-summary.tsx`

---

#### Task 6.4: Address Components

**Status:** ✔️ Completed
**Wireframe:** [task-6-4-address-components.html](wireframes/task-6-4-address-components.html)
**Approved Selection:**

- Mobile: Horizontal carousel (1 card + peek)
- Tablet: Horizontal carousel (2 cards + peek)
- Desktop: Horizontal carousel (3 cards + peek)

**Scope:**

- Address card, selector, form
- Selection state with ring

**Design Specifications:**

- Card: No border, `bg-neutral-50` or white
- Selected: `ring-2 ring-primary`
- Name: `font-medium`, address lines muted
- Edit/Delete: Subtle icons, top-right
- Selector: Grid, "Add New" card with dashed border
- Form: Clean inputs, `rounded-lg`

**Files to Modify (after approval):**

- `src/components/cards/address-card.tsx`
- `src/components/address/address-selector.tsx`
- `src/components/forms/address-form.tsx`

---

### Phase 7: Events

**Phase Status:** 🚧 In Progress

> 🎨 **Customer Impact: HIGH** - Secondary revenue stream (workshops)
> **Files owned by this phase:** `src/features/events/`, `src/components/events/`, `src/components/cards/event-*.tsx`, `src/components/cards/registered-*.tsx`

#### Task 7.1: Events Listing Pages (Unified Layout)

**Status:** ✔️ Completed
**Wireframe:** [task-7-1-events-listing.html](wireframes/task-7-1-events-listing.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C
  **Note:** Header should be left-aligned in wireframe

**Scope:**
This task establishes a **unified layout system** for ALL event listing pages:

- `/events` - Main events hub
- `/events/upcoming` - Upcoming events listing
- `/events/past` - Past workshops gallery
- `/events/registrations` - User's registrations (with sub-tabs: Upcoming | Completed)

**IMPORTANT: All pages MUST share the same:**

1. Page header pattern (title + breadcrumbs)
2. Tabs navigation component
3. Grid layout structure
4. Card spacing and responsive behavior

**Design Specifications:**

_Page Header (same for all):_

- Title: `font-display text-3xl font-bold`
- Breadcrumbs: Home > Events > [Current Page]
- Consistent vertical spacing below header

_Tabs Navigation (same for all):_

- `font-display font-medium`
- Underline active indicator (primary color, 2px)
- Mobile: Horizontal scrollable, full-width
- Tablet/Desktop: Centered, contained width

_Grid Layout (same for all):_

- Mobile: 1-column, full-width cards
- Tablet: 2-column grid, `gap-6`
- Desktop: 3-column grid, `gap-8`
- Consistent card aspect ratios

**Files to Modify (after approval):**

- `src/components/events/events-tabs.tsx`
- `src/components/events/events-list-layout.tsx`
- `src/components/events/upcoming-events-client.tsx`
- `src/components/events/past-workshops-client.tsx`
- `src/features/events/components/registrations.tsx`

---

#### Task 7.2: Event Detail Pages (Unified Layout)

**Status:** ✔️ Completed
**Wireframe:** [task-7-2-event-detail.html](wireframes/task-7-2-event-detail.html)
**Approved Selection:**

- Mobile: Option A - Stacked Layout
- Tablet: Option A - Stacked Layout
- Desktop: Option A - Stacked Layout
  **Note:** For completed events, QR code is removed from the registered/ticket view. Registration status shown as approved without QR.

**Scope:**
This task establishes a **unified layout system** for ALL event detail pages:

- `/events/[id]` - Upcoming event detail (view details, register)
- `/events/[id]` - Past/completed event detail (view gallery, reviews)

**IMPORTANT: Both page types MUST share the same:**

1. Page header pattern (event title + breadcrumbs)
2. Hero image/gallery section structure
3. Content layout (info left, sidebar right on desktop)
4. Section spacing and typography
5. Instructor info card design

**Design Specifications:**

_Hero Section (same structure):_

- Mobile: Full-width image/carousel
- Desktop: Large hero image (16:9 or 3:2)
- Upcoming: Single featured image
- Past: Gallery with thumbnail strip

_Content Layout (same for both):_

- Mobile: Full-width, stacked sections
- Desktop: 60/40 split (content left, sidebar right)
- Consistent section spacing (`space-y-8`)

_Sidebar (same structure, different CTAs):_

- Upcoming: Price, date/time, location, spots, "Register Now" CTA
- Past: Date attended, instructor info, "Write a Review" CTA
- Both: Instructor card with avatar, name, bio

**Files to Modify (after approval):**

- `src/features/events/components/event-detail.tsx`
- `src/features/events/components/past-workshop-detail.tsx`
- `src/features/events/components/event-hero.tsx`
- `src/features/events/components/event-sidebar.tsx`
- `src/features/events/components/instructor-card.tsx`
- `src/features/events/components/workshop-gallery.tsx`

---

#### Task 7.3: Event Card

**Status:** ✔️ Completed
**Wireframe:** [task-7-3-event-card.html](wireframes/task-7-3-event-card.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Event card matching design system
- 16:9 image, badges, CTA

**Design Specifications:**

- Image: 16:9 aspect, zoom on hover
- Badges: Level (top-left), price pill (bottom-right)
- Content: Title in `font-display`, date/time row
- Footer: Location, available spots
- CTA: "Book Now" full-width, primary, `rounded-lg`
- Sold out: Overlay + disabled button

**Files to Modify (after approval):**

- `src/components/cards/event-card.tsx`

---

#### Task 7.4: Registration Cards

**Status:** ✔️ Completed
**Wireframe:** [task-7-4-registration-cards.html](wireframes/task-7-4-registration-cards.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Cards for user's event registrations
- Upcoming and completed variants

**Design Specifications:**

_Registration Card (Upcoming):_

- Event thumbnail, title, date
- Status badge (Pending/Approved/Confirmed)
- Action buttons (View, Cancel)

_Completed Card (Past registrations):_

- Event thumbnail, title, completed date
- "Write a Review" CTA if not reviewed
- "View Review" if already reviewed

**Files to Modify (after approval):**

- `src/components/cards/registered-event-card.tsx`
- `src/components/cards/completed-event-card.tsx`

---

#### Task 7.5: Event Ticket

**Status:** ✔️ Completed
**Wireframe:** [task-7-5-event-ticket.html](wireframes/task-7-5-event-ticket.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Ticket-style registration confirmation
- QR code area, details

**Design Specifications:**

- Ticket style: Torn edge or dashed border
- Title: `font-display font-bold`
- Details: Date, time, location in rows
- QR: Placeholder area
- ID: Monospace font
- Printable: High contrast

**Files to Modify (after approval):**

- `src/components/events/event-ticket.tsx`

---

### Phase 8: User Account

**Phase Status:** 🚧 In Progress

> 👤 **Customer Impact: MEDIUM** - Retention & repeat purchases
> **Files owned by this phase:** `src/features/orders/`, `src/features/wishlist/`, `src/components/orders/order-progress.tsx`, `src/app/(main)/profile/`

#### Task 8.1: Orders Page

**Status:** ✔️ Completed
**Wireframe:** [task-8-1-orders-page.html](wireframes/task-8-1-orders-page.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Orders list with consistent page header
- Order card redesign

**Design Specifications:**

- Page header: "My Orders", breadcrumbs
- Order card: Order #, date, status badge, total, items preview
- Mobile: Full-width cards, stacked
- Desktop: List view with more columns visible
- Search: Optional search input for order number

**Files to Modify (after approval):**

- `src/features/orders/components/orders-list.tsx`
- `src/features/orders/components/order-detail.tsx`

---

#### Task 8.2: Order Progress Stepper

**Status:** ✔️ Completed
**Wireframe:** [task-8-2-order-progress.html](wireframes/task-8-2-order-progress.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Order status progress indicator
- Horizontal/vertical stepper

**Design Specifications:**

- Horizontal (desktop), vertical (mobile)
- Steps: Circles with icons/numbers, connected lines
- Active: Primary color fill
- Completed: Check icon, primary color
- Upcoming: Muted, dashed line

**Files to Modify (after approval):**

- `src/components/orders/order-progress.tsx`

---

#### Task 8.3: Wishlist Page

**Status:** ❌ Discarded
**Wireframe:** [task-8-3-wishlist-page.html](wireframes/task-8-3-wishlist-page.html)

**Scope:**

- Wishlist page with consistent header
- Product grid layout

**Design Specifications:**

- Page header: "My Wishlist", breadcrumbs
- Mobile: 2-column grid
- Desktop: 3-4 column grid
- Empty state: Icon + "Your wishlist is empty" + CTA

**Files to Modify (after approval):**

- `src/features/wishlist/components/wishlist.tsx`

---

#### Task 8.4: Profile Page

**Status:** ✅ Approved
**Wireframe:** [task-8-4-profile-page.html](wireframes/task-8-4-profile-page.html)
**Approved Selection:**

- Mobile: Option B - Horizontal Profile with List
- Tablet: Option B - Horizontal Profile with List
- Desktop: Option B - Horizontal Profile with List

**Scope:**

- User profile with quick links
- Consistent page header

**Design Specifications:**

- Page header: "My Profile", breadcrumbs
- Avatar: Large, centered on mobile
- Info: Name, email, member since
- Quick links: Orders, Wishlist, Addresses, Registrations
- Cards: Icon + label + count, hover shadow

**Files to Modify (after approval):**

- `src/app/(main)/profile/page.tsx`
- `src/app/(main)/profile/profile-client.tsx`

---

### Phase 9: Navigation & Layout

**Phase Status:** ✅ Completed

> 🧭 **Customer Impact: HIGH** - Site-wide experience
> **Files owned by this phase:** `src/features/layout/`, `src/features/global-search/`

#### Task 9.1: Desktop Navbar

**Status:** ✔️ Completed
**Wireframe:** [task-9-1-desktop-navbar.html](wireframes/task-9-1-desktop-navbar.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- Clean white navbar with sticky behavior
- Consistent nav links, search, cart

**Design Specifications:**

- Background: White, sticky with backdrop blur
- Logo: Left-aligned, `font-display font-bold`
- Links: Centered, `font-medium`, hover underline
- Right: Search icon, wishlist heart + count, cart + count, user avatar
- Shadow: Subtle `shadow-sm` or border on scroll

**Files to Modify (after approval):**

- `src/features/layout/components/navbar.tsx`

---

#### Task 9.2: Mobile Header

**Status:** ✔️ Completed
**Wireframe:** [task-9-2-mobile-header.html](wireframes/task-9-2-mobile-header.html)
**Approved Selection:**

- Mobile: Option A - Full Actions
- Tablet: Option A - Full Actions
- Desktop: Option A - Full Actions

**Scope:**

- Fixed top mobile header with glassmorphism effect
- Logo mode (homepage) vs Back+Title mode (sub-pages)
- Contextual right-side actions per page type
- Scroll hide/show behavior

**Design Specifications:**

- Height: `h-14` (56px)
- Left: Logo (homepage) or Back arrow + Page title (sub-pages)
- Right: Search + Wishlist (with badge) + User/Avatar (contextual per page)
- Background: `bg-white/80 backdrop-blur-xl`, subtle bottom border

**Files to Modify (after approval):**

- `src/features/layout/components/mobile-header.tsx`

---

#### Task 9.3: Mobile Bottom Navigation

**Status:** ✅ Approved — No Changes Needed

**Wireframe:** [task-9-3-mobile-bottom-nav.html](wireframes/task-9-3-mobile-bottom-nav.html)

**Approved Selection:** Current implementation retained as-is. The existing mobile bottom navigation already meets all design requirements.

**Scope:**

- Fixed bottom navigation bar
- 4 icon items with active state

**Design Specifications:**

- Height: `h-16` (64px) + safe area
- Items: Home, Shop, Events, Cart
- Icons only, no text labels
- Active: Primary color with animated pill indicator (Framer Motion `layoutId`)
- Cart: Count badge with animated scale in/out
- Frosted glass background: `bg-white/80 backdrop-blur-xl`
- Dark mode support: `bg-black/80`, `bg-neutral-800` pill
- Spring animation: `bounce: 0.15, duration: 0.5`

**Files:** No modifications required — current implementation approved.

---

#### Task 9.4: Account Dropdown

**Status:** ✔️ Completed

**Wireframe:** [task-9-4-account-dropdown.html](wireframes/task-9-4-account-dropdown.html)

**Approved Selections:**

- **Desktop & Mobile Dropdown:** Option A — Standard (same dropdown for all devices)
- **Mobile Behavior:** Same dropdown as desktop (no bottom sheet)

**Scope:**

- User account menu dropdown
- Clean card with menu items

**Design Specifications:**

- Trigger: Avatar circle
- Dropdown: White card, `rounded-xl`, shadow-lg
- Items: Icon + label, hover `bg-neutral-50`
- Links: Orders, Wishlist, Registrations, Addresses
- Divider before Sign Out

**Files to Modify:**

- `src/features/layout/components/account-dropdown.tsx`

---

#### Task 9.5: Global Search

**Status:** ✔️ Completed

**Scope:**

- Command palette style search dialog
- Grouped results (products, events, orders)

**Design Specifications:**

- Dialog: Centered, `rounded-2xl`, backdrop blur
- Input: Large, no border, search icon prefix
- Results: Grouped by type with thumbnails
- Keyboard: Arrow navigation, enter to select
- Mobile: Full-screen overlay

**Files to Modify (after approval):**

- `src/features/global-search/components/global-search.tsx`

---

#### Task 9.6: Footer

**Status:** ✔️ Completed
**Wireframe:** [task-9-6-footer.html](wireframes/task-9-6-footer.html)
**Approved Selection:**

- Mobile: Option B - Soft Green (#E8ECE8)
- Tablet: Option B - Soft Green (#E8ECE8)
- Desktop: Option B - Soft Green (#E8ECE8)

**Scope:**

- Footer redesign with 4 columns
- Newsletter integration

**Design Specifications:**

- Background: `#E8ECE8` (primary-light) — subtle sage green tint
- Layout: 4-column grid (Brand, Shop, Support, Newsletter) on desktop
- Tablet: 2×2 grid (Brand + Newsletter top, Shop + Support bottom)
- Mobile: Centered brand, accordion sections, stacked newsletter
- Brand: Logo + description + social icons (36px desktop, 32px mobile)
- Social Icons: `rgba(79, 111, 82, 0.12)` background, primary color icons
- Headings: `font-display`, `#3D5640` (darker green for contrast)
- Links: `opacity-65` default, `opacity-100` on hover
- Newsletter: White input with `#d4ddd4` border, primary green Subscribe button
- Bottom Bar: Top border `rgba(79, 111, 82, 0.15)`, copyright + payments + legal links
- Payment Icons: `rgba(79, 111, 82, 0.1)` background
- Accordion (Mobile): Chevron icons, `rgba(79, 111, 82, 0.12)` bottom borders

**Files to Modify (after approval):**

- `src/features/layout/components/footer.tsx`

---

#### Task 9.7: WhatsApp Button

**Status:** ✔️ Completed
**Wireframe:** [task-9-7-whatsapp-button.html](wireframes/task-9-7-whatsapp-button.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Floating action button design
- Position and hover state

**Design Specifications:**

- Position: Bottom-right, above mobile nav
- Background: WhatsApp green (`#25D366`)
- Icon: White WhatsApp icon
- Hover: Scale up, shadow-lg
- Tooltip: "Chat with us"

**Files to Modify (after approval):**

- `src/components/shared/whatsapp-contact-button.tsx`

---

### Phase 10: Content Pages

**Phase Status:** 🚧 In Progress

> 📄 **Customer Impact: LOW** - Support & information
> **Files owned by this phase:** `src/app/(main)/(with-footer)/about/`, `src/app/(main)/(with-footer)/contact/`, `src/app/(main)/(with-footer)/faq/`, etc.

#### Task 10.1: About Page

**Status:** ✅ Approved
**Wireframe:** [task-10-1-about-page.html](wireframes/task-10-1-about-page.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Editorial layout with 50/50 splits
- Team, values, process sections

**Design Specifications:**

- Page header: "Our Story", breadcrumbs
- Layout: Alternating 50/50 text + image splits
- Stats: Animated number counters (500+ customers, etc.)
- Team: Grid of team member cards
- Values: Icon + heading + description cards
- Mobile: Stacked, full-width images

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/about/page.tsx`

---

#### Task 10.2: Contact Page

**Status:** Completed
**Wireframe:** [task-10-2-contact-page.html](wireframes/task-10-2-contact-page.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- Contact form with info sidebar
- Consistent page header

**Design Specifications:**

- Page header: "Get in Touch", breadcrumbs
- Mobile: Stacked form, info below
- Desktop: 2-column (form left, info + map right)
- Form inputs: `rounded-lg`, proper labels

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/contact/page.tsx`

---

#### Task 10.3: FAQ Page

**Status:** ✅ Approved
**Wireframe:** [task-10-3-faq-page.html](wireframes/task-10-3-faq-page.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- FAQ page with grouped accordion by category
- Consistent left-aligned page header

**Design Specifications:**

- Page header: "Frequently Asked Questions", breadcrumbs (Home / Help / FAQ)
- Content: `max-w-3xl` for readability
- Grouped accordion organized by category (Orders & Shipping, Products, Returns & Refunds)
- Category headings with `font-display`, border-bottom separator
- Expandable items: `rounded-xl`, subtle shadow, hover background
- Heading hierarchy: h2 in `font-display`

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/faq/page.tsx`

---

#### Task 10.4: Shipping Page

**Status:** ✅ Approved
**Wireframe:** [task-10-4-shipping-page.html](wireframes/task-10-4-shipping-page.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- Shipping information page with rate table
- Packaging and tracking sections

**Design Specifications:**

- Page header: "Shipping Information", breadcrumbs (Home / Help / Shipping)
- Content: `max-w-3xl` for readability
- Shipping rates table (Standard / Express / Free) with clean styling
- Packaging info with bullet list
- Order tracking section
- Heading hierarchy: h2 in `font-display`

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/shipping/page.tsx`

---

#### Task 10.5: Privacy Policy Page

**Status:** ✅ Approved
**Wireframe:** [task-10-5-privacy-page.html](wireframes/task-10-5-privacy-page.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Privacy policy page with prose layout
- "Last updated" date, section headings, body text, bullet lists

**Design Specifications:**

- Page header: "Privacy Policy", breadcrumbs (Home / Help / Privacy Policy)
- Content: `max-w-3xl` for readability
- "Last updated" date at top
- Sections: Information We Collect, How We Use Your Data, Cookies, Data Protection, Your Rights, Contact
- Simple prose pattern: heading + text + optional bullet list
- Heading hierarchy: h2 in `font-display`

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/privacy/page.tsx`

---

#### Task 10.6: Terms of Service Page

**Status:** ✅ Approved
**Wireframe:** [task-10-6-terms-page.html](wireframes/task-10-6-terms-page.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A

**Scope:**

- Terms of service page with prose layout
- Same pattern as Privacy Policy

**Design Specifications:**

- Page header: "Terms of Service", breadcrumbs (Home / Help / Terms of Service)
- Content: `max-w-3xl` for readability
- "Last updated" date at top
- Sections: General Terms, Orders & Payment, Returns & Refunds, Workshop Registrations, Intellectual Property, Limitation of Liability, Contact
- Simple prose pattern: heading + text + optional bullet list
- Heading hierarchy: h2 in `font-display`

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/terms/page.tsx`

---

#### Task 10.7: Pottery Care Guide Page

**Status:** ✅ Approved
**Wireframe:** [task-10-7-care-page.html](wireframes/task-10-7-care-page.html)
**Approved Selection:**

- Mobile: Option C
- Tablet: Option C
- Desktop: Option C

**Scope:**

- Care instructions page with icon cards grid
- Pro tips callout card

**Design Specifications:**

- Page header: "Care Instructions", breadcrumbs (Home / Help / Care Instructions)
- Care cards grid: 1-col mobile, 2x2 tablet, 4-col desktop
- Cards: Icon + title + description, `rounded-xl`, subtle shadow
- Pro Tips callout: Cream background (`#F5F0E8`), icon, bullet list
- Content width: Cards grid max-w-[900px] on desktop, Pro Tips max-w-3xl

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/care/page.tsx`

---

### Phase 11: Polish & Animations

**Phase Status:** 🚧 In Progress

> ✨ **Run LAST** - Touches files across multiple phases
> **Dependencies:** Phases 5-10 should be mostly complete

#### Task 11.1: Section Background Variety

**Status:** ✅ Approved
**Wireframe:** [task-11-1-section-backgrounds.html](wireframes/task-11-1-section-backgrounds.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A
  **Note:** No USP strip

**Scope:**

- Add alternating section backgrounds on homepage
- Use cream, primary-lighter for variety

**Design Specifications:**

- Hero: White/transparent
- USP Strip: `bg-primary-lighter`
- Categories: `bg-cream`
- Products: White
- Testimonials: `bg-primary-lighter`
- CTA: Current gradient/image treatment
- Story: White

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/page.tsx`
- Various section components

---

#### Task 11.2: Newsletter Section

**Status:** ✅ Approved
**Wireframe:** [task-11-2-newsletter-section.html](wireframes/task-11-2-newsletter-section.html)
**Approved Selection:**

- Mobile: Option A
- Tablet: Option A
- Desktop: Option A
  **Note:** Handle mobile email input properly

**Scope:**

- Redesign footer newsletter section
- More engaging layout with better typography

**Design Specifications:**

- Heading: `font-display`, larger text
- Background: Subtle pattern, gradient, or image
- Input + button: Inline layout, proper spacing
- Mobile: Full-width, stacked
- Desktop: Centered, max-width container

**Files to Modify (after approval):**

- `src/features/layout/components/newsletter-section.tsx` (new)

---

#### Task 11.3: Scroll Animations

**Status:** ✔️ Completed
**Wireframe:** [task-11-3-scroll-animations.html](wireframes/task-11-3-scroll-animations.html)
**Approved Selection:**

- Mobile: Option A - Subtle Fade-Up (all devices)
- Tablet: Option A - Subtle Fade-Up (all devices)
- Desktop: Option A - Subtle Fade-Up (all devices)

**Scope:**

- Staggered reveal animations on product and event grids
- Scroll-triggered fade-in effects on all devices

**Design Specifications:**

- Product/event grids: `staggerChildren: 0.1`
- Cards: Fade in from bottom (`opacity: 0→1`, `y: 20→0`)
- Duration: `200ms`, easing: `easeOut`
- All devices (not desktop-only)
- Trigger: `whileInView` with `viewport: { once: true, amount: 0.1 }`

**Files Modified:**

- `src/components/shared/staggered-grid.tsx` (new - reusable stagger container)
- `src/components/shared/index.ts` (added StaggeredGrid export)
- `src/features/product-card/components/product-card.tsx` (switched to variants)
- `src/components/cards/event/event-card-wrapper.tsx` (switched to variants)
- `src/features/products/components/product-list.tsx` (wrapped grid with StaggeredGrid)
- `src/features/events/components/all-events.tsx` (wrapped both grids)
- `src/components/events/upcoming-events-client.tsx` (wrapped grid)
- `src/components/events/past-workshops-client.tsx` (wrapped grid)
- `src/features/wishlist/components/wishlist.tsx` (recommendations grid)
- `src/components/sections/category-section.tsx` (category cards with motion.div variants)

---

#### Task 11.4: Smooth Scrolling

**Status:** ✅ Approved
**Wireframe:** [task-11-4-smooth-scrolling.html](wireframes/task-11-4-smooth-scrolling.html)

**Scope:**

- Add Lenis smooth scroll to Products & Events pages
- Buttery smooth inertia scrolling

**Design Specifications:**

- Library: Lenis (`lenis`)
- Config: `lerp: 0.1`, `smoothWheel: true`
- Mobile: Keep native scroll
- Pages: Products, Events, Homepage

**Files to Modify (after approval):**

- `src/components/shared/smooth-scroll-provider.tsx` (new)
- `src/app/layout.tsx`

---

#### Task 11.5: Animated Number Counters

**Status:** ✅ Approved
**Wireframe:** [task-11-5-animated-counters.html](wireframes/task-11-5-animated-counters.html)
**Approved Selection:**

- Mobile: Option A - Spring
- Tablet: Option A - Spring
- Desktop: Option A - Spring

**Scope:**

- Count-up animation for stats
- About page, homepage statistics

**Design Specifications:**

- Numbers count from 0 when scrolled into view
- Stats: "500+ Happy Customers", "1000+ Products", etc.
- Animation: Framer Motion `useSpring` with spring physics easing
- Easing: Fast start, gradual deceleration (~1.5s duration)
- Font: `font-display`, large numbers
- Thousand separators for numbers ≥ 1000
- Support "+" suffix
- Trigger: IntersectionObserver / `whileInView`, plays once
- Accessibility: Respect `prefers-reduced-motion` (show final value immediately)

**Files to Modify (after approval):**

- `src/components/shared/animated-counter.tsx` (new)

---

### Phase 12: Auth Pages

**Phase Status:** 🚧 In Progress

> 🔐 **Can run independently** - Uses Clerk components

#### Task 12.1: Sign In/Sign Up Pages

**Status:** 🚧 In Progress
**Wireframe:** [task-12-1-sign-in-sign-up.html](wireframes/task-12-1-sign-in-sign-up.html)
**Approved Selection:**

- Mobile: Option B - Centered Card with Pattern Background
- Tablet: Option B - Centered Card with Pattern Background
- Desktop: Option B - Centered Card with Pattern Background

**Scope:**

- Auth pages with consistent header
- Clean centered layout

**Design Specifications:**

- Page header: Title + breadcrumbs (consistent with other pages)
- Layout: Centered card on desktop, full-screen mobile
- Heading: "Welcome Back" / "Create Account" in `font-display`
- Clerk: Custom styling to match theme

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/sign-in/[[...sign-in]]/page.tsx`
- `src/app/(main)/(with-footer)/sign-up/[[...sign-up]]/page.tsx`

---

### Phase 13: Skeletons

**Phase Status:** 🚧 In Progress

> 💀 **Run after designs finalized** - Must match final component dimensions

#### Task 13.1: Skeleton Components

**Status:** ✅ Approved
**Wireframe:** [task-13-1-skeleton-components.html](wireframes/task-13-1-skeleton-components.html)
**Approved Selection:**

- Mobile: Option B
- Tablet: Option B
- Desktop: Option B

**Scope:**

- Loading skeletons matching new designs
- Shimmer animation

**Design Specifications:**

- Match new component dimensions exactly
- Shimmer: Left-to-right gradient sweep
- Components: Product card, event card, cart item, etc.

**Files to Modify (after approval):**

- All skeleton components in `src/components/skeletons/`

---

### Phase 14: React 19 Performance Optimizations

> ⚡ **NO WIREFRAMES REQUIRED** - Code-only optimizations
> 🔄 **INTEGRATE DURING IMPLEMENTATION** - Apply these patterns while implementing any task from Phases 4-13
> 🔧 **ALSO FOR REFACTORING** - Can be applied to existing code that wasn't built with these patterns

This phase documents React 19 performance primitives for better UX, cleaner code, optimized rendering, and **smooth page transition animations**.

**How to use this phase:**

1. **During new implementations** - When implementing any task from Phases 4-13, check which patterns from this phase apply and implement them together
2. **Refactoring existing code** - Use these tasks as a checklist to upgrade existing components that weren't built with these patterns
3. **No separate workflow** - These are integrated into `prompt-implement.md` as mandatory checks

**Example:** When implementing Task 5.1 (Product Detail Layout):

- Apply Task 14.1 (ViewTransition) for product image morph animation
- Apply Task 14.2 (useTransition) for navigation from product card
- Apply Task 14.6 (Suspense) for related products section
- Apply Task 14.8 (useOptimistic) if there are review like buttons

---

#### Task 14.1: Page Transition Animations with ViewTransition

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Enable ViewTransition API for animated page changes
- Create smooth cross-fade/morph animations when navigating between pages
- Animate shared elements (images, cards) across page transitions

**Page Transitions to Implement:**

| From                           | To                   | Animation                                  |
| ------------------------------ | -------------------- | ------------------------------------------ |
| Products grid → Product detail | Image morphs to hero | `view-transition-name: product-image-{id}` |
| Events grid → Event detail     | Image morphs to hero | `view-transition-name: event-image-{id}`   |
| Cart → Order confirmation      | Smooth fade/slide    | Default cross-fade                         |
| Any page → Any page            | Subtle fade          | `::view-transition-old/new`                |

**Configuration:**

```tsx
// next.config.ts
experimental: {
  viewTransition: true,
}
```

**CSS for Page Transitions:**

```css
/* Global page transition defaults */
::view-transition-old(root) {
  animation: fade-out 200ms ease-out;
}
::view-transition-new(root) {
  animation: fade-in 200ms ease-in;
}

/* Shared element transitions */
::view-transition-old(product-hero),
::view-transition-new(product-hero) {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

**Implementation Pattern:**

```tsx
// Product card with view transition name
<div style={{ viewTransitionName: `product-image-${product.id}` }}>
  <Image src={product.image} />
</div>

// Product detail hero matches the name
<div style={{ viewTransitionName: `product-image-${product.id}` }}>
  <ProductHero images={product.images} />
</div>
```

**Files to Modify:**

- `next.config.ts` (enable viewTransition)
- `src/app/globals.css` (view transition keyframes & styles)
- `src/features/product-card/components/product-card.tsx`
- `src/features/product-detail/components/product-detail.tsx`
- `src/components/cards/event-card.tsx`
- `src/features/events/components/event-detail.tsx`

---

#### Task 14.2: useTransition for Navigation with Pending States

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Wrap all `router.push` calls with `useTransition`
- Show loading/pending indicators during page transitions
- Enable smooth concurrent navigation without blocking UI

**Key Navigation Points:**

- Global search result selection
- Product card click → detail page
- Event card click → detail page
- Cart checkout → order confirmation
- Breadcrumb navigation
- Mobile back button
- Pagination controls

**Pattern:**

```tsx
const [isPending, startTransition] = useTransition();

const handleNavigate = (path: string) => {
  startTransition(() => {
    router.push(path);
  });
};

// Show subtle loading indicator
{
  isPending && <NavigationProgress />;
}
```

**Navigation Progress Component:**

```tsx
// Thin progress bar at top of page during navigation
function NavigationProgress() {
  return (
    <div className="bg-primary/20 fixed top-0 right-0 left-0 z-50 h-1">
      <div className="bg-primary animate-progress h-full" />
    </div>
  );
}
```

**Files to Modify:**

- `src/features/global-search/containers/global-search-container.tsx`
- `src/features/product-card/containers/product-card-container.tsx`
- `src/features/cart/containers/cart-container.tsx`
- `src/features/events/containers/event-detail-container.tsx`
- `src/features/layout/components/navigation-progress.tsx` (new)
- `src/features/layout/components/navbar.tsx` (add progress)

---

#### Task 14.3: useOptimistic for Cart Operations

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Replace manual optimistic update pattern in cart hook
- Eliminate `previousItems` / `previousCount` rollback state
- Simplify error handling with automatic rollback

**Current Pattern (to replace):**

```tsx
// Manual optimistic updates with rollback
const previousItems = cartItems;
setCartItems(optimisticItems);
try {
  await mutation();
} catch {
  setCartItems(previousItems); // Manual rollback
}
```

**New Pattern:**

```tsx
const [optimisticItems, addOptimistic] = useOptimistic(
  cartItems,
  (state, action) => applyCartAction(state, action),
);
// Automatic rollback on error
```

**Files to Modify:**

- `src/hooks/use-cart.ts` (Lines 124-172)

---

#### Task 14.4: useOptimistic for Wishlist Operations

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Apply useOptimistic to toggle, add, and remove wishlist operations
- Remove manual `loadingProducts` Set state management
- Eliminate `previousIds` rollback patterns

**Operations to Update:**

- `toggleWishlist` (Lines 63-89)
- `addToWishlist` (Lines 121-137)
- `removeFromWishlist` (Lines 158-178)

**Files to Modify:**

- `src/hooks/use-wishlist.ts`

---

#### Task 14.5: useTransition for Filter Updates

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Ensure all filter operations use transitions for non-blocking updates
- Add isPending state for filter loading indicators
- Maintain responsive UI during expensive filter recalculations

**Current Status:** Partially implemented in `use-product-filters.ts`

**Files to Review/Modify:**

- `src/features/products/hooks/use-product-filters.ts` (extend existing)
- `src/features/events/hooks/use-event-filters.ts` (if exists)

---

#### Task 14.6: Suspense Boundaries for Data Loading

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Add granular Suspense boundaries around async data sections
- Create dedicated fallback skeletons for each boundary
- Improve initial page load with streaming

**Areas to Add Suspense:**

- Product detail: Related products section
- Product detail: Reviews section
- Cart page: Order summary calculation
- Events page: Upcoming vs past sections
- Wishlist: Initial load

**Pattern:**

```tsx
<Suspense fallback={<RelatedProductsSkeleton />}>
  <RelatedProductsSection productId={id} />
</Suspense>
```

**Files to Modify:**

- `src/features/product-detail/containers/product-detail-container.tsx`
- `src/features/cart/containers/cart-container.tsx`
- `src/features/wishlist/containers/wishlist-container.tsx`
- `src/features/events/containers/events-list-container.tsx`

---

#### Task 14.7: Activity for Dialog/Sheet Isolation

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Wrap dialog/sheet content with Activity component
- Prevent parent re-renders when modal state changes
- Improve performance for complex modals (order detail, registration detail)

**Pattern:**

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <Activity mode={open ? "visible" : "hidden"}>
    <DialogContent>
      <ExpensiveDialogBody />
    </DialogContent>
  </Activity>
</Dialog>
```

**Files to Modify:**

- `src/features/dashboard/orders/containers/order-detail-dialog-container.tsx`
- `src/features/dashboard/registrations/containers/registration-detail-dialog-container.tsx`
- `src/components/shared/reviews-sheet.tsx`
- `src/components/ui/sheet.tsx` (wrapper pattern)
- `src/components/ui/dialog.tsx` (wrapper pattern)

---

#### Task 14.8: useOptimistic for Review Actions

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Apply useOptimistic to review like/unlike actions
- Immediate UI feedback for review interactions
- Apply to both product reviews and event reviews

**Files to Modify:**

- `src/features/product-detail/containers/product-detail-container.tsx` (Lines 16-18)
- `src/features/events/containers/event-review-container.tsx` (if exists)

---

#### Task 14.9: Simplified Loading State Pattern

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Create shared `useLoadingTransition` hook
- Replace `loadingProducts` Set patterns with transition-based approach
- Reduce boilerplate in cart, wishlist, and event hooks

**Current Pattern (to replace):**

```tsx
const [loadingProducts, setLoadingProducts] = useState<Set<number>>(new Set());
const setLoading = (id: number, loading: boolean) => {
  setLoadingProducts((prev) => {
    const next = new Set(prev);
    loading ? next.add(id) : next.delete(id);
    return next;
  });
};
```

**New Pattern:**

```tsx
const { isPending, startAction } = useLoadingTransition();
// isPending automatically tracks in-flight operations
```

**Files to Modify:**

- `src/hooks/use-loading-transition.ts` (new)
- `src/hooks/use-cart.ts`
- `src/hooks/use-wishlist.ts`
- `src/hooks/use-event-registration.ts`

---

#### Task 14.10: Form Actions with Transitions

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Integrate React 19 form improvements with existing forms
- Use `useFormStatus` for submit button pending states
- Combine with server actions for optimistic form handling

**Pattern:**

```tsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{pending ? "Saving..." : "Save"}</Button>;
}
```

**Forms to Update:**

- Address form
- Contact form
- Review form
- Newsletter signup

**Files to Modify:**

- `src/components/forms/address-form.tsx`
- `src/app/(main)/(with-footer)/contact/page.tsx`
- `src/components/shared/review-form.tsx`
- `src/features/layout/components/newsletter-section.tsx`

---

#### Task 14.11: Route Change Animation Provider

**Status:** 🚧 No Wireframe Needed

**Scope:**

- Create a global provider that wraps the app for route change animations
- Integrate with Next.js App Router navigation events
- Provide consistent animation context across all pages

**Implementation:**

```tsx
// src/components/providers/route-animation-provider.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useTransition } from "react";

export function RouteAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Trigger view transition on route change
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // DOM updates handled by React
      });
    }
  }, [pathname]);

  return (
    <>
      {isPending && <NavigationProgress />}
      <div className="route-container">{children}</div>
    </>
  );
}
```

**Files to Modify:**

- `src/components/providers/route-animation-provider.tsx` (new)
- `src/app/layout.tsx` (wrap with provider)

---

### Phase 15: Custom Mug Experience

**Phase Status:** 🔲 Not Started

> 🎨 **Customer Impact: HIGH** - Custom orders and personalization
> **Files owned by this phase:** `src/app/(main)/custom-mug/`, `src/features/custom-mug/`, `src/features/orders/`, `src/features/dashboard/`, `src/data/custom-mug/`, `src/graphql/custom-mug.*`

#### Task 15.1: Schema Update (Custom Options + Order JSON)

**Status:** 🔲 Not Started

**Scope:**

- Add `CustomMugOptionType` enum
- Add `CustomMugOption` model
- Add `custom_data Json?` to `PurchasedProductItem`

**Files to Modify:**

- `poetry-and-pottery-api/src/prisma/schema.prisma`

---

#### Task 15.2: API GraphQL (Custom Options + Order Item JSON)

**Status:** 🔲 Not Started

**Scope:**

- Custom options queries/mutations (public + admin)
- Expose `custom_data` on order items

**Files to Modify:**

- `poetry-and-pottery-api/src/resolvers/custom-mug/`
- `poetry-and-pottery-api/src/resolvers/orders/`

---

#### Task 15.3: Admin Options Management UI

**Status:** 🔲 Wireframe Pending
**Wireframe:** [task-15-3-custom-mug-options-admin.html](wireframes/task-15-3-custom-mug-options-admin.html)

**Scope:**

- CRUD for size/color/finish/shape options
- Active toggle

**Files to Modify (after approval):**

- `src/app/dashboard/custom-mug-options/page.tsx`
- `src/features/dashboard/custom-mug-options/`

---

#### Task 15.4: Custom Mug Page (Customer)

**Status:** 🔲 Wireframe Pending
**Wireframe:** [task-15-4-custom-mug-page.html](wireframes/task-15-4-custom-mug-page.html)

**Scope:**

- New customization page for mugs with selectable options
- Fields: size, color, finish, shape, custom text
- “Contact on WhatsApp for quote” pricing notice
- Submit request flow with success state

**Files to Modify (after approval):**

- `src/app/(main)/custom-mug/page.tsx`
- `src/features/custom-mug/components/custom-mug-form.tsx`
- `src/features/custom-mug/containers/custom-mug-container.tsx`
- `src/features/custom-mug/types.ts`

---

#### Task 15.5: Orders UI Integration

**Status:** 🔲 Wireframe Pending
**Wireframe:** [task-15-5-custom-mug-orders-ui.html](wireframes/task-15-5-custom-mug-orders-ui.html)

**Scope:**

- Custom order badge in list
- Show custom selections in order detail
- WhatsApp CTA for custom items

**Files to Modify (after approval):**

- `src/features/orders/containers/orders-list-container.tsx`
- `src/features/orders/components/orders-list.tsx`
- `src/features/orders/containers/order-detail-container.tsx`
- `src/features/orders/components/order-detail.tsx`

---

#### Task 15.6: Entry Points

**Status:** 🔲 Wireframe Pending
**Wireframe:** [task-15-6-custom-mug-entrypoints.html](wireframes/task-15-6-custom-mug-entrypoints.html)

**Scope:**

- Add hero CTA to `/custom-mug`
- Add account dropdown link

**Files to Modify (after approval):**

- `src/app/(main)/(with-footer)/page.tsx`
- `src/features/layout/components/account-dropdown.tsx`

---

## Progress Tracking

| Phase  | Name                     | Tasks  | Customer Impact | Integration                                           |
| ------ | ------------------------ | ------ | --------------- | ----------------------------------------------------- |
| 4      | Foundation               | 9      | PREREQUISITE    | No - Must complete first                              |
| 5      | Product Experience       | 9      | HIGH            | Yes                                                   |
| 6      | Cart & Checkout          | 4      | CRITICAL        | Yes                                                   |
| 7      | Events                   | 5      | HIGH            | Yes                                                   |
| 8      | User Account             | 4      | MEDIUM          | Yes                                                   |
| 9      | Navigation & Layout      | 7      | HIGH            | Yes                                                   |
| 10     | Content Pages            | 7      | LOW             | Yes                                                   |
| 11     | Polish & Animations      | 5      | -               | No - Run last                                         |
| 12     | Auth Pages               | 1      | LOW             | Yes (independent)                                     |
| 13     | Skeletons                | 1      | -               | No - Run after designs                                |
| **14** | **React 19 Performance** | **11** | **HIGH**        | **Integrate during Phases 4-13 OR refactor existing** |
| 15     | Custom Mug Experience    | 6      | HIGH            | Yes                                                   |

**Total:** 69 tasks (Phase 14 tasks are integrated, not separate)

### Execution Order

```
Phase 4 (Foundation) ──────────────────────────────────────────────────────►
                      │
                      ▼
         ┌────────────┼────────────┬────────────┬────────────┬────────────┐
         │            │            │            │            │            │
    Phase 5      Phase 6      Phase 7      Phase 8      Phase 9      Phase 10
    Products     Cart         Events       Account      Navigation   Content
         │            │            │            │            │            │
         │◄──────────────────── Phase 14 (React 19) ────────────────────►│
         │  (Apply during implementation of each task OR refactor later) │
         │            │            │            │            │            │
         └────────────┴────────────┴────────────┴────────────┴────────────┘
                                          │
                                          ▼
                                     Phase 11
                                     (Polish)
                                          │
                                          ▼
                                     Phase 13
                                    (Skeletons)

Phase 12 (Auth) ───────────────────────────────────────────────────────────►
(Can run anytime independently)
```

**Phase 14 Integration Guide:**

- When implementing Task 5.1 → also apply Tasks 14.1, 14.2, 14.6 (ViewTransition, useTransition, Suspense)
- When implementing Task 6.1 → also apply Tasks 14.3, 14.4 (useOptimistic for cart/wishlist)
- When implementing Task 9.4 → also apply Task 14.7 (Activity for dialogs)
- See `prompt-implement.md` for mandatory React 19 checklist

---

## Verification Checklist

After each task implementation:

1. **TypeScript:** `bun run tsc` - no errors
2. **Formatting:** `bun run prettier:format`
3. **Visual Check:** Use `agent-browser` to verify:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)
4. **Consistency:** Page header pattern matches across all pages
5. **Theme:** Forest colors preserved
6. **Accessibility:** Proper contrast, touch targets (44px min)
