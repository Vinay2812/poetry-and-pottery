# Design Implementation Workflow Prompt

## Context

You are a frontend developer working on the `poetry-and-pottery` project. Your task is to implement **approved wireframe designs** with **React 19 performance patterns** and verify the implementation using `agent-browser`.

**IMPORTANT:**

1. Only implement tasks with status `✅ Approved` in design-refactor.md
2. **ALWAYS apply React 19 patterns** from Phase 14 during implementation (not as a separate step)
3. React 19 patterns include: `useTransition`, `useOptimistic`, `Suspense`, `Activity`, `ViewTransition`, `useFormStatus`, `useLayoutEffect`

---

## URLs

| Resource   | URL                                                    |
| ---------- | ------------------------------------------------------ |
| Wireframes | `http://127.0.0.1:5500/poetry-and-pottery/wireframes/` |
| Website    | `http://127.0.0.1:3005/`                               |

**Note:** These servers are already running and accessible. No need to start them.

---

## Prerequisites

Before starting, ensure:

1. Wireframes have been created (via `prompt-wireframe.md`)
2. User has approved designs for all viewports (mobile, tablet, desktop)
3. Task status in `design-refactor.md` is `✅ Approved`
4. Approved wireframe exists in `wireframes/` folder

---

## Wireframe Categories

Wireframes are the **single source of truth** for all visual implementation. Every wireframe file is an HTML document located in `wireframes/` and follows the naming pattern `task-[phase]-[number]-[name].html`. All wireframes share a common stylesheet (`_shared-styles.css`) that defines the forest theme tokens.

Wireframes fall into three categories. Each has different implementation concerns:

### 1. Component Wireframes (Reusable UI primitives)

**Phases:** 4 (Foundation), 13 (Skeletons)

**Examples:** `task-4-1-button-styles.html`, `task-4-2-badge-component.html`, `task-4-3-form-inputs.html`, `task-4-4-rating-component.html`, `task-4-7-dialog-sheet.html`, `task-13-1-skeleton-components.html`

**Implementation approach:**

- These map to files in `src/components/ui/` or reusable feature components
- Must be pixel-perfect — other wireframes depend on these foundations
- Test in isolation first, then verify inside pages that consume them
- Include ALL variants shown in the wireframe (sizes, states, colors)

### 2. Page Wireframes (Full page designs)

**Phases:** 5 (Product), 6 (Cart), 7 (Events), 8 (Account), 10 (Content), 12 (Auth)

**Examples:** `task-5-1-product-detail-layout.html`, `task-6-1-cart-page.html`, `task-8-1-orders-page.html`, `task-10-1-about-page.html`

**Implementation approach:**

- These map to route pages in `src/app/` and feature containers/components
- Compose foundation components from Phase 4 — do NOT re-implement buttons, badges, etc.
- Verify the full page at all three viewports (mobile, tablet, desktop)
- Check scroll behavior, section ordering, and responsive stacking

### 3. Layout Wireframes (Shared structural elements)

**Phases:** 9 (Navigation & Layout), 11 (Polish & Animations)

**Examples:** `task-9-1-desktop-navbar.html`, `task-9-2-mobile-header.html`, `task-9-3-mobile-bottom-nav.html`, `task-9-6-footer.html`, `task-11-1-section-backgrounds.html`

**Implementation approach:**

- These map to layout files in `src/app/layout.tsx` and shared components like `Header`, `Footer`, `BottomNav`
- Must work correctly on EVERY page, not just one — verify on at least 3 different pages
- Navigation wireframes define breakpoint behavior (when to show desktop vs mobile nav)
- Test sticky/fixed positioning, z-index stacking, and scroll behavior

> **Phase dependency:** Phase 4 (Foundation Components) MUST be implemented before Phases 5–13.
> Phases 5–10 can be implemented in parallel. Phase 11 (Polish) runs last.

---

## Task Overview

1. Capture snapshots of approved wireframes
2. Implement the approved designs **with React 19 performance patterns**
3. Verify implementation matches wireframe at all viewports
4. Verify React 19 patterns are applied (see Phase 14 in `design-refactor.md`)
5. Present implementation to user and **wait for explicit approval**
6. Only after user confirms → update status to completed

