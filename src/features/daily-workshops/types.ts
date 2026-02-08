import type {
  DailyWorkshopAvailabilityDay,
  DailyWorkshopAvailabilityResponse,
  DailyWorkshopConfig,
  DailyWorkshopRegistration,
  DailyWorkshopRegistrationStatus,
} from "@/data/daily-workshops/types";

export interface DailyWorkshopCalendarDayViewModel {
  dateKey: string;
  date: Date;
  dayOfMonth: number;
  isSelected: boolean;
  isInCurrentMonth: boolean;
  isSelectable: boolean;
  hasSelectedSlots: boolean;
}

export interface DailyWorkshopTimeSlotViewModel {
  startAt: Date | string;
  endAt: Date | string;
  isAvailable: boolean;
  remainingCapacity: number;
  reason?: string | null;
  isSelected: boolean;
}

export interface DailyWorkshopsBookingViewModel {
  config: DailyWorkshopConfig;
  availableConfigs: DailyWorkshopConfig[];
  selectedConfigId: number;
  isConfigLoading: boolean;
  configError: string | null;
  monthLabel: string;
  activeDateKey: string;
  activeDateLabel: string;
  selectedDateTabs: Array<{ dateKey: string; label: string; hours: number }>;
  calendarDays: DailyWorkshopCalendarDayViewModel[];
  activeDaySlots: DailyWorkshopTimeSlotViewModel[];
  participants: number;
  maxParticipants: number;
  totalHours: number;
  selectedSlotsCount: number;
  selectedTierLabel: string;
  appliedTierCounts: Record<number, number>;
  pricePerPerson: number;
  piecesPerPerson: number;
  totalPieces: number;
  totalAmount: number;
  bookingError: string | null;
}

export interface DailyWorkshopsBookingProps {
  viewModel: DailyWorkshopsBookingViewModel;
  onSelectConfig: (configId: number) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (dateKey: string) => void;
  onToggleSlot: (slotStartAt: Date | string) => void;
  onParticipantsChange: (delta: -1 | 1) => void;
  onBook: () => void;
  isBooking: boolean;
  isSlotSelectionPending: boolean;
}

export interface DailyWorkshopsBookingContainerProps {
  initialAvailability: DailyWorkshopAvailabilityResponse;
  initialConfigs: DailyWorkshopConfig[];
}

export interface DailyWorkshopRescheduleViewModel {
  registrationId: string;
  monthLabel: string;
  activeDateKey: string;
  activeDateLabel: string;
  selectedDateTabs: Array<{ dateKey: string; label: string; hours: number }>;
  calendarDays: DailyWorkshopCalendarDayViewModel[];
  activeDaySlots: DailyWorkshopTimeSlotViewModel[];
  requiredSlots: number;
  requiredHours: number;
  selectedSlotsCount: number;
  bookingError: string | null;
}

export interface DailyWorkshopRescheduleProps {
  viewModel: DailyWorkshopRescheduleViewModel;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (dateKey: string) => void;
  onToggleSlot: (slotStartAt: Date | string) => void;
  onReschedule: () => void;
  isSubmitting: boolean;
  isSlotSelectionPending: boolean;
}

export interface DailyWorkshopRescheduleContainerProps {
  registration: DailyWorkshopRegistration;
  initialAvailability: DailyWorkshopAvailabilityResponse;
}

export interface DailyWorkshopStatusStep {
  label: string;
  date?: Date | string | null;
  isCompleted: boolean;
  isActive: boolean;
}

export interface DailyWorkshopDayTimelineViewModel {
  dateKey: string;
  label: string;
  hours: number;
  slots: Array<{
    id: number;
    startAt: Date | string;
    endAt: Date | string;
  }>;
}

export interface DailyWorkshopRegistrationDetailViewModel {
  registration: DailyWorkshopRegistration;
  status: DailyWorkshopRegistrationStatus;
  statusLabel: string;
  cancellationTitle: string | null;
  cancellationNotice: string | null;
  canReschedule: boolean;
  rescheduleRequiredSlots: number;
  rescheduleRequiredHours: number;
  activeDayKey: string;
  dayTimelines: DailyWorkshopDayTimelineViewModel[];
  statusSteps: DailyWorkshopStatusStep[];
  participants: number;
  totalHours: number;
  totalPieces: number;
  finalAmount: number;
  discount: number;
  pricePerPerson: number;
  tierLabel: string;
}

export interface DailyWorkshopRegistrationDetailProps {
  viewModel: DailyWorkshopRegistrationDetailViewModel;
  onSelectDay: (dayKey: string) => void;
}

export interface DailyWorkshopRegistrationDetailContainerProps {
  registration: DailyWorkshopRegistration;
  config: DailyWorkshopConfig | null;
}

export type {
  DailyWorkshopAvailabilityDay,
  DailyWorkshopAvailabilityResponse,
  DailyWorkshopRegistration,
};
