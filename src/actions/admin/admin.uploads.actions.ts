"use server";

import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/consts/uploads";

import { requireAdmin } from "@/lib/admin";
import {
  generateUniqueKey,
  getPublicUrl,
  getSignedUrlForUpload,
} from "@/lib/r2";

export interface GetPresignedUrlParams {
  filename: string;
  contentType: string;
  fileSize: number;
  folder?: string;
}

export interface GetPresignedUrlResult {
  success: boolean;
  presignedUrl?: string;
  publicUrl?: string;
  key?: string;
  error?: string;
}

export async function getPresignedUploadUrl(
  params: GetPresignedUrlParams,
): Promise<GetPresignedUrlResult> {
  await requireAdmin();

  const { filename, contentType, fileSize, folder } = params;

  // Validate required fields
  if (!filename || !contentType || !fileSize) {
    return {
      success: false,
      error: "Missing required fields: filename, contentType, fileSize",
    };
  }

  // Validate content type
  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
    return {
      success: false,
      error: `Invalid content type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
    };
  }

  // Validate file size
  if (fileSize > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  try {
    const key = generateUniqueKey(filename, folder);
    const presignedUrl = await getSignedUrlForUpload(key, contentType, 600);
    const publicUrl = getPublicUrl(key);

    return {
      success: true,
      presignedUrl,
      publicUrl,
      key,
    };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return {
      success: false,
      error: "Failed to generate presigned URL",
    };
  }
}
