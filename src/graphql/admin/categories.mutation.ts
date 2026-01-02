import { gql } from "@apollo/client";

export const ADMIN_UPDATE_CATEGORY_ICON_MUTATION = gql`
  mutation AdminUpdateCategoryIcon($category: String!, $icon: String!) {
    adminUpdateCategoryIcon(category: $category, icon: $icon) {
      success
      error
    }
  }
`;

export const ADMIN_ADD_CATEGORY_MUTATION = gql`
  mutation AdminAddCategory($name: String!, $icon: String!) {
    adminAddCategory(name: $name, icon: $icon) {
      success
      error
    }
  }
`;

export const ADMIN_RENAME_CATEGORY_MUTATION = gql`
  mutation AdminRenameCategory($oldName: String!, $newName: String!) {
    adminRenameCategory(oldName: $oldName, newName: $newName) {
      success
      error
    }
  }
`;

export const ADMIN_DELETE_CATEGORY_MUTATION = gql`
  mutation AdminDeleteCategory($name: String!) {
    adminDeleteCategory(name: $name) {
      success
      error
    }
  }
`;
