import { EventRegistrationStatus } from "@/data/events/types";
import {
  Ban,
  Check,
  CheckCircle2,
  Clock,
  HourglassIcon,
  type LucideIcon,
  Mic,
  Palette,
  ThumbsUp,
  XCircle,
} from "lucide-react";

export function getEventTypeIcon(eventType: string): LucideIcon {
  switch (eventType) {
    case "OPEN_MIC":
      return Mic;
    case "POTTERY_WORKSHOP":
    default:
      return Palette;
  }
}

export function getEventTypeLabel(eventType: string): string {
  switch (eventType) {
    case "OPEN_MIC":
      return "Open Mic";
    case "POTTERY_WORKSHOP":
      return "Workshop";
    default:
      return "Event";
  }
}

export interface RegistrationStatusConfig {
  label: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
  message: string;
}

export function getRegistrationStatusConfig(
  status: EventRegistrationStatus,
): RegistrationStatusConfig {
  switch (status) {
    case EventRegistrationStatus.Pending:
      return {
        label: "Pending",
        icon: HourglassIcon,
        bgColor: "bg-amber-500",
        textColor: "text-amber-500",
        borderColor: "border-amber-500",
        message: "Awaiting approval",
      };
    case EventRegistrationStatus.Approved:
      return {
        label: "Approved",
        icon: ThumbsUp,
        bgColor: "bg-blue-500",
        textColor: "text-blue-500",
        borderColor: "border-blue-500",
        message: "Please complete payment",
      };
    case EventRegistrationStatus.Paid:
      return {
        label: "Paid",
        icon: Check,
        bgColor: "bg-teal-500",
        textColor: "text-teal-500",
        borderColor: "border-teal-500",
        message: "Payment received",
      };
    case EventRegistrationStatus.Confirmed:
      return {
        label: "Confirmed",
        icon: CheckCircle2,
        bgColor: "bg-emerald-500",
        textColor: "text-emerald-500",
        borderColor: "border-emerald-500",
        message: "You're registered!",
      };
    case EventRegistrationStatus.Rejected:
      return {
        label: "Rejected",
        icon: XCircle,
        bgColor: "bg-red-500",
        textColor: "text-red-500",
        borderColor: "border-red-500",
        message: "Registration rejected",
      };
    case EventRegistrationStatus.Cancelled:
      return {
        label: "Cancelled",
        icon: Ban,
        bgColor: "bg-neutral-500",
        textColor: "text-neutral-500",
        borderColor: "border-neutral-500",
        message: "Registration cancelled",
      };
    default:
      return {
        label: "Unknown",
        icon: Clock,
        bgColor: "bg-neutral-500",
        textColor: "text-neutral-500",
        borderColor: "border-neutral-500",
        message: "",
      };
  }
}