> ⚠️ **MANDATORY:** Every implementation MUST include relevant React 19 patterns from Phase 14.
> These are not optional optimizations - they are part of the implementation standard.

---

## Workflow Steps

### Step 1: Capture Wireframe Reference

> **The wireframe is your design spec.** Treat it as the definitive reference for every visual decision.
> Do NOT guess colors, spacing, or typography — extract them from the wireframe via `agent-browser`.
>
> **CONTEXT CONSERVATION:** NEVER read wireframe HTML files with `cat`/`read` — this dumps thousands
> of tokens into context. Instead, use `agent-browser` to visually inspect wireframes and extract
> specific CSS values on-demand with `get styles`.

1. **Identify which wireframe(s) you need**

   Check `design-refactor.md` for the current task. Only open the wireframe(s) relevant to your task — do NOT browse all wireframes.

   ```bash
   # The wireframe index page is already running at:
   # http://127.0.0.1:5500/poetry-and-pottery/wireframes/index.html
   # Use it to find the correct wireframe URL if needed

   # Open ONLY the wireframe for your current task
   agent-browser open http://127.0.0.1:5500/poetry-and-pottery/wireframes/task-X-X-name.html
   ```

2. **Capture the wireframe at all three viewports**

   For each viewport: take a screenshot (visual reference) and a compact snapshot (DOM structure).

   ```bash
   # Mobile (375 x 812)
   agent-browser set viewport 375 812
   agent-browser screenshot wireframes/screenshots/reference-mobile.png --full
   agent-browser snapshot -c

   # Tablet (768 x 1024)
   agent-browser set viewport 768 1024
   agent-browser screenshot wireframes/screenshots/reference-tablet.png --full
   agent-browser snapshot -c

   # Desktop (1440 x 900)
   agent-browser set viewport 1440 900
   agent-browser screenshot wireframes/screenshots/reference-desktop.png --full
   agent-browser snapshot -c
   ```

   > **Use `-c` (compact) snapshots** to save context. Only use full `snapshot` if you need
   > detailed element refs for interaction testing.

3. **Extract exact design values on-demand**

   Do NOT read the full HTML/CSS source. Instead, use `agent-browser get styles` to query specific elements:

   ```bash
   # Get computed styles for a specific element (colors, spacing, font, shadows, etc.)
   agent-browser get styles ".product-card"
   agent-browser get styles ".hero-section h1"
   agent-browser get styles ".cta-button"

   # Get element dimensions and position
   agent-browser get box ".product-card"
   agent-browser get box ".hero-section"
   ```

   Extract only what you need:
   - **Colors**: `agent-browser get styles "[sel]"` → look at `color`, `background-color`, `border-color`
   - **Spacing**: `agent-browser get box "[sel]"` → check dimensions; `get styles` → `padding`, `margin`, `gap`
   - **Typography**: `get styles` → `font-family`, `font-size`, `font-weight`, `line-height`
   - **Border radius**: `get styles` → `border-radius`
   - **Shadows**: `get styles` → `box-shadow`

4. **Study the wireframe structure by category**

   **For Component wireframes (Phase 4, 13):**
   - Scroll through the wireframe to find every variant (sizes, states, disabled, active, hover)
   - Note which props control each variant
   - Check if the component is used inside other wireframes

   **For Page wireframes (Phase 5–8, 10, 12):**
   - Use the screenshot and snapshot to map sections to component hierarchy
   - Identify which foundation components (Phase 4) are used on the page
   - Resize viewport to see how section ordering changes across mobile/tablet/desktop
   - Note scroll behavior (sticky elements, lazy sections, infinite scroll)

   **For Layout wireframes (Phase 9, 11):**
   - Resize between viewports to find the breakpoint where layout changes
   - Note fixed/sticky positioning and z-index layering
   - Check how the layout wraps around page content (padding, max-width, centering)
   - Use `get styles` to extract animation/transition timing values

   **For all wireframes:**
   - Use screenshots for visual layout reference
   - Use compact snapshots (`-c`) for DOM structure and hierarchy
   - Use `get styles` / `get box` for exact CSS values — only for elements you need
   - Identify all interactive elements (buttons, links, inputs, toggles)

