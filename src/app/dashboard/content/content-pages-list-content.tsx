import { getContentPages } from "@/data/admin/content/gateway/server";
import { ContentPagesListContainer } from "@/features/dashboard/content";

export async function ContentPagesListContent() {
  const pages = await getContentPages();

  return <ContentPagesListContainer data={pages} />;
}
