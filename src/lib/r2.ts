import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  R2_ACCESS_KEY_ID,
  R2_ACCOUNT_ID,
  R2_BUCKET,
  R2_PUBLIC_URL,
  R2_SECRET_ACCESS_KEY,
} from "@/lib/env.consts";

export interface FileObject {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
}

function getS3Client() {
  if (
    !R2_ACCOUNT_ID ||
    !R2_ACCESS_KEY_ID ||
    !R2_SECRET_ACCESS_KEY ||
    !R2_BUCKET
  ) {
    throw new Error("R2 configuration is incomplete");
  }

  let s3Client: S3Client | null = null;

  function initializeS3Client(): S3Client {
    return new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID!,
        secretAccessKey: R2_SECRET_ACCESS_KEY!,
      },
    });
  }

  if (!s3Client) {
    s3Client = initializeS3Client();
  }

  return s3Client;
}

/**
 * Upload a file buffer directly to R2
 */
export async function uploadFile(
  file: Buffer,
  key: string,
  contentType?: string,
) {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  const response = await getS3Client().send(command);
  return response;
}

/**
 * Get a presigned URL for uploading a file from the client
 */
export async function getSignedUrlForUpload(
  key: string,
  contentType: string,
  expiresIn = 3600,
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(getS3Client(), command, { expiresIn });
  return signedUrl;
}

/**
 * Get a presigned URL for downloading/viewing a file
 */
export async function getSignedUrlForDownload(
  key: string,
  expiresIn = 3600,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  });

  const signedUrl = await getSignedUrl(getS3Client(), command, { expiresIn });
  return signedUrl;
}

/**
 * List files in R2 bucket with optional prefix
 */
export async function listFiles(prefix = ""): Promise<FileObject[]> {
  const command = new ListObjectsV2Command({
    Bucket: R2_BUCKET,
    Prefix: prefix,
  });

  const response = await getS3Client().send(command);
  return response.Contents || [];
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  });

  const response = await getS3Client().send(command);
  return response;
}

/**
 * Generate a unique key for uploaded files
 */
export function generateUniqueKey(filename: string, folder?: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `${timestamp}-${randomString}-${sanitizedFilename}`;

  return folder ? `${folder}/${key}` : key;
}

/**
 * Get the public URL for a file (requires R2 bucket to have public access enabled)
 * Uses R2_PUBLIC_URL if set, otherwise falls back to default R2.dev subdomain
 */
export function getPublicUrl(key: string): string {
  if (R2_PUBLIC_URL) {
    // Remove trailing slash if present
    const baseUrl = R2_PUBLIC_URL.replace(/\/$/, "");
    return `${baseUrl}/${key}`;
  }
  return `https://${R2_BUCKET}.${R2_ACCOUNT_ID}.r2.dev/${key}`;
}
