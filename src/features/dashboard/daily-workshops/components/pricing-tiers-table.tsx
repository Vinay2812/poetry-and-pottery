import { PencilIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { PricingTiersTableProps } from "../types";

export function PricingTiersTable({
  tiers,
  isPending,
  onEditTier,
  onDeleteTier,
}: PricingTiersTableProps) {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b text-left text-xs tracking-wide text-neutral-500 uppercase">
            <th className="px-2 py-3">Hours</th>
            <th className="px-2 py-3">Price / Person</th>
            <th className="px-2 py-3">Pieces / Person</th>
            <th className="px-2 py-3">Sort</th>
            <th className="px-2 py-3">Status</th>
            <th className="px-2 py-3">Updated</th>
            <th className="px-2 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id} className="border-b last:border-b-0">
              <td className="px-2 py-3 font-medium text-neutral-900">
                {tier.hours}h
              </td>
              <td className="px-2 py-3">{tier.pricePerPersonLabel}</td>
              <td className="px-2 py-3">{tier.piecesPerPerson}</td>
              <td className="px-2 py-3">{tier.sortOrder}</td>
              <td className="px-2 py-3">
                <Badge
                  className={cn(
                    "border",
                    tier.isActive
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-neutral-200 bg-neutral-100 text-neutral-600",
                  )}
                >
                  {tier.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-2 py-3 text-xs text-neutral-500">
                {tier.updatedAtLabel}
              </td>
              <td className="px-2 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditTier(tier.id)}
                    disabled={isPending}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => onDeleteTier(tier.id)}
                    disabled={isPending}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
