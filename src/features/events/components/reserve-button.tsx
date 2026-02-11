"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ReserveButtonProps {
  isLoading: boolean;
  registered: boolean;
  soldOut: boolean;
  isOpenMic: boolean;
  price?: number;
  showPrice?: boolean;
  onClick: () => void;
}

export function ReserveButton({
  isLoading,
  registered,
  soldOut,
  isOpenMic,
  price,
  showPrice = false,
  onClick,
}: ReserveButtonProps) {
  const label = soldOut
    ? "Sold Out"
    : registered
      ? "Registered!"
      : isOpenMic
        ? "Reserve Spot"
        : "Reserve Seat";

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Button
        className={cn(
          "h-12 w-full rounded-xl text-sm font-bold transition-all",
          registered && "bg-green-600 hover:bg-green-700",
        )}
        size="lg"
        disabled={soldOut || isLoading || registered}
        onClick={onClick}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Reserving seat...
          </>
        ) : registered ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mr-2"
          >
            <CheckCircle className="h-5 w-5" />
          </motion.div>
        ) : null}
        {label}
        {!isLoading && !registered && !soldOut && (
          <>
            {showPrice && price != null && (
              <span className="ml-1 text-sm font-normal opacity-90">
                · ₹{price.toLocaleString()}
              </span>
            )}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.div>
  );
}
