import { PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ConfigPickerProps } from "../types";

export function ConfigPicker({
  configs,
  selectedConfigId,
  isPending,
  onSelectConfig,
  onCreateConfig,
  onDeleteConfig,
}: ConfigPickerProps) {
  return (
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
              <SelectValue
                placeholder={
                  selectedConfigId ? "Select config" : "No configs available"
                }
              />
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
  );
}
