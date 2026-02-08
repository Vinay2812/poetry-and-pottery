interface ColorSelectorProps {
  colorName: string;
  colorCode: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorSelector({
  colorName,
  colorCode,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-medium text-neutral-400">Color</span>
        <span className="text-[11px] font-medium text-neutral-500">
          {selectedColor}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onColorSelect(colorName)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all"
          style={{
            backgroundColor: colorCode,
            outline:
              selectedColor === colorName ? `2px solid ${colorCode}` : "none",
            outlineOffset: "2px",
          }}
          title={colorName}
        />
      </div>
    </div>
  );
}
