import { MapPin, User } from "lucide-react";

interface EventDetailLocationInstructorProps {
  location?: string | null;
  fullLocation?: string | null;
  instructor?: string | null;
  instructorTitle?: string;
}

export function EventDetailLocationInstructor({
  location,
  fullLocation,
  instructor,
  instructorTitle = "Lead Facilitator",
}: EventDetailLocationInstructorProps) {
  if (!location && !instructor) return null;

  return (
    <div className="mb-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
      {location && (
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
          <div>
            <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
              Location
            </p>
            <p className="text-sm leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
              {location}
            </p>
            {fullLocation && (
              <p className="mt-0.5 text-[11px] text-neutral-400">
                {fullLocation}
              </p>
            )}
          </div>
        </div>
      )}
      {instructor && (
        <div className="flex items-start gap-3">
          <User className="mt-1 h-4 w-4 text-neutral-400" />
          <div>
            <p className="mb-1 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
              Instructor
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {instructor}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-400">
              {instructorTitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
