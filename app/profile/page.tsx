"use client";

import { SignInButton, SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";

import { MobileNav, Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Mobile Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-white md:hidden">
        <div className="flex h-14 items-center justify-center px-4">
          <h1 className="font-semibold">Profile</h1>
        </div>
      </header>

      <main className="pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6 md:px-8">
          <SignedIn>
            <div className="flex justify-center">
              <UserProfile
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-2xl",
                    card: "shadow-soft rounded-2xl",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="py-12 text-center">
              <h2 className="mb-4 text-2xl font-bold">
                Welcome to Poetry & Pottery
              </h2>
              <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                Sign in to access your profile, track orders, and manage your
                wishlist.
              </p>
              <SignInButton mode="modal">
                <Button size="lg" className="rounded-full">
                  Sign In to Continue
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