---

### Step 2: Implementation

3. **Update task status**
   - Change status in `design-refactor.md` from `✅ Approved` to `🚧 In Progress`

4. **Implement the design (follow wireframe category approach)**
   - Follow the files listed in `design-refactor.md` under "Files to Modify"
   - Match the wireframe exactly for each viewport
   - Use forest theme colors only
   - **Use `agent-browser get styles`** on wireframe elements for exact values — do NOT approximate

   **Category-specific implementation:**

   **Component wireframes** (Phase 4, 13):
   - Implement in `src/components/ui/` or as reusable feature components
   - Build ALL variants shown in the wireframe (size, state, color variants)
   - Export a clean props API that supports every variant
   - Test each variant in isolation before integrating into pages

   **Page wireframes** (Phase 5–8, 10, 12):
   - Implement using Container/Component pattern (see `CLAUDE.md`)
   - Compose from existing foundation components (Phase 4) — never re-implement base UI
   - Build mobile-first, then add tablet (`md:`) and desktop (`lg:`, `xl:`) styles
   - Match exact section order, spacing between sections, and responsive stacking from wireframe

   **Layout wireframes** (Phase 9, 11):
   - Implement in layout files (`src/app/layout.tsx`) and shared structural components
   - Test the layout on multiple pages — it must work universally, not just on one page
   - Verify breakpoint transitions (e.g., desktop nav collapses to mobile nav)
   - Test fixed/sticky elements don't overlap page content or other fixed elements

5. **Implementation checklist**
   While implementing, verify:
   - [ ] Colors match wireframe exactly (use forest theme tokens)
   - [ ] Typography matches (Plus Jakarta Sans for display, Outfit for body)
   - [ ] Spacing/padding matches wireframe
   - [ ] Border radius matches (rounded-2xl for cards, rounded-lg for buttons)
   - [ ] Shadow styles match (shadow-soft, shadow-card)
   - [ ] Responsive breakpoints implemented correctly
   - [ ] All interactive states work (hover, focus, active)

