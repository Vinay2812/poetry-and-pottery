import { ContentPagesListSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Pages</h1>
        <p className="text-muted-foreground">
          Manage static page content for About, FAQ, Shipping, Care, Privacy,
          and Terms pages.
        </p>
      </div>
      <ContentPagesListSkeleton />
    </div>
  );
}
