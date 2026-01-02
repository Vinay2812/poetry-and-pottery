"use client";

import { PackageIcon } from "lucide-react";
import { useCallback } from "react";

import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { OptimizedImage } from "@/components/shared";

import type { AdminUserOrder } from "@/graphql/generated/types";

import { OrderDetailDialogContainer } from "../containers/order-detail-dialog-container";
import type { OrderCardProps, OrdersBoardProps } from "../types";
import { buildOrderCardViewModel } from "../types";

function OrderCard({ viewModel, isDragging, onClick }: OrderCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex h-[180px] cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-sm transition-shadow ${
        isDragging ? "shadow-lg" : "hover:shadow-md"
      }`}
    >
      {/* Order ID */}
      <p className="mb-2 truncate font-mono text-xs text-neutral-400">
        #{viewModel.id}
      </p>

      {/* Product Images - horizontal scroll of circles */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {viewModel.productImages.length > 0 ? (
          viewModel.productImages.map((img) => (
            <div
              key={img.id}
              className="relative size-10 shrink-0 overflow-hidden rounded-full bg-neutral-100"
            >
              {img.imageUrl ? (
                <OptimizedImage
                  src={img.imageUrl}
                  alt={img.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <PackageIcon className="size-4 text-neutral-300" />
                </div>
              )}
              {img.quantity > 1 && (
                <div className="absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-medium text-white">
                  {img.quantity}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
            <PackageIcon className="size-4 text-neutral-300" />
          </div>
        )}
      </div>

      {/* Price with discount */}
      <div className="mb-auto flex items-baseline gap-2">
        <p className="text-primary text-lg font-bold">
          ₹{viewModel.calculatedTotal.toLocaleString("en-IN")}
        </p>
        {viewModel.totalDiscount > 0 && (
          <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
            -₹{viewModel.totalDiscount.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <PackageIcon className="size-3.5" />
          {viewModel.totalItems} item{viewModel.totalItems !== 1 ? "s" : ""}
        </span>
        <span suppressHydrationWarning>
          {new Date(viewModel.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
      <PackageIcon className="mb-3 size-12 text-neutral-300" />
      <p className="text-neutral-500">No orders yet</p>
    </div>
  );
}

export function OrdersBoard({
  columns,
  isLoading,
  selectedOrder,
  dialogOpen,
  onMove,
  onCardClick,
  onDialogOpenChange,
}: OrdersBoardProps) {
  const renderOrderCard = useCallback(
    (order: AdminUserOrder, isDragging?: boolean) => {
      const viewModel = buildOrderCardViewModel(order);
      return (
        <OrderCard
          viewModel={viewModel}
          isDragging={isDragging}
          onClick={() => onCardClick(order)}
        />
      );
    },
    [onCardClick],
  );

  // Check if all columns are empty
  const isEmpty = columns.every((col) => col.items.length === 0);

  if (isEmpty && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div>
      <KanbanBoard
        columns={columns}
        onMove={onMove}
        renderCard={renderOrderCard}
        isLoading={isLoading}
      />
      <OrderDetailDialogContainer
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
      />
    </div>
  );
}
