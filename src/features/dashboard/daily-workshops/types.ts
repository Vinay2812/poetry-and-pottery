import type { KanbanColumn } from "@/components/dashboard/kanban-board";

import { createDate, formatDateTime, formatDateTimeLocal } from "@/lib/date";

import {
  type AdminDailyWorkshopBlackoutRule,
  type AdminDailyWorkshopConfig,
  type AdminDailyWorkshopPricingTier,
  type AdminUpdateDailyWorkshopConfigInput,
  type AdminUpsertDailyWorkshopBlackoutRuleInput,
  type AdminUpsertDailyWorkshopPricingTierInput,
  type AdminUserDailyWorkshopRegistrationsForUserQuery,
  DailyWorkshopBlackoutType,
  DailyWorkshopRegistrationStatus,
} from "@/graphql/generated/types";

export type AdminUserDailyWorkshopRegistration =
  AdminUserDailyWorkshopRegistrationsForUserQuery["adminUserDailyWorkshopRegistrations"][number];

export type DailyWorkshopsDashboardTab = "config" | "pricing" | "blackouts";

export interface DailyWorkshopsDashboardContainerProps {
  configs: AdminDailyWorkshopConfig[];
  initialConfigId: number | null;
  pricingTiers: AdminDailyWorkshopPricingTier[];
  blackoutRules: AdminDailyWorkshopBlackoutRule[];
}

export interface PricingTierDraft {
  hours: number;
  price_per_person: number;
  pieces_per_person: number;
  sort_order: number;
  is_active: boolean;
}

export interface BlackoutRuleDraft {
  name: string;
  type: DailyWorkshopBlackoutType;
  reason: string;
  is_active: boolean;
  auto_cancel_existing: boolean;
  timezone: string;
  startTime: string;
  endTime: string;
  oneTimeDate: string;
  recurrenceStartDate: string;
  recurrenceEndDate: string;
  weekdaysCsv: string;
  monthDaysCsv: string;
}

export interface DailyWorkshopConfigViewModel {
  id: number;
  name: string;
  description: string;
  timezone: string;
  openingHourLabel: string;
  closingHourLabel: string;
  slotDurationLabel: string;
  slotCapacity: number;
  bookingWindowDays: number;
  isActive: boolean;
  autoCancelOnBlackout: boolean;
}

export interface PricingTierRowViewModel {
  id: number;
  hours: number;
  pricePerPersonLabel: string;
  piecesPerPerson: number;
  sortOrder: number;
  isActive: boolean;
  createdAtLabel: string;
  updatedAtLabel: string;
}

export interface BlackoutRuleRowViewModel {
  id: string;
  name: string;
  type: DailyWorkshopBlackoutType;
  scheduleLabel: string;
  reasonLabel: string;
  rangeLabel: string;
  timezone: string;
  isActive: boolean;
  autoCancelExisting: boolean;
  createdAtLabel: string;
}

export interface DailyWorkshopsDashboardViewModel {
  activeTab: DailyWorkshopsDashboardTab;
  summary: {
    tiersCount: number;
    activeTiersCount: number;
    blackoutsCount: number;
    activeBlackoutsCount: number;
  };
  config: DailyWorkshopConfigViewModel;
  pricingTiers: PricingTierRowViewModel[];
  blackoutRules: BlackoutRuleRowViewModel[];
}

export interface ConfigFormErrors {
  name?: string;
  timezone?: string;
  opening_hour?: string;
  closing_hour?: string;
  slot_duration_minutes?: string;
  slot_capacity?: string;
  booking_window_days?: string;
}

export interface BlackoutFormErrors {
  name?: string;
  timezone?: string;
  startTime?: string;
  endTime?: string;
  oneTimeDate?: string;
  recurrenceStartDate?: string;
  recurrenceEndDate?: string;
  weekdaysCsv?: string;
  monthDaysCsv?: string;
}

