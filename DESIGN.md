# Design System: Poetry & Pottery

**Project:** Handcrafted Pottery E-commerce with Workshop Events

---

## 1. Visual Theme & Atmosphere

**Mood:** Warm, grounded, artisanal — like stepping into a sunlit pottery studio where earthy tones meet refined craftsmanship.

**Aesthetic Philosophy:** A flat, border-free design that breathes through generous whitespace and whisper-soft shadows tinted with the palette's own green hue. The interface feels tactile and organic — as though each card and surface were carved from natural stone, with gently rounded edges reminiscent of hand-smoothed clay.

**Density:** Open and breathable at the section level (large vertical margins between content blocks), yet tightly composed within individual components (compact gaps between related elements). This creates a rhythm of expansiveness punctuated by intimacy — mirroring the contrast between a wide studio space and the close focus of a potter's hands.

**Dark Mode:** Fully supported with a `.dark` class selector. In dark mode, the palette inverts to deep stone grays and softened green tones, maintaining warmth without harshness.

---

## 2. Color Palette & Roles

### Primary Colors

| Name                                 | Hex       | Role                                                  |
| ------------------------------------ | --------- | ----------------------------------------------------- |
| **Mossy Sage** (Primary)             | `#4F6F52` | Primary actions, CTAs, links, active states, in-stock |
| **Deep Forest** (Primary Hover)      | `#3D5640` | Hover state for primary interactive elements          |
| **Shadowed Canopy** (Primary Active) | `#2E4230` | Pressed/active state for buttons                      |
| **Morning Dew** (Primary Light)      | `#E8ECE8` | Subtle green tinted backgrounds, badges, tags         |
| **Frost on Fern** (Primary Lighter)  | `#F4F6F4` | Very subtle background washes                         |

### Accent Colors

| Name                              | Hex       | Role                                                     |
| --------------------------------- | --------- | -------------------------------------------------------- |
| **Kiln-Fired Terracotta**         | `#C4785A` | Warm accent — low stock warnings, secondary emphasis     |
| **Smoked Terracotta** (Hover)     | `#B06847` | Hover state for terracotta elements                      |
| **Blush Clay** (Terracotta Light) | `#F5EBE6` | Warm background tint for terracotta contexts             |
| **River Clay**                    | `#8B7355` | Earthy brown — avatar backgrounds, subtle earthy accents |

### Neutral Scale

| Name                              | Hex       | Role                                               |
| --------------------------------- | --------- | -------------------------------------------------- |
| **Warm Stone White** (Background) | `#FAFAF9` | Page background — warm, never cold-white           |
| **Kiln Ash** (Neutral-100)        | `#F5F5F4` | Alternate card backgrounds, input backgrounds      |
| **Dried Slip** (Neutral-200)      | `#E7E5E4` | Borders, dividers, separator lines                 |
| **Weathered Stone** (Neutral-500) | `#737373` | Secondary text, muted labels, timestamps           |
| **Charcoal Glaze** (Foreground)   | `#1A1A1A` | Primary body text, headings, high-contrast content |

### Status Colors

| Name                                | Hex       | Role                                         |
| ----------------------------------- | --------- | -------------------------------------------- |
| **Mossy Sage** (Success/In Stock)   | `#4F6F52` | Availability, success states                 |
| **Kiln-Fired Terracotta** (Warning) | `#C4785A` | Low stock, attention-needed states           |
| **Fired Red** (Error/Destructive)   | `#EF4444` | Errors, form validation, destructive actions |
| **Clear Sky** (Info)                | `#3B82F6` | Informational badges, status indicators      |

### Chart & Data Visualization

| Name                      | Hex       | Role             |
| ------------------------- | --------- | ---------------- |
| **Mossy Sage**            | `#4F6F52` | Chart primary    |
| **Lichen Green**          | `#7A9A7E` | Chart secondary  |
| **Kiln-Fired Terracotta** | `#C4785A` | Chart accent     |
| **Honeyed Gold**          | `#D4A574` | Chart highlight  |
| **River Clay**            | `#8B7355` | Chart earth tone |

---

## 3. Typography Rules

**Display Font:** Plus Jakarta Sans — A geometric sans-serif with warmth and personality. Used for headlines, section titles, and hero text. Weights range from Light (300) to ExtraBold (800), with SemiBold (600) and Bold (700) most common for headings.

