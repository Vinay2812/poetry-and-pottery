# Design System Rules

This document outlines the design system rules and guidelines for the Poetry & Pottery pottery e-commerce website. All components and pages must adhere to these standards for consistency across desktop and mobile views.

---

## 1. Color System

### Primary Colors

- **Primary**: `#4F6F52` (Earthy Sage/Moss Green)
- **Primary Hover**: `#3D5640`
- **Primary Light**: `#E8ECE8` (Subtle Green - for backgrounds)

### Background Colors

- **Background Light**: `#FAFAF9` (Warm stone white)
- **Background Dark**: `#141614` (Warm dark)
- **Surface Light**: `#FFFFFF`
- **Surface Dark**: `#1E201E`

### Text Colors

- **Foreground**: `#1a1a1a` (Main text)
- **Muted Foreground**: `#737373` (Secondary text)
- **White**: `#FFFFFF` (On dark backgrounds)

### Status Colors

- **In Stock**: `#4F6F52`
- **Low Stock**: `#C4785A` (Terracotta)
- **Destructive**: `#ef4444`

### Usage Rules

- Use primary color for CTAs, active states, and brand elements
- Use muted foreground for secondary text and labels
- Maintain sufficient contrast ratios (WCAG AA minimum)

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

### Container Padding

#### Mobile

- **Page Padding**: `px-4` or `px-6`
- **Section Padding**: `py-6` or `py-8`
- **Card Padding**: `p-4` or `p-5`

#### Desktop

- **Page Padding**: `px-8` or `px-12`
- **Section Padding**: `py-12` or `py-16`
- **Card Padding**: `p-6` or `p-8`

### Gaps

- **Small Gap**: `gap-2` (8px) - Icon + text
- **Medium Gap**: `gap-4` (16px) - Card elements
- **Large Gap**: `gap-6` (24px) - Section spacing
- **Extra Large Gap**: `gap-8` (32px) - Major sections

### Safe Areas (Mobile)

- **Bottom Safe Area**: `pb-safe` or `pb-safe-area` - For fixed bottom nav
- **Top Safe Area**: `pt-safe` or `pt-safe-top` - For fixed headers

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

## 5. Shadows

### Shadow Tokens

- **Soft**: `shadow-soft` - `0 2px 8px rgba(79, 111, 82, 0.08)` - Cards, subtle elevation
- **Card**: `shadow-card` - `0 4px 12px rgba(79, 111, 82, 0.1)` - Elevated cards
- **Float**: `shadow-float` - `0 8px 24px rgba(79, 111, 82, 0.15)` - Modals, overlays
- **Nav**: `shadow-nav` - `0 -2px 10px rgba(0, 0, 0, 0.05)` - Bottom navigation

### Usage

- **Product Cards**: `shadow-md` on hover
- **Buttons**: `shadow-lg shadow-primary/20` for primary buttons
- **Fixed Elements**: Use appropriate shadow based on elevation

---

## 6. Mobile Navigation Patterns

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

## 7. Desktop Navigation Patterns

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

## 8. Component Guidelines

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

## 9. Icon Usage

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

## 10. Responsive Breakpoints

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

## 11. Badge & Notification Patterns

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

## 12. Event Cards

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

## 13. Form Elements

### Input Fields

- **Height**: `h-9` (mobile) or `h-10` (desktop)
- **Border Radius**: `rounded-full` (search) or `rounded-lg` (forms)
- **Background**: `bg-muted` (search) or `bg-white` (forms)
- **Border**: `border-0` (search) or `border border-input` (forms)

### Select Dropdowns

- **Height**: `h-9` (mobile) or `h-10` (desktop)
- **Border Radius**: `rounded-full` (mobile) or `rounded-lg` (desktop)

---

## 14. Animation & Transitions

### Standard Transitions

- **Color**: `transition-colors`
- **Transform**: `transition-transform duration-300`
- **All**: `transition-all duration-300`

### Hover Effects

- **Scale**: `hover:scale-105` (images, cards)
- **Shadow**: Increase shadow on hover
- **Opacity**: `opacity-0 group-hover:opacity-100` (desktop-only elements)

### Active States

- **Buttons**: `active:scale-95` for tactile feedback
- **Links**: Color change on hover/active

---

## 15. Accessibility Guidelines

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

## 16. Performance Considerations

### Image Optimization

- Use Next.js Image component with proper sizing
- Lazy load images below the fold
- Use appropriate image formats (WebP when possible)

### Loading States

- Show skeleton loaders for async content
- Provide loading feedback for user actions

---

## 17. Dark Mode Support

### Color Tokens

- All colors must have dark mode variants
- Use CSS variables for theme switching
- Test both light and dark modes

### Implementation

- Use `dark:` prefix for dark mode styles
- Maintain contrast ratios in both modes
- Test readability in both themes

---

## 18. Page Layout Patterns

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
- [ ] Accessibility attributes are included
- [ ] Dark mode styles are implemented
- [ ] Mobile and desktop patterns are followed

---

## Version History

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
