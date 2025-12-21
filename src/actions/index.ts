// Product actions
export {
  getProducts,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  getCategories,
  getMaterials,
  getFeaturedProducts,
} from "./product.actions";

// Cart actions
export {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "./cart.actions";

// Wishlist actions
export {
  getWishlist,
  getWishlistIds,
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
} from "./wishlist.actions";

// Order actions
export {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  type OrderItemWithReviewStatus,
  type OrderWithReviewStatus,
} from "./order.actions";

// Event actions
export {
  getEvents,
  getUpcomingEvents,
  getPastEvents,
  getEventBySlug,
  getEventById,
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
  getRegistrationById,
  getRegistrationCount,
  getUpcomingRegistrations,
  getCompletedRegistrations,
  type RegistrationWithReviewStatus,
} from "./event.actions";

// Review actions
export {
  getProductReviews,
  getEventReviews,
  createProductReview,
  createEventReview,
  deleteReview,
  toggleReviewLike,
} from "./review.actions";

// Auth actions
export { getAuthenticatedUserId } from "./auth.action";

// Address actions
export {
  getUserAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  type AddressFormData,
} from "./address.actions";
