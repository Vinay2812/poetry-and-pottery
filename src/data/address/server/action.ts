"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type {
  AddressMutationResponse,
  UserAddress,
} from "@/graphql/generated/types";

function mapToUserAddress(address: {
  id: number;
  user_id: number;
  name: string;
  address_line_1: string;
  address_line_2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  zip: string;
  contact_number: string | null;
}): UserAddress {
  return {
    id: address.id,
    user_id: address.user_id,
    name: address.name,
    address_line_1: address.address_line_1,
    address_line_2: address.address_line_2,
    landmark: address.landmark,
    city: address.city,
    state: address.state,
    zip: address.zip,
    contact_number: address.contact_number,
  };
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return [];
  }

  const addresses = await prisma.userAddress.findMany({
    where: { user_id: userId },
    orderBy: { id: "desc" },
  });

  return addresses.map(mapToUserAddress);
}

export async function getAddressById(id: number): Promise<UserAddress | null> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return null;
  }

  const address = await prisma.userAddress.findFirst({
    where: {
      id,
      user_id: userId,
    },
  });

  return address ? mapToUserAddress(address) : null;
}

export async function createAddress(input: {
  name: string;
  address_line_1: string;
  address_line_2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  zip: string;
  contact_number?: string | null;
}): Promise<AddressMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate required fields
  if (!input.name?.trim()) {
    return { success: false, error: "Name is required" };
  }
  if (!input.address_line_1?.trim()) {
    return { success: false, error: "Address is required" };
  }
  if (!input.city?.trim()) {
    return { success: false, error: "City is required" };
  }
  if (!input.state?.trim()) {
    return { success: false, error: "State is required" };
  }
  if (!input.zip?.trim()) {
    return { success: false, error: "PIN code is required" };
  }

  // Validate PIN code format (6 digits for India)
  if (!/^\d{6}$/.test(input.zip.trim())) {
    return { success: false, error: "PIN code must be 6 digits" };
  }

  try {
    const address = await prisma.userAddress.create({
      data: {
        user_id: userId,
        name: input.name.trim(),
        address_line_1: input.address_line_1.trim(),
        address_line_2: input.address_line_2?.trim() ?? null,
        landmark: input.landmark?.trim() ?? null,
        city: input.city.trim(),
        state: input.state.trim(),
        zip: input.zip.trim(),
        contact_number: input.contact_number?.trim() ?? null,
      },
    });

    revalidatePath("/cart");
    revalidatePath("/profile");

    return {
      success: true,
      address: mapToUserAddress(address),
    };
  } catch (error) {
    console.error("Failed to create address:", error);
    return { success: false, error: "Failed to create address" };
  }
}

export async function updateAddress(
  id: number,
  input: {
    name?: string | null;
    address_line_1?: string | null;
    address_line_2?: string | null;
    landmark?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    contact_number?: string | null;
  },
): Promise<AddressMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate PIN code format if provided
  if (input.zip !== undefined && input.zip !== null) {
    if (!/^\d{6}$/.test(input.zip.trim())) {
      return { success: false, error: "PIN code must be 6 digits" };
    }
  }

  try {
    // Verify address belongs to user
    const existingAddress = await prisma.userAddress.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!existingAddress) {
      return { success: false, error: "Address not found" };
    }

    // Build update data
    const updateData: {
      name?: string;
      address_line_1?: string;
      address_line_2?: string | null;
      landmark?: string | null;
      city?: string;
      state?: string;
      zip?: string;
      contact_number?: string | null;
    } = {};

    if (input.name !== undefined && input.name !== null) {
      updateData.name = input.name.trim();
    }
    if (input.address_line_1 !== undefined && input.address_line_1 !== null) {
      updateData.address_line_1 = input.address_line_1.trim();
    }
    if (input.address_line_2 !== undefined) {
      updateData.address_line_2 = input.address_line_2?.trim() ?? null;
    }
    if (input.landmark !== undefined) {
      updateData.landmark = input.landmark?.trim() ?? null;
    }
    if (input.city !== undefined && input.city !== null) {
      updateData.city = input.city.trim();
    }
    if (input.state !== undefined && input.state !== null) {
      updateData.state = input.state.trim();
    }
    if (input.zip !== undefined && input.zip !== null) {
      updateData.zip = input.zip.trim();
    }
    if (input.contact_number !== undefined) {
      updateData.contact_number = input.contact_number?.trim() ?? null;
    }

    const address = await prisma.userAddress.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/cart");
    revalidatePath("/profile");

    return {
      success: true,
      address: mapToUserAddress(address),
    };
  } catch (error) {
    console.error("Failed to update address:", error);
    return { success: false, error: "Failed to update address" };
  }
}

export async function deleteAddress(
  id: number,
): Promise<AddressMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Verify address belongs to user
    const existingAddress = await prisma.userAddress.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!existingAddress) {
      return { success: false, error: "Address not found" };
    }

    await prisma.userAddress.delete({
      where: { id },
    });

    revalidatePath("/cart");
    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete address:", error);
    return { success: false, error: "Failed to delete address" };
  }
}
