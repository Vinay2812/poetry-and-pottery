import { SignUp } from "@clerk/nextjs";

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
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <SignUp
        forceRedirectUrl={postLoginUrl}
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none",
            headerTitle: "text-xl font-semibold",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
          },
        }}
      />
    </div>
  );
}
