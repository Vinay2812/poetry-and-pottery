"use client";

import { useUIStore } from "@/store";
import { useCallback, useState } from "react";

import {
  useAdminPageContentQuery,
  useAdminUpdateHeroImagesMutation,
  useAdminUpdateHeroVideosMutation,
  useAdminUpdatePageTaglinesMutation,
  useAdminUpdateSeoMetadataMutation,
  useSiteContentDefaultsQuery,
} from "@/graphql/generated/graphql";

import { ContentMediaPage } from "../components/ContentMediaPage";
import { CONTENT_MEDIA_PAGES, type ContentMediaSelection } from "../types";

const revalidatePublic = () =>
  fetch("/api/revalidate-site-content", { method: "POST" }).catch(() => {});

export function ContentMediaPageContainer() {
  const [selection, setSelection] = useState<ContentMediaSelection>("home");
  const addToast = useUIStore((s) => s.addToast);

  const { data: defaultsData } = useSiteContentDefaultsQuery();
  const defaults = (defaultsData?.siteContentDefaults?.value ?? {}) as Record<
    string,
    unknown
  >;

  const isPage = (CONTENT_MEDIA_PAGES as readonly { slug: string }[]).some(
    (p) => p.slug === selection,
  );
  const { data: pageData, refetch } = useAdminPageContentQuery({
    variables: { pageSlug: selection },
    skip: !isPage,
  });

  const [updateHero] = useAdminUpdateHeroImagesMutation();
  const [updateVideo] = useAdminUpdateHeroVideosMutation();
  const [updateSeo] = useAdminUpdateSeoMetadataMutation();
  const [updateTag] = useAdminUpdatePageTaglinesMutation();

  const notify = useCallback(
    (ok: boolean, err: string | null | undefined, label: string) => {
      if (ok) addToast({ type: "success", message: `${label} updated` });
      else addToast({ type: "error", message: err ?? "Failed" });
    },
    [addToast],
  );

  const handleHero = useCallback(
    async (slug: string, url: string) => {
      const r = await updateHero({
        variables: { input: { [slug]: url } as Record<string, string> },
      });
      const ok = !!r.data?.adminUpdateHeroImages.success;
      notify(ok, r.data?.adminUpdateHeroImages.error, "Hero");
      void refetch();
      if (ok) void revalidatePublic();
    },
    [updateHero, notify, refetch],
  );

  const handleVideo = useCallback(
    async (next: { src?: string; poster?: string }) => {
      const r = await updateVideo({
        variables: { input: { home: next } },
      });
      const ok = !!r.data?.adminUpdateHeroVideos.success;
      notify(ok, r.data?.adminUpdateHeroVideos.error, "Video");
      void refetch();
      if (ok) void revalidatePublic();
    },
    [updateVideo, notify, refetch],
  );

  const handleSeo = useCallback(
    async (page: string, entry: Record<string, string>) => {
      const r = await updateSeo({
        variables: { input: { page, entry } },
      });
      const ok = !!r.data?.adminUpdateSeoMetadata.success;
      notify(ok, r.data?.adminUpdateSeoMetadata.error, "SEO");
      void refetch();
      if (ok) void revalidatePublic();
    },
    [updateSeo, notify, refetch],
  );

  const handleTagline = useCallback(
    async (page: string, entry: Record<string, string>) => {
      const r = await updateTag({
        variables: { input: { page, entry } },
      });
      const ok = !!r.data?.adminUpdatePageTaglines.success;
      notify(ok, r.data?.adminUpdatePageTaglines.error, "Tagline");
      void refetch();
      if (ok) void revalidatePublic();
    },
    [updateTag, notify, refetch],
  );

  return (
    <ContentMediaPage
      selection={selection}
      onSelect={setSelection}
      pageContent={pageData?.adminPageContent}
      defaults={defaults}
      onHeroChange={handleHero}
      onVideoChange={handleVideo}
      onSeoChange={handleSeo}
      onTaglineChange={handleTagline}
    />
  );
}
