import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products($filter: ProductsFilterInput!) {
    products(filter: $filter) {
      products {
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
        total_quantity
        color_code
        color_name
      }
      filter {
        limit
        page
        search
        categories
        materials
        min_price
        max_price
        order_by
      }
      total_products
      total_pages
      meta {
        categories
        materials
        price_range {
          min
          max
        }
        price_histogram {
          min
          max
          count
        }
      }
    }
  }
`;

export const PRODUCT_BY_SLUG_QUERY = gql`
  query ProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
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
      total_quantity
      color_code
      color_name
      description
      instructions
      is_active
      created_at
      updated_at
      categories
      reviews {
        id
        user_id
        rating
        review
        image_urls
        created_at
        user {
          id
          name
          image
        }
        likes {
          id
          user_id
        }
      }
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query ProductById($id: Int!) {
    productById(id: $id) {
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
      total_quantity
      color_code
      color_name
      description
      instructions
      is_active
      created_at
      updated_at
      categories
      reviews {
        id
        user_id
        rating
        review
        image_urls
        created_at
        user {
          id
          name
          image
        }
        likes {
          id
          user_id
        }
      }
    }
  }
`;

export const BEST_SELLERS_QUERY = gql`
  query BestSellers($limit: Int, $page: Int) {
    bestSellers(limit: $limit, page: $page) {
      products {
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
        total_quantity
        color_code
        color_name
      }
      total
      page
      total_pages
    }
  }
`;

export const RECOMMENDED_PRODUCTS_QUERY = gql`
  query RecommendedProducts($limit: Int, $page: Int, $productId: Int) {
    recommendedProducts(limit: $limit, page: $page, productId: $productId) {
      products {
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
        total_quantity
        color_code
        color_name
      }
      total
      page
      total_pages
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories
  }
`;

export const MATERIALS_QUERY = gql`
  query Materials {
    materials
  }
`;
