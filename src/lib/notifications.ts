import type { ShippingAddress } from "@/data/orders/types";
import nodemailer from "nodemailer";
import { z } from "zod";

import { BUSINESS_EMAIL, GMAIL_APP_PASSWORD, GMAIL_USER } from "../consts/env";
import { formatEventDateFull } from "./date";

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Event registration notification
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

// Order notification
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

// Contact form notification
export interface ContactNotificationData {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type NotificationData =
  | EventNotificationData
  | OrderNotificationData
  | ContactNotificationData;

const emailSchema = z.string().trim().email().max(254);
const phoneSchema = z
  .string()
  .trim()
  .min(3)
  .max(32)
  .regex(/^[0-9+\-\s()]+$/)
  .optional();

const shippingAddressSchema = z.object({
  name: z.string().trim().min(1).max(120),
  address_line_1: z.string().trim().min(1).max(200),
  address_line_2: z.string().trim().max(200).nullable().optional(),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  zip: z.string().trim().min(1).max(20),
  contact_number: z.string().trim().max(32).nullable().optional(),
}) satisfies z.ZodType<ShippingAddress>;

const eventNotificationSchema = z
  .object({
    type: z.literal("event"),
    registrationId: z.string().trim().min(1).max(64),
    eventTitle: z.string().trim().min(1).max(180),
    eventDate: z.coerce.date(),
    seats: z.number().int().min(1).max(50),
    amount: z.number().min(0).max(1_000_000),
    customerName: z.string().trim().min(1).max(120),
    customerEmail: emailSchema,
    customerPhone: phoneSchema,
  })
  .strict();

const orderNotificationSchema = z
  .object({
    type: z.literal("order"),
    orderId: z.string().trim().min(1).max(64),
    orderTotal: z.number().min(0).max(10_000_000),
    itemCount: z.number().int().min(1).max(200),
    customerName: z.string().trim().min(1).max(120),
    customerEmail: emailSchema,
    customerPhone: phoneSchema,
    shippingAddress: shippingAddressSchema,
    items: z
      .array(
        z
          .object({
            name: z.string().trim().min(1).max(180),
            quantity: z.number().int().min(1).max(500),
            price: z.number().min(0).max(1_000_000),
          })
          .strict(),
      )
      .min(1)
      .max(200),
  })
  .strict();

const contactNotificationSchema = z
  .object({
    type: z.literal("contact"),
    name: z.string().trim().min(1).max(120),
    email: emailSchema,
    phone: phoneSchema,
    subject: z.string().trim().min(1).max(180),
    message: z.string().trim().min(1).max(5_000),
  })
  .strict();

const notificationDataSchema = z.discriminatedUnion("type", [
  eventNotificationSchema,
  orderNotificationSchema,
  contactNotificationSchema,
]);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function sanitizeText(value: string): string {
  return escapeHtml(value.trim());
}

function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function parseNotificationData(input: unknown): NotificationData {
  const parsed = notificationDataSchema.parse(input);
  if (parsed.type === "event") {
    return {
      ...parsed,
      customerName: parsed.customerName.trim(),
      customerEmail: sanitizeEmail(parsed.customerEmail),
      customerPhone: parsed.customerPhone?.trim(),
    };
  }

  if (parsed.type === "order") {
    return {
      ...parsed,
      customerName: parsed.customerName.trim(),
      customerEmail: sanitizeEmail(parsed.customerEmail),
      customerPhone: parsed.customerPhone?.trim(),
      shippingAddress: {
        ...parsed.shippingAddress,
        name: parsed.shippingAddress.name.trim(),
        address_line_1: parsed.shippingAddress.address_line_1.trim(),
        address_line_2: parsed.shippingAddress.address_line_2?.trim() ?? null,
        city: parsed.shippingAddress.city.trim(),
        state: parsed.shippingAddress.state.trim(),
        zip: parsed.shippingAddress.zip.trim(),
        contact_number: parsed.shippingAddress.contact_number?.trim() ?? null,
      },
      items: parsed.items.map((item) => ({
        ...item,
        name: item.name.trim(),
      })),
    };
  }

  return {
    ...parsed,
    name: parsed.name.trim(),
    email: sanitizeEmail(parsed.email),
    phone: parsed.phone?.trim(),
    subject: parsed.subject.trim(),
    message: parsed.message.trim(),
  };
}

function generateEventEmailHtml(data: EventNotificationData): string {
  const formattedDate = sanitizeText(formatEventDateFull(data.eventDate));
  const eventTitle = sanitizeText(data.eventTitle);
  const registrationId = sanitizeText(data.registrationId);
  const customerName = sanitizeText(data.customerName);
  const customerEmail = sanitizeText(data.customerEmail);
  const customerPhone = data.customerPhone
    ? sanitizeText(data.customerPhone)
    : null;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Workshop Registration</h2>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Workshop:</strong> ${eventTitle}</p>
        <p style="margin: 8px 0;"><strong>Date:</strong> ${formattedDate}</p>
        <p style="margin: 8px 0;"><strong>Seats:</strong> ${data.seats}</p>
        <p style="margin: 8px 0;"><strong>Amount:</strong> Rs.${data.amount.toLocaleString()}</p>
        <p style="margin: 8px 0;"><strong>Registration ID:</strong> ${registrationId}</p>
      </div>

      <h3 style="color: #1a1a1a;">Customer Details</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Name:</strong> ${customerName}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${customerEmail}</p>
        ${customerPhone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${customerPhone}</p>` : ""}
      </div>

      <p style="color: #666; font-size: 14px;">Please confirm this registration with the customer.</p>
    </div>
  `;
}

function generateContactEmailHtml(data: ContactNotificationData): string {
  const subject = sanitizeText(data.subject);
  const message = sanitizeText(data.message);
  const name = sanitizeText(data.name);
  const email = sanitizeText(data.email);
  const phone = data.phone ? sanitizeText(data.phone) : null;
  const mailtoHref = `mailto:${encodeURIComponent(data.email)}`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
      </div>

      <h3 style="color: #1a1a1a;">Message</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>

      <h3 style="color: #1a1a1a;">Contact Details</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="${mailtoHref}">${email}</a></p>
        ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ""}
      </div>

      <p style="color: #666; font-size: 14px;">Please respond to this inquiry.</p>
    </div>
  `;
}

function generateOrderEmailHtml(data: OrderNotificationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(item.name)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">Rs.${item.price.toLocaleString()}</td>
      </tr>
    `,
    )
    .join("");
  const orderId = sanitizeText(data.orderId);
  const customerName = sanitizeText(data.customerName);
  const customerEmail = sanitizeText(data.customerEmail);
  const customerPhone = data.customerPhone
    ? sanitizeText(data.customerPhone)
    : null;
  const shippingName = sanitizeText(data.shippingAddress.name);
  const shippingAddress1 = sanitizeText(data.shippingAddress.address_line_1);
  const shippingAddress2 = data.shippingAddress.address_line_2
    ? sanitizeText(data.shippingAddress.address_line_2)
    : null;
  const shippingCity = sanitizeText(data.shippingAddress.city);
  const shippingState = sanitizeText(data.shippingAddress.state);
  const shippingZip = sanitizeText(data.shippingAddress.zip);
  const shippingContact = data.shippingAddress.contact_number
    ? sanitizeText(data.shippingAddress.contact_number)
    : null;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Order Received</h2>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Order ID:</strong> ${orderId}</p>
        <p style="margin: 8px 0;"><strong>Total Items:</strong> ${data.itemCount}</p>
        <p style="margin: 8px 0;"><strong>Order Total:</strong> Rs.${data.orderTotal.toLocaleString()}</p>
      </div>

