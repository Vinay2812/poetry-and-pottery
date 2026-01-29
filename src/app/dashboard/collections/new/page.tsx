import { CollectionFormContainer } from "@/features/dashboard/collections";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
