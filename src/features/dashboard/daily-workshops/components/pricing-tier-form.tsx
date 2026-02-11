import { PencilIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { PricingTierFormProps } from "../types";

export function PricingTierForm({
  tierDraft,
  editingTierId,
  tiersCount,
  isPending,
  onTierDraftChange,
  onSaveTier,
  onCancelTierEdit,
}: PricingTierFormProps) {
  return (
    <section className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">
            {editingTierId ? "Edit Pricing Tier" : "Add Pricing Tier"}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Configure duration-based pricing and pieces per person.
          </p>
        </div>
        <Badge variant="outline">{tiersCount} tiers</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-1.5">
          <Label htmlFor="tier-hours">Hours</Label>
          <Input
            id="tier-hours"
            type="number"
            min={1}
            value={tierDraft.hours}
            onChange={(event) =>
              onTierDraftChange("hours", Number(event.currentTarget.value))
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tier-price">Price / Person</Label>
          <Input
            id="tier-price"
            type="number"
            min={0}
            value={tierDraft.price_per_person}
            onChange={(event) =>
              onTierDraftChange(
                "price_per_person",
                Number(event.currentTarget.value),
              )
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tier-pieces">Pieces / Person</Label>
          <Input
            id="tier-pieces"
            type="number"
            min={0}
            value={tierDraft.pieces_per_person}
            onChange={(event) =>
              onTierDraftChange(
                "pieces_per_person",
                Number(event.currentTarget.value),
              )
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tier-order">Sort Order</Label>
          <Input
            id="tier-order"
            type="number"
            min={0}
            value={tierDraft.sort_order}
            onChange={(event) =>
              onTierDraftChange("sort_order", Number(event.currentTarget.value))
            }
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            variant={tierDraft.is_active ? "default" : "outline"}
            className="w-full"
            onClick={() => onTierDraftChange("is_active", !tierDraft.is_active)}
          >
            {tierDraft.is_active ? "Active" : "Inactive"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSaveTier} disabled={isPending}>
          {editingTierId ? (
            <PencilIcon className="mr-2 h-4 w-4" />
          ) : (
            <PlusIcon className="mr-2 h-4 w-4" />
          )}
          {editingTierId ? "Update Tier" : "Add Tier"}
        </Button>
        {editingTierId && (
          <Button
            variant="outline"
            onClick={onCancelTierEdit}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
      </div>
    </section>
  );
}
