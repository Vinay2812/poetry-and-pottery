import { gql } from "@apollo/client";

export const GET_RECOMMENDED_PRODUCTS = gql`
  query RecommendedProducts($limit: Int!) {
    recommendedProducts(limit: $limit) {
      id
      slug
      name
      price
      image_urls
      reviews_count
      avg_rating
      material
      in_wishlist
      available_quantity
    }
  }
`;
