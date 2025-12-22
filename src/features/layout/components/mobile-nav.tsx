"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDaysIcon, Home, ShoppingCartIcon, Store } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { MobileNavProps } from "../types";

const NAV_ITEMS = [
  { href: "/", icon: Home },
  { href: "/products", icon: Store },
  { href: "/cart", icon: ShoppingCartIcon, badgeKey: "cart" as const },
  { href: "/events", icon: CalendarDaysIcon, badgeKey: "events" as const },
];

export function MobileNav({ viewModel, currentPath }: MobileNavProps) {
  // Check if current path starts with any nav item's href (for nested routes)
  const isActiveRoute = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  const getBadgeCount = (badgeKey?: "cart" | "events") => {
    if (badgeKey === "cart") return viewModel.cartCount;
    if (badgeKey === "events") return viewModel.eventRegistrationCount;
    return 0;
  };

  return (
    <nav className="fixed right-0 bottom-0 left-0 isolate z-50 lg:hidden">
      {/* Background with Blur */}
      <div className="absolute inset-0 border-t border-white/20 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80" />

      <div className="relative grid h-16 grid-cols-4 items-center px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);
          const badgeCount = getBadgeCount(item.badgeKey);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex h-full flex-col items-center justify-center gap-1 focus-visible:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-x-2 top-1 bottom-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="relative">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <AnimatePresence>
                    {badgeCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="bg-primary absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-black"
                      >
                        {badgeCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
