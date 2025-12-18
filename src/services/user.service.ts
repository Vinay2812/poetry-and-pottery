import type { User, UserAddress } from "@/types";

import { prisma } from "@/lib/prisma";

export class UserService {
  /**
   * Get user by Clerk auth_id
   */
  static async getUserByAuthId(authId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { auth_id: authId },
    });
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create a new user (called after Clerk signup)
   */
  static async createUser(data: {
    authId: string;
    email: string;
    name?: string;
    image?: string;
    phone?: string;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        auth_id: data.authId,
        email: data.email,
        name: data.name,
        image: data.image,
        phone: data.phone,
        role: "user",
      },
    });
  }

  /**
   * Update user profile
   */
  static async updateUser(
    id: number,
    data: {
      name?: string;
      image?: string;
      phone?: string;
    },
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Get or create user by auth_id (upsert pattern)
   */
  static async getOrCreateUser(data: {
    authId: string;
    email: string;
    name?: string;
    image?: string;
  }): Promise<User> {
    return prisma.user.upsert({
      where: { auth_id: data.authId },
      update: {
        email: data.email,
        name: data.name,
        image: data.image,
      },
      create: {
        auth_id: data.authId,
        email: data.email,
        name: data.name,
        image: data.image,
        role: "user",
      },
    });
  }

  /**
   * Get user addresses
   */
  static async getUserAddresses(userId: number): Promise<UserAddress[]> {
    return prisma.userAddress.findMany({
      where: { user_id: userId },
      orderBy: { id: "desc" },
    });
  }

  /**
   * Add a new address for user
   */
  static async addAddress(
    userId: number,
    data: {
      name: string;
      addressLine1: string;
      addressLine2?: string;
      landmark?: string;
      city: string;
      state: string;
      zip: string;
      contactNumber?: string;
    },
  ): Promise<UserAddress> {
    return prisma.userAddress.create({
      data: {
        user_id: userId,
        name: data.name,
        address_line_1: data.addressLine1,
        address_line_2: data.addressLine2,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        zip: data.zip,
        contact_number: data.contactNumber,
      },
    });
  }

  /**
   * Update an address
   */
  static async updateAddress(
    addressId: number,
    userId: number,
    data: {
      name?: string;
      addressLine1?: string;
      addressLine2?: string;
      landmark?: string;
      city?: string;
      state?: string;
      zip?: string;
      contactNumber?: string;
    },
  ): Promise<UserAddress> {
    return prisma.userAddress.update({
      where: {
        id: addressId,
        user_id: userId, // Security check
      },
      data: {
        name: data.name,
        address_line_1: data.addressLine1,
        address_line_2: data.addressLine2,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        zip: data.zip,
        contact_number: data.contactNumber,
      },
    });
  }

  /**
   * Delete an address
   */
  static async deleteAddress(addressId: number, userId: number): Promise<void> {
    await prisma.userAddress.delete({
      where: {
        id: addressId,
        user_id: userId, // Security check
      },
    });
  }

  /**
   * Get address by ID
   */
  static async getAddressById(
    addressId: number,
    userId: number,
  ): Promise<UserAddress | null> {
    return prisma.userAddress.findFirst({
      where: {
        id: addressId,
        user_id: userId,
      },
    });
  }
}
