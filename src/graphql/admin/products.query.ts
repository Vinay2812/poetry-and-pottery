import { gql } from "@apollo/client";

export const ADMIN_PRODUCTS_QUERY = gql`
  query AdminProducts($filter: AdminProductsFilterInput) {
    adminProducts(filter: $filter) {
      products {
        id
        name
        slug
        price
        available_quantity
        total_quantity
        is_active
        categories
        material
        color_code
        color_name
        image_urls
        created_at
        _count {
          reviews
          wishlists
          carts
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const ADMIN_PRODUCT_BY_ID_QUERY = gql`
  query AdminProductById($id: Int!) {
    adminProductById(id: $id) {
      id
      name
      slug
      description
      instructions
      price
      available_quantity
      total_quantity
      is_active
      categories
      material
      color_code
      color_name
      image_urls
      created_at
      updated_at
      _count {
        reviews
        wishlists
        carts
        purchased_products
      }
    }
  }
`;

export const ADMIN_PRODUCT_REVIEWS_QUERY = gql`
  query AdminProductReviews($productId: Int!) {
    adminProductReviews(productId: $productId) {
      reviews {
        id
        rating
        review
        image_urls
        created_at
        user {
          id
          name
          email
          image
        }
      }
      total
      averageRating
    }
  }
`;

export const ADMIN_ALL_CATEGORIES_QUERY = gql`
  query AdminAllCategories {
    adminAllCategories
  }
`;
