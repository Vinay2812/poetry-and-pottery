"use client";

import {
  HelpCircle,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
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
            "ring-primary/50 relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 hover:ring-2 focus-visible:ring-2 focus-visible:outline-none",
          )}
        >
          {viewModel.user?.imageUrl ? (
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
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
          <DropdownMenuItem
            onClick={onProfileSettings}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
          >
            <User className="h-[18px] w-[18px] text-neutral-500" />
            <span>Profile & Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onNavigate("/orders")}
            className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 hover:bg-neutral-50"
          >
            <span className="flex items-center gap-2.5">
              <Package className="h-[18px] w-[18px] text-neutral-500" />
              <span>My Orders</span>
            </span>
            {viewModel.pendingOrdersCount > 0 && (
              <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white">
                {viewModel.pendingOrdersCount}
              </span>
            )}
          </DropdownMenuItem>

          {viewModel.isAdmin && (
            <DropdownMenuItem
              onClick={() => onNavigate("/dashboard")}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
            >
              <LayoutDashboard className="h-[18px] w-[18px] text-neutral-500" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
        </div>

        <DropdownMenuSeparator className="my-1 bg-neutral-100" />

        <div className="p-1">
          <DropdownMenuItem
            onClick={() => onNavigate("/about")}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
          >
            <Info className="h-[18px] w-[18px] text-neutral-500" />
            <span>About</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onNavigate("/contact")}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
          >
            <Mail className="h-[18px] w-[18px] text-neutral-500" />
            <span>Contact</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onNavigate("/faq")}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
          >
            <HelpCircle className="h-[18px] w-[18px] text-neutral-500" />
            <span>FAQ</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onNavigate("/shipping")}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
          >
            <Truck className="h-[18px] w-[18px] text-neutral-500" />
            <span>Shipping</span>
          </DropdownMenuItem>
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
