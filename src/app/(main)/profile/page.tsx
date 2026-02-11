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

export default function ProfilePage() {
  return <ProfileContainer />;
}
