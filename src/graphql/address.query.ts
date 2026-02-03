import { gql } from "@apollo/client";

export const USER_ADDRESSES_QUERY = gql`
  query UserAddresses {
    userAddresses {
      addresses {
        id
        user_id
        name
        address_line_1
        address_line_2
        landmark
        city
        state
        zip
        contact_number
      }
      total
    }
  }
`;
