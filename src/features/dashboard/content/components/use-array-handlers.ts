import { useCallback } from "react";

export function useArrayHandlers<
  TItem extends Record<string, string>,
  TContent extends Record<string, unknown>,
>(
  content: TContent,
  onChange: (content: TContent) => void,
  arrayKey: keyof TContent,
) {
  const items = content[arrayKey] as TItem[];

  const handleUpdate = useCallback(
    (index: number, field: string, value: string) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [field]: value };
      onChange({ ...content, [arrayKey]: newItems });
    },
    [items, content, onChange, arrayKey],
  );

  const handleAdd = useCallback(
    (newItem: TItem) => {
      onChange({ ...content, [arrayKey]: [...items, newItem] });
    },
    [items, content, onChange, arrayKey],
  );

  const handleRemove = useCallback(
    (index: number) => {
      onChange({
        ...content,
        [arrayKey]: items.filter((_, i) => i !== index),
      });
    },
    [items, content, onChange, arrayKey],
  );

  return { items, handleUpdate, handleAdd, handleRemove };
}