6. **React 19 Performance Hooks (MANDATORY - Apply During Implementation)**

   > ⚠️ These patterns are NOT a separate step. Apply them AS YOU IMPLEMENT each component.
   > Check Phase 14 in `design-refactor.md` and apply relevant patterns to your current task.

   **Before writing any component, ask:**
   - Does this have navigation? → Use `useTransition` + `startTransition`
   - Does this have mutations (cart/wishlist/likes)? → Use `useOptimistic`
   - Does this have forms? → Use `useFormStatus`
   - Does this load async data? → Use `Suspense`
   - Does this have dialogs/sheets? → Use `Activity`
   - Does this have shared images across pages? → Use `viewTransitionName`
   - Does this need synchronous DOM measurement/mutation before paint? → Use `useLayoutEffect`

   **Navigation with Transitions:**

   ```tsx
   // ALWAYS wrap router.push with useTransition for smooth page transitions
   const [isPending, startTransition] = useTransition();

   const handleNavigate = (path: string) => {
     startTransition(() => {
       router.push(path);
     });
   };

   // Show loading state during navigation
   {
     isPending && <NavigationProgress />;
   }
   ```

   **Optimistic Updates (Cart, Wishlist, Likes):**

   ```tsx
   // USE useOptimistic instead of manual rollback patterns
   const [optimisticItems, addOptimistic] = useOptimistic(
     items,
     (state, action) => applyAction(state, action),
   );

   // ⚠️ IMPORTANT: useOptimistic updates MUST be called inside startTransition
   // or a form action. Calling outside causes a React 19 console error:
   // "An optimistic state update occurred outside a transition or action."
   startTransition(() => {
     addOptimistic(newItem);
   });
   ```

   **Form Submissions:**

   ```tsx
   // USE useFormStatus for submit button pending states
   function SubmitButton() {
     const { pending } = useFormStatus();
     return (
       <Button disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
     );
   }
   ```

   **Suspense Boundaries:**

   ```tsx
   // ADD Suspense around async sections (related products, reviews, etc.)
   <Suspense fallback={<SectionSkeleton />}>
     <AsyncSection />
   </Suspense>
   ```

   **ViewTransition for Shared Elements:**

   ```tsx
   // ADD view-transition-name for elements that should animate across pages
   <div style={{ viewTransitionName: `product-image-${id}` }}>
     <Image src={image} />
   </div>
   ```

   **Activity for Dialogs/Sheets:**

   ```tsx
   // WRAP dialog content with Activity to prevent parent re-renders
   <Dialog open={open}>
     <Activity mode={open ? "visible" : "hidden"}>
       <DialogContent>...</DialogContent>
     </Activity>
   </Dialog>
   ```

   **useLayoutEffect for Synchronous DOM Updates:**

   ```tsx
   // USE useLayoutEffect when you need to read/write DOM before the browser paints
   // State updates inside useLayoutEffect are flushed synchronously before repaint
   import { useLayoutEffect, useRef, useState } from "react";

   function Tooltip({ anchorRef, children }) {
     const tooltipRef = useRef<HTMLDivElement>(null);
     const [position, setPosition] = useState({ top: 0, left: 0 });

     useLayoutEffect(() => {
       // Measure DOM and update position BEFORE browser paints
       // Prevents visible flicker of tooltip jumping from wrong to correct position
       const anchorRect = anchorRef.current?.getBoundingClientRect();
       const tooltipRect = tooltipRef.current?.getBoundingClientRect();
       if (anchorRect && tooltipRect) {
         setPosition({
           top: anchorRect.top - tooltipRect.height - 8,
           left: anchorRect.left + (anchorRect.width - tooltipRect.width) / 2,
         });
       }
     }, [anchorRef]);

     return (
       <div ref={tooltipRef} style={{ position: "fixed", ...position }}>
         {children}
       </div>
     );
   }
   ```

   **When to use `useLayoutEffect` vs `useEffect`:**
   - **`useLayoutEffect`**: DOM measurements (getBoundingClientRect), scroll position reads/writes, element dimensions, preventing visual flicker from state updates that affect layout
   - **`useEffect`**: Data fetching, subscriptions, logging, analytics — anything that doesn't need to block painting

   **Checklist:**
   - [ ] Navigation uses `useTransition` + `startTransition`
   - [ ] Mutations use `useOptimistic` (not manual rollback)
   - [ ] Forms use `useFormStatus` for pending states
   - [ ] Async sections wrapped in `Suspense`
   - [ ] Shared elements have `viewTransitionName`
   - [ ] Dialogs/sheets use `Activity` component
   - [ ] DOM measurements/mutations before paint use `useLayoutEffect` (not `useEffect`)

---

### Step 3: Verification via agent-browser

6. **Capture implementation at all viewports**

   ```bash
   # Navigate to the implemented page
   agent-browser open http://127.0.0.1:3005/[page-path]

   # Capture Mobile implementation (375 x 812)
   agent-browser set viewport 375 812
   agent-browser screenshot wireframes/screenshots/impl-mobile.png --full
   agent-browser snapshot > wireframes/screenshots/impl-mobile-snapshot.txt

   # Capture Tablet implementation (768 x 1024)
   agent-browser set viewport 768 1024
   agent-browser screenshot wireframes/screenshots/impl-tablet.png --full
   agent-browser snapshot > wireframes/screenshots/impl-tablet-snapshot.txt

   # Capture Desktop implementation (1440 x 900)
   agent-browser set viewport 1440 900
   agent-browser screenshot wireframes/screenshots/impl-desktop.png --full
   agent-browser snapshot > wireframes/screenshots/impl-desktop-snapshot.txt
   ```

7. **Compare wireframe vs implementation**

   For each viewport, verify:

   | Aspect               | Wireframe | Implementation | Match? |
   | -------------------- | --------- | -------------- | ------ |
   | Layout structure     |           |                | [ ]    |
   | Colors               |           |                | [ ]    |
   | Typography           |           |                | [ ]    |
   | Spacing              |           |                | [ ]    |
   | Border radius        |           |                | [ ]    |
   | Shadows              |           |                | [ ]    |
   | Interactive elements |           |                | [ ]    |
   | Responsive behavior  |           |                | [ ]    |

