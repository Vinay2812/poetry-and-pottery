import type {
  EventBase,
  EventDetail,
  EventRegistration,
} from "@/data/events/types";

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
  otherEvents: EventBase[];
  onReserveSeat: () => void;
  onShare: () => void;
}

/**
 * Props for the EventDetailContainer.
 */
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
  upcomingEvents: EventBase[];
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
  workshop: EventDetail;
  upcomingEvents: EventBase[];
  currentUserId?: number | null;
}

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
  upcomingEvents: EventBase[];
  pastEvents: EventBase[];
  hasUpcoming: boolean;
  hasPast: boolean;
  hasNoEvents: boolean;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
}

/**
 * Props for the presentational AllEvents component.
 */
export interface AllEventsProps {
  viewModel: AllEventsViewModel;
  loadMoreRef: (node?: Element | null) => void;
  onSearchChange: (query: string) => void;
  pastEventsLoading?: boolean;
  pastEventsSkeleton?: React.ReactNode;
}

/**
 * Props for the AllEventsContainer.
 */
export interface AllEventsContainerProps {
  initialUpcomingEvents: EventBase[];
  initialUpcomingPagination: PaginationData;
}

/**
 * View model for the Registrations component.
 */
export interface RegistrationsViewModel {
  upcomingRegistrations: EventRegistration[];
  completedRegistrations: EventRegistration[];
  upcomingEvents: EventBase[];
  hasUpcomingRegistrations: boolean;
  hasCompletedRegistrations: boolean;
  hasAnyRegistrations: boolean;
  hasUpcomingEvents: boolean;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
}

/**
 * Props for the presentational Registrations component.
 */
export interface RegistrationsProps {
  viewModel: RegistrationsViewModel;
  loadMoreRef: (node?: Element | null) => void;
  onSearchChange: (query: string) => void;
}

/**
 * Props for the RegistrationsContainer.
 */
export interface RegistrationsContainerProps {
  initialUpcomingRegistrations: EventRegistration[];
  initialUpcomingPagination: PaginationData;
  initialCompletedRegistrations: EventRegistration[];
  initialCompletedPagination: PaginationData;
  upcomingEvents?: EventBase[];
}
