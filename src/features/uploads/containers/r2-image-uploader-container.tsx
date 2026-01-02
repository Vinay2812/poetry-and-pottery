"use client";

import { ACCEPTED_IMAGE_TYPES } from "@/consts/uploads";
import { getPresignedUploadUrl } from "@/data/admin/uploads/gateway/server";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { R2ImageUploader } from "../components/r2-image-uploader";
import type { R2ImageUploaderContainerProps, UploadFile } from "../types";
import {
  buildR2ImageUploaderViewModel,
  createUploadFile,
  createUploadFileFromUrl,
} from "../types";

async function uploadToR2(presignedUrl: string, file: File): Promise<void> {
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

export function R2ImageUploaderContainer({
  folder,
  multiple = false,
  maxFiles = 1,
  value = [],
  onChange,
  disabled = false,
}: R2ImageUploaderContainerProps) {
  // Initialize state with existing URLs using lazy initialization
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>(() =>
    value.map(createUploadFileFromUrl),
  );

  // Use ref to store onChange to avoid infinite loop
  // (onChange causes parent re-render which creates new onChange reference)
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const successUrls = uploadFiles
      .filter((f) => f.status === "success" && f.publicUrl)
      .map((f) => f.publicUrl as string);
    onChangeRef.current?.(successUrls);
  }, [uploadFiles]);

  const uploadFile = useCallback(
    async (fileToUpload: UploadFile) => {
      if (!fileToUpload.file) return;

      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === fileToUpload.id
            ? { ...f, status: "uploading" as const, progress: 0 }
            : f,
        ),
      );

      try {
        // Get presigned URL via server action
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === fileToUpload.id ? { ...f, progress: 30 } : f,
          ),
        );

        const result = await getPresignedUploadUrl({
          filename: fileToUpload.file.name,
          contentType: fileToUpload.file.type,
          fileSize: fileToUpload.file.size,
          folder,
        });

        if (!result.success || !result.presignedUrl || !result.publicUrl) {
          throw new Error(result.error || "Failed to get presigned URL");
        }

        // Upload to R2
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === fileToUpload.id ? { ...f, progress: 60 } : f,
          ),
        );

        await uploadToR2(result.presignedUrl, fileToUpload.file);

        // Mark as success
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === fileToUpload.id
              ? {
                  ...f,
                  status: "success" as const,
                  progress: 100,
                  publicUrl: result.publicUrl ?? null,
                }
              : f,
          ),
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";

        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === fileToUpload.id
              ? { ...f, status: "error" as const, error: errorMessage }
              : f,
          ),
        );
      }
    },
    [folder],
  );

  const handleFilesSelect = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);
      const availableSlots = maxFiles - uploadFiles.length;

      if (availableSlots <= 0) return;

      const filesToAdd = files.slice(0, availableSlots);
      const newUploadFiles = filesToAdd.map(createUploadFile);

      setUploadFiles((prev) => [...prev, ...newUploadFiles]);

      // Start uploading each file
      newUploadFiles.forEach((file) => {
        uploadFile(file);
      });
    },
    [maxFiles, uploadFiles.length, uploadFile],
  );

  const handleRemove = useCallback((id: string) => {
    setUploadFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.previewUrl && !fileToRemove.publicUrl) {
        // Revoke object URL for local previews
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }

      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const handleRetry = useCallback(
    (id: string) => {
      const file = uploadFiles.find((f) => f.id === id);
      if (file && file.file) {
        uploadFile(file);
      }
    },
    [uploadFiles, uploadFile],
  );

  const handleReorder = useCallback((oldIndex: number, newIndex: number) => {
    setUploadFiles((prev) => arrayMove(prev, oldIndex, newIndex));
  }, []);

  const viewModel = useMemo(
    () => buildR2ImageUploaderViewModel(uploadFiles, maxFiles),
    [uploadFiles, maxFiles],
  );

  return (
    <R2ImageUploader
      viewModel={viewModel}
      multiple={multiple}
      maxFiles={maxFiles}
      disabled={disabled}
      acceptedTypes={ACCEPTED_IMAGE_TYPES}
      onFilesSelect={handleFilesSelect}
      onRemove={handleRemove}
      onRetry={handleRetry}
      onReorder={handleReorder}
    />
  );
}
