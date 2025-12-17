import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface MobileFixedCTAProps {
  buttonText: string;
  price?: number;
  onAction?: () => void;
  children?: ReactNode;
}

export function MobileFixedCTA({
  buttonText,
  price,
  onAction,
  children,
}: MobileFixedCTAProps) {
  return (
    <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
      {children || (
        <Button className="h-12 w-full rounded-xl" size="lg" onClick={onAction}>
          {buttonText}
          {price !== undefined && (
            <span className="ml-2 font-semibold">₹{price.toFixed(2)}</span>
          )}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
