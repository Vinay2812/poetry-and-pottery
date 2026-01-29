import { gql } from "@apollo/client";

export const ADMIN_CREATE_COLLECTION_MUTATION = gql`
  mutation AdminCreateCollection($input: CreateCollectionInput!) {
    adminCreateCollection(input: $input) {
      success
      collectionId
      error
    }
  }
`;

export const ADMIN_UPDATE_COLLECTION_MUTATION = gql`
  mutation AdminUpdateCollection($id: Int!, $input: UpdateCollectionInput!) {
    adminUpdateCollection(id: $id, input: $input) {
      success
      collectionId
      error
    }
  }
`;

export const ADMIN_DELETE_COLLECTION_MUTATION = gql`
  mutation AdminDeleteCollection($id: Int!) {
    adminDeleteCollection(id: $id) {
      success
      collectionId
      error
    }
  }
`;

export const ADMIN_ASSIGN_PRODUCTS_TO_COLLECTION_MUTATION = gql`
  mutation AdminAssignProductsToCollection(
    $input: AssignProductsToCollectionInput!
  ) {
    adminAssignProductsToCollection(input: $input) {
      success
      collectionId
      error
    }
  }
`;

export const ADMIN_REMOVE_PRODUCT_FROM_COLLECTION_MUTATION = gql`
  mutation AdminRemoveProductFromCollection($productId: Int!) {
    adminRemoveProductFromCollection(productId: $productId) {
      success
      error
    }
  }
`;
