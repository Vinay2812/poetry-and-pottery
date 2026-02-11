"use client";

import { MapPin, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

  // Sync carousel position with selected address
  useEffect(() => {
    if (api) {
      api.scrollTo(selectedIndex);
    }
  }, [api, selectedIndex]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          startIndex: selectedIndex,
          loop: false,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {addresses.map((address) => (
            <CarouselItem
              key={address.id}
              className="basis-[85%] pl-3 md:basis-[45%]"
            >
              <AddressCard
                address={address}
                isSelected={address.id === selectedAddressId}
                onSelect={() => onSelectAddress(address)}
                onEdit={() => onEdit(address)}
                onDelete={() => onDelete(address.id)}
                isDeleting={deletingId === address.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export interface AddressSelectorViewModel {
  addresses: UserAddress[];
  selectedAddressId: number | null;
  editingAddress: UserAddress | null;
  isAddingNew: boolean;
  deletingId: number | null;
  hasAddresses: boolean;
  isEditSheetOpen: boolean;
}

export interface AddressSelectorProps {
  viewModel: AddressSelectorViewModel;
  onSelectAddress: (address: UserAddress) => void;
  onEditAddress: (address: UserAddress) => void;
  onDeleteAddress: (addressId: number) => void;
  onAddAddress: (data: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    zip: string;
    contactNumber: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onUpdateAddress: (data: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    zip: string;
    contactNumber: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onOpenAddSheet: () => void;
  onCloseAddSheet: () => void;
  onCloseEditSheet: () => void;
}

export function AddressSelector({
  viewModel,
  onSelectAddress,
  onEditAddress,
  onDeleteAddress,
  onAddAddress,
  onUpdateAddress,
  onOpenAddSheet,
  onCloseAddSheet,
  onCloseEditSheet,
}: AddressSelectorProps) {
  const {
    addresses,
    selectedAddressId,
    editingAddress,
    isAddingNew,
    deletingId,
    hasAddresses,
    isEditSheetOpen,
  } = viewModel;

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="text-primary h-5 w-5" />
          <h3 className="font-semibold text-neutral-900">Delivery Address</h3>
        </div>
        {hasAddresses && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenAddSheet}
            className="text-primary hover:bg-primary/10 h-8 rounded-full text-sm"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>

      {/* Address List */}
      {hasAddresses ? (
        <AddressCarousel
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={onSelectAddress}
          onEdit={onEditAddress}
          onDelete={onDeleteAddress}
          deletingId={deletingId}
        />
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-6 text-center">
          <MapPin className="text-muted-foreground mx-auto mb-3 h-10 w-10" />
          <p className="text-muted-foreground mb-4 text-sm">
            No saved addresses yet. Add one to continue.
          </p>
          <Button onClick={onOpenAddSheet} className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Address
          </Button>
        </div>
      )}

      {/* Add Address Sheet */}
      <Sheet
        open={isAddingNew}
        onOpenChange={(open) => !open && onCloseAddSheet()}
      >
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
              onSubmit={onAddAddress}
              onCancel={onCloseAddSheet}
              submitLabel="Save & Use This Address"
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Address Sheet */}
      <Sheet
        open={isEditSheetOpen}
        onOpenChange={(open) => !open && onCloseEditSheet()}
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
                onSubmit={onUpdateAddress}
                onCancel={onCloseEditSheet}
                submitLabel="Update Address"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
