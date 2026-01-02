import { gql } from "@apollo/client";

export const ADMIN_UPDATE_USER_ROLE_MUTATION = gql`
  mutation AdminUpdateUserRole($userId: Int!, $role: String!) {
    adminUpdateUserRole(userId: $userId, role: $role) {
      success
      error
    }
  }
`;
