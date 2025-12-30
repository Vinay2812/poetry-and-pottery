import { EventRegistrationStatus } from "@/data/events/types";
import {
  Ban,
  Check,
  CheckCircle2,
  Clock,
  HourglassIcon,
  Images,
  type LucideIcon,
  ThumbsUp,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface StatusConfig {
  label: string;
  icon: LucideIcon;
  bgColor: string;
}

export function getStatusConfig(status: EventRegistrationStatus): StatusConfig {
  switch (status) {
    case EventRegistrationStatus.Pending:
      return {
        label: "PENDING",
        icon: HourglassIcon,
        bgColor: "bg-amber-500/90",
      };
    case EventRegistrationStatus.Approved:
      return { label: "APPROVED", icon: ThumbsUp, bgColor: "bg-blue-500/90" };
    case EventRegistrationStatus.Paid:
      return { label: "PAID", icon: Check, bgColor: "bg-teal-500/90" };
    case EventRegistrationStatus.Confirmed:
      return {
        label: "CONFIRMED",
        icon: CheckCircle2,
        bgColor: "bg-emerald-500/90",
      };
    case EventRegistrationStatus.Rejected:
      return { label: "REJECTED", icon: XCircle, bgColor: "bg-red-500/90" };
    case EventRegistrationStatus.Cancelled:
      return { label: "CANCELLED", icon: Ban, bgColor: "bg-neutral-500/90" };
    default:
      return { label: "UNKNOWN", icon: Clock, bgColor: "bg-neutral-500/90" };
  }
}

interface StatusBadgeProps {
  status: EventRegistrationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <Badge
      className={cn(
        "flex items-center gap-1 border-none px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md",
        config.bgColor,
        className,
      )}
    >
      <StatusIcon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

interface LevelBadgeProps {
  level: string;
  className?: string;
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <Badge
      className={cn(
        "w-fit border-none bg-white/90 text-[10px] font-bold tracking-wider text-neutral-900 uppercase backdrop-blur-md dark:bg-black/90 dark:text-white",
        className,
      )}
    >
      {level}
    </Badge>
  );
}

interface SoldOutBadgeProps {
  className?: string;
}

export function SoldOutBadge({ className }: SoldOutBadgeProps) {
  return (
    <Badge
      variant="destructive"
      className={cn("w-fit text-[10px] font-bold uppercase", className)}
    >
      Sold Out
    </Badge>
  );
}

interface CompletedBadgeProps {
  className?: string;
}

export function CompletedBadge({ className }: CompletedBadgeProps) {
  return (
    <Badge
      className={cn(
        "flex items-center gap-1 border-none bg-emerald-500/90 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md",
        className,
      )}
    >
      <CheckCircle2 className="h-3 w-3" />
      COMPLETED
    </Badge>
  );
}

interface GalleryBadgeProps {
  count: number;
  className?: string;
}

export function GalleryBadge({ count, className }: GalleryBadgeProps) {
  return (
    <Badge
      className={cn(
        "flex items-center gap-1 border-none bg-white/90 px-2 py-1 text-[10px] font-bold text-neutral-700 shadow-sm backdrop-blur-md dark:bg-black/80 dark:text-white",
        className,
      )}
    >
      <Images className="h-3 w-3" />
      {count} PHOTOS
    </Badge>
  );
}
