import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { TicketmasterEvent, TicketmasterVenue, ticketmasterApi } from "@/services/ticketmaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CalendarIcon, MapPinIcon, TicketIcon, Clock, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<TicketmasterEvent | null>(null);
  const [venue, setVenue] = useState<TicketmasterVenue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const eventData = await ticketmasterApi.getEventById(id as string);
        if (!eventData) {
          throw new Error("Event not found");
        }
        
        setEvent(eventData);
        
        if (eventData._embedded?.venues?.[0]?.id) {
          const venueData = await ticketmasterApi.getVenueById(eventData._embedded.venues[0].id);
          if (venueData) {
            setVenue(venueData);
          }
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Unable to load event details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Event not found"}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const imageUrl = event.images?.find(img => img.ratio === "16_9" && img.width >= 1024)?.url || 
                  event.images?.[0]?.url;
  const venueName = event._embedded?.venues?.[0]?.name || "Venue TBA";
  const venueLocation = event._embedded?.venues?.[0]?.city?.name && event._embedded?.venues?.[0]?.state?.stateCode
    ? `${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`
    : "";
  const eventDate = event.dates?.start?.localDate
    ? new Date(event.dates.start.localDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBA";
  const eventTime = event.dates?.start?.localTime
    ? new Date(`2000-01-01T${event.dates.start.localTime}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "Time TBA";
  const hasSeatmap = Boolean(event.seatmap?.staticUrl || venue?.seatmap?.staticUrl);
  const seatmapUrl = event.seatmap?.staticUrl || venue?.seatmap?.staticUrl;

  return (
    <>
      <Head>
        <title>{`${event.name} - Your Choice Tickets`}</title>
        <meta name="description" content={`Get tickets for ${event.name} at ${venueName}`} />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={event.name}
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            )}
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{event.name}</h1>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>{eventDate}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>{eventTime}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPinIcon className="mr-2 h-5 w-5" />
                    <span>{`${venueName}${venueLocation ? ` - ${venueLocation}` : ""}`}</span>
                  </div>
                </div>
              </div>

              {event.pleaseNote && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{event.pleaseNote}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {hasSeatmap && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Seating Chart</h2>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Full Size</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Seating Chart - {venueName}</DialogTitle>
                            <DialogDescription>
                              Click and drag to move, scroll to zoom
                            </DialogDescription>
                          </DialogHeader>
                          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                            <Image
                              src={seatmapUrl as string}
                              alt="Venue seating chart"
                              fill
                              className="object-contain"
                              unoptimized={true}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image
                        src={seatmapUrl as string}
                        alt="Venue seating chart"
                        fill
                        className="object-contain"
                        unoptimized={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Ticket Options</h2>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred ticket type and quantity
                    </p>
                  </div>

                  {event.priceRanges ? (
                    <div className="space-y-4">
                      {event.priceRanges.map((range, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{range.type || "Standard"} Ticket</p>
                            <p className="text-sm text-muted-foreground">
                              {`$${range.min.toFixed(2)} - $${range.max.toFixed(2)}`}
                            </p>
                          </div>
                          <Button onClick={() => window.open(event.url, "_blank")}>
                            Select
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => window.open(event.url, "_blank")}
                    >
                      <TicketIcon className="mr-2 h-4 w-4" />
                      Check Availability
                    </Button>
                  )}

                  {event.ticketLimit && (
                    <p className="text-sm text-muted-foreground">
                      {event.ticketLimit.info}
                    </p>
                  )}
                </CardContent>
              </Card>

              {venue?.generalInfo && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Venue Information</h2>
                    {venue.generalInfo.generalRule && (
                      <div className="space-y-2">
                        <h3 className="font-medium">General Rules</h3>
                        <p className="text-sm text-muted-foreground">{venue.generalInfo.generalRule}</p>
                      </div>
                    )}
                    {venue.generalInfo.childRule && (
                      <div className="space-y-2">
                        <h3 className="font-medium">Child Rules</h3>
                        <p className="text-sm text-muted-foreground">{venue.generalInfo.childRule}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;