import { Check } from "lucide-react";

interface EventIncludesProps {
  includes: string[];
  title?: string;
}

export function EventIncludes({
  includes,
  title = "What's Included",
}: EventIncludesProps) {
  return (
    <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
      <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
        {title}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {includes.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
              <Check className="h-3 w-3 text-emerald-500" />
            </div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
