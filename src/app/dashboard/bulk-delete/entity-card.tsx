interface EntityCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export function EntityCard({
  title,
  description,
  icon: Icon,
  onClick,
}: EntityCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-8 text-center transition-all hover:border-red-200 hover:shadow-lg"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50 transition-colors group-hover:bg-red-100">
        <Icon className="size-8 text-red-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
    </button>
  );
}
