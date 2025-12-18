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
export { getCurrentUser, getCurrentUserId } from "./auth.action";
