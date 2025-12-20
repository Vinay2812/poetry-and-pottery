interface EventDetailDescriptionProps {
  description?: string | null;
}

export function EventDetailDescription({
  description,
}: EventDetailDescriptionProps) {
  if (!description) return null;

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
        About this workshop
      </h2>
      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
