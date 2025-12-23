import nodemailer from "nodemailer";

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

export type NotificationData = EventNotificationData | OrderNotificationData;

function generateEventEmailHtml(data: EventNotificationData): string {
  const formattedDate = formatEventDateFull(data.eventDate);

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Workshop Registration</h2>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Workshop:</strong> ${data.eventTitle}</p>
        <p style="margin: 8px 0;"><strong>Date:</strong> ${formattedDate}</p>
        <p style="margin: 8px 0;"><strong>Seats:</strong> ${data.seats}</p>
        <p style="margin: 8px 0;"><strong>Amount:</strong> Rs.${data.amount.toLocaleString()}</p>
        <p style="margin: 8px 0;"><strong>Registration ID:</strong> ${data.registrationId}</p>
      </div>

      <h3 style="color: #1a1a1a;">Customer Details</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Name:</strong> ${data.customerName}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${data.customerEmail}</p>
        ${data.customerPhone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${data.customerPhone}</p>` : ""}
      </div>

      <p style="color: #666; font-size: 14px;">Please confirm this registration with the customer.</p>
    </div>
  `;
}

function generateOrderEmailHtml(data: OrderNotificationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">Rs.${item.price.toLocaleString()}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Order Received</h2>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Order ID:</strong> ${data.orderId}</p>
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
        <p style="margin: 8px 0;"><strong>Name:</strong> ${data.customerName}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${data.customerEmail}</p>
        ${data.customerPhone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${data.customerPhone}</p>` : ""}
      </div>

      <h3 style="color: #1a1a1a;">Shipping Address</h3>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>${data.shippingAddress.name}</strong></p>
        <p style="margin: 8px 0;">${data.shippingAddress.addressLine1}</p>
        ${data.shippingAddress.addressLine2 ? `<p style="margin: 8px 0;">${data.shippingAddress.addressLine2}</p>` : ""}
        <p style="margin: 8px 0;">${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}</p>
        ${data.shippingAddress.contactNumber ? `<p style="margin: 8px 0;"><strong>Contact:</strong> ${data.shippingAddress.contactNumber}</p>` : ""}
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

  try {
    const isEvent = data.type === "event";
    const subject = isEvent
      ? `New Workshop Registration - ${data.eventTitle}`
      : `New Order - #${data.orderId}`;

    const html = isEvent
      ? generateEventEmailHtml(data)
      : generateOrderEmailHtml(data);

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
