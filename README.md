# Poetry & Pottery

A handcrafted pottery e-commerce website built with Next.js 16+, featuring a beautiful mobile-first design with pottery workshops and events management.

## Getting Started

### Prerequisites

- Node.js >=18.17.0
- npm >=9.6.7

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

| Script                    | Description                               |
| ------------------------- | ----------------------------------------- |
| `npm run dev`             | Start development server on port 3002     |
| `npm run build`           | Build for production (includes codegen)   |
| `npm start`               | Start production server on port 3002      |
| `npm run lint`            | Run ESLint                                |
| `npm run tsc`             | TypeScript type checking without emitting |
| `npm run prettier`        | Check code formatting                     |
| `npm run prettier:format` | Format code with Prettier                 |

## Directory Structure

```
poetry-and-pottery/
├── app/
│   ├── layout.tsx                          # Root layout (ClerkProvider, fonts)
│   ├── globals.css                         # Global styles
│   └── (main)/                             # Main route group
│       ├── layout.tsx                      # Shared layout (Navbar, MobileNav)
│       ├── (with-footer)/                  # Pages with Footer
│       │   ├── layout.tsx                  # Footer layout
│       │   ├── page.tsx                    # Home page
│       │   ├── about/page.tsx              # About page
│       │   ├── contact/page.tsx            # Contact page
│       │   ├── care/page.tsx               # Care instructions
│       │   ├── faq/page.tsx                # FAQ page
│       │   └── shipping/page.tsx           # Shipping & returns
│       ├── products/                       # Products (no footer)
│       │   ├── page.tsx                    # Products listing
│       │   └── [id]/page.tsx               # Product detail
│       ├── cart/page.tsx                   # Shopping cart
│       ├── wishlist/page.tsx               # Wishlist
│       ├── profile/page.tsx                # User profile
│       └── events/                         # Events section
│           ├── page.tsx                    # Redirect to registrations
│           ├── registrations/
│           │   ├── page.tsx                # My registrations
│           │   └── [id]/page.tsx           # Registration detail
│           ├── upcoming/
│           │   ├── page.tsx                # Upcoming events
│           │   └── [id]/page.tsx           # Event detail
│           └── past/
│               ├── page.tsx                # Past workshops
│               └── [id]/page.tsx           # Past workshop detail
├── components/
│   ├── ui/                                 # UI primitives (shadcn/ui-style)
│   ├── layout/                             # Layout components
│   │   ├── navbar.tsx                      # Desktop navigation
│   │   ├── mobile-header.tsx               # Mobile header
│   │   ├── mobile-nav.tsx                  # Mobile bottom navigation
│   │   └── footer.tsx                      # Footer component
│   ├── cards/                              # Card components
│   ├── forms/                              # Form components
│   ├── sections/                           # Section components
│   ├── events-list-layout.tsx              # Shared events list layout
│   ├── events-tabs.tsx                     # Events navigation tabs
│   └── ...                                 # Other components
├── lib/
│   ├── constants.ts                        # App constants and mock data
│   └── utils.ts                            # Utility functions
├── rules/
│   ├── DESIGN-PRINCIPLES.md                # Design principles documentation
│   └── DESIGNS.md                          # Design system rules
└── CLAUDE.md                               # AI coding guidelines
```

## Architecture

### Route Groups

The app uses Next.js route groups (folders with parentheses) to organize layouts:

- `(main)` - All pages share Navbar and MobileNav
- `(with-footer)` - Pages that also include Footer

This keeps URLs clean while sharing layouts between related pages.

### Key Technologies

- **Framework**: Next.js 16+ (App Router)
- **UI**: React 19, TypeScript
- **Styling**: Tailwind CSS, Emotion
- **State**: Zustand, React Query
- **Auth**: Clerk
- **UI Components**: Radix UI, custom design system

### Path Aliases

- `@/*` → `src/*`
- `@ui/*` → `src/components/ui/*`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk Authentication](https://clerk.com/docs)

## Deployment

Deploy easily with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
