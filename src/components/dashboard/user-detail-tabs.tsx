"use client";

import type { LucideIcon } from "lucide-react";
import {
  CalendarClockIcon,
  CalendarIcon,
  HeartIcon,
  PackageIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserDetailTabTriggerProps {
  value: string;
  icon: LucideIcon;
  count: number;
  label: string;
}

function UserDetailTabTrigger({
  value,
  icon: Icon,
  count,
  label,
}: UserDetailTabTriggerProps) {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:border-primary data-[state=active]:bg-primary/5 h-auto cursor-pointer justify-start gap-3 rounded-xl border-2 border-transparent bg-neutral-50 p-4 text-left transition-all"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white">
        <Icon className="size-5 text-neutral-500" />
      </div>
      <div>
        <p className="text-2xl font-bold">{count}</p>
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
    </TabsTrigger>
  );
}

interface UserDetailTabsProps {
  ordersContent: React.ReactNode;
  registrationsContent: React.ReactNode;
  dailyWorkshopsContent: React.ReactNode;
  cartContent: React.ReactNode;
  wishlistContent: React.ReactNode;
  orderCount: number;
  registrationCount: number;
  dailyWorkshopCount: number;
  cartCount: number;
  wishlistCount: number;
}

export function UserDetailTabs({
  ordersContent,
  registrationsContent,
  dailyWorkshopsContent,
  cartContent,
  wishlistContent,
  orderCount,
  registrationCount,
  dailyWorkshopCount,
  cartCount,
  wishlistCount,
}: UserDetailTabsProps) {
  return (
    <Tabs defaultValue="orders" className="space-y-4">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-4 bg-transparent p-0 md:grid-cols-5">
        <UserDetailTabTrigger
          value="orders"
          icon={PackageIcon}
          count={orderCount}
          label="Orders"
        />
        <UserDetailTabTrigger
          value="registrations"
          icon={CalendarIcon}
          count={registrationCount}
          label="Registrations"
        />
        <UserDetailTabTrigger
          value="daily-workshops"
          icon={CalendarClockIcon}
          count={dailyWorkshopCount}
          label="Daily Workshops"
        />
        <UserDetailTabTrigger
          value="cart"
          icon={ShoppingCartIcon}
          count={cartCount}
          label="Cart Items"
        />
        <UserDetailTabTrigger
          value="wishlist"
          icon={HeartIcon}
          count={wishlistCount}
          label="Wishlist"
        />
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

      <TabsContent value="daily-workshops" className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Daily Workshop Bookings</h2>
            <p className="text-sm text-neutral-500">
              Drag cards to change status
            </p>
          </div>
          {dailyWorkshopsContent}
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
