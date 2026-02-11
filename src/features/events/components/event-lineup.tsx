import { Mic } from "lucide-react";

interface EventLineupProps {
  performers: string[];
  lineupNotes: string | null;
  title?: string;
}

export function EventLineup({
  performers,
  lineupNotes,
  title = "Tonight's Lineup",
}: EventLineupProps) {
  return (
    <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
      <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
        {title}
      </h2>
      <ul className="space-y-3">
        {performers.map((performer, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <Mic className="text-primary h-4 w-4" />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {performer}
            </span>
          </li>
        ))}
      </ul>
      {lineupNotes && (
        <p className="mt-3 text-sm text-neutral-500 italic">{lineupNotes}</p>
      )}
    </div>
  );
}
