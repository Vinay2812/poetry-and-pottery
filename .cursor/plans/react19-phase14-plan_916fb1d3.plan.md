---
name: react19-phase14-plan
overview: Create a comprehensive, file-referenced plan to apply Phase 14 React 19 performance patterns across every app area (storefront, events, account, navigation, content, auth, and admin).
todos:
  - id: task-14-1-viewtransition
    content: Add ViewTransition config and shared elements
    status: pending
  - id: task-14-2-navigation
    content: Wrap router.push with useTransition across app
    status: pending
  - id: task-14-3-optimistic-cart
    content: Replace cart rollback with useOptimistic
    status: pending
  - id: task-14-4-optimistic-wishlist
    content: Replace wishlist rollback with useOptimistic
    status: pending
  - id: task-14-5-filters
    content: Apply useTransition to filters and admin lists
    status: pending
  - id: task-14-6-suspense
    content: Add Suspense boundaries in async sections
    status: pending
  - id: task-14-7-activity
    content: Add Activity wrappers for dialogs/sheets
    status: pending
  - id: task-14-8-optimistic-reviews
    content: Replace review like rollback with useOptimistic
    status: pending
  - id: task-14-9-loading-hook
    content: Add useLoadingTransition and replace loading Sets
    status: pending
  - id: task-14-10-formstatus
    content: Apply useFormStatus to all forms
    status: pending
  - id: task-14-11-route-provider
    content: Add route animation provider and app wiring
    status: pending
  - id: verify
    content: Run tsc/prettier and verify UI behaviors
    status: pending
isProject: false
---

## Plan: Phase 14 React 19 Integration (All App Areas)

### Sources and constraints

- Use `Phase 14: React 19 Performance Optimizations` in [design-refactor.md](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/design-refactor.md) as the authoritative checklist.
- Cross‑reference the mandatory checklist and patterns in [prompt-implement.md](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/prompt-implement.md).
- Keep Container/Component separation intact and avoid introducing non-visual logic into presentational components.

### Task 14.1: ViewTransition page animations (Storefront + Events + Cart)

- Enable ViewTransition in `next.config.ts`.
- Add global transition styles in `src/app/globals.css`.
- Products: add shared element names in:
- [src/features/product-card/components/product-card.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/product-card/components/product-card.tsx)
- [src/features/product-detail/components/product-detail.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/product-detail/components/product-detail.tsx)
- Events: add shared element names in:
- [src/components/cards/event-card.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/cards/event-card.tsx)
- [src/features/events/components/event-detail.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/events/components/event-detail.tsx)
- Cart → Order confirmation: ensure default root transition styles apply.

### Task 14.2: useTransition for all navigation (Storefront + Events + Account + Admin)

Cover every `router.push` call and navigation handler:

- Storefront / public:
- [src/features/product-card/containers/product-card-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/product-card/containers/product-card-container.tsx)
- [src/features/global-search/containers/global-search-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/global-search/containers/global-search-container.tsx)
- [src/features/events/containers/event-detail-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/events/containers/event-detail-container.tsx)
- [src/features/cart/containers/cart-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/cart/containers/cart-container.tsx)
- [src/features/layout/containers/account-dropdown-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/layout/containers/account-dropdown-container.tsx)
- [src/components/events/events-tabs.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/events/events-tabs.tsx)
- [src/components/auth/flow-chooser.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/auth/flow-chooser.tsx)
- [src/components/dashboard/dashboard-shell.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/dashboard/dashboard-shell.tsx)
- Admin dashboard (tables/forms already using `useTransition` but not wrapping `router.push`):
- [src/features/dashboard/users/containers/users-table-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/users/containers/users-table-container.tsx)
- [src/features/dashboard/products/containers/products-table-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/products/containers/products-table-container.tsx)
- [src/features/dashboard/products/containers/product-form-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/products/containers/product-form-container.tsx)
- [src/features/dashboard/events/containers/events-table-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/events/containers/events-table-container.tsx)
- [src/features/dashboard/events/containers/event-form-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/events/containers/event-form-container.tsx)
- [src/features/dashboard/content/containers/content-page-editor-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/content/containers/content-page-editor-container.tsx)
- [src/components/dashboard/users-table.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/dashboard/users-table.tsx)
- Route guard providers (intentional redirects; evaluate if transitions are appropriate):
- [src/providers/admin-route-guard-provider.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/providers/admin-route-guard-provider.tsx)
- [src/providers/route-guard-provider.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/providers/route-guard-provider.tsx)
- Add `NavigationProgress` and render based on `isPending` in the navigation shell.

### Task 14.3: useOptimistic for cart (Storefront)

- Replace manual rollback in:
- [src/hooks/use-cart.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/hooks/use-cart.ts)
- Ensure optimistic state is derived from `useOptimistic` and error paths no longer manually revert.

### Task 14.4: useOptimistic for wishlist (Account)

- Replace manual rollback and `loadingProducts` sets in:
- [src/hooks/use-wishlist.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/hooks/use-wishlist.ts)

### Task 14.5: useTransition for filters (Storefront + Events + Admin lists)

- Product filters:
- [src/features/products/hooks/use-product-filters.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/products/hooks/use-product-filters.ts)
- Event filters (if present):
- [src/features/events/hooks/use-event-filters.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/events/hooks/use-event-filters.ts)
- Admin table search/filter pagination (same files as Task 14.2 for tables); ensure filter changes use `startTransition`.

