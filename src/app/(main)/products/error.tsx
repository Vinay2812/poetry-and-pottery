"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Products page error:", error);
  }, [error]);

  return (
    <>
      <MobileHeaderContainer title="Shop Pottery" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-16 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-destructive/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AlertCircle className="text-destructive h-10 w-10" />
            </div>

            <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground mb-8 max-w-md text-sm">
              We encountered an error while loading the products. Please try
              again or contact support if the problem persists.
            </p>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
