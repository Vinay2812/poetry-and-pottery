import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

import { clerkAppearance } from "@/lib/clerk-appearance";

interface SignUpPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirect_url } = await searchParams;

  // Build post-login URL with original redirect preserved
  const postLoginUrl = redirect_url
    ? `/post-login?redirect_url=${encodeURIComponent(redirect_url)}`
    : "/post-login";

  return (
    <div className="from-background to-cream flex min-h-[70vh] items-center justify-center bg-linear-to-br px-4 py-12">
      <div className="w-full max-w-[440px]">
        {/* Brand Logo */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="font-display text-primary text-xl font-extrabold"
          >
            Poetry & Pottery
          </Link>
        </div>

        {/* Clerk Sign Up Card */}
        <div className="shadow-card rounded-2xl bg-white p-8 sm:p-10">
          <SignUp
            forceRedirectUrl={postLoginUrl}
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </div>
  );
}
