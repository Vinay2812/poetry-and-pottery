"use client";

import { BulkDeleteEventsDialog } from "@/features/dashboard/bulk-delete/components/bulk-delete-events-dialog";
import { BulkDeleteProductsDialog } from "@/features/dashboard/bulk-delete/components/bulk-delete-products-dialog";
import { BoxIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";

import { EntityCard } from "./entity-card";

export default function BulkDeletePage() {
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bulk Delete</h1>
        <p className="text-muted-foreground">
          Select items to delete in bulk. Products with orders will be
          deactivated, events with registrations will be cancelled.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EntityCard
          title="Products"
          description="Delete or deactivate products in bulk"
          icon={BoxIcon}
          onClick={() => setIsProductsDialogOpen(true)}
        />
        <EntityCard
          title="Events"
          description="Delete or cancel events in bulk"
          icon={CalendarIcon}
          onClick={() => setIsEventsDialogOpen(true)}
        />
      </div>

      <BulkDeleteProductsDialog
        isOpen={isProductsDialogOpen}
        onOpenChange={setIsProductsDialogOpen}
      />

      <BulkDeleteEventsDialog
        isOpen={isEventsDialogOpen}
        onOpenChange={setIsEventsDialogOpen}
      />
    </div>
  );
}
