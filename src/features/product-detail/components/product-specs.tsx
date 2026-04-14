interface ProductSpecsProps {
  material: string;
}

export function ProductSpecs({ material }: ProductSpecsProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      <div>
        <span className="block text-[11px] font-medium text-neutral-400">
          Material
        </span>
        <span className="text-foreground text-sm font-medium">
          {material || "Ceramic"}
        </span>
      </div>
    </div>
  );
}
