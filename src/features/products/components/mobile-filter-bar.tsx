import { Loader2, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProductOrderBy } from "@/graphql/generated/types";

import { SORT_OPTIONS } from "../types";

interface MobileFilterBarProps {
  sort: ProductOrderBy;
  activeFilterCount: number;
  isFetching: boolean;
  onFilterOpen: () => void;
  onSortChange: (sort: ProductOrderBy) => void;
}

export function MobileFilterBar({
  sort,
  activeFilterCount,
  isFetching,
  onFilterOpen,
  onSortChange,
}: MobileFilterBarProps) {
  return (
    <div className="bg-background sticky z-40 flex items-center gap-2 overflow-y-auto px-4 pt-1 pb-3 lg:hidden">
      <Button
        variant="outline"
        size="sm"
        className="h-9 rounded-full"
        onClick={onFilterOpen}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filter
        {activeFilterCount > 0 && (
          <span className="bg-primary ml-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="h-9 w-48 rounded-full text-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isFetching && (
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Updating
        </div>
      )}
    </div>
  );
}