8. **Test interactivity**

   ```bash
   # Test hover states
   agent-browser hover "[selector]"
   agent-browser screenshot wireframes/screenshots/hover-state.png

   # Test click interactions
   agent-browser click "[selector]"
   agent-browser snapshot

   # Test scroll behavior
   agent-browser scroll down 500
   agent-browser screenshot wireframes/screenshots/scrolled.png

   # Check element visibility
   agent-browser is visible "[selector]"
   ```

---

### Step 4: Fix Discrepancies

9. **If implementation doesn't match wireframe:**
   - Identify the specific differences
   - Update code to match wireframe
   - Re-capture screenshots
   - Repeat comparison until matched

10. **Document any approved deviations**
    - If technical constraints require deviation from wireframe
    - Document the reason
    - Get user approval for the change

---

### Step 5: Final Verification

11. **Complete viewport verification**

    ```bash
    # Final Mobile check
    agent-browser set viewport 375 812
    agent-browser open http://127.0.0.1:3005/[page]
    agent-browser screenshot wireframes/screenshots/final-mobile.png --full

    # Final Tablet check
    agent-browser set viewport 768 1024
    agent-browser screenshot wireframes/screenshots/final-tablet.png --full

    # Final Desktop check
    agent-browser set viewport 1440 900
    agent-browser screenshot wireframes/screenshots/final-desktop.png --full
    ```

12. **Run code quality checks**

    ```bash
    cd poetry-and-pottery
    bun run tsc              # TypeScript check - must pass
    bun run prettier:format  # Format code
    ```

---

### Step 6: User Review & Approval

13. **Present to user and ask for feedback**
    - Show before/after comparison (wireframe vs implementation)
    - Show all three viewports (mobile, tablet, desktop)
    - **ASK the user:** _"Does everything look good, or do you have any feedback/changes?"_
    - **WAIT for the user's response before proceeding**

14. **Handle user response**

    **If user says everything looks good** → proceed to Step 7 (mark complete)

    **If user has feedback or requests changes:**
    - Note the specific feedback
    - Go back to Step 2 (Implementation) to make the requested changes
    - Re-run Step 3 (Verification) to confirm fixes
    - Re-run Step 4 (Fix Discrepancies) if needed
    - Return to Step 6 and present updated implementation to the user again
    - **Repeat this loop until the user confirms they are satisfied**

    > **CRITICAL:** Do NOT mark a task as completed until the user explicitly confirms the implementation is acceptable. Never skip user approval.

---

### Step 7: Finalization (Only After User Approval)

15. **Update documentation**
    - Update `design-refactor.md`: Change status to `✔️ Completed`
    - Update wireframe file: Mark as `✔️ IMPLEMENTED`
    - Only do this AFTER user has confirmed everything looks good in Step 6

---

## agent-browser Quick Reference

```bash
# Navigation
agent-browser open <url>              # Open URL
agent-browser reload                  # Reload page
agent-browser back                    # Go back
agent-browser forward                 # Go forward

# Viewport Control (CRITICAL for responsive testing)
agent-browser set viewport 375 812    # Mobile (iPhone X)
agent-browser set viewport 768 1024   # Tablet (iPad)
agent-browser set viewport 1440 900   # Desktop

# Screenshots
agent-browser screenshot <path>       # Current viewport
agent-browser screenshot <path> --full # Full page

# Accessibility Snapshots (for AI understanding)
agent-browser snapshot                # Full tree with refs
agent-browser snapshot -i             # Interactive elements only
agent-browser snapshot -c             # Compact output

# Interactions (for testing)
agent-browser click <sel>             # Click element
agent-browser hover <sel>             # Hover element
agent-browser scroll down 500         # Scroll down
agent-browser scroll up 300           # Scroll up
agent-browser scrollintoview <sel>    # Scroll to element

# Element Info
agent-browser get text <sel>          # Get text content
agent-browser get html <sel>          # Get HTML
agent-browser is visible <sel>        # Check visibility
agent-browser get box <sel>           # Get bounding box
agent-browser get styles <sel>        # Get computed styles

# Debugging
agent-browser highlight <sel>         # Highlight element
agent-browser console                 # View console logs
agent-browser errors                  # View page errors
```

