"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CustomizationOptionsTableProps } from "../types";

export function CustomizationOptionsTable({
  viewModel,
  categories,
  types,
  isPending,
  onSearch,
  onCategoryFilter,
  onTypeFilter,
  onActiveFilter,
  onPageChange,
  onToggleActive,
  onDelete,
}: CustomizationOptionsTableProps) {
  const { options, pagination } = viewModel;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Customization Options
          </h1>
          <p className="text-sm text-neutral-500">
            Manage product customization options for customers
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/customization/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-[300px] min-w-[200px] flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search options..."
            value={viewModel.searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={viewModel.categoryFilter}
          onValueChange={onCategoryFilter}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.category} value={cat.category}>
                {cat.category} ({cat.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={viewModel.typeFilter} onValueChange={onTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            {types.map((t) => (
              <SelectItem key={t.type} value={t.type}>
                {t.type} ({t.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={viewModel.activeFilter} onValueChange={onActiveFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Price Modifier</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-neutral-500"
                >
                  {isPending ? "Loading..." : "No customization options found."}
                </TableCell>
              </TableRow>
            ) : (
              options.map((option) => (
                <TableRow
                  key={option.id}
                  className={isPending ? "opacity-50" : undefined}
                >
                  <TableCell>
                    <Badge variant="outline">{option.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{option.type}</TableCell>
                  <TableCell>{option.name}</TableCell>
                  <TableCell className="text-neutral-500">
                    {option.value}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    <span
                      className={
                        option.priceModifier > 0
                          ? "text-green-600"
                          : option.priceModifier < 0
                            ? "text-red-600"
                            : "text-neutral-400"
                      }
                    >
                      {option.priceModifierFormatted}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {option.sortOrder}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={option.isActive ? "default" : "secondary"}
                      className={
                        option.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }
                    >
                      {option.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/customization/${option.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onToggleActive(option.id)}
                        >
                          {option.isActive ? (
                            <>
                              <ToggleLeft className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <ToggleRight className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(option.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing {pagination.showingFrom} to {pagination.showingTo} of{" "}
            {pagination.total} options
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1 || isPending}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-neutral-500">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages || isPending}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