      <h3 style="color: #1a1a1a;">Order Items</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="padding: 8px; text-align: left;">Product</th>
            <th style="padding: 8px; text-align: center;">Qty</th>
            <th style="padding: 8px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr style="font-weight: bold;">
            <td colspan="2" style="padding: 12px 8px; text-align: right;">Total:</td>
            <td style="padding: 12px 8px; text-align: right;">Rs.${data.orderTotal.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <h3 style="color: #1a1a1a;">Customer Details</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Name:</strong> ${customerName}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${customerEmail}</p>
        ${customerPhone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${customerPhone}</p>` : ""}
      </div>

      <h3 style="color: #1a1a1a;">Shipping Address</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>${shippingName}</strong></p>
        <p style="margin: 8px 0;">${shippingAddress1}</p>
        ${shippingAddress2 ? `<p style="margin: 8px 0;">${shippingAddress2}</p>` : ""}
        <p style="margin: 8px 0;">${shippingCity}, ${shippingState} ${shippingZip}</p>
        ${shippingContact ? `<p style="margin: 8px 0;"><strong>Contact:</strong> ${shippingContact}</p>` : ""}
      </div>

      <p style="color: #666; font-size: 14px;">Please process this order and contact the customer.</p>
    </div>
  `;
}

export async function sendRegistrationNotification(
  data: NotificationData,
): Promise<{ success: boolean; error?: string }> {
  const gmailUser = GMAIL_USER;
  const gmailAppPassword = GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("Gmail credentials not configured");
    return { success: false, error: "Gmail not configured" };
  }
  if (!BUSINESS_EMAIL || !emailSchema.safeParse(BUSINESS_EMAIL).success) {
    console.error("Business email not configured");
    return { success: false, error: "Business email not configured" };
  }

  try {
    let subject: string;
    let html: string;

    if (data.type === "event") {
      subject = safeHeaderValue(
        `New Workshop Registration - ${data.eventTitle}`,
      );
      html = generateEventEmailHtml(data);
    } else if (data.type === "order") {
      subject = safeHeaderValue(`New Order - #${data.orderId}`);
      html = generateOrderEmailHtml(data);
    } else {
      subject = safeHeaderValue(`Contact Form: ${data.subject}`);
      html = generateContactEmailHtml(data);
    }

    await transporter.sendMail({
      from: `"Poetry & Pottery" <${gmailUser}>`,
      to: BUSINESS_EMAIL,
      subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