---

## Verification Checklist

Before marking task as completed:

### Wireframe Fidelity (Source of Truth)

- [ ] Opened wireframe in `agent-browser` — captured screenshots at all 3 viewports
- [ ] Used `agent-browser get styles` to extract exact CSS values for key elements (colors, spacing, fonts, shadows)
- [ ] Implementation uses exact values from wireframe, not approximations
- [ ] Compared wireframe screenshots side-by-side with implementation screenshots

### Layout Verification

- [ ] Mobile layout matches wireframe (375px)
- [ ] Tablet layout matches wireframe (768px)
- [ ] Desktop layout matches wireframe (1440px)
- [ ] Responsive transitions work smoothly

### Visual Verification

- [ ] Colors match forest theme exactly (compare via `get styles` on wireframe vs implementation)
- [ ] Typography correct (font-family, size, weight, line-height — compare via `get styles`)
- [ ] Spacing matches wireframe (padding, margin, gap — compare via `get styles` / `get box`)
- [ ] Border radius correct
- [ ] Shadows correct

### Functional Verification

- [ ] All interactive elements work
- [ ] Hover states match design
- [ ] Focus states accessible
- [ ] Click handlers functional

### Category-Specific Verification

**Component wireframes (Phase 4, 13):**

- [ ] ALL variants from wireframe implemented (sizes, states, colors)
- [ ] Component works in isolation
- [ ] Component works when composed inside pages

**Page wireframes (Phase 5–8, 10, 12):**

- [ ] Section order matches wireframe at all viewports
- [ ] Uses foundation components from Phase 4 (no re-implementations)
- [ ] Scroll behavior matches (sticky elements, lazy sections)
- [ ] Mobile stacking order matches wireframe

**Layout wireframes (Phase 9, 11):**

- [ ] Layout works on at least 3 different pages
- [ ] Breakpoint transitions correct (desktop nav → mobile nav switch)
- [ ] Fixed/sticky elements don't overlap content or each other
- [ ] Animations/transitions match wireframe timing values

### Code Quality

- [ ] TypeScript passes (`bun run tsc`)
- [ ] Code formatted (`bun run prettier:format`)
- [ ] No console errors
- [ ] No accessibility issues

### React 19 Performance (Phase 14)

- [ ] `router.push` wrapped with `useTransition`
- [ ] Mutations use `useOptimistic` (cart, wishlist, likes)
- [ ] Forms use `useFormStatus` for submit buttons
- [ ] Async sections have `Suspense` boundaries
- [ ] Shared elements have `viewTransitionName` for page animations
- [ ] Dialogs/sheets use `Activity` for render isolation
- [ ] No manual optimistic rollback patterns (use `useOptimistic`)
- [ ] DOM measurements/mutations before paint use `useLayoutEffect` (not `useEffect`)

### User Approval (REQUIRED)

- [ ] Presented implementation screenshots to user (all 3 viewports)
- [ ] Asked user: "Does everything look good, or do you have any feedback?"
- [ ] User explicitly confirmed the implementation is acceptable
- [ ] Only THEN marked task as `✔️ Completed` in `design-refactor.md`

---

## Output Expectations

At the end of this workflow:

1. **Implemented code** matching approved wireframes
2. **Comparison screenshots:**
   - `wireframes/screenshots/reference-mobile.png` vs `wireframes/screenshots/impl-mobile.png`
   - `wireframes/screenshots/reference-tablet.png` vs `wireframes/screenshots/impl-tablet.png`
   - `wireframes/screenshots/reference-desktop.png` vs `wireframes/screenshots/impl-desktop.png`
3. **User approval** — user has explicitly confirmed the implementation looks good
4. **Updated design-refactor.md** with `✔️ Completed` status (only after user approval)
5. **Updated wireframe file** marked as `✔️ IMPLEMENTED` (only after user approval)
6. **Clean code** passing TypeScript and formatted

---

## Status Legend

