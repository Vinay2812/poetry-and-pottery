# Poetry & Pottery

A handcrafted pottery e-commerce website built with Next.js 16+, featuring a beautiful mobile-first design with pottery workshops and events management.

## Getting Started

### Prerequisites

- Node.js >=18.17.0
- Bun (recommended package manager)

### Installation

```bash
bun install
```

### Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

### Development

```bash
bun run dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser.

## Scripts

| Script                    | Description                           |
| ------------------------- | ------------------------------------- |
| `bun run dev`             | Start development server on port 3005 |
| `bun run build`           | Build for production                  |
| `bun start`               | Start production server on port 3005  |
| `bun run lint`            | Run ESLint                            |
| `bun run tsc`             | TypeScript type checking without emit |
| `bun run prettier`        | Check code formatting                 |
| `bun run prettier:format` | Format code with Prettier             |
| `bun run db:init`         | Seed the database                     |
| `bun run db:reset`        | Reset and reseed the database         |
| `bun run prisma:studio`   | Open Prisma Studio                    |

## Directory Structure

```
poetry-and-pottery/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (main)/                       # Main route group
│   │   │   ├── layout.tsx                # Shared layout (Navbar, MobileNav)
│   │   │   ├── (with-footer)/            # Pages with Footer
│   │   │   │   ├── page.tsx              # Home page
│   │   │   │   ├── about/                # About page
│   │   │   │   ├── contact/              # Contact page
│   │   │   │   ├── care/                 # Care instructions
│   │   │   │   ├── faq/                  # FAQ page
│   │   │   │   └── shipping/             # Shipping & returns
│   │   │   ├── products/                 # Products pages
│   │   │   ├── cart/                     # Shopping cart
│   │   │   ├── wishlist/                 # Wishlist
│   │   │   ├── profile/                  # User profile
│   │   │   ├── orders/                   # Order history
│   │   │   └── events/                   # Events section
│   │   ├── dashboard/                    # Admin dashboard
│   │   │   ├── products/                 # Product management
│   │   │   ├── categories/               # Category management
│   │   │   ├── events/                   # Event management
│   │   │   ├── users/                    # User management
│   │   │   ├── content/                  # Content management
│   │   │   └── settings/                 # Settings
│   │   └── api/                          # API routes
│   ├── features/                         # Feature modules (Container/Component pattern)
│   │   ├── products/                     # Products feature
│   │   │   ├── components/               # Presentational components
│   │   │   ├── containers/               # State & logic containers
│   │   │   └── hooks/                    # Custom hooks
│   │   ├── cart/                         # Cart feature
│   │   ├── wishlist/                     # Wishlist feature
│   │   ├── orders/                       # Orders feature
│   │   ├── events/                       # Events feature
│   │   ├── layout/                       # Layout feature
│   │   └── dashboard/                    # Dashboard features
│   ├── components/                       # Shared components
│   │   ├── ui/                           # UI primitives (shadcn/ui-style)
│   │   ├── layout/                       # Layout components
│   │   ├── cards/                        # Card components
│   │   ├── forms/                        # Form components
│   │   ├── sections/                     # Section components
│   │   └── skeletons/                    # Loading skeletons
│   ├── actions/                          # Server actions
│   ├── hooks/                            # Global custom hooks
│   ├── lib/                              # Utilities and helpers
│   │   └── validations/                  # Zod validation schemas
│   ├── store/                            # Zustand stores
│   ├── providers/                        # React context providers
│   └── types/                            # TypeScript types
├── prisma/                               # Prisma schema and migrations
├── public/                               # Static assets
└── rules/                                # Design documentation
    ├── DESIGN-PRINCIPLES.md
    └── DESIGNS.md
```

## Architecture

### Container/Component Pattern

Features follow the Container/Component (Presentational) pattern:

- **Containers** own state management, data fetching, business logic, and side effects
- **Presentational Components** receive a `viewModel` prop and `on*` callbacks for pure UI rendering

```
src/features/<featureName>/
├── components/          # Presentational UI components
├── containers/          # State, logic, and data fetching
├── hooks/               # Custom hooks (optional)
├── types.ts             # ViewModels and Props
└── index.ts             # Barrel exports
```

### Route Groups

The app uses Next.js route groups (folders with parentheses) to organize layouts:

- `(main)` - All pages share Navbar and MobileNav
- `(with-footer)` - Pages that also include Footer

This keeps URLs clean while sharing layouts between related pages.

### Key Technologies

- **Framework**: Next.js 16+ (App Router)
- **UI**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State**: Zustand, React Query
- **Database**: Prisma ORM with PostgreSQL
- **Auth**: Clerk
- **UI Components**: Radix UI, custom design system
- **Forms**: React Hook Form with Zod validation

### Path Aliases

- `@/*` → `src/*`
- `@ui/*` → `src/components/ui/*`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Deployment

Deploy easily with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
