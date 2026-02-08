"use client";

import { EventsListLayout } from "@/components/events";

import type { DailyWorkshopsBookingProps } from "../types";
import { BookingCalendarSection } from "./booking/booking-calendar-section";
import { BookingConfigSection } from "./booking/booking-config-section";
import { BookingPricingGuideSection } from "./booking/booking-pricing-guide-section";
import { BookingSlotsSection } from "./booking/booking-slots-section";
import { BookingSummaryAside } from "./booking/booking-summary-aside";

export function DailyWorkshopsBooking({
  viewModel,
  onSelectConfig,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
  onToggleSlot,
  onParticipantsChange,
  onBook,
  isBooking,
  isSlotSelectionPending,
}: DailyWorkshopsBookingProps) {
  return (
    <EventsListLayout>
      <div>
        <BookingConfigSection
          viewModel={viewModel}
          onSelectConfig={onSelectConfig}
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <BookingCalendarSection
              viewModel={viewModel}
              onPreviousMonth={onPreviousMonth}
              onNextMonth={onNextMonth}
              onSelectDate={onSelectDate}
            />
            <BookingSlotsSection
              viewModel={viewModel}
              onSelectDate={onSelectDate}
              onToggleSlot={onToggleSlot}
              isSlotSelectionPending={isSlotSelectionPending}
            />
            <BookingPricingGuideSection viewModel={viewModel} />
          </div>

          <BookingSummaryAside
            viewModel={viewModel}
            onParticipantsChange={onParticipantsChange}
            onBook={onBook}
            isBooking={isBooking}
          />
        </div>
      </div>
    </EventsListLayout>
  );
}
