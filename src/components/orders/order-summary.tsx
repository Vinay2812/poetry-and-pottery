"use client";

import { CreditCard, Hand, Lock, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  buttonText?: string;
  onCheckout?: () => void;
  disabled?: boolean;
  itemCount?: number;
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  buttonText = "Proceed to Checkout",
  onCheckout,
  disabled = false,
  itemCount = 0,
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    // TODO: Implement coupon logic
    console.log("Apply coupon:", couponCode);
  };

  return (
    <>
      {/* Desktop Version - Elevated Card */}
      <div className="hidden lg:block">
        <div className="shadow-card sticky top-24 rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Order Summary
          </h2>

          <div className="mb-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">
                Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Shipping</span>
              <span className="text-primary font-medium">
                ₹{shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Estimated Tax</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Code Input */}
          <div className="mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="h-10 flex-1 rounded-lg border-neutral-200 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyCoupon}
                className="h-10 rounded-lg px-4"
                disabled={!couponCode.trim()}
              >
                Apply
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6 flex justify-between">
            <span className="text-base font-semibold text-neutral-900">
              Total
            </span>
            <span className="text-xl font-bold text-neutral-900">
              ₹{total.toFixed(2)}
            </span>
          </div>

          <Button
            className="h-12 w-full rounded-lg text-base font-medium"
            size="lg"
            onClick={onCheckout}
            disabled={disabled}
          >
            {buttonText}
          </Button>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center gap-5 border-t border-neutral-100 pt-5">
            <div className="flex flex-col items-center gap-1.5">
              <div className="bg-primary-lighter flex h-8 w-8 items-center justify-center rounded-full">
                <Lock className="text-primary h-4 w-4" />
              </div>
              <span className="text-xs text-neutral-500">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
                <CreditCard className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-xs text-neutral-500">No COD</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
                <RefreshCw className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-xs text-neutral-500">No Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="bg-primary-lighter flex h-8 w-8 items-center justify-center rounded-full">
                <Hand className="text-primary h-4 w-4" />
              </div>
              <span className="text-xs text-neutral-500">Handmade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Sticky Bottom Bar */}
      <div className="fixed right-0 bottom-16 left-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-md lg:hidden">
        <div className="p-4">
          {/* Summary Details */}
          <div className="mb-3 rounded-xl bg-neutral-50 p-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping</span>
                <span className="text-primary font-medium">
                  ₹{shipping.toFixed(2)}
                </span>
              </div>
              <Separator className="my-1.5" />
              <div className="flex justify-between font-semibold">
                <span className="text-neutral-900">Total</span>
                <span className="text-base text-neutral-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            className="h-12 w-full rounded-lg text-base font-medium"
            size="lg"
            onClick={onCheckout}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  );
}
