"use client";

import {
  BoxIcon,
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  SettingsIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: BoxIcon,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: FolderIcon,
  },
  {
    title: "Collections",
    href: "/dashboard/collections",
    icon: LayersIcon,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: CalendarIcon,
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FileTextIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    title: "Bulk Delete",
    href: "/dashboard/bulk-delete",
    icon: Trash2Icon,
  },
];

interface DashboardNavProps {
  onItemClick?: () => void;
}

export function DashboardNav({ onItemClick }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
            )}
          >
            <item.icon className="size-5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
