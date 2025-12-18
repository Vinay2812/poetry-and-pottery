import type { Metadata } from "next";

import { ProfileClient } from "./profile-client";

export const metadata: Metadata = {
  title: "My Profile | Poetry & Pottery",
  description:
    "Manage your account settings, view orders, and update preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
