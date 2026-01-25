# UI Design Refactoring Plan - Poetry & Pottery

## Design Philosophy

This document outlines a **wireframe-first** design refactoring approach. Every component/page design goes through a strict approval workflow before any code is written.

### Workflow Phases

| Phase | Description | Prompt File |
|-------|-------------|-------------|
| 1. **Wireframe** | Create 3-4 design options (A, B, C, D) for each viewport | `prompt-wireframe.md` |
| 2. **Approval** | User selects preferred option per device (mobile, tablet, desktop) | `prompt-wireframe.md` |
| 3. **Implementation** | Build ONLY the approved design, verify with agent-browser | `prompt-implement.md` |

### URLs (Already Running)

| Resource | URL |
|----------|-----|
| Wireframes | `http://127.0.0.1:5500/poetry-and-pottery/wireframes/` |
| Website | `http://127.0.0.1:3005/` |

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

| Status | Meaning |
|--------|---------|
| `🔲 Wireframe Pending` | Task not started - needs wireframes created |
| `⏳ Awaiting Approval` | Wireframes created, waiting for user to select options |
| `✅ Approved` | User approved designs, ready for implementation |
| `🚧 In Progress` | Implementation in progress |
| `✔️ Completed` | Implementation done and verified |

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

| Token              | Hex       | Usage                              |
| ------------------ | --------- | ---------------------------------- |
| `primary`          | `#4F6F52` | CTAs, links, active states         |
| `primary-hover`    | `#3D5640` | Hover states                       |
| `primary-active`   | `#2E4230` | Pressed states                     |
| `primary-light`    | `#E8ECE8` | Light backgrounds, badges          |
| `primary-lighter`  | `#F4F6F4` | Subtle background fills            |

### Accent Colors

| Token              | Hex       | Usage                              |
| ------------------ | --------- | ---------------------------------- |
| `terracotta`       | `#C4785A` | Warm accents, low stock indicator  |
| `terracotta-light` | `#F5EBE6` | Warm background tint               |
| `clay`             | `#8B7355` | Earthy brown, pottery imagery      |
| `cream`            | `#F5F0E8` | Warm neutral backgrounds           |

### Neutrals

| Token         | Hex       | Usage                              |
| ------------- | --------- | ---------------------------------- |
| `neutral-50`  | `#FAFAF9` | Page background                    |
| `neutral-100` | `#F5F5F4` | Card backgrounds                   |
| `neutral-200` | `#E7E5E4` | Borders, dividers                  |
| `neutral-500` | `#737373` | Muted text                         |
| `neutral-900` | `#1A1A1A` | Primary text                       |

### Typography

| Font                | Usage                              |
| ------------------- | ---------------------------------- |
| Plus Jakarta Sans   | Display font (`font-display`)      |
| Outfit              | Body font (`font-sans`)            |

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

**Scroll Animations (Desktop only):**
- Staggered reveals: `staggerChildren: 0.05-0.1`
- Fade in from bottom: `opacity: 0 → 1`, `y: 20 → 0`
- Trigger: When element enters viewport (IntersectionObserver)

**Performance Rules:**
1. **Use CSS transforms only** - Never animate `width`, `height`, `top`, `left`
2. **Prefer `transform` and `opacity`** - GPU-accelerated, no layout thrashing
3. **Use `will-change` sparingly** - Only on elements that will animate
4. **Respect reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
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
.animate-fade-in { animation: fadeIn 200ms ease-out; }
.animate-slide-up { animation: slideUp 200ms ease-out; }
.animate-scale-in { animation: scaleIn 150ms ease-out; }
.animate-press { transform: scale(0.97); }

