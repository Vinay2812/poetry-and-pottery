import { Mail, Users } from "lucide-react";

import { formatCreatedAt } from "@/lib/date";

import type { NewsletterSectionProps } from "../types";

export function NewsletterSection({
  subscribers,
  totalSubscribers,
  newThisMonth,
}: NewsletterSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="text-primary h-5 w-5" />
          <h2 className="text-lg font-semibold">Newsletter Subscribers</h2>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="text-muted-foreground h-4 w-4" />
            <span className="font-medium">{totalSubscribers}</span>
            <span className="text-muted-foreground">total</span>
          </div>
          {newThisMonth > 0 && (
            <span className="text-primary text-sm">
              +{newThisMonth} this month
            </span>
          )}
        </div>
      </div>

      {subscribers.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          No newsletter subscribers yet
        </p>
      ) : (
        <div className="divide-y">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {subscriber.image ? (
                  <img
                    src={subscriber.image}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                    {(subscriber.name || subscriber.email)[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {subscriber.name || subscriber.email.split("@")[0]}
                  </p>
                  <p className="text-muted-foreground truncate text-sm">
                    {subscriber.email}
                  </p>
                </div>
              </div>
              {subscriber.newsletter_subscribed_at && (
                <span className="text-muted-foreground shrink-0 text-sm">
                  {formatCreatedAt(subscriber.newsletter_subscribed_at)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
