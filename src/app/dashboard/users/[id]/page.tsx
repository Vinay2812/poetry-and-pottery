import {
  getUserById,
  getUserCart,
  getUserDailyWorkshopRegistrations,
  getUserOrders,
  getUserRegistrations,
  getUserWishlistPaginated,
} from "@/data/admin/users/gateway/server";
import { notFound } from "next/navigation";

import { UserDetailPageContent } from "./user-detail-page-content";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Route: /dashboard/users/[id]
 * Page does: Admin user detail page aggregating a customer's activity across systems.
 * Key UI operations:
 * - Inspect profile, orders, event registrations, daily workshops, cart, and wishlist in one view.
 * - Use user-level context to support troubleshooting and account management decisions.
 * UI info needed for operations:
 * - Route param `id` parsed to numeric user ID with not-found handling.
 * - Joined datasets from user, orders, registrations, cart, and wishlist endpoints.
 */
export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    notFound();
  }

  const [
    user,
    orders,
    registrations,
    dailyWorkshopRegistrations,
    cart,
    wishlistResult,
  ] = await Promise.all([
    getUserById(userId),
    getUserOrders(userId),
    getUserRegistrations(userId),
    getUserDailyWorkshopRegistrations(userId),
    getUserCart(userId),
    getUserWishlistPaginated(userId, 1, 12),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <UserDetailPageContent
      userId={userId}
      user={user}
      orders={orders}
      registrations={registrations}
      dailyWorkshopRegistrations={dailyWorkshopRegistrations}
      cart={cart}
      wishlistResult={wishlistResult}
    />
  );
}
