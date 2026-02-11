import { PencilIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { DailyWorkshopBlackoutType } from "@/graphql/generated/types";

import type { BlackoutRuleCardProps } from "../types";

function formatBlackoutType(type: DailyWorkshopBlackoutType): string {
  switch (type) {
    case DailyWorkshopBlackoutType.OneTime:
      return "One-Time";
    case DailyWorkshopBlackoutType.Weekly:
      return "Weekly";
    case DailyWorkshopBlackoutType.Monthly:
      return "Monthly";
    case DailyWorkshopBlackoutType.Daily:
    default:
      return "Daily";
  }
}

export function BlackoutRuleCard({
  name,
  type,
  isActive,
  scheduleLabel,
  rangeLabel,
  timezone,
  reasonLabel,
  createdAtLabel,
  isPending,
  onEdit,
  onDelete,
}: BlackoutRuleCardProps) {
  return (
    <article className="rounded-xl border p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="font-medium text-neutral-900">{name}</p>
          <Badge variant="outline">{formatBlackoutType(type)}</Badge>
        </div>
        <Badge
          className={cn(
            "border",
            isActive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-neutral-200 bg-neutral-100 text-neutral-600",
          )}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="space-y-1 text-xs text-neutral-600">
        <p>Schedule: {scheduleLabel}</p>
        <p>Time: {rangeLabel}</p>
        <p>Timezone: {timezone}</p>
        <p>Reason: {reasonLabel}</p>
        <p>Created: {createdAtLabel}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={isPending}
        >
          <PencilIcon className="mr-1.5 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600"
          onClick={onDelete}
          disabled={isPending}
        >
          <Trash2Icon className="mr-1.5 h-4 w-4" />
          Delete
        </Button>
      </div>
    </article>
  );
}
