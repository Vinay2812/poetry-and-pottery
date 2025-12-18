"use client";

import { useOrderStore } from "@/store";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  HelpCircle,
  Info,
  LogOut,
  Mail,
  Package,
  Settings,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

export function AccountDropdown() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const pendingOrdersCount = useOrderStore((state) => state.getPendingCount());

  const handleProfileSettings = useCallback(() => {
    openUserProfile();
  }, [openUserProfile]);

  const handleSignOut = useCallback(() => {
    signOut({ redirectUrl: "/" });
  }, [signOut]);

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "hover:bg-muted focus-visible:ring-primary/30 relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none",
          )}
        >
          {user?.imageUrl ? (
            <Image
              width={24}
              height={24}
              src={user.imageUrl}
              alt={user.firstName || "User avatar"}
              className={cn("h-6 w-6 rounded-full")}
            />
          ) : (
            <Settings className={cn("text-muted-foreground h-6 w-6")} />
          )}
          {pendingOrdersCount > 0 && (
            <span className="bg-primary absolute -top-0.5 -right-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full text-xs font-bold text-white">
              {pendingOrdersCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={handleProfileSettings}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          Profile & Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/orders")}
          className="cursor-pointer"
        >
          <Package className="mr-2 h-4 w-4" />
          <span className="flex-1">My Orders</span>
          {pendingOrdersCount > 0 && (
            <span className="bg-primary ml-auto flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
              {pendingOrdersCount}
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleNavigate("/about")}
          className="cursor-pointer"
        >
          <Info className="mr-2 h-4 w-4" />
          About
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/contact")}
          className="cursor-pointer"
        >
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/faq")}
          className="cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          FAQ
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/shipping")}
          className="cursor-pointer"
        >
          <Truck className="mr-2 h-4 w-4" />
          Shipping
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
