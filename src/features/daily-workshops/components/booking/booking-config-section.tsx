import { CalendarDays, Clock3, Users } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { DailyWorkshopsBookingViewModel } from "../../types";
import { formatHourLabel } from "./booking-time";

interface BookingConfigSectionProps {
  viewModel: DailyWorkshopsBookingViewModel;
  onSelectConfig: (configId: number) => void;
}

export function BookingConfigSection({
  viewModel,
  onSelectConfig,
}: BookingConfigSectionProps) {
  return (
    <section className="border-primary/20 from-primary-lighter/70 mb-6 rounded-3xl border bg-gradient-to-br via-white to-white p-5 shadow-sm lg:mb-8 lg:p-6">
      <div className="max-w-xl">
        <p className="mb-1 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Select workshop type
        </p>
        <Select
          value={String(viewModel.selectedConfigId)}
          onValueChange={(value) => onSelectConfig(Number(value))}
          disabled={viewModel.isConfigLoading}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border-neutral-200 bg-white text-sm">
            <SelectValue placeholder="Select workshop type" />
          </SelectTrigger>
          <SelectContent>
            {viewModel.availableConfigs.map((config) => (
              <SelectItem key={config.id} value={String(config.id)}>
                {config.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {viewModel.config.description && (
          <p className="mt-2 text-sm text-neutral-600">
            {viewModel.config.description}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
          <Clock3 className="text-primary h-3.5 w-3.5" />
          {formatHourLabel(viewModel.config.opening_hour)} -{" "}
          {formatHourLabel(viewModel.config.closing_hour)}
        </span>
        <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
          <Users className="text-primary h-3.5 w-3.5" />
          Up to {viewModel.config.slot_capacity} people per slot
        </span>
        <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
          <CalendarDays className="text-primary h-3.5 w-3.5" />
          Book up to {viewModel.config.booking_window_days} days ahead
        </span>
      </div>
      {viewModel.configError && (
        <p className="mt-3 text-xs font-medium text-red-600">
          {viewModel.configError}
        </p>
      )}
    </section>
  );
}
