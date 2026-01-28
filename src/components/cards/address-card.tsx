"use client";

import { Check, MapPin, Pencil, Phone, Trash2, User } from "lucide-react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import type { UserAddress } from "@/graphql/generated/types";

interface AddressCardProps {
  address: UserAddress;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  isDeleting?: boolean;
}

export function AddressCard({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
  isDeleting = false,
}: AddressCardProps) {
  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onEdit) {
        onEdit();
      }
    },
    [onEdit],
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onDelete) {
        onDelete();
      }
    },
    [onDelete],
  );

  const fullAddress = [
    address.address_line_1,
    address.address_line_2,
    address.landmark,
    address.city,
    `${address.state} - ${address.zip}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleSelect();
        }
      }}
      className={cn(
        "relative flex min-h-[130px] flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-neutral-50 p-4 transition-all duration-200",
        onSelect && "cursor-pointer hover:bg-neutral-100",
        isSelected && "border-primary",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      {/* Selection indicator + Action buttons (top-right) */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {showActions && onEdit && (
          <button
            type="button"
            onClick={handleEdit}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-600"
            aria-label="Edit address"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        {showActions && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label="Delete address"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
        {isSelected && (
          <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
            <Check className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 space-y-2 pr-20">
        {/* Name */}
        <div className="flex items-center gap-2">
          <User className="text-primary h-4 w-4 shrink-0" />
          <span className="truncate font-medium text-neutral-900">
            {address.name}
          </span>
        </div>

        {/* Phone */}
        {address.contact_number && (
          <div className="flex items-center gap-2">
            <Phone className="text-muted-foreground h-4 w-4 shrink-0" />
            <span className="text-muted-foreground truncate text-sm">
              {address.contact_number}
            </span>
          </div>
        )}

        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-muted-foreground line-clamp-2 text-[13px] leading-relaxed">
            {fullAddress}
          </p>
        </div>
      </div>
    </div>
  );
}
