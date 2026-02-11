import type { LucideIcon } from "lucide-react";

const colors = {
  primary: "#4f6f52",
  primaryLighter: "#f4f6f4",
};

interface TicketDetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  capitalize?: boolean;
}

export function TicketDetailRow({
  icon: Icon,
  label,
  value,
  capitalize = false,
}: TicketDetailRowProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: colors.primaryLighter }}
      >
        <Icon className="h-4 w-4" style={{ color: colors.primary }} />
      </div>
      <div>
        <p className="text-xs text-neutral-500">{label}</p>
        <p
          className={`text-sm font-medium text-neutral-700${capitalize ? "capitalize" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

interface TicketDetailRowEmojiProps {
  emoji: string;
  label: string;
  value: string;
  capitalize?: boolean;
}

export function TicketDetailRowEmoji({
  emoji,
  label,
  value,
  capitalize = false,
}: TicketDetailRowEmojiProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: colors.primaryLighter }}
      >
        <span className="text-sm" style={{ color: colors.primary }}>
          {emoji}
        </span>
      </div>
      <div>
        <p className="text-xs text-neutral-500">{label}</p>
        <p
          className={`text-sm font-medium text-neutral-700${capitalize ? "capitalize" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
