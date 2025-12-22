import type { RegistrationWithReviewStatus } from "@/actions";
import type {
  EventWithDetails,
  EventWithRegistrationCount,
  RegistrationWithEvent,
} from "@/types";

/**
 * View model for event quick info.
 */
export interface EventQuickInfoViewModel {
  formattedDate: string;
  formattedTime: string;
  duration: string;
  availableSeats: number;
  location: string | null;
  fullLocation: string | null;
  instructor: string | null;
}

/**
 * View model for the EventDetail component.
 */
export interface EventDetailViewModel {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string | null;
  imageUrl: string;
  includes: string[];
  quickInfo: EventQuickInfoViewModel;
  soldOut: boolean;
  isLoading: boolean;
  registered: boolean;
}

/**
 * Props for the presentational EventDetail component.
 */
export interface EventDetailProps {
  viewModel: EventDetailViewModel;
  otherEvents: EventWithRegistrationCount[];
  onReserveSeat: () => void;
  onShare: () => void;
}

/**
 * Props for the EventDetailContainer.
 */
export interface EventDetailContainerProps {
  event: EventWithDetails;
  otherEvents: EventWithRegistrationCount[];
}

/**
 * Helper function to calculate duration from DateTime objects
 */
export function calculateDuration(startsAt: Date, endsAt: Date): string {
  const diffMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}hr`;
  return `${hours}hr ${minutes}min`;
}

/**
 * Format event date for display.
 */
export function formatEventDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format event time for display.
 */
export function formatEventTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Formatted review for display.
 */
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

/**
 * View model for the PastWorkshopDetail component.
 */
export interface PastWorkshopDetailViewModel {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string | null;
  imageUrl: string;
  includes: string[];
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
}

/**
 * Props for the presentational PastWorkshopDetail component.
 */
export interface PastWorkshopDetailProps {
  viewModel: PastWorkshopDetailViewModel;
  upcomingEvents: EventWithRegistrationCount[];
  selectedImageIndex: number | null;
  onOpenGallery: (index: number) => void;
  onCloseGallery: () => void;
  onReviewLike: (reviewId: string) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

/**
 * Props for the PastWorkshopDetailContainer.
 */
export interface PastWorkshopDetailContainerProps {
  workshop: EventWithDetails;
  upcomingEvents: EventWithRegistrationCount[];
  currentUserId?: number | null;
}

// ============================================
// All Events Types
// ============================================

/**
 * Pagination data for lists.
 */
export interface PaginationData {
  total: number;
  totalPages: number;
}

/**
 * View model for the AllEvents component.
 */
export interface AllEventsViewModel {
  upcomingEvents: EventWithRegistrationCount[];
  pastEvents: EventWithRegistrationCount[];
  hasUpcoming: boolean;
  hasPast: boolean;
  hasNoEvents: boolean;
  hasMore: boolean;
  isLoading: boolean;
}

/**
 * Props for the presentational AllEvents component.
 */
export interface AllEventsProps {
  viewModel: AllEventsViewModel;
  loadMoreRef: (node?: Element | null) => void;
}

/**
 * Props for the AllEventsContainer.
 */
export interface AllEventsContainerProps {
  initialUpcomingEvents: EventWithRegistrationCount[];
  initialUpcomingPagination: PaginationData;
  initialPastEvents: EventWithRegistrationCount[];
  initialPastPagination: PaginationData;
}

// ============================================
// Registrations Types
// ============================================

/**
 * View model for the Registrations component.
 */
export interface RegistrationsViewModel {
  upcomingRegistrations: RegistrationWithEvent[];
  completedRegistrations: RegistrationWithReviewStatus[];
  upcomingEvents: EventWithRegistrationCount[];
  hasUpcomingRegistrations: boolean;
  hasCompletedRegistrations: boolean;
  hasAnyRegistrations: boolean;
  hasUpcomingEvents: boolean;
  hasMore: boolean;
  isLoading: boolean;
}

/**
 * Props for the presentational Registrations component.
 */
export interface RegistrationsProps {
  viewModel: RegistrationsViewModel;
  loadMoreRef: (node?: Element | null) => void;
}

/**
 * Props for the RegistrationsContainer.
 */
export interface RegistrationsContainerProps {
  initialUpcomingRegistrations: RegistrationWithEvent[];
  initialUpcomingPagination: PaginationData;
  initialCompletedRegistrations: RegistrationWithReviewStatus[];
  initialCompletedPagination: PaginationData;
  upcomingEvents?: EventWithRegistrationCount[];
}
