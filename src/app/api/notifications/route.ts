import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  parseNotificationData,
  sendRegistrationNotification,
} from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const rawBody = (await request.json()) as unknown;
    const body = parseNotificationData(rawBody);
    const result = await sendRegistrationNotification(body);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid notification payload", details: error.flatten() },
        { status: 400 },
      );
    }

    console.error("Notification API error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
