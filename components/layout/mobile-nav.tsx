"use client";

import { Calendar, Home, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", icon: Home },
  { href: "/products", icon: Store },
  { href: "/cart", icon: ShoppingBag, badge: 2 },
  { href: "/events", icon: Calendar, badge: 2 },
];

export function MobileNav() {
  const pathname = usePathname();

  // Check if current path starts with any nav item's href (for nested routes)
  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="border-border shadow-nav fixed right-0 bottom-0 left-0 z-50 h-16 border-t bg-white lg:hidden">
      <div className="grid h-full grid-cols-4 items-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center transition-colors duration-150 focus-visible:outline-none",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-150",
                  isActive && "bg-primary/10",
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
                {item.badge && (
                  <span className="bg-primary absolute -top-0.5 -right-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
