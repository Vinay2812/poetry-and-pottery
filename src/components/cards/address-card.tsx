"use client";

import type { UserAddress } from "@/prisma/generated/client";
import { Check, MapPin, Pencil, Phone, Trash2, User } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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
        "shadow-soft relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-4 transition-all duration-200",
        onSelect && "cursor-pointer hover:shadow-md",
        isSelected
          ? "border-primary ring-primary/20 ring-2"
          : "border-neutral-200",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="bg-primary absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-2">
        {/* Name */}
        <div className="flex items-center gap-2">
          <User className="text-primary h-4 w-4 shrink-0" />
          <span className="truncate font-semibold text-neutral-900">
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
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {fullAddress}
          </p>
        </div>
      </div>

      {/* Actions */}
      {showActions && (onEdit || onDelete) && (
        <div className="mt-auto flex shrink-0 gap-2 border-t border-neutral-100 pt-3">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-primary hover:bg-primary/10 h-8 flex-1 rounded-full text-sm"
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 flex-1 rounded-full text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
