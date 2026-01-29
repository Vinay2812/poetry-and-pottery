"use server";

import type {
  GetPresignedUploadUrlInput,
  PresignedUploadUrlResponse,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getPresignedUploadUrl(
  input: GetPresignedUploadUrlInput,
): Promise<PresignedUploadUrlResponse> {
  return graphqlImpl.getPresignedUploadUrl(input);
}
