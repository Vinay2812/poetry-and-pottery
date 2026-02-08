import { Package } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function OrderNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <Package className="text-primary h-10 w-10" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Order not found</h2>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        We couldn&apos;t find this order. It may have been removed or you may
        not have access to it.
      </p>
      <Link href="/orders">
        <Button className="rounded-full px-6">Back to Orders</Button>
      </Link>
    </div>
  );
}
