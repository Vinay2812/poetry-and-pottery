"use client";

import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "@/data/address/gateway/client";
import { MapPin, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AddressCard } from "@/components/cards";
import { AddressForm } from "@/components/forms/address-form";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import type { UserAddress } from "@/graphql/generated/types";

interface AddressCarouselProps {
  addresses: UserAddress[];
  selectedAddressId: number | null;
  onSelectAddress: (address: UserAddress) => void;
  onEdit: (address: UserAddress) => void;
  onDelete: (addressId: number) => void;
  deletingId: number | null;
}

function AddressCarousel({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onEdit,
  onDelete,
  deletingId,
}: AddressCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  const selectedIndex = useMemo(() => {
    const index = addresses.findIndex((addr) => addr.id === selectedAddressId);
    return index >= 0 ? index : 0;
  }, [addresses, selectedAddressId]);

  const [current, setCurrent] = useState(selectedIndex);

  // Setup API events (matches ImageCarousel pattern)
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Sync carousel position with selected address
  useEffect(() => {
    if (api) {
      api.scrollTo(selectedIndex);
    }
  }, [api, selectedIndex]);

  const hasMultiple = addresses.length > 1;

  return (
    <div className="relative w-full lg:hidden">
      <Carousel
        setApi={setApi}
        opts={{
          startIndex: selectedIndex,
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {addresses.map((address) => (
            <CarouselItem
              key={address.id}
              className="basis-full overflow-hidden pl-0"
            >
              <div className="h-52">
                <AddressCard
                  address={address}
                  isSelected={address.id === selectedAddressId}
                  onSelect={() => onSelectAddress(address)}
                  onEdit={() => onEdit(address)}
                  onDelete={() => onDelete(address.id)}
                  isDeleting={deletingId === address.id}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      {hasMultiple && (
        <div className="mt-3 flex justify-center gap-1.5">
          {addresses.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                current === index
                  ? "bg-primary w-5"
                  : "bg-neutral-300 hover:bg-neutral-400",
              )}
              aria-label={`Go to address ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AddressSelectorProps {
  addresses: UserAddress[];
  selectedAddressId: number | null;
  onSelectAddress: (address: UserAddress | null) => void;
  onAddressesChange?: (addresses: UserAddress[]) => void;
}

export function AddressSelector({
  addresses: initialAddresses,
  selectedAddressId,
  onSelectAddress,
  onAddressesChange,
}: AddressSelectorProps) {
  const { mutate: createAddressMutate } = useCreateAddress();
  const { mutate: updateAddressMutate } = useUpdateAddress();
  const { mutate: deleteAddressMutate } = useDeleteAddress();

  const [addresses, setAddresses] = useState<UserAddress[]>(initialAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const updateAddresses = useCallback(
    (newAddresses: UserAddress[]) => {
      setAddresses(newAddresses);
      onAddressesChange?.(newAddresses);
    },
    [onAddressesChange],
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
      setIsSubmitting(true);
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
      setIsSubmitting(false);

      if (result.success) {
        const newAddresses = [result.data, ...addresses];
        updateAddresses(newAddresses);
        onSelectAddress(result.data);
        setIsAddingNew(false);
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    [addresses, onSelectAddress, updateAddresses, createAddressMutate],
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

      setIsSubmitting(true);
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
      setIsSubmitting(false);

      if (result.success) {
        const newAddresses = addresses.map((addr) =>
          addr.id === editingAddress.id ? result.data : addr,
        );
        updateAddresses(newAddresses);
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
      updateAddresses,
      updateAddressMutate,
    ],
  );

  const handleDeleteAddress = useCallback(
    async (addressId: number) => {
      setDeletingId(addressId);
      const result = await deleteAddressMutate(addressId);
      setDeletingId(null);

      if (result.success) {
        const newAddresses = addresses.filter((addr) => addr.id !== addressId);
        updateAddresses(newAddresses);
        if (selectedAddressId === addressId) {
          onSelectAddress(newAddresses[0] || null);
        }
      }
    },
    [
      addresses,
      onSelectAddress,
      selectedAddressId,
      updateAddresses,
      deleteAddressMutate,
    ],
  );

  const handleSelectAddress = useCallback(
    (address: UserAddress) => {
      onSelectAddress(address);
    },
    [onSelectAddress],
  );

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId,
  );

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="text-primary h-5 w-5" />
          <h3 className="font-semibold text-neutral-900">Delivery Address</h3>
        </div>
        {addresses.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddingNew(true)}
            className="text-primary hover:bg-primary/10 h-8 rounded-full text-sm"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>

      {/* Address List */}
      {addresses.length > 0 ? (
        <>
          {/* Mobile Carousel */}
          <AddressCarousel
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={handleSelectAddress}
            onEdit={setEditingAddress}
            onDelete={handleDeleteAddress}
            deletingId={deletingId}
          />

          {/* Desktop Stack */}
          <div className="hidden space-y-3 lg:block">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isSelected={address.id === selectedAddressId}
                onSelect={() => handleSelectAddress(address)}
                onEdit={() => setEditingAddress(address)}
                onDelete={() => handleDeleteAddress(address.id)}
                isDeleting={deletingId === address.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-6 text-center">
          <MapPin className="text-muted-foreground mx-auto mb-3 h-10 w-10" />
          <p className="text-muted-foreground mb-4 text-sm">
            No saved addresses yet. Add one to continue.
          </p>
          <Button onClick={() => setIsAddingNew(true)} className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Address
          </Button>
        </div>
      )}

      {/* Selected Address Summary (for mobile) */}
      {selectedAddress && (
        <div className="bg-primary/5 border-primary/20 hidden rounded-xl border p-3 lg:block">
          <p className="text-primary text-xs font-medium">
            Delivering to: {selectedAddress.name}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {selectedAddress.address_line_1}, {selectedAddress.city},{" "}
            {selectedAddress.state} - {selectedAddress.zip}
          </p>
        </div>
      )}

      {/* Add Address Sheet */}
      <Sheet open={isAddingNew} onOpenChange={setIsAddingNew}>
        <SheetContent
          side="bottom"
          className="flex h-[85vh] flex-col rounded-t-3xl px-5 pt-6 pb-0"
        >
          <SheetHeader className="shrink-0 pb-4 text-left">
            <SheetTitle className="text-lg">Add New Address</SheetTitle>
            <SheetDescription>
              Enter your delivery address details
            </SheetDescription>
          </SheetHeader>
          <div className="-mx-5 flex-1 overflow-y-auto px-5 pb-8">
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setIsAddingNew(false)}
              submitLabel="Save & Use This Address"
              isSubmitting={isSubmitting}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Address Sheet */}
      <Sheet
        open={editingAddress !== null}
        onOpenChange={(open) => !open && setEditingAddress(null)}
      >
        <SheetContent
          side="bottom"
          className="flex h-[85vh] flex-col rounded-t-3xl px-5 pt-6 pb-0"
        >
          <SheetHeader className="shrink-0 pb-4 text-left">
            <SheetTitle className="text-lg">Edit Address</SheetTitle>
            <SheetDescription>Update your delivery address</SheetDescription>
          </SheetHeader>
          <div className="-mx-5 flex-1 overflow-y-auto px-5 pb-8">
            {editingAddress && (
              <AddressForm
                initialData={editingAddress}
                onSubmit={handleUpdateAddress}
                onCancel={() => setEditingAddress(null)}
                submitLabel="Update Address"
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
