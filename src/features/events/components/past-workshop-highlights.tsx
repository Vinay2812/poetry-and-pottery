import { Star } from "lucide-react";

interface PastWorkshopHighlightsProps {
  highlights: string[];
}

export function PastWorkshopHighlights({
  highlights,
}: PastWorkshopHighlightsProps) {
  return (
    <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
      <h2 className="mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        Highlights
      </h2>
      <ul className="space-y-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <Star className="text-primary mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
