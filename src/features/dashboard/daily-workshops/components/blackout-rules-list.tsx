import { Clock3Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { BlackoutRulesListProps } from "../types";
import { BlackoutRuleCard } from "./blackout-rule-card";

export function BlackoutRulesList({
  blackoutRules,
  blackoutsCount,
  isPending,
  onEditBlackout,
  onDeleteBlackout,
}: BlackoutRulesListProps) {
  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-neutral-900">
          Current Blackout Rules
        </h2>
        <Badge variant="outline">{blackoutsCount}</Badge>
      </div>

      {blackoutRules.length === 0 ? (
        <p className="text-sm text-neutral-500">No blackout rules added yet.</p>
      ) : (
        <div className="space-y-3">
          {blackoutRules.map((rule) => (
            <BlackoutRuleCard
              key={rule.id}
              name={rule.name}
              type={rule.type}
              isActive={rule.isActive}
              scheduleLabel={rule.scheduleLabel}
              rangeLabel={rule.rangeLabel}
              timezone={rule.timezone}
              reasonLabel={rule.reasonLabel}
              createdAtLabel={rule.createdAtLabel}
              isPending={isPending}
              onEdit={() => onEditBlackout(rule.id)}
              onDelete={() => onDeleteBlackout(rule.id)}
            />
          ))}
        </div>
      )}

      <div className="border-primary/20 bg-primary/5 mt-4 rounded-xl border p-3 text-xs text-neutral-700">
        <div className="flex items-start gap-2">
          <Clock3Icon className="text-primary mt-0.5 h-3.5 w-3.5" />
          <p>
            Use <span className="font-semibold">One-Time</span> for
            date-specific closures and{" "}
            <span className="font-semibold">Recurring</span> rules for repeated
            blocks.
          </p>
        </div>
      </div>
    </section>
  );
}
