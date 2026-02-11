import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICON_OPTIONS } from "../types";

interface IconPickerFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}

export function IconPickerField({
  value,
  onValueChange,
  label = "Icon",
}: IconPickerFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ICON_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
