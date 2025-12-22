"use client";

import { getEventLevelColor, getEventStatusColor } from "@/actions/admin";
import type { EventLevel, EventStatus } from "@/prisma/generated/enums";
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
import Image from "next/image";
import Link from "next/link";

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

import type { EventRowViewModel, EventsTableProps } from "../types";

interface EventRowProps {
  event: EventRowViewModel;
  statusOptions: { value: EventStatus; label: string }[];
  onStatusChange: (eventId: string, status: EventStatus) => void;
  onDelete: (eventId: string) => void;
  isPending: boolean;
}

function EventRow({
  event,
  statusOptions,
  onStatusChange,
  onDelete,
  isPending,
}: EventRowProps) {
  return (
    <tr className="transition-colors hover:bg-neutral-50/50">
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/events/${event.id}`}
          className="flex items-center gap-3"
        >
          {event.image ? (
            <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
              <span className="text-xs">No img</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="hover:text-primary truncate font-medium text-neutral-900">
              {event.title}
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
              <CalendarIcon className="size-3" />
              <span>{event.startsAtFormatted}</span>
            </div>
          </div>
        </Link>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <div className="flex items-center gap-1 text-sm text-neutral-600">
          <MapPinIcon className="size-3" />
          {event.location}
        </div>
      </td>
      <td className="hidden px-4 py-3 lg:table-cell">
        <span className="text-sm text-neutral-600">{event.instructor}</span>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <div className="flex items-center gap-2">
          <UsersIcon className="size-4 text-neutral-400" />
          <span
            className={`${event.isFullyBooked ? "font-medium text-red-600" : "text-neutral-600"}`}
          >
            {event.seatsBooked}/{event.totalSeats}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <span className="font-medium text-neutral-900">
          {event.priceFormatted}
        </span>
      </td>
      <td className="px-4 py-3">
        <Badge className={`border ${getEventStatusColor(event.status)}`}>
          {event.status.toLowerCase().replace("_", " ")}
        </Badge>
      </td>
      <td className="hidden px-4 py-3 lg:table-cell">
        <Badge className={`border ${getEventLevelColor(event.level)}`}>
          {event.level.toLowerCase()}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isPending}>
            <Button variant="ghost" size="icon" className="size-8">
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
                    onClick={() => onStatusChange(event.id, option.value)}
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
      </td>
    </tr>
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search events..."
              value={viewModel.searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={viewModel.statusFilter} onValueChange={onStatusFilter}>
            <SelectTrigger className="w-[140px]">
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
            <SelectTrigger className="w-[140px]">
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

        <Link href="/dashboard/events/new">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Event
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 md:table-cell">
                  Location
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 lg:table-cell">
                  Instructor
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 md:table-cell">
                  Seats
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Status
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 lg:table-cell">
                  Level
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {viewModel.events.map((event) => (
                <EventRow
                  key={event.id}
                  event={event}
                  statusOptions={statusOptions}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                  isPending={isPending}
                />
              ))}
              {viewModel.events.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-neutral-500"
                  >
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {viewModel.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing {viewModel.pagination.showingFrom} to{" "}
            {viewModel.pagination.showingTo} of {viewModel.pagination.total}{" "}
            events
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(viewModel.pagination.page - 1)}
              disabled={viewModel.pagination.page <= 1}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <span className="text-sm text-neutral-600">
              Page {viewModel.pagination.page} of{" "}
              {viewModel.pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(viewModel.pagination.page + 1)}
              disabled={
                viewModel.pagination.page >= viewModel.pagination.totalPages
              }
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
