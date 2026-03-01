import { MobileHeaderContainer } from "@/features/layout";
import { SignIn } from "@clerk/nextjs";

import { ListingPageHeader } from "@/components/shared";

import { clerkAppearance } from "@/lib/clerk-appearance";

interface SignInPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

/**
 * Route: /sign-in
 * Page does: Authentication page for existing users via Clerk sign-in flows.
 * Key UI operations:
 * - Sign in using Google or email/password and continue through Clerk's auth card UI.
 * - Return users to their intended route through preserved redirect behavior.
 * UI info needed for operations:
 * - Optional `redirect_url` query param to construct post-login destination.
 * - Clerk appearance/config and sign-in state handling for secure auth completion.
 */
export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirect_url } = await searchParams;

  // Build post-login URL with original redirect preserved
  const postLoginUrl = redirect_url
    ? `/post-login?redirect_url=${encodeURIComponent(redirect_url)}`
    : "/post-login";

  return (
    <>
      <MobileHeaderContainer title="Sign In" showBack backHref="/" />
      <div className="from-background bg-background container mx-auto flex min-h-[70vh] items-center justify-center bg-linear-to-br px-4 py-0 lg:px-8 lg:pt-10">
        <div className="w-full">
          <ListingPageHeader
            title="Sign In"
            subtitle="Welcome back! Please enter your details."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sign In" }]}
          />
          <div className="flex w-full justify-center">
            {/* Clerk Sign In Card */}
            <SignIn
              forceRedirectUrl={postLoginUrl}
              appearance={clerkAppearance}
            />
          </div>
        </div>
      </div>
    </>
  );
}
