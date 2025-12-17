import { PRODUCTS, type Product } from "./constants";

export type OrderStatus = "processing" | "shipped" | "delivered";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  glazeOption?: string;
  reviewed: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippedAt?: string;
  deliveredAt?: string;
}

const STORAGE_KEY_PREFIX = "poetry-pottery-orders-";

function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

function generateItemId(): string {
  return `ITEM-${Math.random().toString(36).substring(2, 10)}`;
}

function createSeedOrders(userId: string): Order[] {
  const sampleProducts = PRODUCTS.slice(0, 5);

  const orders: Order[] = [
    {
      id: generateOrderId(),
      userId,
      items: [
        createOrderItem(sampleProducts[0], 1, "Moss Green"),
        createOrderItem(sampleProducts[2], 2),
      ],
      total: sampleProducts[0].price + sampleProducts[2].price * 2,
      status: "delivered",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      shippedAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
      deliveredAt: new Date(
        Date.now() - 23 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: generateOrderId(),
      userId,
      items: [
        createOrderItem(sampleProducts[1], 1),
        createOrderItem(sampleProducts[4], 1),
      ],
      total: sampleProducts[1].price + sampleProducts[4].price,
      status: "shipped",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      shippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: generateOrderId(),
      userId,
      items: [createOrderItem(sampleProducts[3], 3)],
      total: sampleProducts[3].price * 3,
      status: "processing",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return orders;
}

function createOrderItem(
  product: Product,
  quantity: number,
  glazeOption?: string,
): OrderItem {
  return {
    id: generateItemId(),
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    price: product.price,
    quantity,
    glazeOption,
    reviewed: false,
  };
}

export function getOrdersForUser(userId: string): Order[] {
  if (typeof window === "undefined") return [];

  const storageKey = getStorageKey(userId);
  const stored = localStorage.getItem(storageKey);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Order[];
  } catch {
    return [];
  }
}

export function getOrderById(userId: string, orderId: string): Order | null {
  const orders = getOrdersForUser(userId);
  return orders.find((order) => order.id === orderId) ?? null;
}

export function seedOrdersForUserIfEmpty(userId: string): Order[] {
  if (typeof window === "undefined") return [];

  const existingOrders = getOrdersForUser(userId);

  if (existingOrders.length > 0) {
    return existingOrders;
  }

  const seedOrders = createSeedOrders(userId);
  const storageKey = getStorageKey(userId);
  localStorage.setItem(storageKey, JSON.stringify(seedOrders));

  return seedOrders;
}

export function markItemReviewed(
  userId: string,
  orderId: string,
  itemId: string,
): void {
  if (typeof window === "undefined") return;

  const orders = getOrdersForUser(userId);
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) return;

  const itemIndex = orders[orderIndex].items.findIndex(
    (item) => item.id === itemId,
  );

  if (itemIndex === -1) return;

  orders[orderIndex].items[itemIndex].reviewed = true;

  const storageKey = getStorageKey(userId);
  localStorage.setItem(storageKey, JSON.stringify(orders));
}

export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case "processing":
      return "text-yellow-600 bg-yellow-50";
    case "shipped":
      return "text-blue-600 bg-blue-50";
    case "delivered":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    default:
      return status;
  }
}

export const ORDER_STEPS = [
  {
    status: "processing" as OrderStatus,
    label: "Order Placed",
    description: "We've received your order",
  },
  {
    status: "shipped" as OrderStatus,
    label: "Shipped",
    description: "Your order is on its way",
  },
  {
    status: "delivered" as OrderStatus,
    label: "Delivered",
    description: "Your order has arrived",
  },
] as const;
