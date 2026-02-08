export function formatHourLabel(hour: number): string {
  const normalizedHour = ((hour % 24) + 24) % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";
  const twelveHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
  return `${twelveHour}:00 ${suffix}`;
}
