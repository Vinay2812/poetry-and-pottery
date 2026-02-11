"use client";

import { ReserveButton } from "./reserve-button";

interface EventMobileCTAProps {
  price: number;
  soldOut: boolean;
  isLoading: boolean;
  registered: boolean;
  isOpenMic: boolean;
  onReserveSeat: () => void;
}

export function EventMobileCTA({
  price,
  soldOut,
  isLoading,
  registered,
  isOpenMic,
  onReserveSeat,
}: EventMobileCTAProps) {
  return (
    <div className="fixed right-0 bottom-16 left-0 z-40 bg-white/95 p-4 backdrop-blur-md lg:hidden">
      <ReserveButton
        isLoading={isLoading}
        registered={registered}
        soldOut={soldOut}
        isOpenMic={isOpenMic}
        price={price}
        showPrice
        onClick={onReserveSeat}
      />
    </div>
  );
}
