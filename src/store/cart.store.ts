import type { CartWithProduct } from "@/types";
import { create } from "zustand";

interface CartState {
  items: CartWithProduct[];
  isHydrated: boolean;

  // Actions
  hydrate: (items: CartWithProduct[]) => void;
  addItem: (item: CartWithProduct) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
  reset: () => void;

  // Getters
  getQuantity: (productId: number) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  isHydrated: false,

  hydrate: (items) => set({ items, isHydrated: true }),

  addItem: (item) =>
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.product_id === item.product_id ? item : i,
      );

      return { items: updatedItems };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((i) => i.product_id !== productId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product_id === productId ? { ...i, quantity } : i,
        ),
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product_id !== productId),
    })),

  clear: () => set({ items: [] }),

  reset: () => set({ items: [], isHydrated: false }),

  getQuantity: (productId) => {
    const item = get().items.find((i) => i.product_id === productId);
    return item?.quantity ?? 0;
  },

  getTotalItems: () => {
    return get().items.length;
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );
  },
}));
