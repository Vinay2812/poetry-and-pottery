interface EventCardDescriptionProps {
  description?: string | null;
}

export function EventCardDescription({
  description,
}: EventCardDescriptionProps) {
  if (!description) return null;

  return (
    <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500 lg:text-sm dark:text-neutral-400">
      {description}
    </p>
  );
}
