import type { DailyWorkshopRegistration } from "@/data/daily-workshops/types";
import type {
  EventBase,
  EventDetail,
  EventRegistration,
  EventRegistrationStatus,
  EventType,
} from "@/data/events/types";
import type { LucideIcon } from "lucide-react";

import type { EventSortOption, EventTypeFilter } from "@/components/events";

// View model for event quick info.
export interface EventQuickInfoViewModel {
  formattedDate: string;
  formattedTime: string;
  duration: string;
  availableSeats: number;
  location: string | null;
  fullLocation: string | null;
  instructor: string | null;
}

// View model for the EventDetail component.
export interface EventDetailViewModel {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string | null;
  eventType: EventType;
  imageUrl: string;
  includes: string[];
  performers: string[];
  lineupNotes: string | null;
  quickInfo: EventQuickInfoViewModel;
  soldOut: boolean;
  isLoading: boolean;
  registered: boolean;
  isWorkshop: boolean;
  isOpenMic: boolean;
}

// Props for the presentational EventDetail component.
export interface EventDetailProps {
  viewModel: EventDetailViewModel;
  otherEvents: EventBase[];
  onReserveSeat: () => void;
  onShare: () => void;
}

// Props for the EventDetailContainer.
export interface EventDetailContainerProps {
  event: EventDetail;
  otherEvents: EventBase[];
}

// Re-export date utilities for convenience
export {
  calculateDuration,
  formatEventDate,
  formatEventTime,
} from "@/lib/date";

// Formatted review for display.
export interface FormattedReview {
  id: string;
  authorId: number;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  isLikedByCurrentUser: boolean;
  images: string[];
}

// View model for the PastWorkshopDetail component.
export interface PastWorkshopDetailViewModel {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string | null;
  eventType: EventType;
  imageUrl: string;
  includes: string[];
  performers: string[];
  lineupNotes: string | null;
  highlights: string[];
  gallery: string[];
  quickInfo: {
    formattedDate: string;
    formattedTime: string;
    duration: string;
    attendees: number;
    location: string | null;
    fullLocation: string | null;
    instructor: string | null;
  };
  reviews: FormattedReview[];
  averageRating: number;
  isWorkshop: boolean;
  isOpenMic: boolean;
}

// Props for the presentational PastWorkshopDetail component.
export interface PastWorkshopDetailProps {
  viewModel: PastWorkshopDetailViewModel;
  upcomingEvents: EventBase[];
  selectedImageIndex: number | null;
  onOpenGallery: (index: number) => void;
  onCloseGallery: () => void;
  onReviewLike: (reviewId: string) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

// Props for the PastWorkshopDetailContainer.
export interface PastWorkshopDetailContainerProps {
  workshop: EventDetail;
  upcomingEvents: EventBase[];
  currentUserId?: number | null;
}

// Pagination data for lists.
export interface PaginationData {
  total: number;
  totalPages: number;
}

// View model for the AllEvents component.
export interface AllEventsViewModel {
  upcomingEvents: EventBase[];
  pastEvents: EventBase[];
  activeSubTab: AllEventsSubTab;
  hasNoEvents: boolean;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
  totalEvents: number;
}

export type AllEventsSubTab = "upcoming" | "past";

// Props for the presentational AllEvents component.
export interface AllEventsProps {
  viewModel: AllEventsViewModel;
  loadMoreRef: (node?: Element | null) => void;
  activeSubTab: AllEventsSubTab;
  onSubTabChange: (tab: AllEventsSubTab) => void;
  sortBy?: EventSortOption;
  onSortChange?: (sort: EventSortOption) => void;
  eventTypeFilter?: EventTypeFilter;
  onEventTypeFilterChange?: (filter: EventTypeFilter) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  queryString?: string;
  pastEventsLoading?: boolean;
  pastEventsSkeleton?: React.ReactNode;
}

// Props for the AllEventsContainer.
export interface AllEventsContainerProps {
  initialUpcomingEvents: EventBase[];
  initialUpcomingPagination: PaginationData;
}

// View model for the Registrations component.
export interface RegistrationsViewModel {
  upcomingEventRegistrations: EventRegistration[];
  completedEventRegistrations: EventRegistration[];
  upcomingDailyWorkshopRegistrations: DailyWorkshopRegistration[];
  completedDailyWorkshopRegistrations: DailyWorkshopRegistration[];
  upcomingEvents: EventBase[];
  hasAnyUpcomingContent: boolean;
  hasAnyCompletedContent: boolean;
  hasUpcomingEvents: boolean;
  hasMore: boolean;
  isLoading: boolean;
}

export type RegistrationsSubTab = "upcoming" | "completed";

// Props for the presentational Registrations component.
export interface RegistrationsProps {
  viewModel: RegistrationsViewModel;
  loadMoreRef: (node?: Element | null) => void;
  activeSubTab: RegistrationsSubTab;
  onSubTabChange: (tab: RegistrationsSubTab) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  queryString?: string;
}

// Props for the RegistrationsContainer.
export interface RegistrationsContainerProps {
  initialUpcomingRegistrations: EventRegistration[];
  initialUpcomingPagination: PaginationData;
  initialCompletedRegistrations: EventRegistration[];
  initialCompletedPagination: PaginationData;
  initialUpcomingDailyWorkshopRegistrations: DailyWorkshopRegistration[];
  initialCompletedDailyWorkshopRegistrations: DailyWorkshopRegistration[];
  upcomingEvents?: EventBase[];
}

// Status config for registration status badge and messaging.
export interface RegistrationStatusConfig {
  label: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
  message: string;
}

// View model for the RegistrationDetail component.
export interface RegistrationDetailViewModel {
  // Registration
  registrationId: string;
  registrationIdUpperCase: string;
  status: EventRegistrationStatus;
  seatsReserved: number;
  totalAmount: string;
  amountLabel: string;
  copied: boolean;

  // Status
  statusConfig: RegistrationStatusConfig;
  isConfirmed: boolean;
  isPending: boolean;
  isApproved: boolean;
  isPaid: boolean;
  showTicketDownload: boolean;
  showWhatsAppButton: boolean;

  // Event details
  eventTitle: string;
  eventDescription: string;
  imageUrl: string;
  formattedDate: string;
  formattedTime: string;
  duration: string;
  location: string | null;
  fullLocation: string | null;
  level: string | null;
  instructor: string | null;
  performers: string[];
  lineupNotes: string | null;
  includes: string[];
  isWorkshop: boolean;
  isOpenMic: boolean;

  // Registration progress props
  requestAt?: Date | string | null;
  approvedAt?: Date | string | null;
  paidAt?: Date | string | null;
  confirmedAt?: Date | string | null;
  cancelledAt?: Date | string | null;
  createdAt: Date | string;
}

// Props for the presentational RegistrationDetail component.
export interface RegistrationDetailProps {
  viewModel: RegistrationDetailViewModel;
  registration: EventRegistration;
  onShare: () => void;
  onCopyRegistrationId: () => void;
  onWhatsAppContact: () => void;
}

// Props for the RegistrationDetailContainer.
export interface RegistrationDetailContainerProps {
  registration: EventRegistration;
}
