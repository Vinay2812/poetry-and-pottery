"use server";

import { auth } from "@clerk/nextjs/server";
import { RedirectType, redirect } from "next/navigation";

export async function requireAuth() {
  const { userId, isAuthenticated, sessionClaims } = await auth();
  if (!userId || !isAuthenticated || !sessionClaims?.dbUserId) {
    return redirect("/sign-in", RedirectType.replace);
  }

  return;
}
