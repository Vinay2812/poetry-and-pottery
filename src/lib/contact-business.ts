"use client";

import { formatEventDateFull } from "./date";

// Types for different notification scenarios
export interface EventNotificationData {
  type: "event";
  registrationId: string;
  eventTitle: string;
  eventDate: Date;
  seats: number;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface OrderNotificationData {
  type: "order";
  orderId: string;
  orderTotal: number;
  itemCount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
    contactNumber?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

// Follow-up query types for existing orders/registrations
export interface OrderFollowUpData {
  type: "order-followup";
  orderId: string;
  orderStatus: string;
  orderTotal: number;
  customerName: string;
  customerEmail: string;
}

export interface EventFollowUpData {
  type: "event-followup";
  registrationId: string;
  eventTitle: string;
  eventDate: Date;
  registrationStatus: string;
  customerName: string;
  customerEmail: string;
}

export type NotificationData = EventNotificationData | OrderNotificationData;
export type FollowUpData = OrderFollowUpData | EventFollowUpData;

export async function sendEmailNotification(
  data: NotificationData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

export function openWhatsApp(data: NotificationData): void {
  const phoneNumber = process.env.NEXT_PUBLIC_MOBILE_NUMBER || "";

  let message: string;

  if (data.type === "event") {
    const formattedDate = formatEventDateFull(data.eventDate);
    message =
      `Hi! I would like to register for the following workshop:\n\n` +
      `*Workshop:* ${data.eventTitle}\n` +
      `*Date:* ${formattedDate}\n` +
      `*Seats:* ${data.seats}\n` +
      `*Amount:* Rs.${data.amount.toLocaleString()}\n` +
      `*Registration ID:* ${data.registrationId}\n\n` +
      `*My Details:*\n` +
      `Name: ${data.customerName}\n` +
      `Email: ${data.customerEmail}\n` +
      `${data.customerPhone ? `Phone: ${data.customerPhone}\n` : ""}` +
      `\nPlease confirm my registration.`;
  } else {
    const itemsList = data.items
      .map((item) => `- ${item.name} x${item.quantity} (Rs.${item.price})`)
      .join("\n");

    const addressLine2Part = data.shippingAddress.addressLine2
      ? `${data.shippingAddress.addressLine2}, `
      : "";
    const formattedAddress =
      `${data.shippingAddress.name}\n` +
      `${data.shippingAddress.addressLine1}, ${addressLine2Part}${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}` +
      `${data.shippingAddress.contactNumber ? `\nContact: ${data.shippingAddress.contactNumber}` : ""}`;

    message =
      `Hi! I would like to place the following order:\n\n` +
      `*Order ID:* ${data.orderId}\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* Rs.${data.orderTotal.toLocaleString()}\n\n` +
      `*My Details:*\n` +
      `Name: ${data.customerName}\n` +
      `Email: ${data.customerEmail}\n` +
      `${data.customerPhone ? `Phone: ${data.customerPhone}\n` : ""}` +
      `\n*Shipping Address:*\n${formattedAddress}\n` +
      `\nPlease confirm my order.`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

export function openWhatsAppFollowUp(data: FollowUpData): void {
  const phoneNumber = process.env.NEXT_PUBLIC_MOBILE_NUMBER || "";

  let message: string;

  if (data.type === "order-followup") {
    message =
      `Hi! I have a query about my order:\n\n` +
      `*Order ID:* ${data.orderId}\n` +
      `*Current Status:* ${data.orderStatus}\n` +
      `*Order Total:* Rs.${data.orderTotal.toLocaleString()}\n\n` +
      `*My Details:*\n` +
      `Name: ${data.customerName}\n` +
      `Email: ${data.customerEmail}\n\n` +
      `Please help me with an update on my order.`;
  } else {
    const formattedDate = formatEventDateFull(data.eventDate);
    message =
      `Hi! I have a query about my workshop registration:\n\n` +
      `*Registration ID:* ${data.registrationId}\n` +
      `*Workshop:* ${data.eventTitle}\n` +
      `*Date:* ${formattedDate}\n` +
      `*Current Status:* ${data.registrationStatus}\n\n` +
      `*My Details:*\n` +
      `Name: ${data.customerName}\n` +
      `Email: ${data.customerEmail}\n\n` +
      `Please help me with an update on my registration.`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

export async function contactBusiness(
  data: NotificationData,
): Promise<{ success: boolean; error?: string }> {
  // Send email notification first
  const emailResult = await sendEmailNotification(data);

  if (!emailResult.success) {
    console.warn("Email notification failed:", emailResult.error);
    // Continue to WhatsApp even if email fails
  }

  // Open WhatsApp
  openWhatsApp(data);

  return { success: true };
}
