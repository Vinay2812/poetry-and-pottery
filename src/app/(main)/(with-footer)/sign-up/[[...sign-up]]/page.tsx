import { MobileHeaderContainer } from "@/features/layout";
import { SignUp } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";

import { ListingPageHeader } from "@/components/shared";

import { clerkAppearance } from "@/lib/clerk-appearance";

interface SignInPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

/**
 * Route: /sign-up
 * Page does: Authentication page for new account registration via Clerk sign-up flows.
 * Key UI operations:
 * - Register with Google or with first name, last name, email, and password fields.
 * - Continue to post-login routing with the original redirect intent preserved.
 * UI info needed for operations:
 * - Optional `redirect_url` query param used to build force redirect destination.
 * - Clerk sign-up config and field validation for account creation.
 */
export default async function SignInPage({ searchParams }: SignInPageProps) {
  noStore();

  const { redirect_url } = await searchParams;

  // Build post-login URL with original redirect preserved
  const postLoginUrl = redirect_url
    ? `/post-login?redirect_url=${encodeURIComponent(redirect_url)}`
    : "/post-login";

  return (
    <>
      <MobileHeaderContainer title="Sign Up" showBack backHref="/" />
      <div className="from-background bg-background container mx-auto flex min-h-[70vh] items-center justify-center bg-linear-to-br px-4 py-0 lg:px-8 lg:pt-10">
        <div className="w-full">
          <ListingPageHeader
            title="Sign Up"
            subtitle="Create an account to get started."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sign Up" }]}
          />
          <div className="flex w-full justify-center">
            {/* Clerk Sign Up Card */}
            <SignUp
              forceRedirectUrl={postLoginUrl}
              appearance={clerkAppearance}
            />
          </div>
        </div>
      </div>
    </>
  );
}
