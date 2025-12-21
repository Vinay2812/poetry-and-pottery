"use server";

import type { UserAddress } from "@/prisma/generated/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

export type AddressFormData = {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  zip: string;
  contactNumber?: string;
};

export async function getUserAddresses(): Promise<
  { success: true; data: UserAddress[] } | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const addresses = await prisma.userAddress.findMany({
      where: { user_id: userId },
      orderBy: { id: "desc" },
    });

    return { success: true, data: addresses };
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return { success: false, error: "Failed to fetch addresses" };
  }
}

export async function getAddressById(
  addressId: number,
): Promise<
  { success: true; data: UserAddress } | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const address = await prisma.userAddress.findFirst({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!address) {
      return { success: false, error: "Address not found" };
    }

    return { success: true, data: address };
  } catch (error) {
    console.error("Failed to fetch address:", error);
    return { success: false, error: "Failed to fetch address" };
  }
}

export async function createAddress(
  data: AddressFormData,
): Promise<
  { success: true; data: UserAddress } | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate required fields
  if (!data.name?.trim()) {
    return { success: false, error: "Name is required" };
  }
  if (!data.addressLine1?.trim()) {
    return { success: false, error: "Address is required" };
  }
  if (!data.city?.trim()) {
    return { success: false, error: "City is required" };
  }
  if (!data.state?.trim()) {
    return { success: false, error: "State is required" };
  }
  if (!data.zip?.trim()) {
    return { success: false, error: "PIN code is required" };
  }

  // Validate PIN code format (6 digits for India)
  if (!/^\d{6}$/.test(data.zip.trim())) {
    return { success: false, error: "PIN code must be 6 digits" };
  }

  try {
    const address = await prisma.userAddress.create({
      data: {
        user_id: userId,
        name: data.name.trim(),
        address_line_1: data.addressLine1.trim(),
        address_line_2: data.addressLine2?.trim() || null,
        landmark: data.landmark?.trim() || null,
        city: data.city.trim(),
        state: data.state.trim(),
        zip: data.zip.trim(),
        contact_number: data.contactNumber?.trim() || null,
      },
    });

    revalidatePath("/cart");
    revalidatePath("/profile");

    return { success: true, data: address };
  } catch (error) {
    console.error("Failed to create address:", error);
    return { success: false, error: "Failed to create address" };
  }
}

export async function updateAddress(
  addressId: number,
  data: AddressFormData,
): Promise<
  { success: true; data: UserAddress } | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate required fields
  if (!data.name?.trim()) {
    return { success: false, error: "Name is required" };
  }
  if (!data.addressLine1?.trim()) {
    return { success: false, error: "Address is required" };
  }
  if (!data.city?.trim()) {
    return { success: false, error: "City is required" };
  }
  if (!data.state?.trim()) {
    return { success: false, error: "State is required" };
  }
  if (!data.zip?.trim()) {
    return { success: false, error: "PIN code is required" };
  }

  // Validate PIN code format (6 digits for India)
  if (!/^\d{6}$/.test(data.zip.trim())) {
    return { success: false, error: "PIN code must be 6 digits" };
  }

  try {
    // Verify address belongs to user
    const existingAddress = await prisma.userAddress.findFirst({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!existingAddress) {
      return { success: false, error: "Address not found" };
    }

    const address = await prisma.userAddress.update({
      where: { id: addressId },
      data: {
        name: data.name.trim(),
        address_line_1: data.addressLine1.trim(),
        address_line_2: data.addressLine2?.trim() || null,
        landmark: data.landmark?.trim() || null,
        city: data.city.trim(),
        state: data.state.trim(),
        zip: data.zip.trim(),
        contact_number: data.contactNumber?.trim() || null,
      },
    });

    revalidatePath("/cart");
    revalidatePath("/profile");

    return { success: true, data: address };
  } catch (error) {
    console.error("Failed to update address:", error);
    return { success: false, error: "Failed to update address" };
  }
}

export async function deleteAddress(
  addressId: number,
): Promise<{ success: true } | { success: false; error: string }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Verify address belongs to user
    const existingAddress = await prisma.userAddress.findFirst({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!existingAddress) {
      return { success: false, error: "Address not found" };
    }

    await prisma.userAddress.delete({
      where: { id: addressId },
    });

    revalidatePath("/cart");
    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete address:", error);
    return { success: false, error: "Failed to delete address" };
  }
}
