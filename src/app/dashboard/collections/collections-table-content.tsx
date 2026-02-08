import { getCollections } from "@/data/admin/collections/gateway/server";
import { CollectionsTableContainer } from "@/features/dashboard/collections";

export interface DashboardCollectionsSearchParams {
  search?: string;
  status?: string;
  page?: string;
}

interface CollectionsTableContentProps {
  search?: string;
  status?: string;
  page?: string;
}

export async function CollectionsTableContent({
  search,
  status,
  page,
}: CollectionsTableContentProps) {
  const data = await getCollections({
    search,
    active:
      status === "active" ? true : status === "inactive" ? false : undefined,
    page: page ? parseInt(page) : 1,
    limit: 20,
  });

  return <CollectionsTableContainer data={data} />;
}
