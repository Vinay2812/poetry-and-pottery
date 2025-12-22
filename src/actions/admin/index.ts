export * from "./admin.analytics.actions";
export * from "./admin.users.actions";
export * from "./admin.orders.actions";
export * from "./admin.registrations.actions";
export * from "./admin.uploads.actions";

// Products - export everything except ActionResult (use ProductActionResult)
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  getProductReviews,
  deleteProductReview,
  getAllCategories,
  type AdminProduct,
  type GetProductsParams,
  type GetProductsResult,
  type ProductDetail,
  type CreateProductParams,
  type UpdateProductParams,
  type CreateProductResult,
  type ProductReview,
  type GetProductReviewsResult,
  type ActionResult as ProductActionResult,
} from "./admin.products.actions";

// Categories - export everything except ActionResult (use CategoryActionResult)
export {
  getCategories,
  getAllConfiguredCategories,
  updateCategoryIcon,
  addCategory,
  renameCategory,
  deleteCategory,
  getAvailableIcons,
  type Category,
  type GetCategoriesResult,
  type CategoryConfig,
  type ActionResult as CategoryActionResult,
} from "./admin.categories.actions";

// Events - export everything except ActionResult (use EventActionResult)
export {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventStatus,
  getEventRegistrations,
  getEventReviews,
  deleteEventReview,
  getEventStatusOptions,
  getEventLevelOptions,
  getEventStatusColor,
  getEventLevelColor,
  type AdminEvent,
  type GetEventsParams,
  type GetEventsResult,
  type EventDetail,
  type CreateEventParams,
  type UpdateEventParams,
  type CreateEventResult,
  type EventRegistration,
  type GetEventRegistrationsResult,
  type EventReview,
  type GetEventReviewsResult,
  type ActionResult as EventActionResult,
} from "./admin.events.actions";

// Re-export status utilities for convenience
export {
  getOrderStatusColor,
  getOrderStatusOptions,
  getRegistrationStatusColor,
  getRegistrationStatusOptions,
} from "@/lib/status-utils";
