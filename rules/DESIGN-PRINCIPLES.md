# AI Design System Reference

A structured design system for AI to make consistent styling decisions. Use these guidelines to generate CSS properties with appropriate values based on context and intent.

---

## Table of Contents

1. [Spacing System](#spacing-system)
2. [Border Radius](#border-radius)
3. [Colors](#colors)
4. [Typography](#typography)
5. [Shadows & Elevation](#shadows--elevation)
6. [Borders](#borders)
7. [Animations & Transitions](#animations--transitions)
8. [Layout & Grid](#layout--grid)
9. [Responsive Breakpoints](#responsive-breakpoints)
10. [Z-Index Scale](#z-index-scale)
11. [Opacity](#opacity)
12. [Component-Specific Guidelines](#component-specific-guidelines)

13. [Decision Trees](#decision-trees)

---

## Spacing System

Use a consistent 4px or 8px base unit system. All spacing values should be multiples of the base unit.

### Spacing Scale (4px base)

| Token      | Value | Use Case                                         |
| ---------- | ----- | ------------------------------------------------ |
| `space-0`  | 0px   | No spacing                                       |
| `space-1`  | 4px   | Tight spacing, icon gaps, inline elements        |
| `space-2`  | 8px   | Default small spacing, button padding (vertical) |
| `space-3`  | 12px  | Medium-small spacing, form field padding         |
| `space-4`  | 16px  | Default spacing, card padding, section gaps      |
| `space-5`  | 20px  | Medium spacing                                   |
| `space-6`  | 24px  | Large spacing, modal padding                     |
| `space-7`  | 32px  | Section spacing                                  |
| `space-8`  | 40px  | Large section spacing                            |
| `space-9`  | 48px  | Extra large spacing                              |
| `space-10` | 64px  | Page section spacing                             |
| `space-11` | 80px  | Major section breaks                             |
| `space-12` | 96px  | Hero sections, major breaks                      |
| `space-13` | 128px | Full page sections                               |

### Padding Guidelines

```css
/* Buttons */
--button-padding-sm: 6px 12px; /* Small buttons */
--button-padding-md: 8px 16px; /* Medium buttons (default) */
--button-padding-lg: 12px 24px; /* Large buttons */
--button-padding-xl: 16px 32px; /* Extra large buttons */

/* Cards */
--card-padding-sm: 12px; /* Compact cards */
--card-padding-md: 16px; /* Default cards */
--card-padding-lg: 24px; /* Spacious cards */
--card-padding-xl: 32px; /* Large feature cards */

/* Inputs */
--input-padding-sm: 6px 10px; /* Small inputs */
--input-padding-md: 10px 14px; /* Medium inputs (default) */
--input-padding-lg: 14px 18px; /* Large inputs */

/* Modals */
--modal-padding-sm: 16px; /* Compact modals */
--modal-padding-md: 24px; /* Default modals */
--modal-padding-lg: 32px; /* Large modals */

/* Containers */
--container-padding-mobile: 16px; /* Mobile side padding */
--container-padding-tablet: 24px; /* Tablet side padding */
--container-padding-desktop: 32px; /* Desktop side padding */
```

### Margin Guidelines

```css
/* Text Elements */
--heading-margin-bottom: 0.5em; /* After headings */
--paragraph-margin-bottom: 1em; /* Between paragraphs */
--list-margin-bottom: 1em; /* After lists */
--list-item-margin-bottom: 0.5em; /* Between list items */

/* Components */
--component-margin-sm: 8px; /* Tight component spacing */
--component-margin-md: 16px; /* Default component spacing */
--component-margin-lg: 24px; /* Loose component spacing */

/* Sections */
--section-margin-sm: 32px; /* Small section breaks */
--section-margin-md: 48px; /* Medium section breaks */
--section-margin-lg: 64px; /* Large section breaks */
--section-margin-xl: 96px; /* Extra large section breaks */
```

### Gap (Flexbox/Grid)

```css
/* Inline Elements */
--gap-inline-xs: 4px; /* Icon + text */
--gap-inline-sm: 8px; /* Button groups */
--gap-inline-md: 12px; /* Navigation items */
--gap-inline-lg: 16px; /* Card grids */

/* Stack Elements */
--gap-stack-xs: 4px; /* Tight stacking */
--gap-stack-sm: 8px; /* Form fields */
--gap-stack-md: 16px; /* Card content */
--gap-stack-lg: 24px; /* Section content */

/* Grid Gaps */
--grid-gap-sm: 16px; /* Compact grids */
--grid-gap-md: 24px; /* Default grids */
--grid-gap-lg: 32px; /* Spacious grids */
```

---

## Border Radius

### Border Radius Scale

| Token         | Value  | Use Case                          |
| ------------- | ------ | --------------------------------- |
| `radius-none` | 0px    | Sharp corners, tables             |
| `radius-xs`   | 2px    | Subtle rounding, tags             |
| `radius-sm`   | 4px    | Buttons, inputs, small elements   |
| `radius-md`   | 8px    | Cards, modals, default            |
| `radius-lg`   | 12px   | Large cards, panels               |
| `radius-xl`   | 16px   | Feature cards, hero elements      |
| `radius-2xl`  | 24px   | Large containers, app-like feel   |
| `radius-3xl`  | 32px   | Very rounded containers           |
| `radius-full` | 9999px | Pills, avatars, circular elements |

### Component-Specific Radius

```css
/* Buttons */
--button-radius-sharp: 0px; /* Sharp/blocky style */
--button-radius-default: 6px; /* Standard buttons */
--button-radius-rounded: 8px; /* Friendly/modern */
--button-radius-pill: 9999px; /* Pill buttons */

/* Inputs */
--input-radius-sharp: 0px; /* Sharp inputs */
--input-radius-default: 6px; /* Standard inputs */
--input-radius-rounded: 8px; /* Modern inputs */
--input-radius-pill: 9999px; /* Search bars */

/* Cards */
--card-radius-sm: 8px; /* Compact cards */
--card-radius-md: 12px; /* Default cards */
--card-radius-lg: 16px; /* Feature cards */
--card-radius-xl: 24px; /* Hero cards */

/* Images */
--image-radius-none: 0px; /* Sharp images */
--image-radius-sm: 4px; /* Slight rounding */
--image-radius-md: 8px; /* Default image rounding */
--image-radius-lg: 16px; /* Rounded images */
--image-radius-circle: 50%; /* Circular images/avatars */

/* Modals & Dialogs */
--modal-radius: 12px; /* Standard modals */
--dialog-radius: 16px; /* Larger dialogs */
--tooltip-radius: 6px; /* Tooltips */
--dropdown-radius: 8px; /* Dropdown menus */

/* Badges & Tags */
--badge-radius: 4px; /* Status badges */
--tag-radius: 4px; /* Tags */
--chip-radius: 9999px; /* Chips/pills */
```

### Design Style Mapping

```
Brutalist/Sharp:    radius = 0px
Corporate/Classic:  radius = 2-4px
Modern/Friendly:    radius = 6-12px
Soft/Playful:       radius = 16-24px
App-like/Mobile:    radius = 12-20px
```

---

## Colors

### Neutral Colors (Gray Scale)

```css
/* Light Mode */
--gray-50: #fafafa; /* Lightest background */
--gray-100: #f5f5f5; /* Light background */
--gray-200: #e5e5e5; /* Border light */
--gray-300: #d4d4d4; /* Border default */
--gray-400: #a3a3a3; /* Placeholder text */
--gray-500: #737373; /* Secondary text */
--gray-600: #525252; /* Body text */
--gray-700: #404040; /* Primary text */
--gray-800: #262626; /* Headings */
--gray-900: #171717; /* Darkest text */
--gray-950: #0a0a0a; /* Near black */

/* Dark Mode */
--dark-bg-primary: #0a0a0a; /* Main background */
--dark-bg-secondary: #171717; /* Card background */
--dark-bg-tertiary: #262626; /* Elevated surfaces */
--dark-border: #404040; /* Borders */
--dark-text-primary: #fafafa; /* Primary text */
--dark-text-secondary: #a3a3a3; /* Secondary text */
```

### Primary Colors (Brand)

```css
/* Blue (Trust, Professional) */
--blue-50: #eff6ff;
--blue-100: #dbeafe;
--blue-200: #bfdbfe;
--blue-300: #93c5fd;
--blue-400: #60a5fa;
--blue-500: #3b82f6; /* Primary */
--blue-600: #2563eb; /* Primary hover */
--blue-700: #1d4ed8; /* Primary active */
--blue-800: #1e40af;
--blue-900: #1e3a8a;

/* Purple (Creative, Premium) */
--purple-500: #8b5cf6;
--purple-600: #7c3aed;
--purple-700: #6d28d9;

/* Indigo (Tech, Modern) */
--indigo-500: #6366f1;
--indigo-600: #4f46e5;
--indigo-700: #4338ca;

/* Teal (Fresh, Health) */
--teal-500: #14b8a6;
--teal-600: #0d9488;
--teal-700: #0f766e;
```

### Semantic Colors

```css
/* Success */
--success-light: #dcfce7; /* Background */
--success-main: #22c55e; /* Main color */
--success-dark: #16a34a; /* Hover/Active */
--success-text: #15803d; /* Text on light bg */

/* Warning */
--warning-light: #fef3c7; /* Background */
--warning-main: #f59e0b; /* Main color */
--warning-dark: #d97706; /* Hover/Active */
--warning-text: #b45309; /* Text on light bg */

/* Error/Danger */
--error-light: #fee2e2; /* Background */
--error-main: #ef4444; /* Main color */
--error-dark: #dc2626; /* Hover/Active */
--error-text: #b91c1c; /* Text on light bg */

/* Info */
--info-light: #dbeafe; /* Background */
--info-main: #3b82f6; /* Main color */
--info-dark: #2563eb; /* Hover/Active */
--info-text: #1d4ed8; /* Text on light bg */
```

### Surface Colors

```css
/* Light Mode Surfaces */
--surface-0: #ffffff; /* Base/Cards */
--surface-1: #fafafa; /* Slight elevation */
--surface-2: #f5f5f5; /* Higher elevation */
--surface-3: #eeeeee; /* Highest elevation */

/* Dark Mode Surfaces */
--surface-dark-0: #121212; /* Base background */
--surface-dark-1: #1e1e1e; /* Cards */
--surface-dark-2: #252525; /* Elevated */
--surface-dark-3: #2d2d2d; /* Highest */
```

### Color Usage Rules

```
Background (page):     gray-50 to gray-100 (light), gray-900 to gray-950 (dark)
Background (card):     white (light), gray-800 to gray-900 (dark)
Text (primary):        gray-900 (light), gray-50 (dark)
Text (secondary):      gray-600 (light), gray-400 (dark)
Text (muted):          gray-500 (light), gray-500 (dark)
Border (subtle):       gray-200 (light), gray-700 (dark)
Border (visible):      gray-300 (light), gray-600 (dark)
Interactive (default): blue-500 to blue-600
Interactive (hover):   +100 shade (e.g., blue-600 to blue-700)
Interactive (active):  +200 shade
Disabled:              gray-300 + opacity 0.5
```

### Contrast Requirements (WCAG)

```
Normal text:           4.5:1 minimum contrast ratio
Large text (18px+):    3:1 minimum contrast ratio
UI components:         3:1 minimum contrast ratio
Focus indicators:      3:1 minimum contrast ratio
```

---

## Typography

### Font Scale

| Token       | Size | Line Height | Use Case                    |
| ----------- | ---- | ----------- | --------------------------- |
| `text-xs`   | 12px | 16px (1.33) | Labels, captions, badges    |
| `text-sm`   | 14px | 20px (1.43) | Secondary text, form labels |
| `text-base` | 16px | 24px (1.5)  | Body text (default)         |
| `text-lg`   | 18px | 28px (1.56) | Lead paragraphs             |
| `text-xl`   | 20px | 28px (1.4)  | Section headings            |
| `text-2xl`  | 24px | 32px (1.33) | Card headings               |
| `text-3xl`  | 30px | 36px (1.2)  | Page headings               |
| `text-4xl`  | 36px | 40px (1.11) | Hero headings               |
| `text-5xl`  | 48px | 48px (1.0)  | Display headings            |
| `text-6xl`  | 60px | 60px (1.0)  | Large display               |
| `text-7xl`  | 72px | 72px (1.0)  | Extra large display         |

### Font Weights

```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400; /* Body text */
--font-medium: 500; /* Emphasis, buttons */
--font-semibold: 600; /* Headings, strong emphasis */
--font-bold: 700; /* Strong headings */
--font-extrabold: 800; /* Display text */
--font-black: 900; /* Maximum emphasis */
```

### Letter Spacing

```css
--tracking-tighter: -0.05em; /* Display headings */
--tracking-tight: -0.025em; /* Large headings */
--tracking-normal: 0em; /* Body text */
--tracking-wide: 0.025em; /* Buttons, labels */
--tracking-wider: 0.05em; /* Uppercase text */
--tracking-widest: 0.1em; /* Small caps, overlines */
```

### Typography Patterns

```css
/* Headings */
h1 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}
h2 {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.025em;
}
h3 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
}
h4 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}
h5 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}
h6 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

/* Body */
body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}
.lead {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
}
.small {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

/* UI Elements */
.button {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.025em;
}
.label {
  font-size: 14px;
  font-weight: 500;
}
.caption {
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-500);
}
.overline {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## Shadows & Elevation

### Shadow Scale

```css
/* Elevation Levels */
--shadow-none: none;

--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
/* Use: Subtle depth for small elements */

--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
/* Use: Buttons, inputs, small cards */

--shadow-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
/* Use: Cards, dropdowns */

--shadow-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
/* Use: Modals, popovers, elevated cards */

--shadow-xl:
  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
/* Use: Large modals, dialogs */

--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
/* Use: High emphasis modals, floating panels */

--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
/* Use: Pressed states, inset elements */
```

### Colored Shadows (Glow Effects)

```css
/* Primary glow */
--shadow-primary: 0 4px 14px 0 rgba(59, 130, 246, 0.4);

/* Success glow */
--shadow-success: 0 4px 14px 0 rgba(34, 197, 94, 0.4);

/* Error glow */
--shadow-error: 0 4px 14px 0 rgba(239, 68, 68, 0.4);

/* Generic colored shadow formula */
/* 0 4px 14px 0 rgba([color-rgb], 0.3-0.5) */
```

### Component Shadow Mapping

```css
/* Buttons */
--button-shadow-default: none;
--button-shadow-raised: var(--shadow-sm);
--button-shadow-hover: var(--shadow-md);
--button-shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.3);

/* Cards */
--card-shadow-flat: none;
--card-shadow-raised: var(--shadow-sm);
--card-shadow-elevated: var(--shadow-md);
--card-shadow-floating: var(--shadow-lg);
--card-shadow-hover: var(--shadow-lg);

/* Dropdowns & Menus */
--dropdown-shadow: var(--shadow-lg);

/* Modals */
--modal-shadow: var(--shadow-xl);

/* Tooltips */
--tooltip-shadow: var(--shadow-md);
```

### Dark Mode Shadows

```css
/* In dark mode, reduce shadow intensity and add subtle glow */
--shadow-dark-sm:
  0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
--shadow-dark-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
--shadow-dark-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
```

---

## Borders

### Border Width

```css
--border-0: 0px;
--border-1: 1px; /* Default borders */
--border-2: 2px; /* Emphasized borders */
--border-3: 3px; /* Heavy borders */
--border-4: 4px; /* Very heavy borders */
--border-8: 8px; /* Decorative borders */
```

### Border Styles

```css
--border-solid: solid;
--border-dashed: dashed;
--border-dotted: dotted;
--border-double: double;
--border-none: none;
```

### Border Colors

```css
/* Light Mode */
--border-transparent: transparent;
--border-default: #e5e5e5; /* gray-200 */
--border-subtle: #f5f5f5; /* gray-100 */
--border-strong: #d4d4d4; /* gray-300 */
--border-emphasis: #a3a3a3; /* gray-400 */

/* Dark Mode */
--border-dark-default: #404040; /* gray-700 */
--border-dark-subtle: #262626; /* gray-800 */
--border-dark-strong: #525252; /* gray-600 */

/* Interactive */
--border-focus: #3b82f6; /* blue-500 */
--border-error: #ef4444; /* red-500 */
--border-success: #22c55e; /* green-500 */
--border-warning: #f59e0b; /* amber-500 */
```

### Component Borders

```css
/* Inputs */
--input-border: 1px solid var(--border-default);
--input-border-hover: 1px solid var(--border-strong);
--input-border-focus: 1px solid var(--border-focus);
--input-border-error: 1px solid var(--border-error);
--input-border-disabled: 1px solid var(--border-subtle);

/* Cards */
--card-border-none: none;
--card-border-subtle: 1px solid var(--border-subtle);
--card-border-default: 1px solid var(--border-default);
--card-border-strong: 1px solid var(--border-strong);

/* Dividers */
--divider-light: 1px solid var(--border-subtle);
--divider-default: 1px solid var(--border-default);
--divider-heavy: 2px solid var(--border-strong);

/* Focus Rings */
--focus-ring: 0 0 0 2px var(--surface-0), 0 0 0 4px var(--border-focus);
--focus-ring-offset: 2px;
```

---

## Animations & Transitions

### Duration Scale

```css
--duration-0: 0ms;
--duration-75: 75ms; /* Instant feedback */
--duration-100: 100ms; /* Quick micro-interactions */
--duration-150: 150ms; /* Fast transitions */
--duration-200: 200ms; /* Default transitions */
--duration-300: 300ms; /* Standard animations */
--duration-500: 500ms; /* Slower animations */
--duration-700: 700ms; /* Slow emphasis */
--duration-1000: 1000ms; /* Long animations */
```

### Easing Functions

```css
/* Standard easings */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Natural/Spring-like easings */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Custom easings for specific uses */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-snappy: cubic-bezier(0.5, 0, 0.1, 1);
```

### Transition Presets

```css
/* Property-specific transitions */
--transition-none: none;
--transition-all: all 200ms var(--ease-in-out);
--transition-colors:
  color, background-color, border-color 150ms var(--ease-in-out);
--transition-opacity: opacity 200ms var(--ease-in-out);
--transition-shadow: box-shadow 200ms var(--ease-in-out);
--transition-transform: transform 200ms var(--ease-in-out);

/* Component transitions */
--transition-button: all 150ms var(--ease-in-out);
--transition-input:
  border-color 150ms var(--ease-in-out), box-shadow 150ms var(--ease-in-out);
--transition-card:
  box-shadow 200ms var(--ease-in-out), transform 200ms var(--ease-in-out);
--transition-dropdown:
  opacity 150ms var(--ease-out), transform 150ms var(--ease-out);
--transition-modal:
  opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
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

/* Bounce */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Pulse */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Spin */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Shake */
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
```

### Animation Usage Guidelines

```
Micro-interactions (hover, focus):    75-150ms, ease-out
State changes (toggle, switch):       150-200ms, ease-in-out
Content transitions:                  200-300ms, ease-in-out
Modal/Dialog entry:                   200-300ms, ease-out
Modal/Dialog exit:                    150-200ms, ease-in
Page transitions:                     300-500ms, ease-in-out
Loading animations:                   continuous, linear or ease-in-out
Attention animations:                 500-1000ms, spring or bounce
```

---

## Layout & Grid

### Container Widths

```css
--container-xs: 320px; /* Mobile small */
--container-sm: 640px; /* Mobile */
--container-md: 768px; /* Tablet */
--container-lg: 1024px; /* Desktop */
--container-xl: 1280px; /* Large desktop */
--container-2xl: 1536px; /* Extra large */
--container-full: 100%; /* Full width */
```

### Grid Columns

```css
/* Standard 12-column grid */
--grid-cols-1: repeat(1, minmax(0, 1fr));
--grid-cols-2: repeat(2, minmax(0, 1fr));
--grid-cols-3: repeat(3, minmax(0, 1fr));
--grid-cols-4: repeat(4, minmax(0, 1fr));
--grid-cols-5: repeat(5, minmax(0, 1fr));
--grid-cols-6: repeat(6, minmax(0, 1fr));
--grid-cols-12: repeat(12, minmax(0, 1fr));

/* Auto-fit responsive grids */
--grid-auto-sm: repeat(auto-fit, minmax(200px, 1fr));
--grid-auto-md: repeat(auto-fit, minmax(280px, 1fr));
--grid-auto-lg: repeat(auto-fit, minmax(350px, 1fr));
```

### Aspect Ratios

```css
--aspect-square: 1 / 1;
--aspect-video: 16 / 9;
--aspect-photo: 4 / 3;
--aspect-portrait: 3 / 4;
--aspect-wide: 21 / 9;
--aspect-golden: 1.618 / 1;
```

### Max Widths

```css
--max-w-prose: 65ch; /* Optimal reading width */
--max-w-xs: 320px;
--max-w-sm: 384px;
--max-w-md: 448px;
--max-w-lg: 512px;
--max-w-xl: 576px;
--max-w-2xl: 672px;
--max-w-3xl: 768px;
--max-w-4xl: 896px;
--max-w-5xl: 1024px;
--max-w-6xl: 1152px;
--max-w-7xl: 1280px;
```

---

## Responsive Breakpoints

### Breakpoint Values

```css
--breakpoint-xs: 0px; /* Extra small devices */
--breakpoint-sm: 640px; /* Small devices (phones) */
--breakpoint-md: 768px; /* Medium devices (tablets) */
--breakpoint-lg: 1024px; /* Large devices (desktops) */
--breakpoint-xl: 1280px; /* Extra large devices */
--breakpoint-2xl: 1536px; /* Very large screens */
```

### Media Query Patterns

```css
/* Mobile first (min-width) */
@media (min-width: 640px) {
  /* sm and up */
}
@media (min-width: 768px) {
  /* md and up */
}
@media (min-width: 1024px) {
  /* lg and up */
}
@media (min-width: 1280px) {
  /* xl and up */
}
@media (min-width: 1536px) {
  /* 2xl and up */
}

/* Desktop first (max-width) */
@media (max-width: 1535px) {
  /* below 2xl */
}
@media (max-width: 1279px) {
  /* below xl */
}
@media (max-width: 1023px) {
  /* below lg */
}
@media (max-width: 767px) {
  /* below md */
}
@media (max-width: 639px) {
  /* below sm */
}
```

### Responsive Scaling Guide

```
Property          Mobile        Tablet        Desktop
---------------------------------------------------------
Body font         14-16px       16px          16px
H1                28-32px       36-42px       48-60px
H2                24-28px       30-36px       36-48px
Container pad     16px          24px          32-48px
Section margin    32-48px       48-64px       64-96px
Grid columns      1-2           2-3           3-4+
Card padding      12-16px       16-20px       20-24px
Button padding    8px 16px      10px 20px     12px 24px
```

---

## Z-Index Scale

```css
--z-negative: -1; /* Behind everything */
--z-0: 0; /* Default layer */
--z-10: 10; /* Slightly elevated */
--z-20: 20; /* Dropdowns */
--z-30: 30; /* Fixed headers */
--z-40: 40; /* Modals backdrop */
--z-50: 50; /* Modals */
--z-60: 60; /* Popovers */
--z-70: 70; /* Tooltips */
--z-80: 80; /* Notifications/Toasts */
--z-90: 90; /* High priority overlays */
--z-100: 100; /* Maximum priority */
--z-max: 9999; /* Override everything */
```

### Component Z-Index Mapping

```css
--z-dropdown: 20;
--z-sticky: 30;
--z-fixed: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-popover: 60;
--z-tooltip: 70;
--z-toast: 80;
--z-notification: 80;
```

---

## Opacity

```css
--opacity-0: 0;
--opacity-5: 0.05;
--opacity-10: 0.1;
--opacity-20: 0.2;
--opacity-25: 0.25;
--opacity-30: 0.3;
--opacity-40: 0.4;
--opacity-50: 0.5;
--opacity-60: 0.6;
--opacity-70: 0.7;
--opacity-75: 0.75;
--opacity-80: 0.8;
--opacity-90: 0.9;
--opacity-95: 0.95;
--opacity-100: 1;
```

### Opacity Usage

```
Disabled elements:     0.5
Placeholder text:      0.6
Secondary text:        0.7-0.8
Hover overlays:        0.1-0.2
Modal backdrops:       0.5-0.7
Loading overlays:      0.8-0.9
Ghost buttons bg:      0.1 (on hover)
```

---

## Component-Specific Guidelines

### Buttons

```css
.button {
  /* Base */
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  border-radius: 6px;
  transition: all 150ms ease-in-out;

  /* Sizes */
  --btn-height-sm: 32px;
  --btn-height-md: 40px;
  --btn-height-lg: 48px;
  --btn-height-xl: 56px;
}

/* Button variants */
Primary:    bg: blue-600, text: white, hover: blue-700
Secondary:  bg: gray-100, text: gray-900, hover: gray-200
Outline:    bg: transparent, border: gray-300, hover: gray-50
Ghost:      bg: transparent, hover: gray-100
Danger:     bg: red-600, text: white, hover: red-700
```

### Inputs

```css
.input {
  height: 40px;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid var(--border-default);
  border-radius: 6px;
  transition:
    border-color 150ms,
    box-shadow 150ms;

  /* States */
  --input-bg: white;
  --input-bg-disabled: var(--gray-50);
  --input-border-focus: var(--blue-500);
  --input-ring-focus: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
```

### Cards

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;

  /* Variants */
  --card-shadow-none: none;
  --card-shadow-sm: var(--shadow-sm);
  --card-shadow-md: var(--shadow-md);

  --card-border-none: none;
  --card-border-subtle: 1px solid var(--gray-200);

  /* Hover lift effect */
  transition:
    transform 200ms,
    box-shadow 200ms;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### Modals

```css
.modal {
  max-width: 500px;
  width: 90%;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-xl);

  /* Sizes */
  --modal-sm: 400px;
  --modal-md: 500px;
  --modal-lg: 700px;
  --modal-xl: 900px;
  --modal-full: 95vw;
}

.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

### Dropdowns

```css
.dropdown {
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  padding: 4px;
  min-width: 180px;

  /* Animation */
  animation: scaleIn 150ms ease-out;
  transform-origin: top;
}

.dropdown-item {
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 100ms;
}

.dropdown-item:hover {
  background: var(--gray-100);
}
```

---

## Decision Trees

### Choosing Border Radius

```
Is it a button?
├── Yes: 6-8px (default), 9999px (pill style)
└── No: Continue...

Is it an input/form field?
├── Yes: 6px (default), match button radius
└── No: Continue...

Is it a card?
├── Small card: 8px
├── Medium card: 12px
├── Large/feature card: 16px
└── No: Continue...

Is it an avatar/circular element?
├── Yes: 50% or 9999px
└── No: Continue...

Is it a modal/dialog?
├── Yes: 12-16px
└── No: Continue...

Is it a tag/badge?
├── Yes: 4px (square-ish) or 9999px (pill)
└── No: Use 8px as default
```

### Choosing Spacing

```
Is it inline content (icon + text)?
├── Yes: 4-8px gap
└── No: Continue...

Is it a button group?
├── Yes: 8px gap
└── No: Continue...

Is it between form fields?
├── Yes: 16px margin/gap
└── No: Continue...

Is it card internal padding?
├── Compact: 12-16px
├── Default: 16-24px
├── Spacious: 24-32px
└── No: Continue...

Is it between sections?
├── Small break: 32px
├── Medium break: 48-64px
├── Large break: 80-96px
└── No: Use 16px as default
```

### Choosing Shadows

```
Is it a button?
├── Flat style: none
├── Raised style: shadow-sm
├── Hover: shadow-md
└── Focus: focus ring only

Is it a card?
├── Flat/bordered: none + border
├── Subtle elevation: shadow-sm
├── Medium elevation: shadow-md
├── Floating: shadow-lg
└── Hover enhancement: +1 level

Is it a dropdown/popover?
├── Yes: shadow-lg
└── No: Continue...

Is it a modal?
├── Yes: shadow-xl or shadow-2xl
└── No: Continue...

Is it a tooltip?
├── Yes: shadow-md
└── No: Use shadow-sm as default
```

### Choosing Animation Duration

```
Is it a hover effect (color, bg)?
├── Yes: 100-150ms
└── No: Continue...

Is it a button press?
├── Yes: 75-100ms
└── No: Continue...

Is it a dropdown opening?
├── Yes: 150ms
└── No: Continue...

Is it a modal appearing?
├── Yes: 200-300ms
└── No: Continue...

Is it a page transition?
├── Yes: 300-500ms
└── No: Continue...

Is it a loading animation?
├── Yes: continuous, 500-1000ms per cycle
└── No: Use 200ms as default
```

---

## Quick Reference Cheatsheet

### Most Common Values

```css
/* Spacing */
Small gap: 8px
Default gap: 16px
Large gap: 24px
Section gap: 48px

/* Border Radius */
Small: 4px
Default: 8px
Large: 12px
Pill: 9999px

/* Shadows */
Subtle: 0 1px 3px rgba(0,0,0,0.1)
Medium: 0 4px 6px rgba(0,0,0,0.1)
Large: 0 10px 15px rgba(0,0,0,0.1)

/* Transitions */
Fast: 150ms ease-in-out
Default: 200ms ease-in-out
Slow: 300ms ease-in-out

/* Font Sizes */
Small: 14px
Body: 16px
Large: 18px
Heading: 24-36px

/* Colors (Light Mode) */
Background: #FFFFFF
Surface: #FAFAFA
Border: #E5E5E5
Text: #171717
Text Secondary: #737373
Primary: #3B82F6
```

---

## Usage Instructions for AI

When generating CSS/styles, follow these rules:

1. **Always use the defined scale** — Don't use arbitrary values like `13px` or `7px`. Use the nearest scale value.

2. **Maintain consistency** — If a card uses `12px` radius, related elements should use the same or harmonious values.

3. **Consider context** — Mobile needs larger touch targets (min 44px), desktop can be more compact.

4. **Use semantic tokens** — Prefer `--border-default` over `#E5E5E5` for maintainability.

5. **Follow the hierarchy** — Primary actions get primary colors, secondary actions get secondary styles.

6. **Accessibility first** — Ensure 4.5:1 contrast for text, 3:1 for UI elements.

7. **Animation restraint** — Use animation purposefully, not decoratively. Respect `prefers-reduced-motion`.

8. **Progressive enhancement** — Start with solid defaults, enhance with shadows/animations.

9. **Card usage** - No need to always make cards for everything.

10. **Website theme** - If website already have some theme defined, use color palates that belongs to that theme specifically

---
