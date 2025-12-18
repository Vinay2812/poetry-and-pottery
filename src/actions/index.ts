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
  getCartCount,
  syncCartFromLocal,
} from "./cart.actions";

// Wishlist actions
export {
  getWishlist,
  getWishlistIds,
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  getWishlistCount,
  syncWishlistFromLocal,
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
  getFeaturedEvents,
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
  getRegistrationById,
} from "./event.actions";

// Review actions
export {
  getProductReviews,
  getEventReviews,
  createProductReview,
  createEventReview,
  updateReview,
  deleteReview,
  toggleReviewLike,
  getProductAverageRating,
  getEventAverageRating,
  getUserProductReview,
} from "./review.actions";
