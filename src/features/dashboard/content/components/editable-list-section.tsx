import { Plus, Trash2 } from "lucide-react";
import { type ReactNode, useCallback } from "react";

import { Button } from "@/components/ui/button";

interface EditableListSectionProps<T> {
  title: string;
  items: T[];
  addButtonLabel: string;
  itemLabel: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
  renderItem: (
    item: T,
    index: number,
    onUpdate: (index: number, field: string, value: string) => void,
  ) => ReactNode;
  getItemLabel?: (item: T, index: number) => string;
}

export function EditableListSection<T>({
  title,
  items,
  addButtonLabel,
  itemLabel,
  onAdd,
  onRemove,
  onUpdate,
  renderItem,
  getItemLabel,
}: EditableListSectionProps<T>) {
  const defaultLabel = useCallback(
    (_item: T, index: number) => `${itemLabel} ${index + 1}`,
    [itemLabel],
  );

  const resolvedGetLabel = getItemLabel ?? defaultLabel;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {addButtonLabel}
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                {resolvedGetLabel(item, index)}
              </span>
              <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            {renderItem(item, index, onUpdate)}
          </div>
        ))}
      </div>
    </section>
  );
}
