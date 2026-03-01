import { CollectionFormContainer } from "@/features/dashboard/collections";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Route: /dashboard/collections/new
 * Page does: Admin create page for defining a new storefront collection.
 * Key UI operations:
 * - Fill collection form fields and save a new seasonal/curated collection.
 * - Return to the collections index after successful creation.
 * UI info needed for operations:
 * - Admin authorization and collection form schema (name, slug, banner/media, schedule/status).
 * - Validation rules ensuring unique identifiers and valid scheduling boundaries.
 */
export default function NewCollectionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/collections">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Collection</h1>
          <p className="text-muted-foreground">
            Create a new product collection.
          </p>
        </div>
      </div>

      <CollectionFormContainer />
    </div>
  );
}
