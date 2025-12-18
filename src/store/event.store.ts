import type { PaginatedResponse, RegistrationWithEvent } from "@/types";
import { create } from "zustand";

interface EventState {
  registrations: RegistrationWithEvent[];
  pagination: { page: number; totalPages: number; total: number };
  isHydrated: boolean;

  // Actions
  hydrate: (
    registrations: RegistrationWithEvent[],
    pagination: PaginatedResponse<RegistrationWithEvent>,
  ) => void;
  hydrateCount: (count: number) => void;
  addRegistration: (registration: RegistrationWithEvent) => void;
  removeRegistration: (registrationId: string) => void;
  loadMore: (
    registrations: RegistrationWithEvent[],
    pagination: PaginatedResponse<RegistrationWithEvent>,
  ) => void;
  reset: () => void;

  // Getters
  getRegistrationById: (
    registrationId: string,
  ) => RegistrationWithEvent | undefined;
  isRegisteredForEvent: (eventId: string) => boolean;
  getCount: () => number;
}

export const useEventStore = create<EventState>()((set, get) => ({
  registrations: [],
  pagination: { page: 1, totalPages: 1, total: 0 },
  isHydrated: false,

  hydrate: (registrations, pagination) =>
    set({
      registrations,
      pagination: {
        page: pagination.page,
        totalPages: pagination.totalPages,
        total: pagination.total,
      },
      isHydrated: true,
    }),

  hydrateCount: (count) =>
    set((state) => ({
      pagination: { ...state.pagination, total: count },
      isHydrated: true,
    })),

  addRegistration: (registration) =>
    set((state) => ({
      registrations: [registration, ...state.registrations],
      pagination: { ...state.pagination, total: state.pagination.total + 1 },
    })),

  removeRegistration: (registrationId) =>
    set((state) => ({
      registrations: state.registrations.filter((r) => r.id !== registrationId),
      pagination: { ...state.pagination, total: state.pagination.total - 1 },
    })),

  loadMore: (registrations, pagination) =>
    set((state) => ({
      registrations: [...state.registrations, ...registrations],
      pagination: {
        page: pagination.page,
        totalPages: pagination.totalPages,
        total: pagination.total,
      },
    })),

  reset: () =>
    set({
      registrations: [],
      pagination: { page: 1, totalPages: 1, total: 0 },
      isHydrated: false,
    }),

  getRegistrationById: (registrationId) =>
    get().registrations.find((r) => r.id === registrationId),

  isRegisteredForEvent: (eventId) =>
    get().registrations.some((r) => r.event_id === eventId),

  getCount: () => get().pagination.total,
}));