**Body Font:** Outfit — A clean, highly legible sans-serif optimized for long-form reading. Used for body text, descriptions, labels, and interface copy. Weights from Light (300) through Bold (700), with Regular (400) and Medium (500) as workhorses.

**Hierarchy:**

- **Hero Titles:** Display font, Bold (700), 4xl mobile / 7xl desktop, tight tracking (`tracking-tight`), white on dark overlays
- **Section Headings:** Display font, Bold (700), 2xl mobile / 4xl desktop, tight tracking, Charcoal Glaze
- **Card Titles:** Display font, SemiBold (600), sm mobile / base desktop, tight leading, 2-line clamp
- **Body Text:** Body font, Regular (400), sm-base, relaxed leading, Weathered Stone for secondary
- **Metadata/Labels:** Body font, Medium (500), xs, Weathered Stone, sometimes uppercase with wide tracking
- **Badges:** Body font, Bold (700), 10-11px, uppercase tracking-widest on glassmorphic surfaces

**Letter-Spacing Character:** Tight on large headings (pulling words together for impact), natural on body text, and deliberately widened on badges and labels (creating a sense of refined craft).

---

## 4. Component Stylings

### Buttons

- **Primary CTA:** Generously rounded corners (`rounded-lg`, 8px). Filled with Mossy Sage, casting a soft green-tinted glow shadow (`shadow-lg shadow-primary/20`). On hover, deepens to Deep Forest. On press, a subtle scale-down to 97% creates a satisfying tactile response.
- **Secondary CTA:** Same rounded shape but outlined or filled with white. Often used on dark backgrounds with transparent borders that brighten on hover.
- **Icon Buttons:** Perfectly circular (`rounded-full`) in sizes 32px, 40px, and 44px. Background shifts from Kiln Ash to contextual colors on hover (e.g., red tint for wishlist).
- **XL Actions:** Taller (56px) with generous horizontal padding (32px). Used for page-level CTAs like "Explore Collection."
- **Focus State:** A 2px ring in Mossy Sage at 30% opacity with a 2px offset — visible but never harsh.

### Cards & Containers

- **Product Cards:** Generously rounded corners (16px, `rounded-2xl`). No borders. Resting state shows a whisper-soft shadow tinted green (`shadow-soft`: 2px 8px at 8% primary). On hover, the shadow deepens and spreads (`shadow-card`: 4px 12px at 10% primary) while the card lifts slightly (`translateY(-4px)`). White background on a warm stone page.
- **Testimonial Cards:** Same 16px rounding. Fixed 300px width for carousel consistency. Ultra-subtle neutral shadow (`0 2px 12px rgba(0,0,0,0.04)`).
- **Section Containers:** Extra-generously rounded (32-40px, `rounded-[2rem]` to `rounded-[2.5rem]`). Used for hero images, CTA blocks, and full-bleed sections. Often carry heavier shadows (`shadow-2xl`).
- **Dialogs & Sheets:** 16px rounded corners with backdrop blur. Sheets slide from bottom on mobile with a drag handle, from right on desktop.

### Inputs & Forms

- **Text Inputs:** Rounded corners (8px, `rounded-lg`), 40px height. Light border that brightens on hover, transforming to a Mossy Sage ring on focus. Error state shows a red ring with subtle red background tint (`aria-invalid` pattern).
- **Select Dropdowns:** Pill-shaped (`rounded-full`) trigger buttons with the body font. Content panels use standard 8px rounding.
- **Checkboxes & Switches:** Rounded with Mossy Sage checked state. Smooth 200ms transitions.
- **Validation:** Zod schemas with React Hook Form. Error messages appear below inputs in Fired Red.

### Badges & Pills

- **Shape:** Always pill-shaped (`rounded-full`) — no sharp badges anywhere in the system.
- **Primary Badge:** Morning Dew background with Mossy Sage text — subtle and earthy.
- **Secondary Badge:** Unglazed Porcelain background with River Clay text — warm and understated.
- **Status Badges:** Contextual fills (emerald for confirmed, amber for pending, neutral for cancelled) at 90% opacity.

---

## 5. Layout Principles

### Whitespace Strategy

**"Breathe wide, group tight"** — The fundamental spatial rhythm.

- **Section Breaks:** Generous vertical margins (`py-8` mobile, `py-16` desktop) create open breathing room between major content blocks. Each section feels like its own room in the studio.
- **Component Internals:** Tight gaps (`gap-1.5` to `gap-4`) pull related elements into cohesive groups. A card's title, price, and rating huddle together like tools on a workbench.
- **Micro-spacing:** Metadata items (star ratings, dot separators, dates) use minimal gaps (`gap-0.5` to `gap-1.5`), creating dense information clusters that read as single units.

