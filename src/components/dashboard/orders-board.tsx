"use client";

import { getOrderStatusColor, updateOrderStatus } from "@/actions/admin";
import type { UserOrder } from "@/actions/admin";
import { OrderDetailDialogContainer } from "@/features/dashboard/orders";
import { OrderStatus } from "@/prisma/generated/enums";
import { PackageIcon } from "lucide-react";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import { OptimizedImage } from "@/components/shared";

import { KanbanBoard, KanbanColumn } from "./kanban-board";

interface OrdersBoardProps {
  orders: UserOrder[];
}

// Define the columns for order status
const ORDER_COLUMNS: { id: OrderStatus; title: string }[] = [
  { id: OrderStatus.PENDING, title: "Pending" },
  { id: OrderStatus.PROCESSING, title: "Approved" },
  { id: OrderStatus.PAID, title: "Paid" },
  { id: OrderStatus.SHIPPED, title: "Shipped" },
  { id: OrderStatus.DELIVERED, title: "Delivered" },
  { id: OrderStatus.CANCELLED, title: "Cancelled" },
];

export function OrdersBoard({ orders }: OrdersBoardProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(orders);
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = useCallback((order: UserOrder) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  }, []);

  const columns = useMemo((): KanbanColumn<UserOrder>[] => {
    return ORDER_COLUMNS.map((col) => ({
      id: col.id,
      title: col.title,
      items: optimisticOrders.filter((order) => order.status === col.id),
      colorClass: getOrderStatusColor(col.id),
    }));
  }, [optimisticOrders]);

  const handleMove = useCallback(
    async (orderId: string, fromColumn: string, toColumn: string) => {
      const newStatus = toColumn as OrderStatus;

      // Optimistic update
      startTransition(async () => {
        setOptimisticOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );

        const result = await updateOrderStatus(orderId, newStatus);

        if (!result.success) {
          console.error("Failed to update order status:", result.error);
          // The page will revalidate and show the correct state
        }
      });
    },
    [setOptimisticOrders],
  );

  const renderOrderCard = useCallback(
    (order: UserOrder, isDragging?: boolean) => {
      const totalItems = order.ordered_products.reduce(
        (sum, p) => sum + p.quantity,
        0,
      );

      // Calculate values from item data (source of truth)
      const subtotal = order.ordered_products.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0,
      );
      const totalDiscount = order.ordered_products.reduce(
        (sum, p) => sum + p.discount,
        0,
      );
      const calculatedTotal = subtotal + order.shipping_fee - totalDiscount;

      return (
        <div
          onClick={() => handleCardClick(order)}
          className={`flex h-[180px] cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-sm transition-shadow ${
            isDragging ? "shadow-lg" : "hover:shadow-md"
          }`}
        >
          {/* Order ID */}
          <p className="mb-2 truncate font-mono text-xs text-neutral-400">
            #{order.id}
          </p>

          {/* Product Images - horizontal scroll of circles */}
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {order.ordered_products.length > 0 ? (
              order.ordered_products.map((op) => (
                <div
                  key={op.id}
                  className="relative size-10 shrink-0 overflow-hidden rounded-full bg-neutral-100"
                >
                  {op.product.image_urls[0] ? (
                    <OptimizedImage
                      src={op.product.image_urls[0]}
                      alt={op.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <PackageIcon className="size-4 text-neutral-300" />
                    </div>
                  )}
                  {op.quantity > 1 && (
                    <div className="absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-medium text-white">
                      {op.quantity}
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
              ₹{Math.max(0, calculatedTotal).toLocaleString("en-IN")}
            </p>
            {totalDiscount > 0 && (
              <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                -₹{totalDiscount.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <PackageIcon className="size-3.5" />
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
            <span suppressHydrationWarning>
              {new Date(order.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      );
    },
    [handleCardClick],
  );

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
        <PackageIcon className="mb-3 size-12 text-neutral-300" />
        <p className="text-neutral-500">No orders yet</p>
      </div>
    );
  }

  return (
    <div>
      <KanbanBoard
        columns={columns}
        onMove={handleMove}
        renderCard={renderOrderCard}
        isLoading={isPending}
      />
      <OrderDetailDialogContainer
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
