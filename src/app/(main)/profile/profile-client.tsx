"use client";

import { UserProfile } from "@clerk/nextjs";

export function ProfileClient() {
  return (
    <>
      {/* Mobile Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-white lg:hidden">
        <div className="flex h-14 items-center justify-center px-4">
          <h1 className="font-semibold">Profile</h1>
        </div>
      </header>

      <main className="pb-20 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
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
        </div>
      </main>
    </>
  );
}
