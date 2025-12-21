"use client";

import {
  CalendarIcon,
  HeartIcon,
  PackageIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserDetailTabsProps {
  ordersContent: React.ReactNode;
  registrationsContent: React.ReactNode;
  cartContent: React.ReactNode;
  wishlistContent: React.ReactNode;
  orderCount: number;
  registrationCount: number;
  cartCount: number;
  wishlistCount: number;
}

export function UserDetailTabs({
  ordersContent,
  registrationsContent,
  cartContent,
  wishlistContent,
  orderCount,
  registrationCount,
  cartCount,
  wishlistCount,
}: UserDetailTabsProps) {
  return (
    <Tabs defaultValue="orders" className="space-y-4">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-4 bg-transparent p-0 md:grid-cols-4">
        <TabsTrigger
          value="orders"
          className="data-[state=active]:border-primary data-[state=active]:bg-primary/5 h-auto cursor-pointer justify-start gap-3 rounded-xl border-2 border-transparent bg-neutral-50 p-4 text-left transition-all"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white">
            <PackageIcon className="size-5 text-neutral-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{orderCount}</p>
            <p className="text-sm text-neutral-500">Orders</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="registrations"
          className="data-[state=active]:border-primary data-[state=active]:bg-primary/5 h-auto cursor-pointer justify-start gap-3 rounded-xl border-2 border-transparent bg-neutral-50 p-4 text-left transition-all"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white">
            <CalendarIcon className="size-5 text-neutral-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{registrationCount}</p>
            <p className="text-sm text-neutral-500">Registrations</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="cart"
          className="data-[state=active]:border-primary data-[state=active]:bg-primary/5 h-auto cursor-pointer justify-start gap-3 rounded-xl border-2 border-transparent bg-neutral-50 p-4 text-left transition-all"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white">
            <ShoppingCartIcon className="size-5 text-neutral-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{cartCount}</p>
            <p className="text-sm text-neutral-500">Cart Items</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="wishlist"
          className="data-[state=active]:border-primary data-[state=active]:bg-primary/5 h-auto cursor-pointer justify-start gap-3 rounded-xl border-2 border-transparent bg-neutral-50 p-4 text-left transition-all"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white">
            <HeartIcon className="size-5 text-neutral-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{wishlistCount}</p>
            <p className="text-sm text-neutral-500">Wishlist</p>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-sm text-neutral-500">
              Drag cards to change status
            </p>
          </div>
          {ordersContent}
        </div>
      </TabsContent>

      <TabsContent value="registrations" className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Event Registrations</h2>
            <p className="text-sm text-neutral-500">
              Drag cards to change status
            </p>
          </div>
          {registrationsContent}
        </div>
      </TabsContent>

      <TabsContent value="cart" className="mt-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Cart Items</h2>
          {cartContent}
        </div>
      </TabsContent>

      <TabsContent value="wishlist" className="mt-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Wishlist</h2>
          {wishlistContent}
        </div>
      </TabsContent>
    </Tabs>
  );
}
