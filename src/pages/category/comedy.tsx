import { useEffect, useState } from "react";
import Head from "next/head";
import { EventGrid } from "@/components/events/EventGrid";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ComedyPage() {
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await ticketmasterApi.getEvents(
          undefined, 
          "comedy", 
          { 
            size: 24,
            startDateTime: today,
            sort: "date,asc"
          }
        );
        if (data.length === 0) {
          setError("No comedy events found. Please try again later.");
        }
        setEvents(data);
        setIsMockData(data[0]?.id?.startsWith("mock-"));
      } catch (error) {
        console.error("Failed to fetch comedy events:", error);
        setError("Unable to load comedy events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Head>
        <title>Comedy Shows - Your Choice Tickets</title>
        <meta name="description" content="Get tickets for stand-up comedy shows and performances" />
      </Head>
      
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
          <img
            src="https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=1920&q=80"
            alt="Comedy hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold">Comedy Shows</h1>
            <p className="text-xl text-muted-foreground">
              Laugh out loud with the best comedians live on stage
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