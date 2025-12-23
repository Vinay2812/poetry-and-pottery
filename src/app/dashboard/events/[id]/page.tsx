import {
  getEventById,
  getEventLevelOptions,
  getEventRegistrations,
  getEventReviews,
  getEventStatusOptions,
} from "@/actions/admin";
import {
  EventFormContainer,
  EventRegistrationsSection,
  EventReviewsSection,
} from "@/features/dashboard/events";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getEventStatusColor } from "@/lib/status-utils";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  const [event, statusOptions, levelOptions, registrationsData, reviewsData] =
    await Promise.all([
      getEventById(id),
      Promise.resolve(getEventStatusOptions()),
      Promise.resolve(getEventLevelOptions()),
      getEventRegistrations(id),
      getEventReviews(id),
    ]);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{event.title}</h1>
            <Badge className={`border ${getEventStatusColor(event.status)}`}>
              {event.status.toLowerCase().replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground">ID: {event.id}</p>
          <p className="text-muted-foreground">Slug: {event.slug}</p>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="registrations">
            Registrations ({registrationsData.total})
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({reviewsData.total})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <EventFormContainer
            event={event}
            statusOptions={statusOptions}
            levelOptions={levelOptions}
          />
        </TabsContent>

        <TabsContent value="registrations">
          <EventRegistrationsSection
            eventId={id}
            registrations={registrationsData.registrations}
            total={registrationsData.total}
            statusCounts={registrationsData.statusCounts}
          />
        </TabsContent>

        <TabsContent value="reviews">
          <EventReviewsSection
            eventId={id}
            reviews={reviewsData.reviews}
            total={reviewsData.total}
            averageRating={reviewsData.averageRating}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
