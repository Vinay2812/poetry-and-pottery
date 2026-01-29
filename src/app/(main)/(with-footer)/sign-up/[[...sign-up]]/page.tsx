import { MobileHeaderContainer } from "@/features/layout";
import { SignUp } from "@clerk/nextjs";

import { ListingPageHeader } from "@/components/shared";

import { clerkAppearance } from "@/lib/clerk-appearance";

interface SignInPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

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
            title="Sign Up"
            subtitle="Create an account to get started."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sign Up" }]}
          />
          <div className="flex w-full justify-center">
            {/* Clerk Sign In Card */}
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
