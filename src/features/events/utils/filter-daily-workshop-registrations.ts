import type { DailyWorkshopRegistration } from "@/data/daily-workshops/types";

/**
 * Filters daily workshop registrations by search query.
 * Matches against registration ID and status (case-insensitive).
 * Returns the full list when the search query is empty.
 */
export function filterDailyWorkshopRegistrations(
  registrations: DailyWorkshopRegistration[],
  searchQuery: string,
): DailyWorkshopRegistration[] {
  const normalizedSearch = searchQuery.trim().toLowerCase();
  if (!normalizedSearch) {
    return registrations;
  }

  return registrations.filter((registration) => {
    const registrationId = registration.id.toLowerCase();
    const status = registration.status.toLowerCase();
    return (
      registrationId.includes(normalizedSearch) ||
      status.includes(normalizedSearch)
    );
  });
}
