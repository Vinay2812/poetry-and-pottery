import { gql } from "@apollo/client";

export const ADMIN_CATEGORIES_QUERY = gql`
  query AdminCategories {
    adminCategories {
      categories {
        name
        icon
        productCount
      }
      total
    }
  }
`;

export const ADMIN_ALL_CONFIGURED_CATEGORIES_QUERY = gql`
  query AdminAllConfiguredCategories {
    adminAllConfiguredCategories {
      name
      icon
    }
  }
`;

export const ADMIN_AVAILABLE_ICONS_QUERY = gql`
  query AdminAvailableIcons {
    adminAvailableIcons {
      value
      label
    }
  }
`;
