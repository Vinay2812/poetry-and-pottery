import { gql } from "@apollo/client";

export const USER_COUNTS_QUERY = gql`
  query UserCounts {
    userCounts {
      cartCount
      wishlistCount
      eventRegistrationsCount
      pendingOrdersCount
    }
  }
`;
