import {
  getUserById,
  getUserCart,
  getUserOrders,
  getUserRegistrations,
  getUserWishlistPaginated,
} from "@/data/admin/users/gateway/server";
import { OrdersBoardContainer } from "@/features/dashboard/orders";
import { RegistrationsBoardContainer } from "@/features/dashboard/registrations";
import { UserRole } from "@/prisma/generated/enums";
import {
  ArrowLeftIcon,
  PackageIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { UserDetailTabs } from "@/components/dashboard/user-detail-tabs";
import { WishlistView } from "@/components/dashboard/wishlist-view";
import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    notFound();
  }

  const [user, orders, registrations, cart, wishlistResult] = await Promise.all(
    [
      getUserById(userId),
      getUserOrders(userId),
      getUserRegistrations(userId),
      getUserCart(userId),
      getUserWishlistPaginated(userId, 1, 12),
    ],
  );

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Back button - always at top */}
        <Link href="/dashboard/users" className="inline-block">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="size-5" />
          </Button>
        </Link>

        {/* User info - stacked on mobile, horizontal on desktop */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          {user.image ? (
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-neutral-100 sm:size-16">
              <OptimizedImage
                src={user.image}
                alt={user.name || ""}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-primary/10 text-primary flex size-20 shrink-0 items-center justify-center rounded-full sm:size-16">
              <UserIcon className="size-10 sm:size-8" />
            </div>
          )}
          <div className="space-y-1">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <h1 className="text-xl font-bold sm:text-2xl">
                {user.name || "Unnamed User"}
              </h1>
              <Badge
                variant={user.role === UserRole.ADMIN ? "default" : "outline"}
                className="gap-1"
              >
                {user.role === UserRole.ADMIN && (
                  <ShieldIcon className="size-3" />
                )}
                {user.role}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              {user.email}
            </p>
            {user.phone && (
              <p className="text-muted-foreground text-sm">{user.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Member info */}
      <div className="rounded-xl bg-neutral-50 p-4">
        <p className="text-sm text-neutral-500">
          Member since{" "}
          {new Date(user.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Tabs */}
      <UserDetailTabs
        ordersContent={<OrdersBoardContainer orders={orders} />}
        registrationsContent={
          <RegistrationsBoardContainer registrations={registrations} />
        }
        cartContent={<CartView items={cart} />}
        wishlistContent={
          <WishlistView
            userId={userId}
            initialData={wishlistResult.data}
            initialPagination={{
              total: wishlistResult.total,
              page: wishlistResult.page,
              totalPages: wishlistResult.totalPages,
            }}
          />
        }
        orderCount={orders.length}
        registrationCount={registrations.length}
        cartCount={cart.length}
        wishlistCount={wishlistResult.total}
      />
    </div>
  );
}

interface CartItem {
  id: number;
  quantity: number;
  created_at: Date | string;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    available_quantity: number;
    image_urls: string[];
  };
}

function CartView({ items }: { items: CartItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
        <ShoppingCartIcon className="mb-3 size-12 text-neutral-300" />
        <p className="text-neutral-500">Cart is empty</p>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="space-y-4">
      <div className="divide-y rounded-xl bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            {item.product.image_urls[0] ? (
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                <OptimizedImage
                  src={item.product.image_urls[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                <PackageIcon className="size-6 text-neutral-400" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${item.product.id}`}
                className="hover:text-primary font-medium"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-neutral-500">
                ₹{item.product.price.toLocaleString("en-IN")} x {item.quantity}
              </p>
              {item.product.available_quantity === 0 && (
                <Badge variant="destructive" className="mt-1">
                  Out of stock
                </Badge>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">
                ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl bg-neutral-100 p-4">
        <span className="font-medium">Cart Total</span>
        <span className="text-primary text-xl font-bold">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}
