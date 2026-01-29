import { create } from "zustand";

interface UIState {
  // Mobile filter sheet
  isFilterSheetOpen: boolean;
  setFilterSheetOpen: (open: boolean) => void;
  toggleFilterSheet: () => void;

  // Reviews sheet
  isReviewsSheetOpen: boolean;
  setReviewsSheetOpen: (open: boolean) => void;
  toggleReviewsSheet: () => void;

  // Sign in modal
  isSignInModalOpen: boolean;
  setSignInModalOpen: (open: boolean) => void;
  signInRedirectUrl: string | null;
  setSignInRedirectUrl: (url: string | null) => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Counts
  cartCount: number;
  setCartCount: (count: number) => void;
  wishlistCount: number;
  setWishlistCount: (count: number) => void;
  eventRegistrationsCount: number;
  setEventRegistrationsCount: (count: number) => void;
  pendingOrdersCount: number;
  setPendingOrdersCount: (count: number) => void;

  // Wishlist IDs (for optimistic updates)
  wishlistIds: Set<number>;
  isWishlistHydrated: boolean;
  hydrateWishlistIds: (ids: number[]) => void;
  addWishlistId: (id: number) => void;
  removeWishlistId: (id: number) => void;
  toggleWishlistId: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  resetWishlist: () => void;
}

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

let toastId = 0;

export const useUIStore = create<UIState>((set, get) => ({
  // Filter sheet
  isFilterSheetOpen: false,
  setFilterSheetOpen: (isFilterSheetOpen) => set({ isFilterSheetOpen }),
  toggleFilterSheet: () =>
    set((state) => ({ isFilterSheetOpen: !state.isFilterSheetOpen })),

  // Reviews sheet
  isReviewsSheetOpen: false,
  setReviewsSheetOpen: (isReviewsSheetOpen) => set({ isReviewsSheetOpen }),
  toggleReviewsSheet: () =>
    set((state) => ({ isReviewsSheetOpen: !state.isReviewsSheetOpen })),

  // Sign in modal
  isSignInModalOpen: false,
  setSignInModalOpen: (isSignInModalOpen) => set({ isSignInModalOpen }),
  signInRedirectUrl: null,
  setSignInRedirectUrl: (signInRedirectUrl) => set({ signInRedirectUrl }),

  // Toasts
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: `toast-${++toastId}` }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),

  // Counts
  cartCount: 0,
  setCartCount: (cartCount) => set({ cartCount }),
  wishlistCount: 0,
  setWishlistCount: (wishlistCount) => set({ wishlistCount }),
  eventRegistrationsCount: 0,
  setEventRegistrationsCount: (eventRegistrationsCount) =>
    set({ eventRegistrationsCount }),
  pendingOrdersCount: 0,
  setPendingOrdersCount: (pendingOrdersCount) => set({ pendingOrdersCount }),

  // Wishlist IDs (for optimistic updates)
  wishlistIds: new Set<number>(),
  isWishlistHydrated: false,
  hydrateWishlistIds: (ids) =>
    set({
      wishlistIds: new Set(ids),
      isWishlistHydrated: true,
      wishlistCount: ids.length,
    }),
  addWishlistId: (id) =>
    set((state) => {
      const next = new Set(state.wishlistIds);
      next.add(id);
      return { wishlistIds: next, wishlistCount: next.size };
    }),
  removeWishlistId: (id) =>
    set((state) => {
      const next = new Set(state.wishlistIds);
      next.delete(id);
      return { wishlistIds: next, wishlistCount: next.size };
    }),
  toggleWishlistId: (id) =>
    set((state) => {
      const next = new Set(state.wishlistIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { wishlistIds: next, wishlistCount: next.size };
    }),
  isInWishlist: (id) => get().wishlistIds.has(id),
  resetWishlist: () =>
    set({
      wishlistIds: new Set<number>(),
      isWishlistHydrated: false,
      wishlistCount: 0,
    }),
}));
