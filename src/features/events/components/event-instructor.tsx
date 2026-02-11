import { User } from "lucide-react";

interface EventInstructorProps {
  instructor: string;
  title?: string;
}

export function EventInstructor({
  instructor,
  title = "Your Instructor",
}: EventInstructorProps) {
  return (
    <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
      <h2 className="mb-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <User className="h-5 w-5 text-neutral-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {instructor}
          </p>
          <p className="text-xs text-neutral-500">Lead Facilitator</p>
        </div>
      </div>
    </div>
  );
}
