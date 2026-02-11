"use client";

import { Heart, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CartItemActionsProps {
  onRemove: () => void;
  onMoveToWishlist?: () => void;
  isLoading: boolean;
}

export function CartItemActions({
  onRemove,
  onMoveToWishlist,
  isLoading,
}: CartItemActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {onMoveToWishlist && (
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 hover:text-primary h-8 w-8 rounded-full text-neutral-400"
          onClick={onMoveToWishlist}
          disabled={isLoading}
          title="Save to Wishlist"
        >
          <Heart className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
        onClick={onRemove}
        disabled={isLoading}
        title="Remove"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
