import { DailyWorkshopRegistrationsBoardContainer } from "@/features/dashboard/daily-workshops";
import { OrdersBoardContainer } from "@/features/dashboard/orders";
import { RegistrationsBoardContainer } from "@/features/dashboard/registrations";
import { WishlistViewContainer as WishlistView } from "@/features/dashboard/users";

import { UserDetailTabs } from "@/components/dashboard/user-detail-tabs";

import { UserRole } from "@/graphql/generated/types";

import type { UserCartItem } from "./user-cart-types";
import { UserCartView } from "./user-cart-view";
import { UserDetailHeader } from "./user-detail-header";
import { UserMemberInfo } from "./user-member-info";

interface UserIdentity {
  image?: string | null;
  name?: string | null;
  role: UserRole;
  email: string;
  phone?: string | null;
  created_at: Date | string;
}

interface UserDetailPageContentProps {
  userId: number;
  user: UserIdentity;
  orders: Awaited<
    ReturnType<typeof import("@/data/admin/users/gateway/server").getUserOrders>
  >;
  registrations: Awaited<
    ReturnType<
      typeof import("@/data/admin/users/gateway/server").getUserRegistrations
    >
  >;
  dailyWorkshopRegistrations: Awaited<
    ReturnType<
      typeof import("@/data/admin/users/gateway/server").getUserDailyWorkshopRegistrations
    >
  >;
  cart: UserCartItem[];
  wishlistResult: Awaited<
    ReturnType<
      typeof import("@/data/admin/users/gateway/server").getUserWishlistPaginated
    >
  >;
}

export function UserDetailPageContent({
  userId,
  user,
  orders,
  registrations,
  dailyWorkshopRegistrations,
  cart,
  wishlistResult,
}: UserDetailPageContentProps) {
  return (
    <div className="space-y-6">
      <UserDetailHeader
        image={user.image ?? null}
        name={user.name ?? null}
        role={user.role}
        email={user.email}
        phone={user.phone ?? null}
      />

      <UserMemberInfo createdAt={user.created_at} />

      <UserDetailTabs
        ordersContent={<OrdersBoardContainer orders={orders} />}
        registrationsContent={
          <RegistrationsBoardContainer registrations={registrations} />
        }
        dailyWorkshopsContent={
          <DailyWorkshopRegistrationsBoardContainer
            registrations={dailyWorkshopRegistrations}
          />
        }
        cartContent={<UserCartView items={cart} />}
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
        dailyWorkshopCount={dailyWorkshopRegistrations.length}
        cartCount={cart.length}
        wishlistCount={wishlistResult.total}
      />
    </div>
  );
}
