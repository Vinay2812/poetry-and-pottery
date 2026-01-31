import { gql } from "@apollo/client";

export const ADMIN_CUSTOMIZATION_OPTIONS_QUERY = gql`
  query AdminCustomizationOptions(
    $filter: AdminCustomizationOptionsFilterInput
  ) {
    adminCustomizationOptions(filter: $filter) {
      options {
        id
        category
        type
        name
        value
        price_modifier
        sort_order
        is_active
        created_at
        updated_at
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const ADMIN_CUSTOMIZATION_OPTION_BY_ID_QUERY = gql`
  query AdminCustomizationOptionById($id: Int!) {
    adminCustomizationOptionById(id: $id) {
      id
      category
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
`;

export const ADMIN_CUSTOMIZATION_CATEGORIES_QUERY = gql`
  query AdminCustomizationCategories {
    adminCustomizationCategories {
      category
      count
    }
  }
`;

export const ADMIN_CUSTOMIZATION_TYPES_QUERY = gql`
  query AdminCustomizationTypes {
    adminCustomizationTypes {
      type
      count
    }
  }
`;
