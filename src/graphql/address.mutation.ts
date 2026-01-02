import { gql } from "@apollo/client";

export const CREATE_ADDRESS_MUTATION = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
      success
      error
      address {
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
  }
`;

export const UPDATE_ADDRESS_MUTATION = gql`
  mutation UpdateAddress($id: Int!, $input: UpdateAddressInput!) {
    updateAddress(id: $id, input: $input) {
      success
      error
      address {
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
  }
`;

export const DELETE_ADDRESS_MUTATION = gql`
  mutation DeleteAddress($id: Int!) {
    deleteAddress(id: $id) {
      success
      error
    }
  }
`;
