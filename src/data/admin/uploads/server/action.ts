"use server";

import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/consts/uploads";

import { requireAdmin } from "@/lib/admin";
import {
  generateUniqueKey,
  getPublicUrl,
  getSignedUrlForUpload,
} from "@/lib/r2";

import type {
  GetPresignedUploadUrlInput,
  PresignedUploadUrlResponse,
} from "@/graphql/generated/types";

export async function getPresignedUploadUrl(
  input: GetPresignedUploadUrlInput,
): Promise<PresignedUploadUrlResponse> {
  await requireAdmin();

  const { filename, contentType, fileSize, folder } = input;

  if (!filename || !contentType || !fileSize) {
    return {
      success: false,
      error: "Missing required fields: filename, contentType, fileSize",
    };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
    return {
      success: false,
      error: `Invalid content type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
    };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  try {
    const key = generateUniqueKey(filename, folder ?? undefined);
    const presignedUrl = await getSignedUrlForUpload(key, contentType, 600);
    const publicUrl = getPublicUrl(key);

    return {
      success: true,
      presignedUrl,
      publicUrl,
      key,
    };
  } catch {
    return {
      success: false,
      error: "Failed to generate presigned URL",
    };
  }
}
