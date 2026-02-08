import { getCollectionById } from "@/data/admin/collections/gateway/server";
import {
  CollectionFormContainer,
  CollectionProductsContainer,
  getCollectionStatus,
} from "@/features/dashboard/collections";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DashboardSectionSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createDate } from "@/lib/date";

const STATUS_BADGE_CONFIG: Record<
  ReturnType<typeof getCollectionStatus>,
  { label: string; className: string }
> = {
  active: { label: "Active", className: "bg-green-100 text-green-700" },
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700" },
  ended: { label: "Ended", className: "bg-neutral-100 text-neutral-500" },
  always: { label: "Always Active", className: "bg-primary/10 text-primary" },
};

interface CollectionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { id } = await params;
  const collectionId = parseInt(id);

  if (isNaN(collectionId)) {
    notFound();
  }

  const collection = await getCollectionById(collectionId);

  if (!collection) {
    notFound();
  }

  const status = getCollectionStatus(
    collection.starts_at ? createDate(collection.starts_at) : null,
    collection.ends_at ? createDate(collection.ends_at) : null,
  );
  const statusConfig = STATUS_BADGE_CONFIG[status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Link href="/dashboard/collections" className="shrink-0">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="size-4" />
            </Button>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {collection.name}
              </h1>
              <Badge className={statusConfig.className}>
                {statusConfig.label}
              </Badge>
              <Badge variant="outline">
                {collection.products_count}{" "}
                {collection.products_count === 1 ? "product" : "products"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              ID: {collection.id} - Slug: {collection.slug}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="products">
            Products ({collection.products_count})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Suspense fallback={<DashboardSectionSkeleton />}>
            <CollectionFormContainer collection={collection} />
          </Suspense>
        </TabsContent>

        <TabsContent value="products">
          <Suspense fallback={<DashboardSectionSkeleton />}>
            <CollectionProductsContainer collection={collection} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
