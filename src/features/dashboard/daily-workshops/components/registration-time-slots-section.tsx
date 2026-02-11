import { PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import type { RegistrationTimeSlotsSectionProps } from "../types";

export function RegistrationTimeSlotsSection({
  slots,
  isPending,
  slotsListRef,
  slotInputRefs,
  onSlotStartChange,
  onAddSlot,
  onRemoveSlot,
}: RegistrationTimeSlotsSectionProps) {
  return (
    <section className="rounded-xl border bg-white">
      <div className="flex items-center justify-between border-b px-3 py-2.5">
        <div>
          <p className="text-sm font-medium text-neutral-900">
            Dates & Time Slots
          </p>
          <p className="text-xs text-neutral-500">
            Edit booked slot starts directly.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onAddSlot();
          }}
          disabled={isPending}
        >
          <PlusIcon className="mr-1.5 size-3.5" />
          Slot
        </Button>
      </div>

      <div
        ref={slotsListRef}
        className="max-h-64 space-y-2 overflow-y-auto p-3"
      >
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={cn(
              "rounded-lg border bg-neutral-50 p-2.5 transition-colors",
              slot.isNew &&
                "border-primary/60 bg-primary/5 ring-primary/20 ring-2",
            )}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-600">
                  {slot.displayLabel}
                </span>
                {slot.isNew && (
                  <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                    New
                  </span>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 text-red-500 hover:text-red-600"
                onClick={() => onRemoveSlot(slot.id)}
                disabled={isPending || slots.length <= 1}
              >
                <Trash2Icon className="size-3.5" />
              </Button>
            </div>
            <Input
              ref={(element) => {
                slotInputRefs.current[slot.id] = element;
              }}
              type="datetime-local"
              value={slot.startAt}
              onChange={(event) =>
                onSlotStartChange(slot.id, event.currentTarget.value)
              }
              disabled={isPending}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
