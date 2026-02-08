"use client";

import {
  CalendarClockIcon,
  Clock3Icon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import { DailyWorkshopBlackoutType } from "@/graphql/generated/types";

import type { DailyWorkshopsDashboardProps } from "../types";

function formatBlackoutType(type: DailyWorkshopBlackoutType): string {
  switch (type) {
    case DailyWorkshopBlackoutType.OneTime:
      return "One-Time";
    case DailyWorkshopBlackoutType.Weekly:
      return "Weekly";
    case DailyWorkshopBlackoutType.Monthly:
      return "Monthly";
    case DailyWorkshopBlackoutType.Daily:
    default:
      return "Daily";
  }
}

export function DailyWorkshopsDashboard({
  configs,
  selectedConfigId,
  viewModel,
  isPending,
  configForm,
  configFormErrors,
  tierDraft,
  blackoutDraft,
  blackoutFormErrors,
  editingTierId,
  editingBlackoutId,
  onSelectConfig,
  onCreateConfig,
  onDeleteConfig,
  onTabChange,
  onConfigFormChange,
  onSaveConfig,
  onTierDraftChange,
  onSaveTier,
  onEditTier,
  onCancelTierEdit,
  onDeleteTier,
  onBlackoutDraftChange,
  onSaveBlackout,
  onEditBlackout,
  onCancelBlackoutEdit,
  onDeleteBlackout,
}: DailyWorkshopsDashboardProps) {
  const hasSelectedConfig = Boolean(viewModel && selectedConfigId);

  if (!hasSelectedConfig || !viewModel) {
    return (
      <div className="space-y-6">
        <section className="rounded-2xl border bg-white p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="dw-config-picker">Workshop Config</Label>
              <Select
                value={selectedConfigId ? String(selectedConfigId) : undefined}
                onValueChange={(value) => onSelectConfig(Number(value))}
                disabled={configs.length === 0 || isPending}
              >
                <SelectTrigger id="dw-config-picker">
                  <SelectValue placeholder="No configs available" />
                </SelectTrigger>
                <SelectContent>
                  {configs.map((config) => (
                    <SelectItem key={config.id} value={String(config.id)}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              onClick={onCreateConfig}
              disabled={isPending}
              className="w-full md:w-auto"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Config
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full text-red-600 md:w-auto"
              onClick={onDeleteConfig}
              disabled={!selectedConfigId || isPending}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete Config
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            No workshop config selected
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Create a config to manage pricing tiers and blackout rules.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div className="space-y-2">
            <Label htmlFor="dw-config-picker">Workshop Config</Label>
            <Select
              value={String(selectedConfigId)}
              onValueChange={(value) => onSelectConfig(Number(value))}
              disabled={configs.length === 0 || isPending}
            >
              <SelectTrigger id="dw-config-picker">
                <SelectValue placeholder="Select config" />
              </SelectTrigger>
              <SelectContent>
                {configs.map((config) => (
                  <SelectItem key={config.id} value={String(config.id)}>
                    {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            onClick={onCreateConfig}
            disabled={isPending}
            className="w-full md:w-auto"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Config
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full text-red-600 md:w-auto"
            onClick={onDeleteConfig}
            disabled={isPending}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete Config
          </Button>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            Pricing Tiers
          </p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">
            {viewModel.summary.tiersCount}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            {viewModel.summary.activeTiersCount} active
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            Blackout Rules
          </p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">
            {viewModel.summary.blackoutsCount}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            {viewModel.summary.activeBlackoutsCount} active
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            Operating Hours
          </p>
          <p className="mt-2 text-sm font-semibold text-neutral-900">
            {viewModel.config.openingHourLabel} -{" "}
            {viewModel.config.closingHourLabel}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            {viewModel.config.slotDurationLabel} slots
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            Booking Window
          </p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">
            {viewModel.config.bookingWindowDays}
          </p>
          <p className="mt-1 text-xs text-neutral-500">days ahead</p>
        </div>
      </div>

      <Tabs
        value={viewModel.activeTab}
        onValueChange={(value) =>
          onTabChange(value as typeof viewModel.activeTab)
        }
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="blackouts">Blackout Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4 pt-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="space-y-4 rounded-2xl border bg-white p-5">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">
                  Basic Settings
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Control workshop identity, schedule, capacity, and booking
                  window.
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
                  <p className="text-xs text-red-600">
                    {configFormErrors.name}
                  </p>
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
                  <p className="text-xs text-red-600">
                    {configFormErrors.timezone}
                  </p>
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
                    className={cn(
                      configFormErrors.opening_hour && "border-red-500",
                    )}
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
                    className={cn(
                      configFormErrors.closing_hour && "border-red-500",
                    )}
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
                  <Label htmlFor="dw-slot-duration">
                    Slot Duration (minutes) *
                  </Label>
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
                      configFormErrors.slot_duration_minutes &&
                        "border-red-500",
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
                    className={cn(
                      configFormErrors.slot_capacity && "border-red-500",
                    )}
                  />
                  {configFormErrors.slot_capacity && (
                    <p className="text-xs text-red-600">
                      {configFormErrors.slot_capacity}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dw-booking-window">
                  Booking Window (days) *
                </Label>
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
                <h2 className="text-base font-semibold text-neutral-900">
                  Behavior
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Configure booking availability and blackout cancellation
                  policy.
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
                  onCheckedChange={(value) =>
                    onConfigFormChange("is_active", value)
                  }
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
                  {viewModel.config.openingHourLabel} -{" "}
                  {viewModel.config.closingHourLabel}
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
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4 pt-5">
          <section className="space-y-4 rounded-2xl border bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">
                  {editingTierId ? "Edit Pricing Tier" : "Add Pricing Tier"}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Configure duration-based pricing and pieces per person.
                </p>
              </div>
              <Badge variant="outline">
                {viewModel.summary.tiersCount} tiers
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-1.5">
                <Label htmlFor="tier-hours">Hours</Label>
                <Input
                  id="tier-hours"
                  type="number"
                  min={1}
                  value={tierDraft.hours}
                  onChange={(event) =>
                    onTierDraftChange(
                      "hours",
                      Number(event.currentTarget.value),
                    )
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tier-price">Price / Person</Label>
                <Input
                  id="tier-price"
                  type="number"
                  min={0}
                  value={tierDraft.price_per_person}
                  onChange={(event) =>
                    onTierDraftChange(
                      "price_per_person",
                      Number(event.currentTarget.value),
                    )
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tier-pieces">Pieces / Person</Label>
                <Input
                  id="tier-pieces"
                  type="number"
                  min={0}
                  value={tierDraft.pieces_per_person}
                  onChange={(event) =>
                    onTierDraftChange(
                      "pieces_per_person",
                      Number(event.currentTarget.value),
                    )
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tier-order">Sort Order</Label>
                <Input
                  id="tier-order"
                  type="number"
                  min={0}
                  value={tierDraft.sort_order}
                  onChange={(event) =>
                    onTierDraftChange(
                      "sort_order",
                      Number(event.currentTarget.value),
                    )
                  }
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant={tierDraft.is_active ? "default" : "outline"}
                  className="w-full"
                  onClick={() =>
                    onTierDraftChange("is_active", !tierDraft.is_active)
                  }
                >
                  {tierDraft.is_active ? "Active" : "Inactive"}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={onSaveTier} disabled={isPending}>
                {editingTierId ? (
                  <PencilIcon className="mr-2 h-4 w-4" />
                ) : (
                  <PlusIcon className="mr-2 h-4 w-4" />
                )}
                {editingTierId ? "Update Tier" : "Add Tier"}
              </Button>
              {editingTierId && (
                <Button
                  variant="outline"
                  onClick={onCancelTierEdit}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              )}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5">
            {viewModel.pricingTiers.length === 0 ? (
              <p className="text-sm text-neutral-500">
                No pricing tiers configured yet.
              </p>
            ) : (
              <>
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="border-b text-left text-xs tracking-wide text-neutral-500 uppercase">
                        <th className="px-2 py-3">Hours</th>
                        <th className="px-2 py-3">Price / Person</th>
                        <th className="px-2 py-3">Pieces / Person</th>
                        <th className="px-2 py-3">Sort</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Updated</th>
                        <th className="px-2 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewModel.pricingTiers.map((tier) => (
                        <tr key={tier.id} className="border-b last:border-b-0">
                          <td className="px-2 py-3 font-medium text-neutral-900">
                            {tier.hours}h
                          </td>
                          <td className="px-2 py-3">
                            {tier.pricePerPersonLabel}
                          </td>
                          <td className="px-2 py-3">{tier.piecesPerPerson}</td>
                          <td className="px-2 py-3">{tier.sortOrder}</td>
                          <td className="px-2 py-3">
                            <Badge
                              className={cn(
                                "border",
                                tier.isActive
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-neutral-200 bg-neutral-100 text-neutral-600",
                              )}
                            >
                              {tier.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-2 py-3 text-xs text-neutral-500">
                            {tier.updatedAtLabel}
                          </td>
                          <td className="px-2 py-3">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEditTier(tier.id)}
                                disabled={isPending}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => onDeleteTier(tier.id)}
                                disabled={isPending}
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 lg:hidden">
                  {viewModel.pricingTiers.map((tier) => (
                    <div key={tier.id} className="rounded-xl border p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <p className="font-semibold text-neutral-900">
                          {tier.hours} Hour Session
                        </p>
                        <Badge
                          className={cn(
                            "border",
                            tier.isActive
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-neutral-200 bg-neutral-100 text-neutral-600",
                          )}
                        >
                          {tier.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
                        <p>Price: {tier.pricePerPersonLabel}</p>
                        <p>Pieces: {tier.piecesPerPerson}</p>
                        <p>Sort: {tier.sortOrder}</p>
                        <p className="text-xs">
                          Updated: {tier.updatedAtLabel}
                        </p>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditTier(tier.id)}
                          disabled={isPending}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => onDeleteTier(tier.id)}
                          disabled={isPending}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </TabsContent>

        <TabsContent value="blackouts" className="space-y-4 pt-5">
          <div className="grid gap-4 xl:grid-cols-[1.05fr_1.3fr]">
            <section className="space-y-4 rounded-2xl border bg-white p-5">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">
                  {editingBlackoutId
                    ? "Edit Blackout Rule"
                    : "Create Blackout Rule"}
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
                  <p className="text-xs text-red-600">
                    {blackoutFormErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="blackout-type">Type</Label>
                <Select
                  value={blackoutDraft.type}
                  onValueChange={(value) =>
                    onBlackoutDraftChange(
                      "type",
                      value as DailyWorkshopBlackoutType,
                    )
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
                      onBlackoutDraftChange(
                        "startTime",
                        event.currentTarget.value,
                      )
                    }
                    className={cn(
                      blackoutFormErrors.startTime && "border-red-500",
                    )}
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
                      onBlackoutDraftChange(
                        "endTime",
                        event.currentTarget.value,
                      )
                    }
                    className={cn(
                      blackoutFormErrors.endTime && "border-red-500",
                    )}
                  />
                  {blackoutFormErrors.endTime && (
                    <p className="text-xs text-red-600">
                      {blackoutFormErrors.endTime}
                    </p>
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
                      onBlackoutDraftChange(
                        "oneTimeDate",
                        event.currentTarget.value,
                      )
                    }
                    className={cn(
                      blackoutFormErrors.oneTimeDate && "border-red-500",
                    )}
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
                      <Label htmlFor="blackout-recurrence-start">
                        Start Date *
                      </Label>
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
                          blackoutFormErrors.recurrenceStartDate &&
                            "border-red-500",
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
                          blackoutFormErrors.recurrenceEndDate &&
                            "border-red-500",
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
                      <Label htmlFor="blackout-weekdays">
                        Weekdays (0-6 CSV) *
                      </Label>
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
                  className={cn(
                    blackoutFormErrors.timezone && "border-red-500",
                  )}
                />
                {blackoutFormErrors.timezone && (
                  <p className="text-xs text-red-600">
                    {blackoutFormErrors.timezone}
                  </p>
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
                  <p className="text-sm text-neutral-700">
                    Auto Cancel Existing
                  </p>
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

            <section className="rounded-2xl border bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-neutral-900">
                  Current Blackout Rules
                </h2>
                <Badge variant="outline">
                  {viewModel.summary.blackoutsCount}
                </Badge>
              </div>

              {viewModel.blackoutRules.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  No blackout rules added yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {viewModel.blackoutRules.map((rule) => (
                    <article key={rule.id} className="rounded-xl border p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-neutral-900">
                            {rule.name}
                          </p>
                          <Badge variant="outline">
                            {formatBlackoutType(rule.type)}
                          </Badge>
                        </div>
                        <Badge
                          className={cn(
                            "border",
                            rule.isActive
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-neutral-200 bg-neutral-100 text-neutral-600",
                          )}
                        >
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs text-neutral-600">
                        <p>Schedule: {rule.scheduleLabel}</p>
                        <p>Time: {rule.rangeLabel}</p>
                        <p>Timezone: {rule.timezone}</p>
                        <p>Reason: {rule.reasonLabel}</p>
                        <p>Created: {rule.createdAtLabel}</p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditBlackout(rule.id)}
                          disabled={isPending}
                        >
                          <PencilIcon className="mr-1.5 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => onDeleteBlackout(rule.id)}
                          disabled={isPending}
                        >
                          <Trash2Icon className="mr-1.5 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="border-primary/20 bg-primary/5 mt-4 rounded-xl border p-3 text-xs text-neutral-700">
                <div className="flex items-start gap-2">
                  <Clock3Icon className="text-primary mt-0.5 h-3.5 w-3.5" />
                  <p>
                    Use <span className="font-semibold">One-Time</span> for
                    date-specific closures and{" "}
                    <span className="font-semibold">Recurring</span> rules for
                    repeated blocks.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
