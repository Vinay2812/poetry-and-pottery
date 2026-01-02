// Product actions
export {
  getProducts,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  getFeaturedProducts,
  getBestSellers,
  getRecommendedProducts as getSmartRecommendations,
  getCategories,
  getMaterials,
} from "@/data/products/server/action";

// Cart actions
export {
  getCart,
  getCartCount,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "@/data/cart/server/action";

// Wishlist actions
export {
  getWishlist,
  getWishlistIds,
  getWishlistCount,
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
} from "@/data/wishlist/server/action";

// Order actions
export {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  type OrderItemWithReviewStatus,
  type OrderWithReviewStatus,
} from "@/data/orders/server/action";

// Event actions
export {
  getEvents,
  getUpcomingEvents,
  getPastEvents,
  getEventBySlug,
  getEventById,
  getEventWithUserContext,
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
  getRegistrationById,
  getRegistrationCount,
  getUpcomingRegistrations,
  getCompletedRegistrations,
  type RegistrationWithReviewStatus,
  type EventWithUserContext,
} from "./event.actions";

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

// Newsletter actions
export {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterSubscriptionStatus,
} from "./newsletter.actions";

// Search actions
export { globalSearch, type GlobalSearchResult } from "./search.actions";
