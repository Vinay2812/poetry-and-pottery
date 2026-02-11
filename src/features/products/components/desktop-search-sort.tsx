import { Loader2 } from "lucide-react";

import { SearchInput } from "@/components/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProductOrderBy } from "@/graphql/generated/types";

import { SORT_OPTIONS } from "../types";

interface DesktopSearchSortProps {
  search: string;
  sort: ProductOrderBy;
  isFetching: boolean;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: ProductOrderBy) => void;
}

export function DesktopSearchSort({
  search,
  sort,
  isFetching,
  onSearchChange,
  onSortChange,
}: DesktopSearchSortProps) {
  return (
    <div className="mb-6 hidden flex-col gap-4 lg:flex">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search products..."
        className="w-full max-w-md"
      />
      <div className="flex items-center justify-end gap-3">
        {isFetching && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Loader2 className="h-4 w-4 animate-spin" />
            Updating results...
          </div>
        )}
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
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
      </div>
    </div>
  );
}
