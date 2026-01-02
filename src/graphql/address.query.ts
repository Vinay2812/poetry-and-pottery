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

export const ADDRESS_BY_ID_QUERY = gql`
  query AddressById($id: Int!) {
    addressById(id: $id) {
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
  }
`;
