"use client";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getEventLevelColor, getEventStatusColor } from "@/lib/status-utils";

import { EventLevel, EventStatus } from "@/graphql/generated/types";
import type { AdminStatusOption } from "@/graphql/generated/types";

import type { EventRowViewModel, EventsTableProps } from "../types";

interface EventCardProps {
  event: EventRowViewModel;
  statusOptions: AdminStatusOption[];
  onStatusChange: (eventId: string, status: EventStatus) => void;
  onDelete: (eventId: string) => void;
  isPending: boolean;
}

function EventCard({
  event,
  statusOptions,
  onStatusChange,
  onDelete,
  isPending,
}: EventCardProps) {
  return (
    <div className="hover:shadow-soft overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow">
      <div className="relative">
        <Link href={`/dashboard/events/${event.id}`} className="block">
          {event.image ? (
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
              <OptimizedImage
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-neutral-100 text-neutral-400">
              <span className="text-sm">No image</span>
            </div>
          )}
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <Link href={`/dashboard/events/${event.id}`} className="min-w-0">
            <h3 className="hover:text-primary truncate font-semibold text-neutral-900">
              {event.title}
            </h3>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isPending}>
              <Button variant="ghost" size="icon" className="size-8 shrink-0">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event.id}`}>
                  <EditIcon className="mr-2 size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {statusOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() =>
                        onStatusChange(event.id, option.value as EventStatus)
                      }
                      disabled={event.status === option.value}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(event.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          <Badge className={`border ${getEventStatusColor(event.status)}`}>
            {event.status.toLowerCase().replace("_", " ")}
          </Badge>
          <Badge className={`border ${getEventLevelColor(event.level)}`}>
            {event.level.toLowerCase()}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-neutral-400" />
            <span>{event.startsAtFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="size-4 text-neutral-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="size-4 text-neutral-400" />
            <span
              className={
                event.isFullyBooked ? "font-medium text-red-600" : undefined
              }
            >
              {event.seatsBooked}/{event.totalSeats} booked
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="text-sm text-neutral-500">{event.instructor}</span>
          <span className="font-semibold text-neutral-900">
            {event.priceFormatted}
          </span>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  pagination,
  onPageChange,
  itemName = "items",
}: {
  pagination: EventsTableProps["viewModel"]["pagination"];
  onPageChange: (page: number) => void;
  itemName?: string;
}) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-neutral-500">
        Showing {pagination.showingFrom} to {pagination.showingTo} of{" "}
        {pagination.total} {itemName}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span className="text-sm text-neutral-600">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function EventsTable({
  viewModel,
  statusOptions,
  levelOptions,
  isPending,
  onSearch,
  onStatusFilter,
  onLevelFilter,
  onPageChange,
  onStatusChange,
  onDelete,
}: EventsTableProps) {
  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search events..."
              value={viewModel.searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={viewModel.statusFilter}
              onValueChange={onStatusFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={viewModel.levelFilter} onValueChange={onLevelFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Levels</SelectItem>
                {levelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Link href="/dashboard/events/new">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Top Pagination */}
      <Pagination
        pagination={viewModel.pagination}
        onPageChange={onPageChange}
        itemName="events"
      />

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {viewModel.events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            statusOptions={statusOptions}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            isPending={isPending}
          />
        ))}
      </div>

      {viewModel.events.length === 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center text-neutral-500">
          No events found
        </div>
      )}

      {/* Bottom Pagination */}
      <Pagination
        pagination={viewModel.pagination}
        onPageChange={onPageChange}
        itemName="events"
      />
    </div>
  );
}