### Grid & Alignment

- **Container:** Centered with `container mx-auto`, horizontal padding `px-4` mobile / `px-8` desktop.
- **Product Grids:** 2 columns mobile (47% basis), 3 columns tablet (34%), 4 columns desktop (24%) — via Embla carousel with drag-free scrolling.
- **Category Strips:** Horizontally scrollable with hidden scrollbar on mobile, flexible grid on desktop.
- **CTA Sections:** Full-bleed within container, center-aligned text for solid variant, left-aligned for image variant.

### Responsive Breakpoints

| Viewport | Width  | Default Prefix |
| -------- | ------ | -------------- |
| Mobile   | 375px  | (default)      |
| Tablet   | 768px  | `md:`          |
| Desktop  | 1024px | `lg:`          |
| Wide     | 1280px | `xl:`          |

**Safe Area Support:** Bottom padding utilities (`.pb-safe`, `.mb-safe`) for notched mobile devices.

---

## 6. Depth & Elevation System

The UI uses a layered shadow system where **all shadows carry a green tint** from the primary palette, creating a cohesive warmth even in the depth cues:

| Level              | Shadow Definition                    | Usage                         |
| ------------------ | ------------------------------------ | ----------------------------- |
| **Flat / Resting** | `0 2px 8px rgba(79, 111, 82, 0.08)`  | Cards at rest, inputs         |
| **Hover / Raised** | `0 4px 12px rgba(79, 111, 82, 0.1)`  | Cards on hover, active states |
| **Floating**       | `0 8px 24px rgba(79, 111, 82, 0.15)` | Dropdowns, tooltips, popovers |
| **Navigation**     | `0 -2px 10px rgba(0, 0, 0, 0.05)`    | Bottom mobile nav bar         |
| **Header**         | `0 2px 10px rgba(0, 0, 0, 0.05)`     | Top sticky header             |

**CTA Glow Shadows:** Primary buttons emit a colored glow (`shadow-primary-sm/md/lg`) that intensifies with button importance — a soft green halo for standard actions, a warm terracotta glow for urgent/accent actions.

**Glassmorphism:** Used sparingly on navigation (`bg-white/70 backdrop-blur-xl`) and hero badges (`bg-white/15 backdrop-blur-md`), creating a frosted-glass effect that feels modern without overwhelming the earthy aesthetic.

---

## 7. Motion & Animation

**Duration Tokens:**

- Fast: 150ms — micro-interactions (button press, toggle)
- Default: 200ms — standard transitions (fade, slide, hover)
- Slow: 300ms — deliberate movements (sheet open, accordion expand)

**Entry Animations (Framer Motion):**

- Fade up: `opacity: 0, y: 20` → `opacity: 1, y: 0` — used for cards, sections
- Scale in: `scale: 0.95` → `scale: 1` — used for modals, toasts
- Stagger children: 50-100ms delay between siblings — used for grids, lists

**Interactive Feedback:**

- Button press: `scale(0.97)` with 150ms ease
- Card hover: `translateY(-4px)` with shadow deepening over 300ms
- Image hover: `scale(1.05)` over 700ms ease-in-out
- Heart toggle: `scale(0.9)` snap with color fill transition

**Continuous Animations:**

- Testimonial marquee: 30s infinite linear scroll with duplicated items
- Loading spinner: 2px border with primary-colored top segment, continuous rotation
- Skeleton pulse: Gentle opacity oscillation on neutral-200 rectangles

**Accessibility:** All animations respect `prefers-reduced-motion: reduce`, collapsing to instant state changes.

---

## 8. Iconography

**Library:** Lucide React — clean, consistent 24px stroke icons at 1.5-2px weight.

**Usage Patterns:**

- **Navigation:** Home, Store, Calendar, ShoppingBag — functional, no labels on mobile
- **Actions:** Heart (wishlist), ShoppingBag (cart), Plus/Minus (quantity), X (close/remove)
- **Indicators:** Star (ratings, amber fill), Check (success), ChevronDown (expand)
- **Directional:** ArrowRight (view more links), ChevronLeft/Right (carousel nav)

**Star Ratings:** Filled stars in warm amber (`fill-amber-400 text-amber-400`), unfilled in light sage (`#D4E5D6`). Compact sizing at 14px for cards, 16px for detail views.
