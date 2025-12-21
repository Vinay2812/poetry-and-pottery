"use server";

import { UserRole } from "@/prisma/generated/enums";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ENVIRONMENT } from "@/lib/env.consts";
import { prisma } from "@/lib/prisma";

/**
 * Check if the current user is an admin based on session claims.
 * Returns false if not authenticated or not an admin.
 */
export async function isAdmin(): Promise<boolean> {
  const { sessionClaims, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return false;
  }

  const role = sessionClaims?.role;
  const environment = sessionClaims?.environment;

  // Ensure we're in the correct environment and user has admin role
  if (environment !== ENVIRONMENT) {
    return false;
  }

  return role === UserRole.ADMIN;
}

/**
 * Get the authenticated database user with their role.
 * Returns null if not authenticated or user not found.
 */
export async function getAuthenticatedDbUser() {
  const { sessionClaims, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return null;
  }

  const dbUserId = sessionClaims?.dbUserId;
  const environment = sessionClaims?.environment;

  if (!dbUserId || environment !== ENVIRONMENT) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: dbUserId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
    },
  });

  return user;
}

/**
 * Require admin access - throws redirect if not admin.
 * Use this at the top of server actions that require admin access.
 */
export async function requireAdmin(): Promise<void> {
  const user = await getAuthenticatedDbUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== UserRole.ADMIN) {
    redirect("/");
  }
}

/**
 * Require admin access and return the user.
 * Redirects if not authenticated or not admin.
 */
export async function requireAdminUser() {
  const user = await getAuthenticatedDbUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  return user;
}

/**
 * Check admin status for client-side use.
 * Returns { isAuthenticated, isAdmin, role }
 */
export async function getAdminStatus() {
  const { sessionClaims, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      role: null,
    };
  }

  const role = sessionClaims?.role;
  const environment = sessionClaims?.environment;

  // Environment mismatch means we need to re-sync
  if (environment !== ENVIRONMENT) {
    return {
      isAuthenticated: true,
      isAdmin: false,
      role: null,
    };
  }

  return {
    isAuthenticated: true,
    isAdmin: role === UserRole.ADMIN,
    role: role ?? null,
  };
}
