import type { ReactNode } from "react";

interface EventCardContentProps {
  children: ReactNode;
}

export function EventCardContent({ children }: EventCardContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 p-5 pt-3 lg:gap-3 lg:pt-4">
      {children}
    </div>
  );
}