export interface DailyWorkshopsDashboardProps {
  configs: AdminDailyWorkshopConfig[];
  selectedConfigId: number | null;
  viewModel: DailyWorkshopsDashboardViewModel | null;
  isPending: boolean;
  configForm: AdminUpdateDailyWorkshopConfigInput;
  configFormErrors: ConfigFormErrors;
  tierDraft: PricingTierDraft;
  blackoutDraft: BlackoutRuleDraft;
  blackoutFormErrors: BlackoutFormErrors;
  editingTierId: number | null;
  editingBlackoutId: string | null;
  onSelectConfig: (configId: number) => void;
  onCreateConfig: () => void;
  onDeleteConfig: () => void;
  onTabChange: (tab: DailyWorkshopsDashboardTab) => void;
  onConfigFormChange: (
    field: keyof AdminUpdateDailyWorkshopConfigInput,
    value: string | number | boolean,
  ) => void;
  onSaveConfig: () => void;
  onTierDraftChange: (
    field: keyof PricingTierDraft,
    value: string | number | boolean,
  ) => void;
  onSaveTier: () => void;
  onEditTier: (tierId: number) => void;
  onCancelTierEdit: () => void;
  onDeleteTier: (tierId: number) => void;
  onBlackoutDraftChange: (
    field: keyof BlackoutRuleDraft,
    value: string | boolean,
  ) => void;
  onSaveBlackout: () => void;
  onEditBlackout: (ruleId: string) => void;
  onCancelBlackoutEdit: () => void;
  onDeleteBlackout: (ruleId: string) => void;
}

export interface ConfigPickerProps {
  configs: AdminDailyWorkshopConfig[];
  selectedConfigId: number | null;
  isPending: boolean;
  onSelectConfig: (configId: number) => void;
  onCreateConfig: () => void;
  onDeleteConfig: () => void;
}

export interface DailyWorkshopSummaryCardsProps {
  tiersCount: number;
  activeTiersCount: number;
  blackoutsCount: number;
  activeBlackoutsCount: number;
  openingHourLabel: string;
  closingHourLabel: string;
  slotDurationLabel: string;
  bookingWindowDays: number;
}

export interface DailyWorkshopConfigFormProps {
  configForm: AdminUpdateDailyWorkshopConfigInput;
  configFormErrors: ConfigFormErrors;
  openingHourLabel: string;
  closingHourLabel: string;
  isPending: boolean;
  onConfigFormChange: (
    field: keyof AdminUpdateDailyWorkshopConfigInput,
    value: string | number | boolean,
  ) => void;
  onSaveConfig: () => void;
}

export interface PricingTierFormProps {
  tierDraft: PricingTierDraft;
  editingTierId: number | null;
  tiersCount: number;
  isPending: boolean;
  onTierDraftChange: (
    field: keyof PricingTierDraft,
    value: string | number | boolean,
  ) => void;
  onSaveTier: () => void;
  onCancelTierEdit: () => void;
}

export interface PricingTiersTableProps {
  tiers: PricingTierRowViewModel[];
  isPending: boolean;
  onEditTier: (tierId: number) => void;
  onDeleteTier: (tierId: number) => void;
}

