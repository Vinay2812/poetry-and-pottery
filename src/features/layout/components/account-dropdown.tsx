"use client";

import type { LucideIcon } from "lucide-react";
import {
  HelpCircle,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Palette,
  Truck,
  User,
} from "lucide-react";

import { OptimizedImage } from "@/components/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import type { AccountDropdownProps } from "../types";

interface AccountDropdownNavItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  badge?: number;
}

function AccountDropdownNavItem({
  icon: Icon,
  label,
  onClick,
  badge,
}: AccountDropdownNavItemProps) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center rounded-lg px-3 py-2.5 hover:bg-neutral-50",
        badge != null && badge > 0 ? "justify-between" : "gap-2.5",
      )}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-[18px] w-[18px] text-neutral-500" />
        <span>{label}</span>
      </span>
      {badge != null && badge > 0 && (
        <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </DropdownMenuItem>
  );
}

export function AccountDropdown({
  viewModel,
  onProfileSettings,
  onSignOut,
  onNavigate,
}: AccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "ring-primary/50 relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150 hover:ring-2 focus-visible:ring-2 focus-visible:outline-none",
          )}
        >
          {viewModel.user?.imageUrl ? (
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <OptimizedImage
                src={viewModel.user.imageUrl}
                alt={viewModel.user.firstName || "User avatar"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-primary text-sm font-semibold">
                {viewModel.user?.firstName?.[0] || "U"}
                {viewModel.user?.lastName?.[0] || ""}
              </span>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[220px] rounded-xl shadow-lg"
      >
        {viewModel.user && (
          <>
            <DropdownMenuLabel className="px-3 py-3 font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="font-display text-sm font-semibold">
                  {viewModel.user.firstName} {viewModel.user.lastName}
                </p>
                <p className="text-muted-foreground text-xs">
                  {viewModel.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-100" />
          </>
        )}

        <div className="p-1">
          <AccountDropdownNavItem
            icon={User}
            label="Profile & Settings"
            onClick={onProfileSettings}
          />
          <AccountDropdownNavItem
            icon={Package}
            label="My Orders"
            onClick={() => onNavigate("/orders")}
            badge={viewModel.pendingOrdersCount}
          />
          <AccountDropdownNavItem
            icon={Palette}
            label="Customize Pottery"
            onClick={() => onNavigate("/customize")}
          />
          {viewModel.isAdmin && (
            <AccountDropdownNavItem
              icon={LayoutDashboard}
              label="Dashboard"
              onClick={() => onNavigate("/dashboard")}
            />
          )}
        </div>

        <DropdownMenuSeparator className="my-1 bg-neutral-100" />

        <div className="p-1">
          <AccountDropdownNavItem
            icon={Info}
            label="About"
            onClick={() => onNavigate("/about")}
          />
          <AccountDropdownNavItem
            icon={Mail}
            label="Contact"
            onClick={() => onNavigate("/contact")}
          />
          <AccountDropdownNavItem
            icon={HelpCircle}
            label="FAQ"
            onClick={() => onNavigate("/faq")}
          />
          <AccountDropdownNavItem
            icon={Truck}
            label="Shipping"
            onClick={() => onNavigate("/shipping")}
          />
        </div>

        <DropdownMenuSeparator className="my-1 bg-neutral-100" />

        <div className="p-1">
          <DropdownMenuItem
            onClick={onSignOut}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
