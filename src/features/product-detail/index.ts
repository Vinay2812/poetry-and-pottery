// Components
export { ProductDetail } from "./components/product-detail";

// Containers
export { ProductDetailContainer } from "./containers/product-detail-container";

// Types
export type {
  FormattedReview,
  ProductDetailContainerProps,
  ProductDetailProps,
  ProductDetailViewModel,
} from "./types";
export {
  buildFormattedReviews,
  buildProductDetailViewModel,
  calculateAverageRating,
} from "./types";
