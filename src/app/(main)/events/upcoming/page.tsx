import { redirect } from "next/navigation";

/**
 * Route: /events/upcoming
 * Page does: Alias route that normalizes upcoming-events access into the main events tabbed experience.
 * Key UI operations:
 * - Immediately redirect to `/events?event_tab=upcoming` for canonical upcoming listing.
 * - Preserve expected navigation path for users opening the explicit upcoming-events URL.
 * UI info needed for operations:
 * - Fixed target query `event_tab=upcoming` required to render upcoming tab state.
 * - No independent page payload; all UI content is resolved by `/events`.
 */
export default function UpcomingEventsRedirectPage() {
  redirect("/events?event_tab=upcoming");
}
