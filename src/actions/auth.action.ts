"use server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser) return null;

  const clerkEmailAddressId = authenticatedUser.primaryEmailAddressId;
  const email = authenticatedUser.emailAddresses.find(
    (emailAddress) => emailAddress.id === clerkEmailAddressId,
  )?.emailAddress;

  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();

  if (!user) return null;

  return user.id;
}
