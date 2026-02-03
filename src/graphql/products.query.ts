import { gql } from "@apollo/client";

const COLLECTION_FRAGMENT = gql`
  fragment CollectionFields on CollectionBase {
    id
    slug
    name
    description
    image_url
    starts_at
    ends_at
    created_at
    updated_at
    products_count
  }
`;

export const PRODUCTS_QUERY = gql`
  ${COLLECTION_FRAGMENT}
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
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
        collection {
          ...CollectionFields
        }
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
        collection_ids
        archive
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
        collections {
          ...CollectionFields
        }
      }
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  ${COLLECTION_FRAGMENT}
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
      collection {
        ...CollectionFields
      }
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

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories
  }
`;

export const COLLECTIONS_QUERY = gql`
  ${COLLECTION_FRAGMENT}
  query Collections {
    collections {
      ...CollectionFields
    }
  }
`;
