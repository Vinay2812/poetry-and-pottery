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
            "focus-visible:ring-primary/30 relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-black/5 focus-visible:ring-2 focus-visible:outline-none active:bg-black/10 dark:hover:bg-white/10",
          )}
        >
          {viewModel.user?.imageUrl ? (
            <div className="relative h-5 w-5">
              <OptimizedImage
                src={viewModel.user.imageUrl}
                alt={viewModel.user.firstName || "User avatar"}
                fill
                className={cn("rounded-full object-cover")}
              />
            </div>
          ) : (
            <User
              className={cn("h-5 w-5 text-neutral-600 dark:text-neutral-300")}
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {viewModel.user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {viewModel.user.firstName} {viewModel.user.lastName}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {viewModel.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={onProfileSettings}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          Profile & Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onNavigate("/orders")}
          className="cursor-pointer"
        >
          <Package className="mr-2 h-4 w-4" />
          My Orders
        </DropdownMenuItem>
        {viewModel.isAdmin && (
          <DropdownMenuItem
            onClick={() => onNavigate("/dashboard")}
            className="cursor-pointer"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onNavigate("/about")}
          className="cursor-pointer"
        >
          <Info className="mr-2 h-4 w-4" />
          About
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onNavigate("/contact")}
          className="cursor-pointer"
        >
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onNavigate("/faq")}
          className="cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          FAQ
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onNavigate("/shipping")}
          className="cursor-pointer"
        >
          <Truck className="mr-2 h-4 w-4" />
          Shipping
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
