"use client";

import { useUIStore } from "@/store";

import {
  useAdminBrandAssetsQuery,
  useAdminUpdateBrandAssetsMutation,
} from "@/graphql/generated/graphql";

import { MediaField } from "./MediaField";

interface Props {
  defaults: Record<string, unknown>;
}

export function BrandAssetsPanel({ defaults }: Props) {
  const { data, refetch } = useAdminBrandAssetsQuery();
  const [update] = useAdminUpdateBrandAssetsMutation();
  const addToast = useUIStore((s) => s.addToast);
  const d = (defaults.brand_assets ?? {}) as Record<string, string>;
  const v = data?.adminBrandAssets;

  const save = async (input: Record<string, string>) => {
    const r = await update({ variables: { input } });
    if (r.data?.adminUpdateBrandAssets.success) {
      addToast({ type: "success", message: "Brand assets updated" });
      void refetch();
      void fetch("/api/revalidate-site-content", { method: "POST" }).catch(
        () => {},
      );
    } else {
      addToast({
        type: "error",
        message: r.data?.adminUpdateBrandAssets.error ?? "Failed",
      });
    }
  };

  if (!v) return <p className="text-muted-foreground text-sm">Loading…</p>;
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <MediaField
        kind="image"
        label="Logo"
        aspect="logo"
        value={v.logo}
        defaultValue={d.logo}
        onChange={(s) => save({ logo: s })}
      />
      <MediaField
        kind="image"
        label="Logo (dark)"
        aspect="logo"
        value={v.logoDark}
        defaultValue={d.logoDark}
        onChange={(s) => save({ logoDark: s })}
      />
      <MediaField
        kind="image"
        label="Favicon"
        aspect="square"
        value={v.favicon}
        defaultValue={d.favicon}
        onChange={(s) => save({ favicon: s })}
      />
      <MediaField
        kind="image"
        label="Apple touch icon"
        aspect="square"
        value={v.appleTouchIcon}
        defaultValue={d.appleTouchIcon}
        onChange={(s) => save({ appleTouchIcon: s })}
      />
      <MediaField
        kind="image"
        label="Default OG image"
        aspect="1:1"
        value={v.defaultOgImage}
        defaultValue={d.defaultOgImage}
        onChange={(s) => save({ defaultOgImage: s })}
      />
    </div>
  );
}
