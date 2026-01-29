"use client";

import { useUserAddresses } from "@/data/address/gateway/client";
import { MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { UserAddress } from "@/graphql/generated/types";

import { AddressSelector } from "./address-selector";

interface AddressSelectorContainerProps {
  onSelectAddress: (address: UserAddress | null) => void;
  selectedAddressId?: number | null;
}

function AddressSelectorSkeleton() {
  return (
    <div className="w-full min-w-0 animate-pulse space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-neutral-300" />
          <div className="h-5 w-32 rounded bg-neutral-200" />
        </div>
        <div className="h-8 w-20 rounded-full bg-neutral-200" />
      </div>

      {/* Address Cards Skeleton */}
      <div className="flex gap-3 overflow-hidden">
        <div className="shrink-0 basis-[85%] md:basis-[45%]">
          <div className="space-y-3 rounded-xl border-2 border-neutral-200 p-4">
            <div className="h-4 w-24 rounded bg-neutral-200" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-neutral-200" />
              <div className="h-3 w-3/4 rounded bg-neutral-200" />
            </div>
            <div className="h-3 w-20 rounded bg-neutral-200" />
          </div>
        </div>
        <div className="shrink-0 basis-[85%] md:basis-[45%]">
          <div className="space-y-3 rounded-xl border-2 border-neutral-200 p-4">
            <div className="h-4 w-24 rounded bg-neutral-200" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-neutral-200" />
              <div className="h-3 w-3/4 rounded bg-neutral-200" />
            </div>
            <div className="h-3 w-20 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddressSelectorContainer({
  onSelectAddress,
  selectedAddressId: initialSelectedId,
}: AddressSelectorContainerProps) {
  const { addresses, isLoading } = useUserAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    initialSelectedId ?? null,
  );

  // Auto-select first address when addresses load
  useEffect(() => {
    if (!isLoading && addresses.length > 0 && selectedAddressId === null) {
      const firstAddress = addresses[0];
      setSelectedAddressId(firstAddress.id);
      onSelectAddress(firstAddress);
    }
  }, [isLoading, addresses, selectedAddressId, onSelectAddress]);

  const handleSelectAddress = useCallback(
    (address: UserAddress | null) => {
      setSelectedAddressId(address?.id ?? null);
      onSelectAddress(address);
    },
    [onSelectAddress],
  );

  if (isLoading) {
    return <AddressSelectorSkeleton />;
  }

  return (
    <AddressSelector
      addresses={addresses}
      selectedAddressId={selectedAddressId}
      onSelectAddress={handleSelectAddress}
    />
  );
}
