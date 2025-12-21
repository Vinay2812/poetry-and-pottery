"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WhatsAppContactButtonProps {
  onClick: () => void;
  className?: string;
}

export function WhatsAppContactButton({
  onClick,
  className,
}: WhatsAppContactButtonProps) {
  return (
    <Button
      variant="outline"
      className={`border-primary/30 text-primary hover:bg-primary/10 hover:text-primary h-12 w-full rounded-xl ${className || ""}`}
      onClick={onClick}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Contact via WhatsApp
    </Button>
  );
}
