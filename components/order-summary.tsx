import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold?: number;
  buttonText?: string;
  onCheckout?: () => void;
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  freeShippingThreshold = 75,
  buttonText = "Proceed to Checkout",
  onCheckout,
}: OrderSummaryProps) {
  const amountToFreeShipping = freeShippingThreshold - subtotal;
  const showFreeShippingMessage = amountToFreeShipping > 0;

  return (
    <>
      {/* Desktop Version */}
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

          <Button
            className="h-12 w-full rounded-xl"
            size="lg"
            onClick={onCheckout}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {showFreeShippingMessage && (
            <p className="text-muted-foreground mt-4 text-center text-xs">
              Add ₹{amountToFreeShipping.toFixed(2)} more for free shipping!
            </p>
          )}
        </div>
      </div>

      {/* Mobile Version */}
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
          <Button
            className="h-12 w-full rounded-xl"
            size="lg"
            onClick={onCheckout}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {showFreeShippingMessage && (
            <p className="text-muted-foreground mt-2 text-center text-xs">
              Add ₹{amountToFreeShipping.toFixed(2)} more for free shipping
            </p>
          )}
        </div>
      </div>
    </>
  );
}
