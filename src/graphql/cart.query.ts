import { gql } from "@apollo/client";

export const CART_QUERY = gql`
  query Cart {
    cart {
      items {
        id
        user_id
        product_id
        quantity
        created_at
        updated_at
        custom_data_hash
        custom_data {
          options {
            type
            optionId
            name
            value
            priceModifier
          }
          totalModifier
        }
        product {
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
            id
            slug
            name
            starts_at
            ends_at
            created_at
            updated_at
            products_count
          }
        }
      }
      total
      subtotal
    }
  }
`;
