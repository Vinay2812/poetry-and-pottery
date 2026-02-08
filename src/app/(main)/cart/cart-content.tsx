import { getCart } from "@/data/cart/gateway/server";
import { CartContainer } from "@/features/cart";

import { requireAuth } from "@/lib/auth";

export async function CartContent() {
  await requireAuth();

  const cartResult = await getCart();

  return <CartContainer initialCartItems={cartResult.items} />;
}
