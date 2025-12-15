"use client";

import { ArrowRight, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { QuantitySelector } from "@/components/quantity-selector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { PRODUCTS } from "@/lib/constants";

// Mock cart items
const INITIAL_CART = [
  { product: PRODUCTS[0], quantity: 1 },
  { product: PRODUCTS[2], quantity: 2 },
  { product: PRODUCTS[3], quantity: 1 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) =>
      items.filter((item) => item.product.id !== productId),
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 75 ? 0 : 12;
  const tax = 0; // Could calculate based on location
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
                    <div
                      key={item.product.id}
                      className="shadow-soft rounded-2xl bg-white p-4"
                    >
                      <div className="flex gap-4">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl"
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link href={`/products/${item.product.id}`}>
                                <h3 className="hover:text-primary font-semibold">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <p className="text-muted-foreground text-sm">
                                {item.product.vendor}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="font-semibold">
                              ₹{item.product.price.toFixed(2)}
                            </span>
                            <QuantitySelector
                              quantity={item.quantity}
                              onIncrease={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              onDecrease={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <ShoppingBag className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h2 className="mb-2 text-lg font-semibold">
                    Your cart is empty
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Add some beautiful pottery to your cart
                  </p>
                  <Link href="/products">
                    <Button className="rounded-full">Start Shopping</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary - Desktop */}
            {cartItems.length > 0 && (
              <div className="hidden lg:block">
                <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
                  <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

                  <div className="mb-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-6 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-primary text-xl font-bold">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  <Button className="h-12 w-full rounded-xl" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {subtotal < 75 && (
                    <p className="text-muted-foreground mt-4 text-center text-xs">
                      Add ₹{(75 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom Summary */}
      {cartItems.length > 0 && (
        <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 backdrop-blur-md lg:hidden">
          <div className="p-4">
            <div className="bg-muted/50 mb-3 rounded-xl p-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary text-base">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Button className="h-12 w-full rounded-xl" size="lg">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {subtotal < 75 && (
              <p className="text-muted-foreground mt-2 text-center text-xs">
                Add ₹{(75 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      )}

      <MobileNav />
    </div>
  );
}
