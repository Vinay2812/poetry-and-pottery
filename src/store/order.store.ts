import type { OrderWithItems, PaginatedResponse } from "@/types";
import { create } from "zustand";

interface OrderState {
  orders: OrderWithItems[];
  pagination: { page: number; totalPages: number; total: number };
  pendingCount: number;
  isHydrated: boolean;

  // Actions
  hydrate: (
    orders: OrderWithItems[],
    pagination: PaginatedResponse<OrderWithItems>,
  ) => void;
  hydrateCount: (pendingCount: number) => void;
  addOrder: (order: OrderWithItems) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  loadMore: (
    orders: OrderWithItems[],
    pagination: PaginatedResponse<OrderWithItems>,
  ) => void;
  reset: () => void;

  // Getters
  getOrderById: (orderId: string) => OrderWithItems | undefined;
  getCount: () => number;
  getPendingCount: () => number;
}

export const useOrderStore = create<OrderState>()((set, get) => ({
  orders: [],
  pagination: { page: 1, totalPages: 1, total: 0 },
  pendingCount: 0,
  isHydrated: false,

  hydrate: (orders, pagination) =>
    set({
      orders,
      pagination: {
        page: pagination.page,
        totalPages: pagination.totalPages,
        total: pagination.total,
      },
      isHydrated: true,
    }),

  hydrateCount: (pendingCount) =>
    set({
      pendingCount,
      isHydrated: true,
    }),

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
      pagination: { ...state.pagination, total: state.pagination.total + 1 },
      pendingCount: state.pendingCount + 1,
    })),

  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const order = state.orders.find((o) => o.id === orderId);
      const wasPending =
        order && order.status !== "delivered" && order.status !== "cancelled";
      const isPending = status !== "delivered" && status !== "cancelled";
      const pendingDelta = wasPending && !isPending ? -1 : 0;

      return {
        orders: state.orders.map((o) =>
          o.id === orderId ? { ...o, status } : o,
        ),
        pendingCount: state.pendingCount + pendingDelta,
      };
    }),

  loadMore: (orders, pagination) =>
    set((state) => ({
      orders: [...state.orders, ...orders],
      pagination: {
        page: pagination.page,
        totalPages: pagination.totalPages,
        total: pagination.total,
      },
    })),

  reset: () =>
    set({
      orders: [],
      pagination: { page: 1, totalPages: 1, total: 0 },
      pendingCount: 0,
      isHydrated: false,
    }),

  getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),

  getCount: () => get().pagination.total,

  getPendingCount: () => get().pendingCount,
}));
