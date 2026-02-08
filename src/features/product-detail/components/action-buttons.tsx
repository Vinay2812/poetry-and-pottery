import { motion } from "framer-motion";
import {
  Check,
  Heart,
  Loader2,
  MessageCircle,
  ShoppingCartIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { ProductAvailabilityStatus } from "../types";

interface ActionButtonsProps {
  availabilityStatus: ProductAvailabilityStatus;
  atMaxQuantity: boolean;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onRequestProduct: () => void;
  className?: string;
}

export function ActionButtons({
  availabilityStatus,
  atMaxQuantity,
  addedToCart,
  inWishlist,
  cartLoading,
  wishlistLoading,
  onAddToCart,
  onToggleWishlist,
  onRequestProduct,
  className,
}: ActionButtonsProps) {
  const { isOutOfStock, isUnavailable } = availabilityStatus;
  const isDisabled = isUnavailable || atMaxQuantity;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
        {isUnavailable ? (
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 h-12 w-full rounded-xl transition-all"
            size="lg"
            onClick={onRequestProduct}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Request This Item
          </Button>
        ) : (
          <Button
            className={cn(
              "h-12 w-full rounded-xl transition-all",
              addedToCart && "bg-green-600 hover:bg-green-700",
            )}
            size="lg"
            disabled={isDisabled || cartLoading}
            onClick={onAddToCart}
          >
            {cartLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding to cart...
              </>
            ) : addedToCart ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mr-2"
              >
                <Check className="h-5 w-5" />
              </motion.div>
            ) : (
              <ShoppingCartIcon className="mr-2 h-5 w-5" />
            )}
            {isOutOfStock
              ? "Out of Stock"
              : atMaxQuantity
                ? "Max in Cart"
                : addedToCart
                  ? "Added!"
                  : "Add to Cart"}
          </Button>
        )}
      </motion.div>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 shrink-0 rounded-xl transition-colors",
            inWishlist && "border-red-200 bg-red-50 hover:bg-red-100",
          )}
          onClick={onToggleWishlist}
          disabled={wishlistLoading}
        >
          {wishlistLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Adding to wishlist...
            </>
          ) : (
            <motion.div
              key={inWishlist ? "filled" : "empty"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  inWishlist && "fill-red-500 text-red-500",
                )}
              />
            </motion.div>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
