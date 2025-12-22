# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Coding Guidelines

Visual components render UI and should be isolated from application state, API data, and other non-visual concerns.

### Container/Component Architecture

All features must follow the Container/Component (Presentational) pattern:

**Structure:**

```
src/features/<featureName>/
├── components/          # Presentational UI components
│   └── FeatureName.tsx
├── containers/          # State, logic, and data fetching
│   └── FeatureNameContainer.tsx
├── hooks/               # Custom hooks (optional)
├── types.ts             # ViewModels, Props, helper functions
└── index.ts             # Barrel exports
```

**Containers** own:

- State management (`useState`, `useReducer`, Zustand stores)
- Data fetching (server actions, React Query, API calls)
- Business logic and calculations
- Side effects (`useEffect`)
- Event handlers that call external APIs

**Presentational Components** receive:

- A `viewModel` prop containing pre-formatted display data
- `on*` callback props for user interactions
- NO direct imports from `@/actions/**`, `@/store/**`, or side-effect modules

**Pages and Layouts:**

- Pages fetch data and pass it to Containers
- Pages should NOT contain business logic or complex state
- Layouts only provide structural wrappers (nav, footer, etc.)

```tsx
// Page (Server Component) - Data fetching only
export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductListContainer initialProducts={products} />;
}

// Container - Owns state and logic
export function ProductListContainer({ initialProducts }) {
  const [filters, setFilters] = useState({});
  const viewModel = useMemo(() => buildViewModel(products, filters), [...]);
  return <ProductList viewModel={viewModel} onFilterChange={setFilters} />;
}

// Presentational - Pure UI
export function ProductList({ viewModel, onFilterChange }) {
  return <div>{viewModel.items.map(item => <Card key={item.id} {...item} />)}</div>;
}
```

### When to Build a Component

- Figma components (purple outline) should become reusable visual components
- Check Storybook first—use existing components when available

### Props: Scalars and Callbacks Only

- Pass simple scalars and callbacks, not objects (exception: `viewModel` prop for Container pattern)
- Expand object values explicitly rather than spreading: avoid `<Component {...obj} />`
- For lists, pass `children` and let containers handle array iteration with individual child components

```tsx
// Good: container handles iteration, visual component renders one item
{
  items.map((item) => (
    <ItemCard key={item.id} name={item.name} onClick={handleClick} />
  ));
}

// Bad: complex inline JSX in map
{
  items.map((item) => (
    <div key={item.id}>
      <a>{item.name}</a>
      <span>...</span>
    </div>
  ));
}
```

### Naming Conventions

- Incoming callback props: `onXxx` (e.g., `onClick`, `onSubmit`)
- Internal handlers passed to children: `handleXxx` (e.g., `handleClick` calls `onClick`)

### Stabilize Callbacks

- Use `useCallback` for handlers passed to children with exhaustive dependency arrays
- Enables effective memoization and prevents unnecessary re-renders

### Minimize State and Effects

- Visual components should rarely need `useEffect` or `useState`
- Externalize state machines to containers; visual components respond to props

### Forms

- Use React Hook Form with Zod validation—do not reimplement form state

### Storybook

- Every visual component needs a Storybook story
- Wire callbacks to Storybook actions for interactive testing

### File Organization

- One component per file
- Import from folder index files when available, not deeply nested paths

## Development Commands

**Setup and Development:**

- `bun install` - Install dependencies
- `bun run dev` - Start development server on port 3005(requires .env setup)

**Build and Production:**

- `bun run build` - Build for production (includes codegen and verification)
- `bun start` - Start production server on port 3005

**Code Quality:**

- `bun run lint` - Run ESLint
- `bun run prettier` - Check code formatting
- `bun run prettier:format` - Format code with Prettier
- `bun run tsc` - TypeScript type checking without emitting files

## Architecture Overview

**Next.js App Router Structure:**

- Uses Next.js 16+ App Router with route groups
- `src/app/(authenticated)/` - Protected routes requiring authentication
- `src/app/(unauthenticated)/` - Public routes (bills, state pages, etc.)
- `src/app/(auth)/` - Authentication-related pages
- `src/app/api/` - API routes
- Route structure follows `[stateAbbr]` dynamic routing for state-specific content

**Key Technologies:**

- **Frontend:** Next.js 16+, React 19, TypeScript
- **Styling:** Tailwind CSS with custom theme, Emotion for styled components
- **State Management:** Zustand, React Query (@tanstack/react-query)
- **GraphQL:** Apollo Client with automated code generation
- **Auth:** Clerk
- **UI Components:** Radix UI primitives, custom design system in `src/components/ui/`

**Component Architecture:**

- Domain-driven component organization in `src/components/`
- UI primitives in `src/components/ui/` (shadcn/ui-style components)
- Feature components organized by domain (Bill, Directory, Enterprise, etc.)
- Co-located components in route directories under `_components/`

**Data Layer:**

- GraphQL API with Apollo Client
- Automated type generation via GraphQL Code Generator
- Generated types in `src/generated/`
- Custom hooks and utilities in respective domain folders

**Environment Requirements:**

- Node.js >=18.17.0, npm >=9.6.7
- Requires `.env` file with all variables from `.env.example`

**Path Aliases:**

- `@/*` maps to `src/*`
- `@ui/*` maps to `src/components/ui/*`

## Important Notes

- Always follow the design principles written in
  rules/DESIGN-PRINCIPLES, rules/DESIGNS

- **Design Philosophy**:
  - **Flat Design**: Avoid borders where possible; use soft shadows (`shadow-soft`, `shadow-card`) and spacing to define hierarchy.
  - **Premium & Professional**: Use generous whitespace but tight component spacing (`gap-3`/`gap-4`). Use high-quality typography (neutral-900 for heads, neutral-500 for secondary).
  - **Visual Consistency**: All product/event images must be `aspect-square` (1:1).
  - **Interactive Elements**: Carousels should support drag/swipe. dots must be always visible.

- Always format the files after writing the code

- Use bun as package manager

- Do not use \_components, instead use src/components
