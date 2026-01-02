import { gql } from "@apollo/client";

export const ADMIN_GET_PRESIGNED_UPLOAD_URL_MUTATION = gql`
  mutation AdminGetPresignedUploadUrl($input: GetPresignedUploadUrlInput!) {
    adminGetPresignedUploadUrl(input: $input) {
      success
      presignedUrl
      publicUrl
      key
      error
    }
  }
`;
