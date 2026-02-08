import { redirect } from "next/navigation";

export default function UpcomingEventsRedirectPage() {
  redirect("/events?event_tab=upcoming");
}
