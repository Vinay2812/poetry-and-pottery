import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isSynced: boolean;

  // Actions
  setItems: (items: CartItem[]) => void;
  addItem: (productId: number, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setSynced: (synced: boolean) => void;

  // Getters
  getQuantity: (productId: number) => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isSynced: false,

      setItems: (items) => set({ items, isSynced: true }),

      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i,
            ),
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      clearCart: () => set({ items: [], isSynced: false }),

      setLoading: (isLoading) => set({ isLoading }),

      setSynced: (isSynced) => set({ isSynced }),

      getQuantity: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        return item?.quantity ?? 0;
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
