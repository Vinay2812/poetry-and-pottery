import type { Metadata } from "next";

import { ProfileContainer } from "./profile-container";

export const metadata: Metadata = {
  title: "My Profile | Poetry & Pottery",
  description:
    "Manage your account settings, view orders, and update preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Route: /profile
 * Page does: Account hub page for personal shortcuts, profile settings, and session actions.
 * Key UI operations:
 * - Open profile settings, navigate to orders/wishlist/registrations/help pages, and sign out.
 * - View account summary counters that reflect pending orders, wishlist, and registrations.
 * UI info needed for operations:
 * - Authenticated Clerk user profile fields (name, email, avatar, membership date).
 * - UI store counters used for badges and quick-account navigation cards.
 */
export default function ProfilePage() {
  return <ProfileContainer />;
}
