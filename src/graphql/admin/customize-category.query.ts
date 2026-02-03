import { gql } from "@apollo/client";

export const ADMIN_CUSTOMIZE_CATEGORIES_QUERY = gql`
  query AdminCustomizeCategories {
    adminCustomizeCategories {
      categories {
        id
        category
        base_price
        image_url
        is_active
        options_count
        options {
          id
          customize_category_id
          category_name
          type
          name
          value
          price_modifier
          sort_order
          is_active
          created_at
          updated_at
        }
        created_at
        updated_at
      }
      total
    }
  }
`;

export const ADMIN_CUSTOMIZE_CATEGORY_BY_ID_QUERY = gql`
  query AdminCustomizeCategoryById($id: Int!) {
    adminCustomizeCategoryById(id: $id) {
      id
      category
      base_price
      image_url
      is_active
      options_count
      options {
        id
        customize_category_id
        category_name
        type
        name
        value
        price_modifier
        sort_order
        is_active
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;
