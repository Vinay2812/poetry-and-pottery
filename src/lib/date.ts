/**
 * Calculate duration between two dates in hours and minutes.
 * @example "2hr 30min", "45min", "3hr"
 */
export function calculateDuration(
  startsAt: Date | string,
  endsAt: Date | string,
): string {
  const diffMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}hr`;
  return `${hours}hr ${minutes}min`;
}

/**
 * Format event date in short format.
 * @example "Mon, Jan 15"
 */
export function formatEventDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format event date in full format with year.
 * @example "Monday, January 15, 2025"
 */
export function formatEventDateFull(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format event date for tickets (short weekday, long month).
 * @example "Sat, Jan 15, 2025"
 */
export function formatTicketDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format event time in 12-hour format.
 * @example "2:30 PM"
 */
export function formatEventTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format order date for display.
 * @example "Jan 15, 2025"
 */
export function formatOrderDate(dateString: Date | string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format date and time for admin dashboard (Indian locale).
 * @example "15 Jan 2025, 02:30 PM"
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Format date for progress steppers and timelines.
 * @example "Jan 15, 2:30 PM"
 */
export function formatProgressDate(dateValue: Date | string): string {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Format date in Indian locale (short format).
 * @example "Sat, 15 Jan, 2025"
 */
export function formatDateShort(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format time in Indian locale.
 * @example "2:30 PM"
 */
export function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format created at timestamp in Indian locale.
 * @example "15 Jan 2025, 02:30 PM"
 */
export function formatCreatedAt(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format date for HTML datetime-local inputs.
 * @example "2025-01-15T14:30"
 */
export function formatDateTimeLocal(date: Date): string {
  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Format date for content pages (US locale with time).
 * @example "Jan 15, 2025 02:30 PM"
 */
export function formatContentDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
