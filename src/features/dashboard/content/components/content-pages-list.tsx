"use client";

import type { ContentPageType } from "@/actions/admin";
import { Edit, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { type ContentPagesListProps, PAGE_DESCRIPTIONS } from "../types";

export function ContentPagesList({
  viewModel,
  isPending,
  onToggleActive,
}: ContentPagesListProps) {
  return (
    <div className="space-y-4">
      {viewModel.pages.map((page) => (
        <div
          key={page.slug}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText className="text-muted-foreground h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{page.title}</h3>
              <p className="text-muted-foreground text-sm">
                {PAGE_DESCRIPTIONS[page.slug as ContentPageType]}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Last updated: {page.lastUpdated}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={page.isActive}
                onCheckedChange={() =>
                  onToggleActive(page.slug as ContentPageType)
                }
                disabled={isPending}
              />
              <span className="text-muted-foreground text-sm">
                {page.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/content/${page.slug}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
