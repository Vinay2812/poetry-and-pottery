# Design Implementation Workflow Prompt

## Context

You are a frontend developer working on the `poetry-and-pottery` project. Your task is to implement **approved wireframe designs** with **React 19 performance patterns** and verify the implementation using `agent-browser`.

**IMPORTANT:**

1. Only implement tasks with status `✅ Approved` in design-refactor.md
2. **ALWAYS apply React 19 patterns** from Phase 14 during implementation (not as a separate step)
3. React 19 patterns include: `useTransition`, `useOptimistic`, `Suspense`, `Activity`, `ViewTransition`, `useFormStatus`

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

## Task Overview

1. Capture snapshots of approved wireframes
2. Implement the approved designs **with React 19 performance patterns**
3. Verify implementation matches wireframe at all viewports
4. Verify React 19 patterns are applied (see Phase 14 in `design-refactor.md`)
5. Update status to completed

> ⚠️ **MANDATORY:** Every implementation MUST include relevant React 19 patterns from Phase 14.
> These are not optional optimizations - they are part of the implementation standard.

---

## Workflow Steps

### Step 1: Capture Wireframe Reference

1. **Capture approved wireframe at all viewports**

   ```bash
   # Open the approved wireframe
   agent-browser open http://127.0.0.1:5500/poetry-and-pottery/wireframes/task-X-X-name.html

   # Capture Mobile reference (375 x 812)
   agent-browser set viewport 375 812
   agent-browser screenshot reference-mobile.png --full
   agent-browser snapshot > reference-mobile-snapshot.txt

   # Capture Tablet reference (768 x 1024)
   agent-browser set viewport 768 1024
   agent-browser screenshot reference-tablet.png --full
   agent-browser snapshot > reference-tablet-snapshot.txt

   # Capture Desktop reference (1440 x 900)
   agent-browser set viewport 1440 900
   agent-browser screenshot reference-desktop.png --full
   agent-browser snapshot > reference-desktop-snapshot.txt
   ```

2. **Study the wireframe structure**
   - Note exact colors, spacing, typography
   - Identify component hierarchy
   - List all interactive elements
   - Document responsive differences between viewports

---

### Step 2: Implementation

3. **Update task status**
   - Change status in `design-refactor.md` from `✅ Approved` to `🚧 In Progress`

4. **Implement the design**
   - Follow the files listed in `design-refactor.md` under "Files to Modify"
   - Match the wireframe exactly for each viewport
   - Use forest theme colors only

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

   // Automatic rollback on error - no manual try/catch needed
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

   **Checklist:**
   - [ ] Navigation uses `useTransition` + `startTransition`
   - [ ] Mutations use `useOptimistic` (not manual rollback)
   - [ ] Forms use `useFormStatus` for pending states
   - [ ] Async sections wrapped in `Suspense`
   - [ ] Shared elements have `viewTransitionName`
   - [ ] Dialogs/sheets use `Activity` component

---

### Step 3: Verification via agent-browser

6. **Capture implementation at all viewports**

   ```bash
   # Navigate to the implemented page
   agent-browser open http://127.0.0.1:3005/[page-path]

   # Capture Mobile implementation (375 x 812)
   agent-browser set viewport 375 812
   agent-browser screenshot impl-mobile.png --full
   agent-browser snapshot > impl-mobile-snapshot.txt

   # Capture Tablet implementation (768 x 1024)
   agent-browser set viewport 768 1024
   agent-browser screenshot impl-tablet.png --full
   agent-browser snapshot > impl-tablet-snapshot.txt

   # Capture Desktop implementation (1440 x 900)
   agent-browser set viewport 1440 900
   agent-browser screenshot impl-desktop.png --full
   agent-browser snapshot > impl-desktop-snapshot.txt
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
   agent-browser screenshot hover-state.png

   # Test click interactions
   agent-browser click "[selector]"
   agent-browser snapshot

   # Test scroll behavior
   agent-browser scroll down 500
   agent-browser screenshot scrolled.png

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
    agent-browser screenshot final-mobile.png --full

    # Final Tablet check
    agent-browser set viewport 768 1024
    agent-browser screenshot final-tablet.png --full

    # Final Desktop check
    agent-browser set viewport 1440 900
    agent-browser screenshot final-desktop.png --full
    ```

12. **Run code quality checks**

    ```bash
    cd poetry-and-pottery
    bun run tsc              # TypeScript check - must pass
    bun run prettier:format  # Format code
    ```

---

### Step 6: Finalization

13. **Update documentation**
    - Update `design-refactor.md`: Change status to `✔️ Completed`
    - Update wireframe file: Mark as `✔️ IMPLEMENTED`

14. **Present to user**
    - Show before/after comparison (wireframe vs implementation)
    - Show all three viewports
    - Confirm implementation matches expectations

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

### Layout Verification

- [ ] Mobile layout matches wireframe (375px)
- [ ] Tablet layout matches wireframe (768px)
- [ ] Desktop layout matches wireframe (1440px)
- [ ] Responsive transitions work smoothly

### Visual Verification

- [ ] Colors match forest theme exactly
- [ ] Typography correct (font-family, size, weight)
- [ ] Spacing matches wireframe
- [ ] Border radius correct
- [ ] Shadows correct

### Functional Verification

- [ ] All interactive elements work
- [ ] Hover states match design
- [ ] Focus states accessible
- [ ] Click handlers functional

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

---

## Output Expectations

At the end of this workflow:

1. **Implemented code** matching approved wireframes
2. **Comparison screenshots:**
   - `reference-mobile.png` vs `impl-mobile.png`
   - `reference-tablet.png` vs `impl-tablet.png`
   - `reference-desktop.png` vs `impl-desktop.png`
3. **Updated design-refactor.md** with `✔️ Completed` status
4. **Updated wireframe file** marked as `✔️ IMPLEMENTED`
5. **Clean code** passing TypeScript and formatted

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

| Scenario                | Hook/Pattern                    | Example                      |
| ----------------------- | ------------------------------- | ---------------------------- |
| Page navigation         | `useTransition` + `router.push` | Product card → detail page   |
| Cart/wishlist mutations | `useOptimistic`                 | Add to cart, toggle wishlist |
| Form submissions        | `useFormStatus`                 | Submit button pending state  |
| Async data sections     | `Suspense`                      | Related products, reviews    |
| Cross-page animations   | `viewTransitionName`            | Product image morph          |
| Modal/sheet rendering   | `Activity`                      | Order detail dialog          |
| Filter updates          | `startTransition`               | Price range, category filter |
| Review likes            | `useOptimistic`                 | Like/unlike with rollback    |

**Import locations:**

```tsx
import { Suspense, useOptimistic, useTransition } from "react";
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

// ❌ BAD: Direct router.push
router.push("/products/123");

// ✅ GOOD: Wrapped in transition
startTransition(() => router.push("/products/123"));
```

---

## Troubleshooting

**If implementation differs from wireframe:**

1. Re-check the wireframe at exact viewport size
2. Use `agent-browser get styles [sel]` to compare CSS
3. Use `agent-browser get box [sel]` to compare dimensions
4. Fix discrepancies and re-verify

**If technical constraints prevent exact match:**

1. Document the constraint
2. Propose alternative solution
3. Get user approval before proceeding

**If responsive behavior is wrong:**

1. Check breakpoint values in Tailwind config
2. Verify correct responsive prefixes (`md:`, `lg:`, `xl:`)
3. Test each breakpoint transition point