export interface PricingTierCardProps {
  hours: number;
  pricePerPersonLabel: string;
  piecesPerPerson: number;
  sortOrder: number;
  isActive: boolean;
  updatedAtLabel: string;
  isPending: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export interface BlackoutRuleFormProps {
  blackoutDraft: BlackoutRuleDraft;
  blackoutFormErrors: BlackoutFormErrors;
  editingBlackoutId: string | null;
  isPending: boolean;
  onBlackoutDraftChange: (
    field: keyof BlackoutRuleDraft,
    value: string | boolean,
  ) => void;
  onSaveBlackout: () => void;
  onCancelBlackoutEdit: () => void;
}

export interface BlackoutRuleCardProps {
  name: string;
  type: DailyWorkshopBlackoutType;
  isActive: boolean;
  scheduleLabel: string;
  rangeLabel: string;
  timezone: string;
  reasonLabel: string;
  createdAtLabel: string;
  isPending: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export interface BlackoutRulesListProps {
  blackoutRules: BlackoutRuleRowViewModel[];
  blackoutsCount: number;
  isPending: boolean;
  onEditBlackout: (ruleId: string) => void;
  onDeleteBlackout: (ruleId: string) => void;
}

export function minutesToTimeInput(minutes: number): string {
  const boundedMinutes = Math.max(0, Math.min(24 * 60 - 1, minutes));
  const hours = Math.floor(boundedMinutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (boundedMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
}

export function timeInputToMinutes(time: string): number {
  const [hoursRaw, minutesRaw] = time.split(":");
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return 0;
  }

  return hours * 60 + minutes;
}

export function formatHourLabel(hour: number): string {
  const normalizedHour = ((hour % 24) + 24) % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";
  const twelveHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
  return `${twelveHour}:00 ${suffix}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateValue(
  dateValue: Date | string | null | undefined,
  timeZone?: string,
): string {
  if (!dateValue) return "-";
  return createDate(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(timeZone ? { timeZone } : {}),
  });
}

function formatBlackoutSchedule(rule: AdminDailyWorkshopBlackoutRule): string {
  switch (rule.type) {
    case DailyWorkshopBlackoutType.OneTime:
      return `${formatDateValue(rule.one_time_start_at, rule.timezone)} - ${formatDateValue(rule.one_time_end_at, rule.timezone)}`;
    case DailyWorkshopBlackoutType.Weekly:
      return rule.weekdays.length > 0
        ? `Weekly on ${rule.weekdays.join(", ")}`
        : "Weekly recurring";
    case DailyWorkshopBlackoutType.Monthly:
      return rule.month_days.length > 0
        ? `Monthly on days ${rule.month_days.join(", ")}`
        : "Monthly recurring";
    case DailyWorkshopBlackoutType.Daily:
    default:
      return "Daily recurring";
  }
}

function formatRange(minutesStart: number, minutesEnd: number): string {
  return `${minutesToTimeInput(minutesStart)} - ${minutesToTimeInput(minutesEnd)}`;
}

export function buildDailyWorkshopsDashboardViewModel(
  config: AdminDailyWorkshopConfig,
  pricingTiers: AdminDailyWorkshopPricingTier[],
  blackoutRules: AdminDailyWorkshopBlackoutRule[],
  activeTab: DailyWorkshopsDashboardTab,
): DailyWorkshopsDashboardViewModel {
  const sortedTiers = [...pricingTiers].sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    return a.hours - b.hours;
  });

  const sortedRules = [...blackoutRules].sort((a, b) => {
    return (
      createDate(b.created_at).getTime() - createDate(a.created_at).getTime()
    );
  });

  return {
    activeTab,
    summary: {
      tiersCount: sortedTiers.length,
      activeTiersCount: sortedTiers.filter((tier) => tier.is_active).length,
      blackoutsCount: sortedRules.length,
      activeBlackoutsCount: sortedRules.filter((rule) => rule.is_active).length,
    },
    config: {
      id: config.id,
      name: config.name,
      description: config.description ?? "",
      timezone: config.timezone,
      openingHourLabel: formatHourLabel(config.opening_hour),
      closingHourLabel: formatHourLabel(config.closing_hour),
      slotDurationLabel: `${config.slot_duration_minutes} mins`,
      slotCapacity: config.slot_capacity,
      bookingWindowDays: config.booking_window_days,
      isActive: config.is_active,
      autoCancelOnBlackout: config.auto_cancel_on_blackout,
    },
    pricingTiers: sortedTiers.map((tier) => ({
      id: tier.id,
      hours: tier.hours,
      pricePerPersonLabel: formatCurrency(tier.price_per_person),
      piecesPerPerson: tier.pieces_per_person,
      sortOrder: tier.sort_order,
      isActive: tier.is_active,
      createdAtLabel: formatDateTime(tier.created_at),
      updatedAtLabel: formatDateTime(tier.updated_at),
    })),
    blackoutRules: sortedRules.map((rule) => ({
      id: rule.id,
      name: rule.name,
      type: rule.type,
      scheduleLabel: formatBlackoutSchedule(rule),
      reasonLabel: rule.reason || "No reason specified",
      rangeLabel: formatRange(rule.range_start_minutes, rule.range_end_minutes),
      timezone: rule.timezone,
      isActive: rule.is_active,
      autoCancelExisting: rule.auto_cancel_existing,
      createdAtLabel: formatDateTime(rule.created_at),
    })),
  };
}

export function createInitialTierDraft(): PricingTierDraft {
  return {
    hours: 1,
    price_per_person: 0,
    pieces_per_person: 1,
    sort_order: 0,
    is_active: true,
  };
}

export function createInitialBlackoutDraft(
  timezone: string,
): BlackoutRuleDraft {
  return {
    name: "",
    type: DailyWorkshopBlackoutType.OneTime,
    reason: "",
    is_active: true,
    auto_cancel_existing: true,
    timezone,
    startTime: "13:00",
    endTime: "19:00",
    oneTimeDate: "",
    recurrenceStartDate: "",
    recurrenceEndDate: "",
    weekdaysCsv: "",
    monthDaysCsv: "",
  };
}

export function toTierInput(
  draft: PricingTierDraft,
  id?: number,
): AdminUpsertDailyWorkshopPricingTierInput {
  return {
    id,
    hours: Number(draft.hours),
    price_per_person: Number(draft.price_per_person),
    pieces_per_person: Number(draft.pieces_per_person),
    sort_order: Number(draft.sort_order),
    is_active: draft.is_active,
  };
}

function getTimeZoneParts(
  value: Date,
  timeZone: string,
): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(value);
  const map = new Map(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(map.get("year") ?? "1970"),
    month: Number(map.get("month") ?? "1"),
    day: Number(map.get("day") ?? "1"),
    hour: Number(map.get("hour") ?? "0"),
    minute: Number(map.get("minute") ?? "0"),
    second: Number(map.get("second") ?? "0"),
  };
}

function getTimeZoneOffsetMinutes(value: Date, timeZone: string): number {
  const parts = getTimeZoneParts(value, timeZone);
  const utcFromZoned = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return (utcFromZoned - value.getTime()) / (60 * 1000);
}

function makeDateInTimeZone(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  let utcTime = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  let date = createDate(utcTime);

  for (let i = 0; i < 2; i += 1) {
    const offsetMinutes = getTimeZoneOffsetMinutes(date, timeZone);
    utcTime =
      Date.UTC(year, month - 1, day, hour, minute, 0, 0) -
      offsetMinutes * 60 * 1000;
    date = createDate(utcTime);
  }

  return date;
}

function formatDateInputInTimeZone(
  value: Date | string,
  timeZone: string,
): string {
  const parts = getTimeZoneParts(createDate(value), timeZone);
  const month = String(parts.month).padStart(2, "0");
  const day = String(parts.day).padStart(2, "0");
  return `${parts.year}-${month}-${day}`;
}

function combineDateAndMinutes(
  dateValue: string,
  minutes: number,
  timeZone: string,
): string {
  const [year, month, day] = dateValue.split("-").map(Number);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const combined = makeDateInTimeZone(
    year ?? 1970,
    month ?? 1,
    day ?? 1,
    hours,
    mins,
    timeZone,
  );

  return combined.toISOString();
}

function parseCsvNumberList(raw: string): number[] {
  if (!raw.trim()) return [];

  return raw
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((value) => Number.isFinite(value));
}

export function toBlackoutInput(
  draft: BlackoutRuleDraft,
  id?: string,
): AdminUpsertDailyWorkshopBlackoutRuleInput {
  const rangeStart = timeInputToMinutes(draft.startTime);
  const rangeEnd = timeInputToMinutes(draft.endTime);

  const input: AdminUpsertDailyWorkshopBlackoutRuleInput = {
    id,
    name: draft.name.trim(),
    type: draft.type,
    reason: draft.reason.trim() || undefined,
    is_active: draft.is_active,
    auto_cancel_existing: draft.auto_cancel_existing,
    timezone: draft.timezone,
    range_start_minutes: rangeStart,
    range_end_minutes: rangeEnd,
    weekdays: parseCsvNumberList(draft.weekdaysCsv),
    month_days: parseCsvNumberList(draft.monthDaysCsv),
  };

  if (draft.type === DailyWorkshopBlackoutType.OneTime) {
    if (draft.oneTimeDate) {
      input.one_time_start_at = combineDateAndMinutes(
        draft.oneTimeDate,
        rangeStart,
        draft.timezone,
      );
      input.one_time_end_at = combineDateAndMinutes(
        draft.oneTimeDate,
        rangeEnd,
        draft.timezone,
      );
    }
  } else {
    if (draft.recurrenceStartDate) {
      input.recurrence_start_date = combineDateAndMinutes(
        draft.recurrenceStartDate,
        rangeStart,
        draft.timezone,
      );
    }

    if (draft.recurrenceEndDate) {
      input.recurrence_end_date = combineDateAndMinutes(
        draft.recurrenceEndDate,
        rangeEnd,
        draft.timezone,
      );
    }
  }

  return input;
}

export function toBlackoutDraft(
  rule: AdminDailyWorkshopBlackoutRule,
): BlackoutRuleDraft {
  const oneTimeDate = rule.one_time_start_at
    ? formatDateInputInTimeZone(rule.one_time_start_at, rule.timezone)
    : "";

  const recurrenceStartDate = rule.recurrence_start_date
    ? formatDateInputInTimeZone(rule.recurrence_start_date, rule.timezone)
    : "";

  const recurrenceEndDate = rule.recurrence_end_date
    ? formatDateInputInTimeZone(rule.recurrence_end_date, rule.timezone)
    : "";

  return {
    name: rule.name,
    type: rule.type,
    reason: rule.reason ?? "",
    is_active: rule.is_active,
    auto_cancel_existing: rule.auto_cancel_existing,
    timezone: rule.timezone,
    startTime: minutesToTimeInput(rule.range_start_minutes),
    endTime: minutesToTimeInput(rule.range_end_minutes),
    oneTimeDate,
    recurrenceStartDate,
    recurrenceEndDate,
    weekdaysCsv: rule.weekdays.join(","),
    monthDaysCsv: rule.month_days.join(","),
  };
}

export interface DailyWorkshopRegistrationCardViewModel {
  id: string;
  participants: number;
  totalHours: number;
  slotsCount: number;
  finalAmount: number;
  discount: number;
  status: DailyWorkshopRegistrationStatus;
  createdAt: Date | string;
  firstSlotStartAt: Date | string | null;
}

export interface DailyWorkshopRegistrationCardProps {
  viewModel: DailyWorkshopRegistrationCardViewModel;
  isDragging?: boolean;
  onClick: () => void;
}

export interface DailyWorkshopRegistrationSlotViewModel {
  id: number;
  startAt: string;
  displayLabel: string;
  isNew: boolean;
}

export interface DailyWorkshopRegistrationDetailViewModel {
  id: string;
  status: DailyWorkshopRegistrationStatus;
  formattedCreatedAt: string;
  participants: number;
  totalHours: number;
  slotsCount: number;
  pricePerPerson: number;
  piecesPerPerson: number;
  baseAmount: number;
  discount: number;
  finalAmount: number;
  totalPieces: number;
  slots: DailyWorkshopRegistrationSlotViewModel[];
  isPending: boolean;
}

export interface RegistrationEditableFieldsProps {
  participants: number;
  piecesPerPerson: number;
  pricePerPerson: number;
  discount: number;
  isPending: boolean;
  onParticipantsChange: (participants: number) => void;
  onPiecesPerPersonChange: (piecesPerPerson: number) => void;
  onPricePerPersonChange: (pricePerPerson: number) => void;
  onDiscountChange: (discount: number) => void;
}

export interface RegistrationTimeSlotsSectionProps {
  slots: DailyWorkshopRegistrationSlotViewModel[];
  isPending: boolean;
  slotsListRef: React.RefObject<HTMLDivElement | null>;
  slotInputRefs: React.RefObject<Record<number, HTMLInputElement | null>>;
  onSlotStartChange: (slotId: number, value: string) => void;
  onAddSlot: () => void;
  onRemoveSlot: (slotId: number) => void;
}

export interface DailyWorkshopRegistrationDetailDialogProps {
  open: boolean;
  viewModel: DailyWorkshopRegistrationDetailViewModel | null;
  focusedSlotId: number | null;
  onOpenChange: (open: boolean) => void;
  onParticipantsChange: (participants: number) => void;
  onPricePerPersonChange: (pricePerPerson: number) => void;
  onPiecesPerPersonChange: (piecesPerPerson: number) => void;
  onDiscountChange: (discount: number) => void;
  onSlotStartChange: (slotId: number, value: string) => void;
  onAddSlot: () => void;
  onRemoveSlot: (slotId: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface DailyWorkshopRegistrationDetailDialogContainerProps {
  registration: AdminUserDailyWorkshopRegistration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegistrationUpdated: (
    registration: AdminUserDailyWorkshopRegistration,
  ) => void;
}

export interface DailyWorkshopRegistrationsBoardProps {
  columns: KanbanColumn<AdminUserDailyWorkshopRegistration>[];
  isLoading: boolean;
  selectedRegistration: AdminUserDailyWorkshopRegistration | null;
  dialogOpen: boolean;
  onMove: (
    itemId: string,
    fromColumn: string,
    toColumn: string,
  ) => Promise<void>;
  onCardClick: (registration: AdminUserDailyWorkshopRegistration) => void;
  onDialogOpenChange: (open: boolean) => void;
  onRegistrationUpdated: (
    registration: AdminUserDailyWorkshopRegistration,
  ) => void;
}

export interface DailyWorkshopRegistrationsBoardContainerProps {
  registrations: AdminUserDailyWorkshopRegistration[];
}

export function buildDailyWorkshopRegistrationCardViewModel(
  registration: AdminUserDailyWorkshopRegistration,
): DailyWorkshopRegistrationCardViewModel {
  return {
    id: registration.id,
    participants: registration.participants,
    totalHours: registration.total_hours,
    slotsCount: registration.slots_count,
    finalAmount: registration.final_amount,
    discount: registration.discount,
    status: registration.status,
    createdAt: registration.created_at,
    firstSlotStartAt: registration.slots[0]?.slot_start_at ?? null,
  };
}

// Infers slot duration in minutes from existing slots or total hours.
export function inferSlotDurationMinutes(
  totalHours: number,
  slotsCount: number,
  slots: { slot_start_at: Date | string; slot_end_at: Date | string }[],
): number {
  if (slots.length > 0) {
    const firstStart = createDate(slots[0].slot_start_at);
    const firstEnd = createDate(slots[0].slot_end_at);
    const diffMinutes = Math.round(
      (firstEnd.getTime() - firstStart.getTime()) / (1000 * 60),
    );
    if (diffMinutes > 0) {
      return diffMinutes;
    }
  }

  if (totalHours > 0 && slotsCount > 0) {
    const inferred = Math.round((totalHours * 60) / slotsCount);
    if (inferred > 0) {
      return inferred;
    }
  }

  return 60;
}

// Converts slot data to draft format for editing.
export function getInitialSlots(
  slots: { id: number; slot_start_at: Date | string }[],
): { id: number; startAt: string }[] {
  return slots.map((slot) => ({
    id: slot.id,
    startAt: formatDateTimeLocal(slot.slot_start_at),
  }));
}

// Formats a slot datetime value into a human-readable label.
export function toSlotLabel(value: string, index: number): string {
  const date = createDate(value);
  if (Number.isNaN(date.getTime())) {
    return `Slot ${index + 1}`;
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
