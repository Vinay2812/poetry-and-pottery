"use client";

import { useUserAddresses } from "@/data/address/gateway/client";
import { useCallback, useEffect, useState, useTransition } from "react";

import { AddressSelectorSkeleton } from "@/components/skeletons";

import type { UserAddress } from "@/graphql/generated/types";

import { AddressSelector } from "./address-selector";

interface AddressSelectorContainerProps {
  onSelectAddress: (address: UserAddress | null) => void;
  selectedAddressId?: number | null;
}

export function AddressSelectorContainer({
  onSelectAddress,
  selectedAddressId: initialSelectedId,
}: AddressSelectorContainerProps) {
  const { addresses, isLoading } = useUserAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    initialSelectedId ?? null,
  );
  const [, startTransition] = useTransition();

  // Auto-select first address when addresses load
  useEffect(() => {
    if (!isLoading && addresses.length > 0 && selectedAddressId === null) {
      startTransition(() => {
        const firstAddress = addresses[0];
        setSelectedAddressId(firstAddress.id);
        onSelectAddress(firstAddress);
      });
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
