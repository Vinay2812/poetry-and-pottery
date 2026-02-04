"use client";

import type { ShippingAddress } from "@/data/orders/types";

import { formatEventDateFull } from "./date";

// Types for different notification scenarios
export interface EventNotificationData {
  type: "event";
  registrationId: string;
  eventTitle: string;
  eventDate: Date | string;
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
  shippingAddress: ShippingAddress;
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
  eventDate: Date | string;
  registrationStatus: string;
  customerName: string;
  customerEmail: string;
}

// Product request for archived/sold-out items
export interface ProductRequestData {
  type: "product-request";
  productId: number;
  productName: string;
  productPrice: number;
  productUrl: string;
  isArchived?: boolean;
  isSoldOut?: boolean;
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

function getWhatsAppPhoneNumber(): string {
  const raw = process.env.NEXT_PUBLIC_MOBILE_NUMBER || "";
  const digitsOnly = raw.replace(/\D/g, "");
  return digitsOnly;
}

export function getWhatsAppBaseUrl(): string | null {
  const phoneNumber = getWhatsAppPhoneNumber();
  if (!phoneNumber) {
    return null;
  }

  return `https://wa.me/${phoneNumber}`;
}

function openWhatsAppUrl(message: string): void {
  const baseUrl = getWhatsAppBaseUrl();
  if (!baseUrl) {
    console.error("Missing NEXT_PUBLIC_MOBILE_NUMBER for WhatsApp link.");
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${baseUrl}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

export function openWhatsApp(data: NotificationData): void {
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

    const addressLine2Part = data.shippingAddress.address_line_2
      ? `${data.shippingAddress.address_line_2}, `
      : "";
    const formattedAddress =
      `${data.shippingAddress.name}\n` +
      `${data.shippingAddress.address_line_1}, ${addressLine2Part}${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}` +
      `${data.shippingAddress.contact_number ? `\nContact: ${data.shippingAddress.contact_number}` : ""}`;

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

  openWhatsAppUrl(message);
}

export function openWhatsAppFollowUp(data: FollowUpData): void {
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

  openWhatsAppUrl(message);
}

export function openWhatsAppProductRequest(data: ProductRequestData): void {
  const status = data.isSoldOut
    ? "sold out"
    : data.isArchived
      ? "archived/discontinued"
      : "unavailable";

  const message =
    `Hi! I'm interested in the following product that is currently ${status}:\n\n` +
    `*Product:* ${data.productName}\n` +
    `*Price:* ₹${data.productPrice.toLocaleString()}\n` +
    `*Link:* ${data.productUrl}\n\n` +
    `Could you please let me know if this item can be made available or if there are similar alternatives?`;

  openWhatsAppUrl(message);
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

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(
  data: ContactFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        ...data,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

export function openWhatsAppContact(data: ContactFormData): void {
  const message =
    `Hi! I would like to get in touch regarding: *${data.subject}*\n\n` +
    `*Message:*\n${data.message}\n\n` +
    `*My Details:*\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `${data.phone ? `Phone: ${data.phone}\n` : ""}` +
    `\nLooking forward to hearing from you!`;

  openWhatsAppUrl(message);
}

export async function submitContactForm(
  data: ContactFormData,
): Promise<{ success: boolean; error?: string }> {
  // Send email notification first
  const emailResult = await sendContactEmail(data);

  if (!emailResult.success) {
    console.warn("Contact email failed:", emailResult.error);
    // Continue to WhatsApp even if email fails
  }

  // Open WhatsApp
  openWhatsAppContact(data);

  return { success: true };
}