### Task 14.6: Suspense boundaries (Storefront + Events + Wishlist + Dashboard)

- Product detail:
- [src/features/product-detail/containers/product-detail-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/product-detail/containers/product-detail-container.tsx)
- Async related products: [src/features/recommended-products/containers/recommended-products-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/recommended-products/containers/recommended-products-container.tsx)
- Events list:
- [src/features/events/containers/all-events-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/events/containers/all-events-container.tsx)
- Wishlist:
- [src/features/wishlist/containers/wishlist-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/wishlist/containers/wishlist-container.tsx)
- Cart summary or recommended sections (if async):
- [src/features/cart/containers/cart-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/cart/containers/cart-container.tsx)
- Dashboard streaming (admin):
- [src/app/dashboard/page.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/app/dashboard/page.tsx)
- [src/app/dashboard/products/[id]/page.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/app/dashboard/products/[id]/page.tsx)
- [src/app/dashboard/events/[id]/page.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/app/dashboard/events/[id]/page.tsx)
- Ensure skeleton fallbacks exist in `src/components/skeletons/` or add minimal ones.

### Task 14.7: Activity for dialogs/sheets (Account + Storefront + Events + Admin)

- Base wrappers:
- [src/components/ui/dialog.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/ui/dialog.tsx)
- [src/components/ui/sheet.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/ui/sheet.tsx)
- Complex dialogs/sheets:
- [src/features/dashboard/orders/containers/order-detail-dialog-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/orders/containers/order-detail-dialog-container.tsx)
- [src/features/dashboard/registrations/containers/registration-detail-dialog-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/registrations/containers/registration-detail-dialog-container.tsx)
- [src/components/shared/reviews-sheet.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/shared/reviews-sheet.tsx)
- [src/components/products/product-image-gallery.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/products/product-image-gallery.tsx)
- [src/components/address/address-selector.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/address/address-selector.tsx)
- [src/features/dashboard/categories/components/categories-table.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/categories/components/categories-table.tsx)
- [src/features/uploads/components/r2-image-uploader.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/uploads/components/r2-image-uploader.tsx)
- [src/features/events/components/past-workshop-detail.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/events/components/past-workshop-detail.tsx)

### Task 14.8: useOptimistic for review likes (Products + Events)

- Replace manual rollback in:
- [src/components/shared/reviews-sheet.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/shared/reviews-sheet.tsx)
- [src/features/product-detail/containers/product-detail-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/product-detail/containers/product-detail-container.tsx)
- [src/features/events/containers/past-workshop-detail-container.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/events/containers/past-workshop-detail-container.tsx)

### Task 14.9: Shared loading state hook (Cart + Wishlist + Event Registration)

- Add a `useLoadingTransition` hook:
- [src/hooks/use-loading-transition.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/hooks/use-loading-transition.ts)
- Replace loading Set patterns in:
- [src/hooks/use-cart.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/hooks/use-cart.ts)
- [src/hooks/use-wishlist.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/hooks/use-wishlist.ts)
- [src/hooks/use-event-registration.ts](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/hooks/use-event-registration.ts)

### Task 14.10: useFormStatus on all forms (Storefront + Account + Admin + Content)

- Consumer forms:
- [src/components/forms/address-form.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/forms/address-form.tsx)
- [src/components/forms/contact-form.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/forms/contact-form.tsx)
- [src/components/shared/review-form.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/shared/review-form.tsx)
- [src/features/layout/components/footer.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/layout/components/footer.tsx)
- Admin forms:
- [src/features/dashboard/products/components/product-form.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/products/components/product-form.tsx)
- [src/features/dashboard/events/components/event-form.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/events/components/event-form.tsx)
- [src/features/dashboard/settings/components/settings-form.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/features/dashboard/settings/components/settings-form.tsx)
- Update containers to rely on server actions + `useFormStatus` for submit pending state, removing manual `isSubmitting`/`isPending` props.

### Task 14.11: Route animation provider (Global)

- Add provider at [src/components/providers/route-animation-provider.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/components/providers/route-animation-provider.tsx).
- Wrap [src/app/layout.tsx](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/src/app/layout.tsx) with the provider.
- Ensure provider handles view transitions and shows `NavigationProgress` on pending navigations.

### App Area Coverage Checklist (no gaps)

- Storefront: product lists, product detail, recommended products, reviews.
- Cart/Checkout: cart list, order summary, checkout redirect.
- Events: list, detail, registration, past workshop reviews.
- Account: wishlist, orders, address selection.
- Navigation/Layout: navbar, global search, account dropdown, tabs, pagination.
- Content pages: contact form, newsletter.
- Auth: flow chooser navigation.
- Admin dashboard: tables, filters, forms, detail dialogs, settings, uploads.
- Providers: route guards and route animation provider.

### Verification (per prompt-implement)

- Run `bun run tsc` and `bun run prettier:format` in `poetry-and-pottery/`.
- Use agent browser to confirm transitions, pending states, and dialog isolation at 375/768/1440 widths.
- Re-check the React 19 checklist in [prompt-implement.md](/Users/apple/Desktop/personal/poetry-and-pottery-workspace/poetry-and-pottery/prompt-implement.md) before marking tasks complete.
