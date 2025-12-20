import { Check } from "lucide-react";

interface EventDetailIncludesProps {
  includes?: string[] | null;
}

export function EventDetailIncludes({ includes }: EventDetailIncludesProps) {
  if (!includes || includes.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
        What&apos;s included
      </h2>
      <div className="shadow-soft rounded-2xl border border-neutral-50 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <ul className="grid gap-4 sm:grid-cols-2">
          {includes.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
