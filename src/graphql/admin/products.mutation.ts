import { gql } from "@apollo/client";

export const ADMIN_CREATE_PRODUCT_MUTATION = gql`
  mutation AdminCreateProduct($input: CreateProductInput!) {
    adminCreateProduct(input: $input) {
      success
      productId
      error
    }
  }
`;

export const ADMIN_UPDATE_PRODUCT_MUTATION = gql`
  mutation AdminUpdateProduct($id: Int!, $input: UpdateProductInput!) {
    adminUpdateProduct(id: $id, input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_DELETE_PRODUCT_MUTATION = gql`
  mutation AdminDeleteProduct($id: Int!) {
    adminDeleteProduct(id: $id) {
      success
      error
    }
  }
`;

export const ADMIN_TOGGLE_PRODUCT_ACTIVE_MUTATION = gql`
  mutation AdminToggleProductActive($id: Int!) {
    adminToggleProductActive(id: $id) {
      success
      error
    }
  }
`;

export const ADMIN_DELETE_PRODUCT_REVIEW_MUTATION = gql`
  mutation AdminDeleteProductReview($reviewId: Int!) {
    adminDeleteProductReview(reviewId: $reviewId) {
      success
      error
    }
  }
`;
