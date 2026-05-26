"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  CONTENT_MEDIA_GLOBALS,
  CONTENT_MEDIA_PAGES,
  type ContentMediaSelection,
} from "../types";
import { BrandAssetsPanel } from "./BrandAssetsPanel";
import { FooterPanel } from "./FooterPanel";
import { PagePanel } from "./PagePanel";

interface Props {
  selection: ContentMediaSelection;
  onSelect: (s: ContentMediaSelection) => void;
  pageContent?: {
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
  } | null;
  defaults: Record<string, unknown>;
  onHeroChange: (slug: string, url: string) => void;
  onVideoChange: (next: { src?: string; poster?: string }) => void;
  onSeoChange: (page: string, entry: Record<string, string>) => void;
  onTaglineChange: (page: string, entry: Record<string, string>) => void;
}

export function ContentMediaPage({
  selection,
  onSelect,
  pageContent,
  defaults,
  onHeroChange,
  onVideoChange,
  onSeoChange,
  onTaglineChange,
}: Props) {
  const isGlobal = (CONTENT_MEDIA_GLOBALS as readonly { slug: string }[]).some(
    (g) => g.slug === selection,
  );
  const previewHref = selection === "home" ? "/" : `/${selection}`;

  return (
    <div className="flex h-full">
      <aside className="w-56 space-y-6 border-r p-4">
        <Section title="Pages">
          {CONTENT_MEDIA_PAGES.map((p) => (
            <RailItem
              key={p.slug}
              active={p.slug === selection}
              onClick={() => onSelect(p.slug)}
            >
              {p.label}
            </RailItem>
          ))}
        </Section>
        <Section title="Global">
          {CONTENT_MEDIA_GLOBALS.map((g) => (
            <RailItem
              key={g.slug}
              active={g.slug === selection}
              onClick={() => onSelect(g.slug)}
            >
              {g.label}
            </RailItem>
          ))}
        </Section>
      </aside>

      <main className="flex-1 space-y-6 p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Content Media</h1>
          {!isGlobal && (
            <Button asChild size="sm" variant="secondary">
              <Link href={previewHref} target="_blank">
                Preview site ↗
              </Link>
            </Button>
          )}
        </header>

        {selection === "brand" && <BrandAssetsPanel defaults={defaults} />}
        {selection === "footer" && <FooterPanel defaults={defaults} />}
        {!isGlobal && pageContent && (
          <PagePanel
            slug={selection}
            content={pageContent}
            defaults={defaults}
            onHeroChange={(url) => onHeroChange(selection, url)}
            onVideoChange={onVideoChange}
            onSeoChange={(entry) => onSeoChange(selection, entry)}
            onTaglineChange={(entry) => onTaglineChange(selection, entry)}
          />
        )}
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-muted-foreground px-2 text-xs font-medium tracking-wider uppercase">
        {title}
      </div>
      <ul className="mt-2 space-y-1">{children}</ul>
    </div>
  );
}

function RailItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`w-full rounded-md px-3 py-2 text-left text-sm ${
          active ? "bg-primary/10 text-primary" : "hover:bg-muted"
        }`}
      >
        {children}
      </button>
    </li>
  );
}
