import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import type { DailyWorkshopConfigFormProps } from "../types";

export function DailyWorkshopConfigForm({
  configForm,
  configFormErrors,
  openingHourLabel,
  closingHourLabel,
  isPending,
  onConfigFormChange,
  onSaveConfig,
}: DailyWorkshopConfigFormProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="space-y-4 rounded-2xl border bg-white p-5">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">
            Basic Settings
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Control workshop identity, schedule, capacity, and booking window.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dw-name">Workshop Name *</Label>
          <Input
            id="dw-name"
            required
            value={configForm.name ?? ""}
            onChange={(event) =>
              onConfigFormChange("name", event.currentTarget.value)
            }
            placeholder="Daily Workshop"
            className={cn(configFormErrors.name && "border-red-500")}
          />
          {configFormErrors.name && (
            <p className="text-xs text-red-600">{configFormErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dw-description">Description</Label>
          <Textarea
            id="dw-description"
            value={configForm.description ?? ""}
            onChange={(event) =>
              onConfigFormChange("description", event.currentTarget.value)
            }
            placeholder="Flexible pottery workshop bookings"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dw-timezone">Timezone *</Label>
          <Input
            id="dw-timezone"
            required
            value={configForm.timezone ?? ""}
            onChange={(event) =>
              onConfigFormChange("timezone", event.currentTarget.value)
            }
            placeholder="Asia/Kolkata"
            className={cn(configFormErrors.timezone && "border-red-500")}
          />
          {configFormErrors.timezone && (
            <p className="text-xs text-red-600">{configFormErrors.timezone}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dw-opening-hour">Opening Hour (0-23) *</Label>
            <Input
              id="dw-opening-hour"
              type="number"
              required
              min={0}
              max={23}
              value={configForm.opening_hour ?? 13}
              onChange={(event) =>
                onConfigFormChange(
                  "opening_hour",
                  Number(event.currentTarget.value),
                )
              }
              className={cn(configFormErrors.opening_hour && "border-red-500")}
            />
            {configFormErrors.opening_hour && (
              <p className="text-xs text-red-600">
                {configFormErrors.opening_hour}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dw-closing-hour">Closing Hour (0-23) *</Label>
            <Input
              id="dw-closing-hour"
              type="number"
              required
              min={1}
              max={24}
              value={configForm.closing_hour ?? 19}
              onChange={(event) =>
                onConfigFormChange(
                  "closing_hour",
                  Number(event.currentTarget.value),
                )
              }
              className={cn(configFormErrors.closing_hour && "border-red-500")}
            />
            {configFormErrors.closing_hour && (
              <p className="text-xs text-red-600">
                {configFormErrors.closing_hour}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dw-slot-duration">Slot Duration (minutes) *</Label>
            <Input
              id="dw-slot-duration"
              type="number"
              required
              min={15}
              step={15}
              value={configForm.slot_duration_minutes ?? 60}
              onChange={(event) =>
                onConfigFormChange(
                  "slot_duration_minutes",
                  Number(event.currentTarget.value),
                )
              }
              className={cn(
                configFormErrors.slot_duration_minutes && "border-red-500",
              )}
            />
            {configFormErrors.slot_duration_minutes && (
              <p className="text-xs text-red-600">
                {configFormErrors.slot_duration_minutes}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dw-capacity">Slot Capacity *</Label>
            <Input
              id="dw-capacity"
              type="number"
              required
              min={1}
              value={configForm.slot_capacity ?? 1}
              onChange={(event) =>
                onConfigFormChange(
                  "slot_capacity",
                  Number(event.currentTarget.value),
                )
              }
              className={cn(configFormErrors.slot_capacity && "border-red-500")}
            />
            {configFormErrors.slot_capacity && (
              <p className="text-xs text-red-600">
                {configFormErrors.slot_capacity}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dw-booking-window">Booking Window (days) *</Label>
          <Input
            id="dw-booking-window"
            type="number"
            required
            min={1}
            value={configForm.booking_window_days ?? 1}
            onChange={(event) =>
              onConfigFormChange(
                "booking_window_days",
                Number(event.currentTarget.value),
              )
            }
            className={cn(
              configFormErrors.booking_window_days && "border-red-500",
            )}
          />
          {configFormErrors.booking_window_days && (
            <p className="text-xs text-red-600">
              {configFormErrors.booking_window_days}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border bg-white p-5">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">Behavior</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Configure booking availability and blackout cancellation policy.
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 rounded-xl border p-3">
          <div>
            <p className="text-sm font-medium text-neutral-900">
              Workshop Active
            </p>
            <p className="text-xs text-neutral-500">
              If disabled, users cannot create new bookings.
            </p>
          </div>
          <Switch
            checked={Boolean(configForm.is_active)}
            onCheckedChange={(value) => onConfigFormChange("is_active", value)}
          />
        </div>

        <div className="flex items-start justify-between gap-4 rounded-xl border p-3">
          <div>
            <p className="text-sm font-medium text-neutral-900">
              Auto Cancel on Blackout
            </p>
            <p className="text-xs text-neutral-500">
              Cancel conflicting registrations when new blackout rules are
              added.
            </p>
          </div>
          <Switch
            checked={Boolean(configForm.auto_cancel_on_blackout)}
            onCheckedChange={(value) =>
              onConfigFormChange("auto_cancel_on_blackout", value)
            }
          />
        </div>

        <div className="border-primary/20 bg-primary/5 rounded-xl border p-3 text-xs text-neutral-600">
          Working hours currently set to
          <span className="font-semibold text-neutral-900">
            {" "}
            {openingHourLabel} - {closingHourLabel}
          </span>
          .
        </div>

        <Button
          onClick={onSaveConfig}
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Config
        </Button>
      </section>
    </div>
  );
}
