"use client";

import {
  BoxIcon,
  CalendarIcon,
  Clock3Icon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  PaletteIcon,
  SettingsIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    title: "Daily Workshops",
    href: "/dashboard/daily-workshops",
    icon: Clock3Icon,
  },
  {
    title: "Customization",
    href: "/dashboard/customization",
    icon: PaletteIcon,
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
  isCollapsed?: boolean;
}

export function DashboardNav({ onItemClick, isCollapsed }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        const linkContent = (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center rounded-lg text-sm font-medium transition-colors",
              isCollapsed ? "size-11 justify-center" : "gap-3 px-3 py-2.5",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
            )}
          >
            <item.icon className="size-5 shrink-0" />
            {!isCollapsed && item.title}
          </Link>
        );

        if (isCollapsed) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          );
        }

        return linkContent;
      })}
    </nav>
  );
}
