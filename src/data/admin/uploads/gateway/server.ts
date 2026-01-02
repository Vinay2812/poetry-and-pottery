"use server";

import { isGraphQL } from "@/consts/env";

import type {
  GetPresignedUploadUrlInput,
  PresignedUploadUrlResponse,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getPresignedUploadUrl(
  input: GetPresignedUploadUrlInput,
): Promise<PresignedUploadUrlResponse> {
  if (isGraphQL) {
    return graphqlImpl.getPresignedUploadUrl(input);
  }
  return actionImpl.getPresignedUploadUrl(input);
}
