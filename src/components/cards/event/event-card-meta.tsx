import { Calendar, Clock } from "lucide-react";

interface EventCardMetaProps {
  title: string;
  date: string;
  time?: string;
}

export function EventCardMeta({ title, date, time }: EventCardMetaProps) {
  return (
    <div className="flex flex-col gap-0.5 lg:gap-1">
      <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
        {title}
      </h3>
      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {date}
        </span>
        {time && (
          <>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {time}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
