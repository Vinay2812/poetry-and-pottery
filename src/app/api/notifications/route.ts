import { NextResponse } from "next/server";

import {
  type NotificationData,
  sendRegistrationNotification,
} from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NotificationData;

    // Validate based on type
    if (body.type === "event") {
      if (
        !body.registrationId ||
        !body.eventTitle ||
        !body.eventDate ||
        !body.customerName ||
        !body.customerEmail
      ) {
        return NextResponse.json(
          { error: "Missing required fields for event notification" },
          { status: 400 },
        );
      }
    } else if (body.type === "order") {
      if (
        !body.orderId ||
        !body.orderTotal ||
        !body.customerName ||
        !body.customerEmail
      ) {
        return NextResponse.json(
          { error: "Missing required fields for order notification" },
          { status: 400 },
        );
      }
    } else if (body.type === "contact") {
      if (!body.name || !body.email || !body.subject || !body.message) {
        return NextResponse.json(
          { error: "Missing required fields for contact notification" },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid notification type" },
        { status: 400 },
      );
    }

    const result = await sendRegistrationNotification(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
