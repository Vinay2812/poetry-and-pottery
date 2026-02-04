import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { DashboardFormSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Product</h1>
          <p className="text-muted-foreground">
            Add a new product to your catalog.
          </p>
        </div>
      </div>
      <DashboardFormSkeleton />
    </div>
  );
}
