"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { MediaField } from "./MediaField";

interface PagePanelProps {
  slug: string;
  content: {
    hero: string;
    video?: { src: string; poster: string } | null;
    seo: {
      title: string;
      description: string;
      ogImage: string;
      ogTitle: string;
      ogDescription: string;
    };
    tagline: { heading: string; subheading: string; ctaText: string };
  };
  defaults: Record<string, unknown>;
  onHeroChange: (url: string) => void;
  onVideoChange: (next: { src?: string; poster?: string }) => void;
  onSeoChange: (entry: {
    title?: string;
    description?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  }) => void;
  onTaglineChange: (entry: {
    heading?: string;
    subheading?: string;
    ctaText?: string;
  }) => void;
}

export function PagePanel({
  slug,
  content,
  defaults,
  onHeroChange,
  onVideoChange,
  onSeoChange,
  onTaglineChange,
}: PagePanelProps) {
  const heroes = (defaults.hero_images ?? {}) as Record<string, string>;
  const videos = (defaults.hero_videos ?? {}) as {
    home?: { src: string; poster: string };
  };
  const seos = (defaults.seo_metadata ?? {}) as Record<
    string,
    typeof content.seo
  >;
  const tags = (defaults.page_taglines ?? {}) as Record<
    string,
    typeof content.tagline
  >;

  const defHero = heroes[slug] ?? "";
  const defVideo =
    slug === "home" ? (videos.home ?? { src: "", poster: "" }) : null;
  const defSeo = seos[slug] ?? content.seo;
  const defTagline = tags[slug] ?? content.tagline;

  // Sync local state when the parent's content changes (e.g. switching slugs).
  // Uses the React-docs "store info from previous render" pattern so we don't
  // setState in an effect.
  const [seo, setSeo] = useState(content.seo);
  const [tag, setTag] = useState(content.tagline);
  const [lastContentSeo, setLastContentSeo] = useState(content.seo);
  const [lastContentTag, setLastContentTag] = useState(content.tagline);
  if (content.seo !== lastContentSeo) {
    setLastContentSeo(content.seo);
    setSeo(content.seo);
  }
  if (content.tagline !== lastContentTag) {
    setLastContentTag(content.tagline);
    setTag(content.tagline);
  }

  useEffect(() => {
    const t = setTimeout(() => onSeoChange(seo), 1200);
    return () => clearTimeout(t);
  }, [seo, onSeoChange]);

  useEffect(() => {
    const t = setTimeout(() => onTaglineChange(tag), 1200);
    return () => clearTimeout(t);
  }, [tag, onTaglineChange]);

  // Reference defTagline to keep parity with defSeo even though tagline
  // defaults aren't surfaced as a separate control yet.
  void defTagline;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-medium capitalize">{slug} — Hero image</h2>
        <MediaField
          kind="image"
          label="Hero image"
          aspect="16:9"
          value={content.hero}
          defaultValue={defHero}
          onChange={onHeroChange}
        />
      </section>

      {defVideo && (
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Hero video</h2>
          <MediaField
            kind="video"
            label="Video source"
            aspect="16:9"
            value={content.video?.src ?? ""}
            defaultValue={defVideo.src}
            onChange={(src) => onVideoChange({ src })}
          />
          <MediaField
            kind="image"
            label="Video poster"
            aspect="16:9"
            value={content.video?.poster ?? ""}
            defaultValue={defVideo.poster}
            onChange={(poster) => onVideoChange({ poster })}
          />
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-medium">SEO</h2>
        <LabeledInput
          label="Title"
          value={seo.title}
          onChange={(v) => setSeo((s) => ({ ...s, title: v }))}
        />
        <LabeledTextarea
          label="Description"
          value={seo.description}
          onChange={(v) => setSeo((s) => ({ ...s, description: v }))}
        />
        <MediaField
          kind="image"
          label="OG image"
          aspect="1:1"
          value={seo.ogImage}
          defaultValue={defSeo.ogImage}
          onChange={(v) => setSeo((s) => ({ ...s, ogImage: v }))}
        />
        <LabeledInput
          label="OG title"
          value={seo.ogTitle}
          onChange={(v) => setSeo((s) => ({ ...s, ogTitle: v }))}
        />
        <LabeledTextarea
          label="OG description"
          value={seo.ogDescription}
          onChange={(v) => setSeo((s) => ({ ...s, ogDescription: v }))}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Tagline</h2>
        <LabeledInput
          label="Heading"
          value={tag.heading}
          onChange={(v) => setTag((t) => ({ ...t, heading: v }))}
        />
        <LabeledInput
          label="Subheading"
          value={tag.subheading}
          onChange={(v) => setTag((t) => ({ ...t, subheading: v }))}
        />
        <LabeledInput
          label="CTA text"
          value={tag.ctaText}
          onChange={(v) => setTag((t) => ({ ...t, ctaText: v }))}
        />
      </section>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    </div>
  );
}
