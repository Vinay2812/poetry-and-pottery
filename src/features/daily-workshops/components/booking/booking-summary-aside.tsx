import { Clock3, Package, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { DailyWorkshopsBookingViewModel } from "../../types";

interface BookingSummaryAsideProps {
  viewModel: DailyWorkshopsBookingViewModel;
  onParticipantsChange: (delta: -1 | 1) => void;
  onBook: () => void;
  isBooking: boolean;
}

export function BookingSummaryAside({
  viewModel,
  onParticipantsChange,
  onBook,
  isBooking,
}: BookingSummaryAsideProps) {
  return (
    <aside className="h-fit rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm xl:sticky xl:top-24">
      <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
        Booking Summary
      </h2>

      <div className="space-y-3 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <span>Selected slots</span>
          <span className="font-semibold">{viewModel.selectedSlotsCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total hours</span>
          <span className="font-semibold">{viewModel.totalHours}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Participants</span>
          <span className="font-semibold">{viewModel.participants}</span>
        </div>
      </div>

      <div className="my-5 rounded-xl bg-neutral-50 p-3">
        <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Applied Tier
        </p>
        <p className="mt-1 text-sm font-semibold text-neutral-900">
          {viewModel.selectedTierLabel}
        </p>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <Clock3 className="h-4 w-4 text-neutral-500" />
          <span>
            ₹{viewModel.pricePerPerson.toLocaleString("en-IN")} per person
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <Package className="h-4 w-4 text-neutral-500" />
          <span>
            {viewModel.piecesPerPerson} pieces per person (selected sessions)
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <Users className="h-4 w-4 text-neutral-500" />
          <span>{viewModel.totalPieces} total pieces</span>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-neutral-600">Total</span>
          <span className="text-primary text-2xl font-bold">
            ₹{viewModel.totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-full p-0"
            onClick={() => onParticipantsChange(-1)}
            disabled={viewModel.participants <= 1 || viewModel.isConfigLoading}
          >
            -
          </Button>
          <span className="inline-flex h-10 min-w-12 items-center justify-center rounded-full border border-neutral-200 px-3 text-sm font-semibold text-neutral-800">
            {viewModel.participants}
          </span>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-full p-0"
            onClick={() => onParticipantsChange(1)}
            disabled={viewModel.isConfigLoading}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          className="mt-4 w-full rounded-full"
          onClick={onBook}
          disabled={
            viewModel.selectedSlotsCount === 0 ||
            isBooking ||
            viewModel.isConfigLoading
          }
        >
          {isBooking ? "Booking..." : "Book Workshop →"}
        </Button>
        {viewModel.bookingError && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {viewModel.bookingError}
          </p>
        )}
      </div>
    </aside>
  );
}
