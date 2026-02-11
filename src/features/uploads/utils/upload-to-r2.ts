/**
 * Uploads a file to Cloudflare R2 using a presigned URL.
 * Throws an error if the upload fails.
 */
export async function uploadToR2(
  presignedUrl: string,
  file: File,
): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to upload file to R2");
  }
}
