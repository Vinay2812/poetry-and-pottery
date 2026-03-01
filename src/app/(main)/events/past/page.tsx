import { redirect } from "next/navigation";

/**
 * Route: /events/past
 * Page does: Alias route that normalizes past-events access into the main events tabbed experience.
 * Key UI operations:
 * - Immediately redirect to `/events?event_tab=past` to keep one events listing surface.
 * - Preserve expected navigation path for users opening the explicit past-events URL.
 * UI info needed for operations:
 * - Fixed target query `event_tab=past` required to render the past-events tab state.
 * - No independent page payload; all UI content is resolved by `/events`.
 */
export default function PastEventsRedirectPage() {
  redirect("/events?event_tab=past");
}
