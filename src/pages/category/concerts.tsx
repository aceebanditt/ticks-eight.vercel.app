import { useState, useEffect } from "react";
import Head from "next/head";
import { EventGrid } from "@/components/events/EventGrid";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ConcertsPage() {
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    const fetchConcerts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const today = new Date().toISOString().split("T")[0];
        const concertEvents = await ticketmasterApi.getEvents(
          undefined, 
          "music", 
          { 
            size: 24,
            startDateTime: today,
            sort: "date,asc"
          }
        );
        if (concertEvents.length === 0) {
          setError("No concert events found. Please try again later.");
        }
        setEvents(concertEvents);
        setIsMockData(concertEvents[0]?.id?.startsWith("mock-"));
      } catch (error) {
        console.error("Error fetching concerts:", error);
        setError("Unable to load concert events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <>
      <Head>
        <title>Concerts - Your Choice Tickets</title>
        <meta name="description" content="Find and book tickets for the hottest concerts and music events" />
      </Head>
      
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
          <img
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80"
            alt="Concerts hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold">Concerts</h1>
            <p className="text-xl text-muted-foreground">
              Discover and book tickets for the hottest concerts and music events
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isMockData && !error && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Preview Data</AlertTitle>
            <AlertDescription>
              Showing preview events. Live event data will be available soon.
            </AlertDescription>
          </Alert>
        )}
        <EventGrid events={events} isLoading={isLoading} />
      </main>
    </>
  );
}