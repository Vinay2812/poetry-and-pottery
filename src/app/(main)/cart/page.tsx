import { getCart, getFeaturedProducts, getUserAddresses } from "@/actions";
import { CartContainer } from "@/features/cart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | Poetry & Pottery",
  description:
    "Review your cart and proceed to checkout for your handcrafted pottery selections.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  const [cartResult, recommendedProducts, addressResult] = await Promise.all([
    getCart(),
    getFeaturedProducts(4),
    getUserAddresses(),
  ]);

  return (
    <CartContainer
      initialCartItems={cartResult.success ? cartResult.data : []}
      recommendedProducts={recommendedProducts}
      initialAddresses={addressResult.success ? addressResult.data : []}
    />
  );
}
