"use client";

import { ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { CollectionBase } from "@/graphql/generated/types";

interface FeaturedCollectionCardProps {
  collection: CollectionBase;
}

function FeaturedCollectionCard({ collection }: FeaturedCollectionCardProps) {
  const endsAt = collection.ends_at ? new Date(collection.ends_at) : null;
  const now = new Date();
  const isEnding =
    endsAt &&
    endsAt > now &&
    endsAt.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Link
      href={`/products?collection_ids=${collection.id}`}
      className="group bg-primary-light shadow-soft hover:shadow-card flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative aspect-4/3 min-h-0 overflow-hidden lg:aspect-auto lg:flex-1">
        {collection.image_url ? (
          <Image
            src={collection.image_url}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="bg-primary-light absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-primary/30 h-16 w-16" />
          </div>
        )}

        {/* Featured Badge */}
        <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-700 backdrop-blur-sm">
          FEATURED
        </span>

        {/* Limited Badge */}
        {isEnding && (
          <span className="absolute top-3 right-3 rounded-md bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            Limited
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-neutral-900">
          {collection.name}
          {/* Items Count Badge */}
          <span className="ml-4 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-medium text-neutral-600 backdrop-blur-sm">
            {collection.products_count} items
          </span>
        </h3>
        {collection.description && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {collection.description}
          </p>
        )}
      </div>
    </Link>
  );
}

interface CollectionListItemProps {
  collection: CollectionBase;
}

function CollectionListItem({ collection }: CollectionListItemProps) {
  const endsAt = collection.ends_at ? new Date(collection.ends_at) : null;
  const now = new Date();
  const isEnding =
    endsAt &&
    endsAt > now &&
    endsAt.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Link
      href={`/products?collection_ids=${collection.id}`}
      className="bg-primary-lighter group shadow-soft hover:shadow-card flex items-center gap-4 rounded-xl p-3 transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="bg-primary-light relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        {collection.image_url ? (
          <Image
            src={collection.image_url}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Sparkles className="text-primary/30 h-6 w-6" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-[15px] font-semibold text-neutral-900">
          {collection.name}
        </h4>
        <p className="mt-0.5 text-[13px] text-neutral-500">
          {collection.products_count} items
          {isEnding && <span className="ml-1.5 text-amber-600">· Limited</span>}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight className="group-hover:text-primary h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

interface CollectionsSectionProps {
  collections: CollectionBase[];
  title?: string;
  subtitle?: string;
  className?: string;
  viewAllHref?: string;
}

export function CollectionsSection({
  collections,
  title = "Shop by Collection",
  className,
  viewAllHref = "/products",
}: CollectionsSectionProps) {
  if (collections.length === 0) return null;

  // First collection is featured (already sorted by created_at desc from API)
  const [featuredCollection, ...otherCollections] = collections;

  return (
    <section className={cn("relative", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            View All
            <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-6">
        {/* Featured Collection */}
        <FeaturedCollectionCard collection={featuredCollection} />

        {/* Other Collections List */}
        {otherCollections.length > 0 && (
          <div className="flex flex-col gap-3">
            {otherCollections.slice(0, 4).map((collection) => (
              <CollectionListItem key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
