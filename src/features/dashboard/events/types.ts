import { formatDateTime } from "@/lib/date";

import { EventLevel, EventStatus, EventType } from "@/graphql/generated/types";
import type {
  AdminEvent,
  AdminEventDetail,
  AdminEventsResponse,
  AdminLevelOption,
  AdminStatusOption,
} from "@/graphql/generated/types";

// View model for a single event row in the table.
export interface EventRowViewModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  eventType: EventType;
  startsAt: Date | string;
  endsAt: Date | string;
  startsAtFormatted: string;
  endsAtFormatted: string;
  location: string;
  totalSeats: number;
  availableSeats: number;
  seatsBooked: number;
  instructor: string | null;
  price: number;
  priceFormatted: string;
  image: string;
  status: EventStatus;
  level: EventLevel | null;
  performers: string[];
  lineupNotes: string | null;
  registrationsCount: number;
  reviewsCount: number;
  createdAt: Date | string;
  isUpcoming: boolean;
  isFullyBooked: boolean;
}

// View model for pagination.
export interface PaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

// View model for EventsTable.
export interface EventsTableViewModel {
  events: EventRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  statusFilter: string;
  levelFilter: string;
  eventTypeFilter: string;
  startDate: string;
  endDate: string;
}

// Props for the presentational EventsTable component.
export interface EventsTableProps {
  viewModel: EventsTableViewModel;
  statusOptions: AdminStatusOption[];
  levelOptions: AdminLevelOption[];
  isPending: boolean;
  onSearch: (value: string) => void;
  onStatusFilter: (value: string) => void;
  onLevelFilter: (value: string) => void;
  onEventTypeFilter: (value: string) => void;
  onStartDateFilter: (value: string) => void;
  onEndDateFilter: (value: string) => void;
  onPageChange: (page: number) => void;
  onStatusChange: (eventId: string, status: EventStatus) => void;
  onDelete: (eventId: string) => void;
}

// Props for the EventsTableContainer.
export interface EventsTableContainerProps {
  data: AdminEventsResponse;
  statusOptions: AdminStatusOption[];
  levelOptions: AdminLevelOption[];
}

// View model for event form.
export interface EventFormViewModel {
  id?: string;
  eventType: EventType;
  title: string;
  slug: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  location: string;
  fullLocation: string;
  totalSeats: number;
  availableSeats: number;
  instructor: string | null;
  includes: string[];
  price: number;
  image: string;
  highlights: string[];
  gallery: string[];
  status: EventStatus;
  level: EventLevel | null;
  performers: string[];
  lineupNotes: string | null;
}

// Props for the EventForm component.
export interface EventFormProps {
  viewModel: EventFormViewModel;
  statusOptions: AdminStatusOption[];
  levelOptions: AdminLevelOption[];
  isEditing: boolean;
  onSubmit: (data: EventFormData) => Promise<void> | void;
  onCancel: () => void;
}

// Form data for creating/updating an event.
export interface EventFormData {
  eventType: EventType;
  title: string;
  slug: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  location: string;
  fullLocation: string;
  totalSeats: number;
  availableSeats: number;
  instructor: string | null;
  includes: string[];
  price: number;
  image: string;
  highlights: string[];
  gallery: string[];
  status: EventStatus;
  level: EventLevel | null;
  performers: string[];
  lineupNotes: string | null;
}

// Props for the EventFormContainer.
export interface EventFormContainerProps {
  event?: AdminEventDetail;
  statusOptions: AdminStatusOption[];
  levelOptions: AdminLevelOption[];
}

// Build event row view model from raw data.
export function buildEventRowViewModel(event: AdminEvent): EventRowViewModel {
  const now = new Date();
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    eventType: event.event_type,
    startsAt: event.starts_at,
    endsAt: event.ends_at,
    startsAtFormatted: formatDateTime(event.starts_at),
    endsAtFormatted: formatDateTime(event.ends_at),
    location: event.location,
    totalSeats: event.total_seats,
    availableSeats: event.available_seats,
    seatsBooked: event.total_seats - event.available_seats,
    instructor: event.instructor ?? null,
    price: event.price,
    priceFormatted: formatPrice(event.price),
    image: event.image,
    status: event.status,
    level: event.level ?? null,
    performers: event.performers ?? [],
    lineupNotes: event.lineup_notes ?? null,
    registrationsCount: event._count.event_registrations,
    reviewsCount: event._count.reviews,
    createdAt: event.created_at,
    isUpcoming: new Date(event.starts_at) > now,
    isFullyBooked: event.available_seats <= 0,
  };
}

// Build pagination view model from result data.
export function buildPaginationViewModel(
  data: AdminEventsResponse,
): PaginationViewModel {
  return {
    page: data.page,
    totalPages: data.totalPages,
    limit: data.limit,
    total: data.total,
    showingFrom: data.total > 0 ? (data.page - 1) * data.limit + 1 : 0,
    showingTo: Math.min(data.page * data.limit, data.total),
  };
}

// Build events table view model.
export function buildEventsTableViewModel(
  data: AdminEventsResponse,
  searchValue: string,
  statusFilter: string,
  levelFilter: string,
  eventTypeFilter: string,
  startDate: string,
  endDate: string,
): EventsTableViewModel {
  return {
    events: data.events.map(buildEventRowViewModel),
    pagination: buildPaginationViewModel(data),
    searchValue,
    statusFilter,
    levelFilter,
    eventTypeFilter,
    startDate,
    endDate,
  };
}

// Build event form view model from event detail.
export function buildEventFormViewModel(
  event?: AdminEventDetail,
  statusOptions?: AdminStatusOption[],
  levelOptions?: AdminLevelOption[],
): EventFormViewModel {
  const defaultStatus =
    (statusOptions?.[0]?.value as EventStatus) || EventStatus.Upcoming;
  const defaultLevel =
    (levelOptions?.[0]?.value as EventLevel) || EventLevel.Beginner;

  if (!event) {
    const now = new Date();
    const startsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
    const endsAt = new Date(startsAt.getTime() + 3 * 60 * 60 * 1000); // 3 hours later

    return {
      eventType: EventType.PotteryWorkshop,
      title: "",
      slug: "",
      description: "",
      startsAt,
      endsAt,
      location: "",
      fullLocation: "",
      totalSeats: 10,
      availableSeats: 10,
      instructor: null,
      includes: [],
      price: 0,
      image: "",
      highlights: [],
      gallery: [],
      status: defaultStatus,
      level: null,
      performers: [],
      lineupNotes: null,
    };
  }

  return {
    id: event.id,
    eventType: event.event_type,
    title: event.title,
    slug: event.slug,
    description: event.description,
    startsAt: new Date(event.starts_at),
    endsAt: new Date(event.ends_at),
    location: event.location,
    fullLocation: event.full_location,
    totalSeats: event.total_seats,
    availableSeats: event.available_seats,
    instructor: event.instructor ?? null,
    includes: event.includes,
    price: event.price,
    image: event.image,
    highlights: event.highlights,
    gallery: event.gallery,
    status: event.status,
    level: event.level ?? null,
    performers: event.performers ?? [],
    lineupNotes: event.lineup_notes ?? null,
  };
}

// Format price in INR.
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Re-export for backwards compatibility
export { formatDateTime } from "@/lib/date";

// Generate slug from title.
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
