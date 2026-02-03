// Status of an individual file upload.
export type UploadStatus = "idle" | "uploading" | "success" | "error";

// Represents a single file being uploaded or already uploaded.
export interface UploadFile {
  id: string;
  file: File | null;
  previewUrl: string;
  publicUrl: string | null;
  status: UploadStatus;
  progress: number;
  error: string | null;
}

// View model for a single upload item.
export interface UploadItemViewModel {
  id: string;
  previewUrl: string;
  publicUrl: string | null;
  status: UploadStatus;
  progress: number;
  error: string | null;
  isUploading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

// View model for the R2ImageUploader component.
export interface R2ImageUploaderViewModel {
  items: UploadItemViewModel[];
  canAddMore: boolean;
  totalCount: number;
  uploadedCount: number;
  hasErrors: boolean;
  isAnyUploading: boolean;
}

// Props for the presentational R2ImageUploader component.
export interface R2ImageUploaderProps {
  viewModel: R2ImageUploaderViewModel;
  multiple: boolean;
  maxFiles: number;
  disabled: boolean;
  acceptedTypes: string;
  onFilesSelect: (files: FileList) => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onReorder?: (oldIndex: number, newIndex: number) => void;
}

// Props for the R2ImageUploaderContainer.
export interface R2ImageUploaderContainerProps {
  folder?: string;
  multiple?: boolean;
  maxFiles?: number;
  value?: string[];
  onChange?: (urls: string[]) => void;
  disabled?: boolean;
}

// Response from the presign API.
export interface PresignResponse {
  presignedUrl: string;
  publicUrl: string;
  key: string;
}

// Build upload item view model from upload file data.
export function buildUploadItemViewModel(
  file: UploadFile,
): UploadItemViewModel {
  return {
    id: file.id,
    previewUrl: file.previewUrl,
    publicUrl: file.publicUrl,
    status: file.status,
    progress: file.progress,
    error: file.error,
    isUploading: file.status === "uploading",
    isSuccess: file.status === "success",
    isError: file.status === "error",
  };
}

// Build R2ImageUploader view model from upload files.
export function buildR2ImageUploaderViewModel(
  files: UploadFile[],
  maxFiles: number,
): R2ImageUploaderViewModel {
  const items = files.map(buildUploadItemViewModel);
  const uploadedCount = files.filter((f) => f.status === "success").length;
  const hasErrors = files.some((f) => f.status === "error");
  const isAnyUploading = files.some((f) => f.status === "uploading");

  return {
    items,
    canAddMore: files.length < maxFiles,
    totalCount: files.length,
    uploadedCount,
    hasErrors,
    isAnyUploading,
  };
}

// Generate a unique ID for upload files.
export function generateUploadId(): string {
  return `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Create an UploadFile from a File object.
export function createUploadFile(file: File): UploadFile {
  return {
    id: generateUploadId(),
    file,
    previewUrl: URL.createObjectURL(file),
    publicUrl: null,
    status: "idle",
    progress: 0,
    error: null,
  };
}

// Create an UploadFile from an existing URL.
export function createUploadFileFromUrl(url: string): UploadFile {
  return {
    id: generateUploadId(),
    file: null,
    previewUrl: url,
    publicUrl: url,
    status: "success",
    progress: 100,
    error: null,
  };
}
