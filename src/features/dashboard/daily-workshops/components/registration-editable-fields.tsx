import { Clock3Icon, TagIcon, UsersIcon } from "lucide-react";

import { EditablePrice } from "@/components/dashboard/editable-price";
import { EditableQuantity } from "@/components/dashboard/editable-quantity";

import type { RegistrationEditableFieldsProps } from "../types";

export function RegistrationEditableFields({
  participants,
  piecesPerPerson,
  pricePerPerson,
  discount,
  isPending,
  onParticipantsChange,
  onPiecesPerPersonChange,
  onPricePerPersonChange,
  onDiscountChange,
}: RegistrationEditableFieldsProps) {
  return (
    <div className="grid gap-3 rounded-xl border bg-neutral-50 p-3 text-sm sm:grid-cols-2">
      <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
        <span className="flex items-center gap-1.5 text-neutral-500">
          <UsersIcon className="size-4" />
          Participants
        </span>
        <EditableQuantity
          quantity={participants}
          onChange={onParticipantsChange}
          min={1}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
        <span className="flex items-center gap-1.5 text-neutral-500">
          <Clock3Icon className="size-4" />
          Pieces / Person
        </span>
        <EditableQuantity
          quantity={piecesPerPerson}
          onChange={onPiecesPerPersonChange}
          min={0}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
        <span className="text-neutral-500">Price / Person</span>
        <EditablePrice
          price={pricePerPerson}
          onChange={onPricePerPersonChange}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
        <span className="flex items-center gap-1.5 text-neutral-500">
          <TagIcon className="size-4" />
          Discount
        </span>
        <EditablePrice
          price={discount}
          onChange={onDiscountChange}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
