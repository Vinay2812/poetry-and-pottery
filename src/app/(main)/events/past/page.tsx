import { redirect } from "next/navigation";

export default function PastEventsRedirectPage() {
  redirect("/events?event_tab=past");
}
