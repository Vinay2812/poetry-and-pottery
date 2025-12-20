import type { ReactNode } from "react";

interface EventDetailInfoGridProps {
  children: ReactNode;
}

export function EventDetailInfoGrid({ children }: EventDetailInfoGridProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-6 border-b border-neutral-100 pb-6 sm:grid-cols-4 dark:border-neutral-800">
      {children}
    </div>
  );
}

export function EventDetailInfoGridBordered({
  children,
}: EventDetailInfoGridProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-neutral-100 py-6 sm:grid-cols-4 dark:border-neutral-800">
      {children}
    </div>
  );
}
