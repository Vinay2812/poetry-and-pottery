import { ReserveButton } from "./reserve-button";

interface EventReserveSidebarProps {
  price: number;
  availableSeats: number | null;
  soldOut: boolean;
  isLoading: boolean;
  registered: boolean;
  isOpenMic: boolean;
  onReserveSeat: () => void;
}

export function EventReserveSidebar({
  price,
  availableSeats,
  soldOut,
  isLoading,
  registered,
  isOpenMic,
  onReserveSeat,
}: EventReserveSidebarProps) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        <div className="text-primary mb-1 text-2xl font-extrabold">
          ₹{price.toLocaleString()}
        </div>
        <p className="mb-5 text-xs text-neutral-500">per seat</p>

        <ReserveButton
          isLoading={isLoading}
          registered={registered}
          soldOut={soldOut}
          isOpenMic={isOpenMic}
          onClick={onReserveSeat}
        />

        {availableSeats != null && !soldOut && !registered && (
          <p className="mt-3 text-center text-xs font-semibold text-emerald-600">
            ✓ {availableSeats} seats available
          </p>
        )}
      </div>
    </div>
  );
}
