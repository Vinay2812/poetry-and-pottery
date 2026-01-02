"use server";

import { getClient } from "@/lib/apollo";

import { ADMIN_GET_PRESIGNED_UPLOAD_URL_MUTATION } from "@/graphql/admin/uploads.mutation";
import type {
  AdminGetPresignedUploadUrlMutation,
  AdminGetPresignedUploadUrlMutationVariables,
  GetPresignedUploadUrlInput,
  PresignedUploadUrlResponse,
} from "@/graphql/generated/types";

export async function getPresignedUploadUrl(
  input: GetPresignedUploadUrlInput,
): Promise<PresignedUploadUrlResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminGetPresignedUploadUrlMutation,
    AdminGetPresignedUploadUrlMutationVariables
  >({
    mutation: ADMIN_GET_PRESIGNED_UPLOAD_URL_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminGetPresignedUploadUrl;
}
