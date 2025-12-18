import type { PaginatedResponse, WishlistWithProduct } from "@/types";
import { create } from "zustand";

interface WishlistState {
  items: WishlistWithProduct[];
  productIds: number[];
  pagination: { page: number; totalPages: number; total: number };
  isHydrated: boolean;

  // Actions
  hydrate: (
    items: WishlistWithProduct[],
    pagination: PaginatedResponse<WishlistWithProduct>,
  ) => void;
  hydrateIds: (ids: number[]) => void;
  addItem: (item: WishlistWithProduct) => void;
  removeItem: (productId: number) => void;
  loadMore: (
    items: WishlistWithProduct[],
    pagination: PaginatedResponse<WishlistWithProduct>,
  ) => void;
  clear: () => void;
  reset: () => void;

  // Getters
  isInWishlist: (productId: number) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
  items: [],
  productIds: [],
  pagination: { page: 1, totalPages: 1, total: 0 },
  isHydrated: false,

  hydrate: (items, pagination) =>
    set({
      items,
      productIds: items.map((i) => i.product_id),
      pagination: {
        page: pagination.page,
        totalPages: pagination.totalPages,
        total: pagination.total,
      },
      isHydrated: true,
    }),

  hydrateIds: (ids) =>
    set({
      productIds: ids,
      pagination: { ...get().pagination, total: ids.length },
      isHydrated: true,
    }),

  addItem: (item) =>
    set((state) => {
      if (state.productIds.includes(item.product_id)) {
        return state;
      }
      return {
        items: [item, ...state.items],
        productIds: [...state.productIds, item.product_id],
        pagination: { ...state.pagination, total: state.pagination.total + 1 },
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product_id !== productId),
      productIds: state.productIds.filter((id) => id !== productId),
      pagination: { ...state.pagination, total: state.pagination.total - 1 },
    })),

  loadMore: (items, pagination) =>
    set((state) => ({
      items: [...state.items, ...items],
      productIds: [
        ...state.productIds,
        ...items
          .map((i) => i.product_id)
          .filter((id) => !state.productIds.includes(id)),
      ],
      pagination: {
        page: pagination.page,
        totalPages: pagination.totalPages,
        total: pagination.total,
      },
    })),

  clear: () =>
    set({
      items: [],
      productIds: [],
      pagination: { page: 1, totalPages: 1, total: 0 },
    }),

  reset: () =>
    set({
      items: [],
      productIds: [],
      pagination: { page: 1, totalPages: 1, total: 0 },
      isHydrated: false,
    }),

  isInWishlist: (productId) => get().productIds.includes(productId),

  getCount: () => get().pagination.total,
}));
