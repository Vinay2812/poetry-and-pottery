import { MapPin, Phone, User } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ShippingAddress } from "../types";

interface ShippingAddressCardProps {
  address: ShippingAddress;
  className?: string;
}

export function ShippingAddressCard({
  address,
  className,
}: ShippingAddressCardProps) {
  return (
    <div
      className={cn(
        "shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 md:p-6 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
    >
      <p className="mb-3 text-[10px] font-bold tracking-widest text-neutral-400 uppercase md:mb-4">
        Shipping Address
      </p>
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center gap-2">
          <User className="text-primary h-4 w-4 shrink-0" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {address.name}
          </span>
        </div>
        {address.contact_number && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {address.contact_number}
            </span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {address.address_line_1}
            {address.address_line_2 && `, ${address.address_line_2}`}
            {`, ${address.city}`}
            {`, ${address.state}`}
            {` - ${address.zip}`}
          </p>
        </div>
      </div>
    </div>
  );
}
