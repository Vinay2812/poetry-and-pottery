# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Coding Guidelines

Visual components render UI and should be isolated from application state, API data, and other non-visual concerns.

### When to Build a Component

- Figma components (purple outline) should become reusable visual components
- Check Storybook first—use existing components when available

### Props: Scalars and Callbacks Only

- Pass simple scalars and callbacks, not objects
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

- `npm install` - Install dependencies
- `npm run dev` - Start development server on port 3001 (requires .env setup and codegen)
- `npm run dev:fast` - Start development server with Turbo mode
- `npm run dev:local` - Start development server for local environment

**GraphQL Code Generation:**

- `npm run codegen` - Generate GraphQL types (required before starting dev server)
- `npm run jsonapi-update` - Update API resources (automatically runs with dev commands)

**Build and Production:**

- `npm run build` - Build for production (includes codegen and verification)
- `npm start` - Start production server on port 3001

**Testing:**

- `npm test` - Run Jest tests with JSON output
- `npm run test:watch` - Run tests in watch mode
- `npm run test:file` - Run specific test file
- `npm run test-storybook` - Run Storybook tests in watch mode
- `npm run test-storybook:ci` - Run Storybook tests for CI

**Code Quality:**

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run prettier` - Check code formatting
- `npm run prettier:format` - Format code with Prettier
- `npm run tsc` - TypeScript type checking without emitting files

**Storybook:**

- `npm run storybook` - Start Storybook development server on port 6006
- `npm run build-storybook` - Build static Storybook

## Architecture Overview

**Next.js App Router Structure:**

- Uses Next.js 14+ App Router with route groups
- `src/app/(authenticated)/` - Protected routes requiring authentication
- `src/app/(unauthenticated)/` - Public routes (bills, state pages, etc.)
- `src/app/(auth)/` - Authentication-related pages
- `src/app/api/` - API routes
- Route structure follows `[stateAbbr]` dynamic routing for state-specific content

**Key Technologies:**

- **Frontend:** Next.js 14+, React 18, TypeScript
- **Styling:** Tailwind CSS with custom theme, Emotion for styled components
- **State Management:** Redux Toolkit, React Query (@tanstack/react-query)
- **GraphQL:** Apollo Client with automated code generation
- **Auth:** Auth0 (@auth0/nextjs-auth0)
- **Feature Flags:** LaunchDarkly for feature management
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
- GraphQL codegen depends on proper environment setup

**Path Aliases:**

- `@/*` maps to `src/*`
- `@ui/*` maps to `src/components/ui/*`

## Important Notes

- Always run `npm run codegen` before starting development if GraphQL schema changes
- Development server runs on port 3001 (not the default 3000)
- Feature flags are managed through LaunchDarkly - check `docs/feature-flags.md`
- Uses timezone UTC for testing (`TZ=UTC` in test commands)
- Storybook integration with Jest test results for component documentation
