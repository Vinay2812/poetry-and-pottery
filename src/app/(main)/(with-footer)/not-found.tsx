import { MobileHeaderContainer } from "@/features/layout";
import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <>
      <MobileHeaderContainer title="Page Not Found" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-16 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-primary/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <Search className="text-primary h-10 w-10" />
            </div>

            <h1 className="mb-2 text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground mb-8 max-w-md text-sm">
              We couldn&apos;t find the page you&apos;re looking for. It may
              have been removed or the link might be incorrect.
            </p>

            <div className="flex gap-3">
              <Link href="/">
                <Button>Go Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