/* Hover lift effect for cards */
.hover-lift {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
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
const slideUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
```

---

## Wireframe Workflow

### Device Breakpoints

| Device  | Width   | Height  | Viewport Class |
| ------- | ------- | ------- | -------------- |
| Mobile  | 375px   | 812px   | Default        |
| Tablet  | 768px   | 1024px  | `md:`          |
| Desktop | 1440px  | 900px   | `lg:` / `xl:`  |

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

| File | Purpose | When to Use |
|------|---------|-------------|
| `prompt-wireframe.md` | Create wireframe options & get approval | Tasks with `🔲 Wireframe Pending` status |
| `prompt-implement.md` | Implement approved designs & verify via agent-browser | Tasks with `✅ Approved` status |

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
> - **Phase 4** (Foundation) MUST complete first - all other phases depend on these components
> - **Phases 5-10** can run in parallel - each owns its files with no cross-dependencies
> - **Phase 11** (Polish) should run last - it touches files across multiple phases
> - **Phases 12-13** can run anytime independently

---

### Phase 4: Foundation Components (PREREQUISITE)

> ⚠️ **BLOCKING:** Complete this phase before starting Phases 5-10. These components are dependencies for all feature phases.

#### Task 4.1: Button Styles

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Star rating display and input
- Size variants

**Design Specifications:**
- Display: Filled amber, empty muted gray
- Interactive: Hover preview, cursor pointer
- Sizes: sm (12px), md (16px), lg (20px)
- Count: "(X reviews)" muted text

**Files to Modify (after approval):**
- `src/components/shared/rating.tsx`

---

#### Task 4.5: Quantity Selector

**Status:** 🔲 Wireframe Pending

**Scope:**
- Compact +/- quantity controls
- Disabled states

**Design Specifications:**
- Buttons: `rounded-lg`, `bg-neutral-100`
- Number: Centered, `font-medium`
- Disabled: Minus at qty=1, plus at max
- Mobile: Larger touch targets (36px min)

**Files to Modify (after approval):**
- `src/components/shared/quantity-selector.tsx`

---

#### Task 4.6: Empty States

**Status:** 🔲 Wireframe Pending

**Scope:**
- Consistent empty state design
- Icon, heading, description, CTA

**Design Specifications:**
- Icon: Large, muted illustration
- Heading: `font-display font-semibold`, centered
- Description: Muted, centered, `max-w-sm`
- CTA: Primary or outline button, centered

**Files to Modify (after approval):**
- `src/components/sections/empty-state.tsx`

---

#### Task 4.7: Dialog & Sheet

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Clean accordion without heavy borders
- Smooth expand/collapse

**Design Specifications:**
- No borders between items
- Header: `font-medium`, hover bg subtle
- Chevron: Rotate animation
- Content: Proper padding, muted text

**Files to Modify (after approval):**
- `src/components/ui/accordion.tsx`

---

#### Task 4.9: Tabs

**Status:** 🔲 Wireframe Pending

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

> 🛒 **Customer Impact: HIGH** - Primary revenue driver
> **Files owned by this phase:** `src/features/product-detail/`, `src/components/products/`, `src/components/shared/review-*.tsx`

#### Task 5.1: Product Detail Layout

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Convert accordions to tabs
- Description, Materials & Care, Reviews tabs

**Design Specifications:**
- Tabs: Underlined active indicator (primary color)
- Mobile: Horizontally scrollable tab list
- Content: Smooth fade transition

**Files to Modify (after approval):**
- `src/features/product-detail/components/product-tabs.tsx` (new)

---

#### Task 5.5: Related Products Grid

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Clean review submission form
- Interactive star rating selector

**Design Specifications:**
- Title: "Write a Review" in `font-display`
- Star selector: Large, interactive, hover preview
- Textarea: `rounded-lg`, focus ring
- Submit: Primary button, full-width mobile

**Files to Modify (after approval):**
- `src/components/shared/review-form.tsx`

---

#### Task 5.9: Reviews Sheet

**Status:** 🔲 Wireframe Pending

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

### Phase 6: Cart & Checkout

> 💰 **Customer Impact: CRITICAL** - Conversion funnel
> **Files owned by this phase:** `src/features/cart/`, `src/components/cards/cart-*.tsx`, `src/components/orders/order-summary.tsx`, `src/components/address/`

#### Task 6.1: Cart Page

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

> 🎨 **Customer Impact: HIGH** - Secondary revenue stream (workshops)
> **Files owned by this phase:** `src/features/events/`, `src/components/events/`, `src/components/cards/event-*.tsx`, `src/components/cards/registered-*.tsx`

#### Task 7.1: Events Listing Pages (Unified Layout)

**Status:** 🔲 Wireframe Pending

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

*Page Header (same for all):*
- Title: `font-display text-3xl font-bold`
- Breadcrumbs: Home > Events > [Current Page]
- Consistent vertical spacing below header

*Tabs Navigation (same for all):*
- `font-display font-medium`
- Underline active indicator (primary color, 2px)
- Mobile: Horizontal scrollable, full-width
- Tablet/Desktop: Centered, contained width

*Grid Layout (same for all):*
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

**Status:** 🔲 Wireframe Pending

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

*Hero Section (same structure):*
- Mobile: Full-width image/carousel
- Desktop: Large hero image (16:9 or 3:2)
- Upcoming: Single featured image
- Past: Gallery with thumbnail strip

*Content Layout (same for both):*
- Mobile: Full-width, stacked sections
- Desktop: 60/40 split (content left, sidebar right)
- Consistent section spacing (`space-y-8`)

*Sidebar (same structure, different CTAs):*
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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Cards for user's event registrations
- Upcoming and completed variants

**Design Specifications:**

*Registration Card (Upcoming):*
- Event thumbnail, title, date
- Status badge (Pending/Approved/Confirmed)
- Action buttons (View, Cancel)

*Completed Card (Past registrations):*
- Event thumbnail, title, completed date
- "Write a Review" CTA if not reviewed
- "View Review" if already reviewed

**Files to Modify (after approval):**
- `src/components/cards/registered-event-card.tsx`
- `src/components/cards/completed-event-card.tsx`

---

#### Task 7.5: Event Ticket

**Status:** 🔲 Wireframe Pending

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

> 👤 **Customer Impact: MEDIUM** - Retention & repeat purchases
> **Files owned by this phase:** `src/features/orders/`, `src/features/wishlist/`, `src/components/orders/order-progress.tsx`, `src/app/(main)/profile/`

#### Task 8.1: Orders Page

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

> 🧭 **Customer Impact: HIGH** - Site-wide experience
> **Files owned by this phase:** `src/features/layout/`, `src/features/global-search/`

#### Task 9.1: Desktop Navbar

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Fixed top mobile header
- Minimal, clean design

**Design Specifications:**
- Height: `h-14` (56px)
- Left: Hamburger menu or back arrow
- Center: Logo (compact)
- Right: Search + cart icons
- Background: White, subtle bottom shadow

**Files to Modify (after approval):**
- `src/features/layout/components/mobile-header.tsx`

---

#### Task 9.3: Mobile Bottom Navigation

**Status:** 🔲 Wireframe Pending

**Scope:**
- Fixed bottom navigation bar
- 4 icon items with active state

**Design Specifications:**
- Height: `h-16` (64px) + safe area
- Items: Home, Shop, Events, Cart
- Icons only, no text labels
- Active: Primary color
- Cart: Count badge

**Files to Modify (after approval):**
- `src/features/layout/components/mobile-nav.tsx`

---

#### Task 9.4: Account Dropdown

**Status:** 🔲 Wireframe Pending

**Scope:**
- User account menu dropdown
- Clean card with menu items

**Design Specifications:**
- Trigger: Avatar circle
- Dropdown: White card, `rounded-xl`, shadow-lg
- Items: Icon + label, hover `bg-neutral-50`
- Links: Orders, Wishlist, Registrations, Addresses
- Divider before Sign Out

**Files to Modify (after approval):**
- `src/features/layout/components/account-dropdown.tsx`

---

#### Task 9.5: Global Search

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Footer redesign with 4 columns
- Newsletter integration

**Design Specifications:**
- Layout: 4-column (Brand, Shop, Support, Social/Newsletter)
- Brand: Logo + description + social icons
- Links: Heading in `font-display`, muted links
- Newsletter: Integrated section
- Bottom: Copyright, payment icons, legal links
- Mobile: Stacked sections, accordion optional

**Files to Modify (after approval):**
- `src/features/layout/components/footer.tsx`

---

#### Task 9.7: WhatsApp Button

**Status:** 🔲 Wireframe Pending

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

> 📄 **Customer Impact: LOW** - Support & information
> **Files owned by this phase:** `src/app/(main)/(with-footer)/about/`, `src/app/(main)/(with-footer)/contact/`, `src/app/(main)/(with-footer)/faq/`, etc.

#### Task 10.1: About Page

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

#### Task 10.3: Info Pages (FAQ, Shipping, Privacy, Terms, Care)

**Status:** 🔲 Wireframe Pending

**Scope:**
- Consistent header across all info pages
- Clean content layouts

**Design Specifications:**
- Page headers: Consistent title + breadcrumbs for all
- Content: `max-w-3xl` for readability
- FAQ: Accordion with smooth animations
- Heading hierarchy: h2 in `font-display`

**Pages:**
- `/faq` - FAQ with grouped accordion
- `/shipping` - Shipping info
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/care` - Pottery care guide

**Files to Modify (after approval):**
- `src/app/(main)/(with-footer)/faq/page.tsx`
- `src/app/(main)/(with-footer)/shipping/page.tsx`
- `src/app/(main)/(with-footer)/privacy/page.tsx`
- `src/app/(main)/(with-footer)/terms/page.tsx`
- `src/app/(main)/(with-footer)/care/page.tsx`

---

### Phase 11: Polish & Animations

> ✨ **Run LAST** - Touches files across multiple phases
> **Dependencies:** Phases 5-10 should be mostly complete

#### Task 11.1: Section Background Variety

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Staggered reveal animations on product grids
- Scroll-triggered fade-in effects

**Design Specifications:**
- Product grids: `staggerChildren: 0.1`
- Cards: Fade in from bottom (`y: 20` → `y: 0`)
- Desktop only (reduce motion on mobile)
- Respect `prefers-reduced-motion`

**Files to Modify (after approval):**
- `src/features/product-card/components/product-card.tsx`
- `src/components/cards/event-card.tsx`

---

#### Task 11.4: Smooth Scrolling

**Status:** 🔲 Wireframe Pending

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

**Status:** 🔲 Wireframe Pending

**Scope:**
- Count-up animation for stats
- About page, homepage statistics

**Design Specifications:**
- Numbers count from 0 when scrolled into view
- Stats: "500+ Happy Customers", "1000+ Products", etc.
- Animation: Framer Motion spring or Magic UI Number Ticker
- Font: `font-display`, large numbers

**Files to Modify (after approval):**
- `src/components/shared/animated-counter.tsx` (new)

---

### Phase 12: Auth Pages

> 🔐 **Can run independently** - Uses Clerk components

#### Task 12.1: Sign In/Sign Up Pages

**Status:** 🔲 Wireframe Pending

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

> 💀 **Run after designs finalized** - Must match final component dimensions

#### Task 13.1: Skeleton Components

**Status:** 🔲 Wireframe Pending

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

| From | To | Animation |
|------|-----|-----------|
| Products grid → Product detail | Image morphs to hero | `view-transition-name: product-image-{id}` |
| Events grid → Event detail | Image morphs to hero | `view-transition-name: event-image-{id}` |
| Cart → Order confirmation | Smooth fade/slide | Default cross-fade |
| Any page → Any page | Subtle fade | `::view-transition-old/new` |

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
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
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
{isPending && <NavigationProgress />}
```

**Navigation Progress Component:**
```tsx
// Thin progress bar at top of page during navigation
function NavigationProgress() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/20">
      <div className="h-full bg-primary animate-progress" />
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
  (state, action) => applyCartAction(state, action)
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
  setLoadingProducts(prev => {
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

export function RouteAnimationProvider({ children }: { children: React.ReactNode }) {
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

## Progress Tracking

| Phase | Name | Tasks | Customer Impact | Integration |
| ----- | ---- | ----- | --------------- | ----------- |
| 4 | Foundation | 9 | PREREQUISITE | No - Must complete first |
| 5 | Product Experience | 9 | HIGH | Yes |
| 6 | Cart & Checkout | 4 | CRITICAL | Yes |
| 7 | Events | 5 | HIGH | Yes |
| 8 | User Account | 4 | MEDIUM | Yes |
| 9 | Navigation & Layout | 7 | HIGH | Yes |
| 10 | Content Pages | 3 | LOW | Yes |
| 11 | Polish & Animations | 5 | - | No - Run last |
| 12 | Auth Pages | 1 | LOW | Yes (independent) |
| 13 | Skeletons | 1 | - | No - Run after designs |
| **14** | **React 19 Performance** | **11** | **HIGH** | **Integrate during Phases 4-13 OR refactor existing** |

**Total:** 59 tasks (Phase 14 tasks are integrated, not separate)

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

