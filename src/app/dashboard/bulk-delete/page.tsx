"use client";

import { BulkDeleteEventsDialog } from "@/features/dashboard/bulk-delete/components/bulk-delete-events-dialog";
import { BulkDeleteProductsDialog } from "@/features/dashboard/bulk-delete/components/bulk-delete-products-dialog";
import { BoxIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";

interface EntityCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

function EntityCard({
  title,
  description,
  icon: Icon,
  onClick,
}: EntityCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-8 text-center transition-all hover:border-red-200 hover:shadow-lg"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50 transition-colors group-hover:bg-red-100">
        <Icon className="size-8 text-red-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
    </button>
  );
}

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
