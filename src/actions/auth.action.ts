"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

import { ENVIRONMENT } from "@/lib/env.consts";
import { prisma } from "@/lib/prisma";

async function createUserInDatabase() {
  const [clerkUser, clerk] = await Promise.all([currentUser(), clerkClient()]);
  if (!clerkUser) throw new Error("User not found");

  const email = clerkUser.emailAddresses.find(
    (emailAddress) => emailAddress.id === clerkUser.primaryEmailAddressId,
  )?.emailAddress;

  if (!email) throw new Error("Email not found");

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: { email },
      update: {
        auth_id: clerkUser.id,
        name: clerkUser.fullName ?? clerkUser.firstName ?? null,
        image: clerkUser.imageUrl ?? null,
        phone: clerkUser.primaryPhoneNumber?.phoneNumber ?? null,
      },
      create: {
        auth_id: clerkUser.id,
        email,
        name: clerkUser.fullName ?? clerkUser.firstName ?? null,
        image: clerkUser.imageUrl ?? null,
        phone: clerkUser.primaryPhoneNumber?.phoneNumber ?? null,
      },
    });

    await clerk.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        db_user_id: user.id,
        environment: ENVIRONMENT,
        role: user.role,
      },
    });

    return user;
  });
}

export async function getAuthenticatedUserId() {
  const { sessionClaims, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return null;
  }

  const dbUserId = sessionClaims?.dbUserId;
  const environment = sessionClaims?.environment;
  const role = sessionClaims?.role;

  if (!dbUserId || environment !== ENVIRONMENT || !role) {
    const user = await createUserInDatabase();
    return user.id;
  }

  return dbUserId;
}
