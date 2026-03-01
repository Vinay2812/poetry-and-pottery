import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { FlowChooser } from "@/components/auth";

import { UserRole } from "@/graphql/generated/types";

interface PostLoginPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

/**
 * Route: /post-login
 * Page does: Post-auth router page that resolves where a signed-in user should be sent next.
 * Key UI operations:
 * - Redirect non-admin users to the requested destination or home.
 * - Show the admin flow chooser when the signed-in user has admin role.
 * UI info needed for operations:
 * - Auth session claims (`isAuthenticated`, `sessionClaims.role`) to authorize route behavior.
 * - Optional `redirect_url` query param to preserve the user's intended destination.
 */
export default async function PostLoginPage({
  searchParams,
}: PostLoginPageProps) {
  const { sessionClaims, isAuthenticated } = await auth();
  const { redirect_url } = await searchParams;

  // Not authenticated → redirect to sign-in
  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  const role = sessionClaims?.role;

  // Non-admin users → redirect immediately to intended URL or home
  if (role !== UserRole.Admin) {
    redirect(redirect_url ? decodeURIComponent(redirect_url) : "/");
  }

  // Admin users → show the flow chooser
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <FlowChooser redirectUrl={redirect_url} />
    </div>
  );
}
