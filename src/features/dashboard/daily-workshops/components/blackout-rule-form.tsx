import { CalendarClockIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import { DailyWorkshopBlackoutType } from "@/graphql/generated/types";

import type { BlackoutRuleFormProps } from "../types";

export function BlackoutRuleForm({
  blackoutDraft,
  blackoutFormErrors,
  editingBlackoutId,
  isPending,
  onBlackoutDraftChange,
  onSaveBlackout,
  onCancelBlackoutEdit,
}: BlackoutRuleFormProps) {
  return (
    <section className="space-y-4 rounded-2xl border bg-white p-5">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">
          {editingBlackoutId ? "Edit Blackout Rule" : "Create Blackout Rule"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Block selected date/time windows from being booked.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="blackout-name">Rule Name *</Label>
        <Input
          id="blackout-name"
          required
          value={blackoutDraft.name}
          onChange={(event) =>
            onBlackoutDraftChange("name", event.currentTarget.value)
          }
          placeholder="Holiday Closure"
          className={cn(blackoutFormErrors.name && "border-red-500")}
        />
        {blackoutFormErrors.name && (
          <p className="text-xs text-red-600">{blackoutFormErrors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="blackout-type">Type</Label>
        <Select
          value={blackoutDraft.type}
          onValueChange={(value) =>
            onBlackoutDraftChange("type", value as DailyWorkshopBlackoutType)
          }
        >
          <SelectTrigger id="blackout-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DailyWorkshopBlackoutType.OneTime}>
              One-Time
            </SelectItem>
            <SelectItem value={DailyWorkshopBlackoutType.Daily}>
              Daily
            </SelectItem>
            <SelectItem value={DailyWorkshopBlackoutType.Weekly}>
              Weekly
            </SelectItem>
            <SelectItem value={DailyWorkshopBlackoutType.Monthly}>
              Monthly
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="blackout-reason">Reason</Label>
        <Textarea
          id="blackout-reason"
          rows={2}
          value={blackoutDraft.reason}
          onChange={(event) =>
            onBlackoutDraftChange("reason", event.currentTarget.value)
          }
          placeholder="Studio maintenance"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="blackout-start">Start Time *</Label>
          <Input
            id="blackout-start"
            type="time"
            required
            value={blackoutDraft.startTime}
            onChange={(event) =>
              onBlackoutDraftChange("startTime", event.currentTarget.value)
            }
            className={cn(blackoutFormErrors.startTime && "border-red-500")}
          />
          {blackoutFormErrors.startTime && (
            <p className="text-xs text-red-600">
              {blackoutFormErrors.startTime}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="blackout-end">End Time *</Label>
          <Input
            id="blackout-end"
            type="time"
            required
            value={blackoutDraft.endTime}
            onChange={(event) =>
              onBlackoutDraftChange("endTime", event.currentTarget.value)
            }
            className={cn(blackoutFormErrors.endTime && "border-red-500")}
          />
          {blackoutFormErrors.endTime && (
            <p className="text-xs text-red-600">{blackoutFormErrors.endTime}</p>
          )}
        </div>
      </div>

      {blackoutDraft.type === DailyWorkshopBlackoutType.OneTime ? (
        <div className="space-y-2">
          <Label htmlFor="blackout-one-time-date">Date *</Label>
          <Input
            id="blackout-one-time-date"
            type="date"
            required
            value={blackoutDraft.oneTimeDate}
            onChange={(event) =>
              onBlackoutDraftChange("oneTimeDate", event.currentTarget.value)
            }
            className={cn(blackoutFormErrors.oneTimeDate && "border-red-500")}
          />
          {blackoutFormErrors.oneTimeDate && (
            <p className="text-xs text-red-600">
              {blackoutFormErrors.oneTimeDate}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blackout-recurrence-start">Start Date *</Label>
              <Input
                id="blackout-recurrence-start"
                type="date"
                required
                value={blackoutDraft.recurrenceStartDate}
                onChange={(event) =>
                  onBlackoutDraftChange(
                    "recurrenceStartDate",
                    event.currentTarget.value,
                  )
                }
                className={cn(
                  blackoutFormErrors.recurrenceStartDate && "border-red-500",
                )}
              />
              {blackoutFormErrors.recurrenceStartDate && (
                <p className="text-xs text-red-600">
                  {blackoutFormErrors.recurrenceStartDate}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="blackout-recurrence-end">End Date</Label>
              <Input
                id="blackout-recurrence-end"
                type="date"
                value={blackoutDraft.recurrenceEndDate}
                onChange={(event) =>
                  onBlackoutDraftChange(
                    "recurrenceEndDate",
                    event.currentTarget.value,
                  )
                }
                className={cn(
                  blackoutFormErrors.recurrenceEndDate && "border-red-500",
                )}
              />
              {blackoutFormErrors.recurrenceEndDate && (
                <p className="text-xs text-red-600">
                  {blackoutFormErrors.recurrenceEndDate}
                </p>
              )}
            </div>
          </div>

          {blackoutDraft.type === DailyWorkshopBlackoutType.Weekly && (
            <div className="space-y-2">
              <Label htmlFor="blackout-weekdays">Weekdays (0-6 CSV) *</Label>
              <Input
                id="blackout-weekdays"
                required
                value={blackoutDraft.weekdaysCsv}
                onChange={(event) =>
                  onBlackoutDraftChange(
                    "weekdaysCsv",
                    event.currentTarget.value,
                  )
                }
                placeholder="1,3,5"
                className={cn(
                  blackoutFormErrors.weekdaysCsv && "border-red-500",
                )}
              />
              {blackoutFormErrors.weekdaysCsv && (
                <p className="text-xs text-red-600">
                  {blackoutFormErrors.weekdaysCsv}
                </p>
              )}
            </div>
          )}

          {blackoutDraft.type === DailyWorkshopBlackoutType.Monthly && (
            <div className="space-y-2">
              <Label htmlFor="blackout-month-days">
                Month Days (1-31 CSV) *
              </Label>
              <Input
                id="blackout-month-days"
                required
                value={blackoutDraft.monthDaysCsv}
                onChange={(event) =>
                  onBlackoutDraftChange(
                    "monthDaysCsv",
                    event.currentTarget.value,
                  )
                }
                placeholder="1,15,30"
                className={cn(
                  blackoutFormErrors.monthDaysCsv && "border-red-500",
                )}
              />
              {blackoutFormErrors.monthDaysCsv && (
                <p className="text-xs text-red-600">
                  {blackoutFormErrors.monthDaysCsv}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="blackout-timezone">Timezone *</Label>
        <Input
          id="blackout-timezone"
          required
          value={blackoutDraft.timezone}
          onChange={(event) =>
            onBlackoutDraftChange("timezone", event.currentTarget.value)
          }
          placeholder="Asia/Kolkata"
          className={cn(blackoutFormErrors.timezone && "border-red-500")}
        />
        {blackoutFormErrors.timezone && (
          <p className="text-xs text-red-600">{blackoutFormErrors.timezone}</p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-xl border px-3 py-2.5">
          <p className="text-sm text-neutral-700">Rule Active</p>
          <Switch
            checked={blackoutDraft.is_active}
            onCheckedChange={(value) =>
              onBlackoutDraftChange("is_active", value)
            }
          />
        </div>
        <div className="flex items-center justify-between rounded-xl border px-3 py-2.5">
          <p className="text-sm text-neutral-700">Auto Cancel Existing</p>
          <Switch
            checked={blackoutDraft.auto_cancel_existing}
            onCheckedChange={(value) =>
              onBlackoutDraftChange("auto_cancel_existing", value)
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSaveBlackout} disabled={isPending}>
          {editingBlackoutId ? (
            <PencilIcon className="mr-2 h-4 w-4" />
          ) : (
            <CalendarClockIcon className="mr-2 h-4 w-4" />
          )}
          {editingBlackoutId ? "Update Rule" : "Create Rule"}
        </Button>
        {editingBlackoutId && (
          <Button
            variant="outline"
            onClick={onCancelBlackoutEdit}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
      </div>
    </section>
  );
}
