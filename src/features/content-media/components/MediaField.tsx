"use client";

import { uploadToR2 } from "@/features/uploads/utils/upload-to-r2";
import { useUIStore } from "@/store";
import { useState } from "react";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAdminGetPresignedUploadUrlMutation } from "@/graphql/generated/graphql";

export type MediaKind = "image" | "video";
export type MediaAspect = "16:9" | "1:1" | "square" | "logo";

interface MediaFieldProps {
  kind: MediaKind;
  label: string;
  value: string;
  defaultValue: string;
  aspect?: MediaAspect;
  folder?: string;
  onChange: (next: string) => void;
}

const aspectClass: Record<MediaAspect, string> = {
  "16:9": "aspect-video",
  "1:1": "aspect-square",
  square: "aspect-square",
  logo: "aspect-[3/1] bg-neutral-100",
};

export function MediaField({
  kind,
  label,
  value,
  defaultValue,
  aspect = "16:9",
  folder = "site-content",
  onChange,
}: MediaFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [getPresigned] = useAdminGetPresignedUploadUrlMutation();
  const addToast = useUIStore((s) => s.addToast);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const { data } = await getPresigned({
        variables: {
          input: {
            filename: file.name,
            contentType: file.type,
            fileSize: file.size,
            folder,
          },
        },
      });
      const result = data?.adminGetPresignedUploadUrl;
      if (!result?.success || !result.presignedUrl || !result.publicUrl) {
        throw new Error(result?.error ?? "Upload init failed");
      }
      await uploadToR2(result.presignedUrl, file);
      onChange(result.publicUrl);
      addToast({ type: "success", message: `${label} uploaded` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setError(msg);
      addToast({ type: "error", message: msg });
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => onChange(defaultValue);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <button
          type="button"
          onClick={handleReset}
          className="text-muted-foreground text-xs underline-offset-2 hover:underline"
        >
          Reset to default
        </button>
      </div>
      <div
        className={`relative w-full overflow-hidden rounded-lg ${aspectClass[aspect]}`}
      >
        {value ? (
          kind === "video" ? (
            <video
              key={value}
              src={value}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <OptimizedImage
              src={value}
              alt={label}
              fill
              className="object-cover"
              onError={() => setError("Preview failed to load")}
            />
          )
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
            No preview
          </div>
        )}
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://…"
      />
      <div className="flex items-center gap-2">
        <label className="inline-flex">
          <input
            type="file"
            accept={kind === "video" ? "video/mp4,video/webm" : "image/*"}
            disabled={uploading}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={uploading}
            asChild
          >
            <span>{uploading ? "Uploading…" : `Upload ${kind}`}</span>
          </Button>
        </label>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    </div>
  );
}
