"use client";

import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "@/data/address/gateway/client";
import { useUserAddresses } from "@/data/address/gateway/client";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { AddressSelectorSkeleton } from "@/components/skeletons";

import type { UserAddress } from "@/graphql/generated/types";

import {
  AddressSelector,
  type AddressSelectorViewModel,
} from "./address-selector";

interface AddressSelectorContainerProps {
  onSelectAddress: (address: UserAddress | null) => void;
  selectedAddressId?: number | null;
}

export function AddressSelectorContainer({
  onSelectAddress,
  selectedAddressId: initialSelectedId,
}: AddressSelectorContainerProps) {
  const { addresses: fetchedAddresses, isLoading } = useUserAddresses();
  const { mutate: createAddressMutate } = useCreateAddress();
  const { mutate: updateAddressMutate } = useUpdateAddress();
  const { mutate: deleteAddressMutate } = useDeleteAddress();

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    initialSelectedId ?? null,
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  // Sync fetched addresses to local state
  useEffect(() => {
    if (!isLoading && fetchedAddresses.length > 0) {
      startTransition(() => {
        setAddresses(fetchedAddresses);
      });
    }
  }, [isLoading, fetchedAddresses]);

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
    (address: UserAddress) => {
      setSelectedAddressId(address.id);
      onSelectAddress(address);
    },
    [onSelectAddress],
  );

  const handleEditAddress = useCallback((address: UserAddress) => {
    setEditingAddress(address);
  }, []);

  const handleDeleteAddress = useCallback(
    async (addressId: number) => {
      setDeletingId(addressId);
      const result = await deleteAddressMutate(addressId);
      setDeletingId(null);

      if (result.success) {
        const newAddresses = addresses.filter((addr) => addr.id !== addressId);
        setAddresses(newAddresses);
        if (selectedAddressId === addressId) {
          const nextAddress = newAddresses[0] || null;
          setSelectedAddressId(nextAddress?.id ?? null);
          onSelectAddress(nextAddress);
        }
      }
    },
    [addresses, onSelectAddress, selectedAddressId, deleteAddressMutate],
  );

  const handleAddAddress = useCallback(
    async (data: {
      name: string;
      addressLine1: string;
      addressLine2: string;
      landmark: string;
      city: string;
      state: string;
      zip: string;
      contactNumber: string;
    }) => {
      const result = await createAddressMutate({
        name: data.name,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || undefined,
        landmark: data.landmark || undefined,
        city: data.city,
        state: data.state,
        zip: data.zip,
        contactNumber: data.contactNumber || undefined,
      });

      if (result.success) {
        const newAddresses = [result.data, ...addresses];
        setAddresses(newAddresses);
        setSelectedAddressId(result.data.id);
        onSelectAddress(result.data);
        setIsAddingNew(false);
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    [addresses, onSelectAddress, createAddressMutate],
  );

  const handleUpdateAddress = useCallback(
    async (data: {
      name: string;
      addressLine1: string;
      addressLine2: string;
      landmark: string;
      city: string;
      state: string;
      zip: string;
      contactNumber: string;
    }) => {
      if (!editingAddress)
        return { success: false, error: "No address selected" };

      const result = await updateAddressMutate(editingAddress.id, {
        name: data.name,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || undefined,
        landmark: data.landmark || undefined,
        city: data.city,
        state: data.state,
        zip: data.zip,
        contactNumber: data.contactNumber || undefined,
      });

      if (result.success) {
        const newAddresses = addresses.map((addr) =>
          addr.id === editingAddress.id ? result.data : addr,
        );
        setAddresses(newAddresses);
        if (selectedAddressId === editingAddress.id) {
          onSelectAddress(result.data);
        }
        setEditingAddress(null);
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    [
      addresses,
      editingAddress,
      onSelectAddress,
      selectedAddressId,
      updateAddressMutate,
    ],
  );

  const handleOpenAddSheet = useCallback(() => {
    setIsAddingNew(true);
  }, []);

  const handleCloseAddSheet = useCallback(() => {
    setIsAddingNew(false);
  }, []);

  const handleCloseEditSheet = useCallback(() => {
    setEditingAddress(null);
  }, []);

  const viewModel = useMemo<AddressSelectorViewModel>(
    () => ({
      addresses,
      selectedAddressId,
      editingAddress,
      isAddingNew,
      deletingId,
      hasAddresses: addresses.length > 0,
      isEditSheetOpen: editingAddress !== null,
    }),
    [addresses, selectedAddressId, editingAddress, isAddingNew, deletingId],
  );

  if (isLoading) {
    return <AddressSelectorSkeleton />;
  }

  return (
    <AddressSelector
      viewModel={viewModel}
      onSelectAddress={handleSelectAddress}
      onEditAddress={handleEditAddress}
      onDeleteAddress={handleDeleteAddress}
      onAddAddress={handleAddAddress}
      onUpdateAddress={handleUpdateAddress}
      onOpenAddSheet={handleOpenAddSheet}
      onCloseAddSheet={handleCloseAddSheet}
      onCloseEditSheet={handleCloseEditSheet}
    />
  );
}
