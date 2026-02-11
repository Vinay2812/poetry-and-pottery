import { Lightbulb } from "lucide-react";

interface ProTipsCalloutProps {
  tips: string[];
}

export function ProTipsCallout({ tips }: ProTipsCalloutProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="bg-cream rounded-2xl p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-semibold text-neutral-900">
            Pro Tips
          </h3>
        </div>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="text-muted-foreground flex items-start gap-3 text-sm"
            >
              <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
