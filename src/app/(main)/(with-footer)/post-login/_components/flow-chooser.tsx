"use client";

import { LayoutDashboardIcon, StoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface FlowChooserProps {
  redirectUrl?: string;
}

export function FlowChooser({ redirectUrl }: FlowChooserProps) {
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleShop = () => {
    const destination = redirectUrl ? decodeURIComponent(redirectUrl) : "/";
    router.push(destination);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, Admin
        </h1>
        <p className="mt-2 text-neutral-500">Where would you like to go?</p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={handleDashboard}
          className="group hover:border-primary flex items-center gap-4 rounded-xl border-2 border-neutral-200 bg-white p-6 text-left transition-all hover:shadow-lg"
        >
          <div className="bg-primary/10 text-primary group-hover:bg-primary rounded-xl p-4 transition-colors group-hover:text-white">
            <LayoutDashboardIcon className="size-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Admin Dashboard
            </h2>
            <p className="text-sm text-neutral-500">
              Manage users, products, events, and orders
            </p>
          </div>
        </button>

        <button
          onClick={handleShop}
          className="group hover:border-primary flex items-center gap-4 rounded-xl border-2 border-neutral-200 bg-white p-6 text-left transition-all hover:shadow-lg"
        >
          <div className="bg-primary/10 text-primary group-hover:bg-primary rounded-xl p-4 transition-colors group-hover:text-white">
            <StoreIcon className="size-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Continue to Shop
            </h2>
            <p className="text-sm text-neutral-500">
              Browse products and events as a customer
            </p>
          </div>
        </button>
      </div>

      <div className="text-center">
        <Button
          variant="link"
          onClick={handleShop}
          className="text-neutral-500"
        >
          Skip and go to shop
        </Button>
      </div>
    </div>
  );
}
