"use client";

import { CollectionsSectionSkeleton } from "@/components/skeletons/collections-section-skeleton";

import { createDate } from "@/lib/date";

import { useCollectionsQuery } from "@/graphql/generated/graphql";

import { CollectionsSection } from "./collections-section";

interface CollectionsSectionContainerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  viewAllHref?: string;
}

export function CollectionsSectionContainer({
  title,
  subtitle,
  className,
  viewAllHref,
}: CollectionsSectionContainerProps) {
  const { data, loading, error } = useCollectionsQuery();

  if (loading) {
    return (
      <CollectionsSectionSkeleton
        className={className}
        title={title}
        subtitle={subtitle}
        viewAllHref={viewAllHref}
      />
    );
  }

  if (error || !data?.collections) {
    return null;
  }

  // Filter to only show active collections (current date is within date window)
  const now = createDate();
  const activeCollections = data.collections.filter((collection) => {
    const startsAt = collection.starts_at
      ? createDate(collection.starts_at)
      : null;
    const endsAt = collection.ends_at ? createDate(collection.ends_at) : null;

    const hasStarted = !startsAt || now >= startsAt;
    const hasNotEnded = !endsAt || now <= endsAt;

    return hasStarted && hasNotEnded;
  });

  if (activeCollections.length === 0) {
    return null;
  }

  return (
    <CollectionsSection
      collections={activeCollections}
      title={title}
      subtitle={subtitle}
      className={className}
      viewAllHref={viewAllHref}
    />
  );
}
