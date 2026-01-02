import type { KanbanColumn } from "@/components/dashboard/kanban-board";

import type { AdminUserRegistration } from "@/graphql/generated/types";

/**
 * View model for the registration detail dialog.
 * Contains pre-computed display values for the UI.
 */
export interface RegistrationViewModel {
  id: string;
  eventTitle: string;
  eventImage: string | null;
  eventLocation: string | null;
  eventPricePerSeat: number;
  formattedDate: string;
  formattedTime: string;
  formattedCreatedAt: string;
  editedPrice: number;
  editedDiscount: number;
  editedSeats: number;
  finalAmount: number;
  isPending: boolean;
}

/**
 * Props for the presentational RegistrationDetailDialog component.
 * Uses on* naming convention for all callbacks.
 */
export interface RegistrationDetailDialogProps {
  open: boolean;
  viewModel: RegistrationViewModel | null;
  onOpenChange: (open: boolean) => void;
  onPriceChange: (newPrice: number) => void;
  onDiscountChange: (newDiscount: number) => void;
  onSeatsChange: (newSeats: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

/**
 * Props for the container component.
 * Receives raw data from parent and manages state internally.
 */
export interface RegistrationDetailDialogContainerProps {
  registration: AdminUserRegistration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Raw registration data from the server.
 * Type alias for AdminUserRegistration.
 */
export type RegistrationData = AdminUserRegistration;

/**
 * View model for a single registration card in the board.
 */
export interface RegistrationCardViewModel {
  id: string;
  eventTitle: string;
  eventLocation: string | null;
  eventImage: string | null;
  eventStartsAt: Date | string;
  price: number;
  discount: number;
  finalAmount: number;
  seatsReserved: number;
}

/**
 * Props for the RegistrationCard presentational component.
 */
export interface RegistrationCardProps {
  viewModel: RegistrationCardViewModel;
  isDragging?: boolean;
  onClick: () => void;
}

/**
 * Props for the RegistrationsBoard presentational component.
 */
export interface RegistrationsBoardProps {
  columns: KanbanColumn<AdminUserRegistration>[];
  isLoading: boolean;
  selectedRegistration: AdminUserRegistration | null;
  dialogOpen: boolean;
  onMove: (
    itemId: string,
    fromColumn: string,
    toColumn: string,
  ) => Promise<void>;
  onCardClick: (registration: AdminUserRegistration) => void;
  onDialogOpenChange: (open: boolean) => void;
}

/**
 * Props for the RegistrationsBoardContainer.
 */
export interface RegistrationsBoardContainerProps {
  registrations: AdminUserRegistration[];
}

/**
 * Build registration card view model from raw registration data.
 */
export function buildRegistrationCardViewModel(
  registration: AdminUserRegistration,
): RegistrationCardViewModel {
  return {
    id: registration.id,
    eventTitle: registration.event.title,
    eventLocation: registration.event.location,
    eventImage: registration.event.image,
    eventStartsAt: registration.event.starts_at,
    price: registration.price,
    discount: registration.discount,
    finalAmount: Math.max(0, registration.price - registration.discount),
    seatsReserved: registration.seats_reserved,
  };
}
