import { create } from "zustand";

interface UIState {
  // Mobile filter sheet
  isFilterSheetOpen: boolean;
  setFilterSheetOpen: (open: boolean) => void;
  toggleFilterSheet: () => void;

  // Mobile cart sheet
  isCartSheetOpen: boolean;
  setCartSheetOpen: (open: boolean) => void;
  toggleCartSheet: () => void;

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
}

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

let toastId = 0;

export const useUIStore = create<UIState>((set) => ({
  // Filter sheet
  isFilterSheetOpen: false,
  setFilterSheetOpen: (isFilterSheetOpen) => set({ isFilterSheetOpen }),
  toggleFilterSheet: () =>
    set((state) => ({ isFilterSheetOpen: !state.isFilterSheetOpen })),

  // Cart sheet
  isCartSheetOpen: false,
  setCartSheetOpen: (isCartSheetOpen) => set({ isCartSheetOpen }),
  toggleCartSheet: () =>
    set((state) => ({ isCartSheetOpen: !state.isCartSheetOpen })),

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
}));