| Status                 | Meaning                                        |
| ---------------------- | ---------------------------------------------- |
| `🔲 Wireframe Pending` | Task not started                               |
| `⏳ Awaiting Approval` | Wireframes created, waiting for user selection |
| `✅ Approved`          | User approved, ready for implementation        |
| `🚧 In Progress`       | Implementation in progress                     |
| `✔️ Completed`         | Implementation done and verified               |

---

## React 19 Quick Reference

**When to use each hook:**

| Scenario                | Hook/Pattern                    | Example                       |
| ----------------------- | ------------------------------- | ----------------------------- |
| Page navigation         | `useTransition` + `router.push` | Product card → detail page    |
| Cart/wishlist mutations | `useOptimistic`                 | Add to cart, toggle wishlist  |
| Form submissions        | `useFormStatus`                 | Submit button pending state   |
| Async data sections     | `Suspense`                      | Related products, reviews     |
| Cross-page animations   | `viewTransitionName`            | Product image morph           |
| Modal/sheet rendering   | `Activity`                      | Order detail dialog           |
| Filter updates          | `startTransition`               | Price range, category filter  |
| Review likes            | `useOptimistic`                 | Like/unlike with rollback     |
| DOM reads before paint  | `useLayoutEffect`               | Tooltip position, scroll sync |

**Import locations:**

```tsx
import { Suspense, useLayoutEffect, useOptimistic, useTransition } from "react";
import { Activity } from "react";
import { useFormStatus } from "react-dom";

// React 19+
```

**Common patterns to avoid:**

```tsx
// ❌ BAD: Manual optimistic rollback
const previous = items;
setItems(optimistic);
try {
  await mutate();
} catch {
  setItems(previous);
}

// ✅ GOOD: useOptimistic with automatic rollback
const [optimistic, addOptimistic] = useOptimistic(items, reducer);

// ❌ BAD: Calling useOptimistic updater outside startTransition
addOptimistic(newItem); // Console error in React 19

// ✅ GOOD: Wrap useOptimistic updates in startTransition (or call inside a form action)
startTransition(() => {
  addOptimistic(newItem);
});

// ❌ BAD: Direct router.push
router.push("/products/123");

// ✅ GOOD: Wrapped in transition
startTransition(() => router.push("/products/123"));

// ❌ BAD: useEffect for DOM measurement that affects layout (causes flicker)
useEffect(() => {
  const rect = ref.current?.getBoundingClientRect();
  setPosition({ top: rect.top, left: rect.left });
}, []);

// ✅ GOOD: useLayoutEffect for DOM measurement before paint (no flicker)
useLayoutEffect(() => {
  const rect = ref.current?.getBoundingClientRect();
  setPosition({ top: rect.top, left: rect.left });
}, []);
```

---

## Troubleshooting

**If implementation differs from wireframe:**

1. Open the wireframe in `agent-browser` at the exact viewport size
2. Use `agent-browser get styles [sel]` on the **wireframe** element to get the expected CSS values
3. Open the implementation and use `agent-browser get styles [sel]` on the **same element** to compare
4. Use `agent-browser get box [sel]` on both to compare dimensions
5. Fix discrepancies using the wireframe values and re-verify

**If a component looks wrong inside a page:**

1. Check the component wireframe (Phase 4) — does the isolated component match?
2. If yes, the issue is page-level composition (spacing, container width, nesting)
3. If no, fix the component first, then re-check the page

**If a layout element breaks on certain pages:**

1. Test the layout wireframe (Phase 9) on at least 3 different page routes
2. Check for page-specific content that pushes layout boundaries (long titles, many items)
3. Verify z-index and fixed positioning doesn't conflict with page-level elements

**If technical constraints prevent exact match:**

1. Document the constraint
2. Propose alternative solution
3. Get user approval before proceeding

**If responsive behavior is wrong:**

1. Open the wireframe in `agent-browser` and resize across breakpoints (375, 768, 1440) to see expected behavior
2. Check breakpoint values in Tailwind config
3. Verify correct responsive prefixes (`md:`, `lg:`, `xl:`)
4. Test each breakpoint transition point on both wireframe and implementation
