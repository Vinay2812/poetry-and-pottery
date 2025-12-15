"use client";

import { ShoppingBag } from "lucide-react";
import { useCallback, useState } from "react";

import { CartItemCard } from "@/components/cards";
import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { OrderSummary } from "@/components/order-summary";
import { EmptyState } from "@/components/sections";

import { PRODUCTS } from "@/lib/constants";

const INITIAL_CART = [
  { product: PRODUCTS[0], quantity: 1 },
  { product: PRODUCTS[2], quantity: 2 },
  { product: PRODUCTS[3], quantity: 1 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCartItems((items) =>
        items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setCartItems((items) =>
      items.filter((item) => item.product.id !== productId),
    );
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 75 ? 0 : 12;
  const tax = 0;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="My Cart" showBack backHref="/products" />

      <main className="pt-14 pb-64 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                      onQuantityChange={(quantity) =>
                        updateQuantity(item.product.id, quantity)
                      }
                      onRemove={() => removeItem(item.product.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your cart is empty"
                  description="Add some beautiful pottery to your cart"
                  actionText="Start Shopping"
                  actionHref="/products"
                />
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                freeShippingThreshold={75}
                buttonText="Proceed to Checkout"
              />
            )}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
