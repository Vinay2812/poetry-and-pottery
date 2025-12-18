import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: number[];
  isLoading: boolean;
  isSynced: boolean;

  // Actions
  setProductIds: (ids: number[]) => void;
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  toggleItem: (productId: number) => void;
  clearWishlist: () => void;
  setLoading: (loading: boolean) => void;
  setSynced: (synced: boolean) => void;

  // Getters
  isInWishlist: (productId: number) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      isLoading: false,
      isSynced: false,

      setProductIds: (productIds) => set({ productIds, isSynced: true }),

      addItem: (productId) =>
        set((state) => {
          if (state.productIds.includes(productId)) {
            return state;
          }
          return { productIds: [...state.productIds, productId] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        })),

      toggleItem: (productId) =>
        set((state) => {
          if (state.productIds.includes(productId)) {
            return {
              productIds: state.productIds.filter((id) => id !== productId),
            };
          }
          return { productIds: [...state.productIds, productId] };
        }),

      clearWishlist: () => set({ productIds: [], isSynced: false }),

      setLoading: (isLoading) => set({ isLoading }),

      setSynced: (isSynced) => set({ isSynced }),

      isInWishlist: (productId) => get().productIds.includes(productId),

      getCount: () => get().productIds.length,
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        productIds: state.productIds,
      }),
    },
  ),
);
