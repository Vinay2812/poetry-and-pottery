import { gql } from "@apollo/client";

export const CUSTOMIZATION_CATEGORIES_QUERY = gql`
  query CustomizationCategories($filter: CustomizationCategoriesFilterInput) {
    customizationCategories(filter: $filter) {
      categories {
        id
        category
        options_count
        base_price
        image_url
      }
      total
      page
      limit
      has_more
    }
  }
`;

export const CUSTOMIZATION_OPTIONS_BY_CATEGORY_QUERY = gql`
  query CustomizationOptionsByCategory(
    $filter: CustomizationOptionsFilterInput!
  ) {
    customizationOptionsByCategory(filter: $filter) {
      customize_category_id
      category_name
      options_by_type {
        type
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
      }
      total_options
    }
  }
`;

export const CUSTOMIZATION_TYPES_QUERY = gql`
  query CustomizationTypes {
    customizationTypes
  }
`;
