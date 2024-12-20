import Head from "next/head";
import { EventGrid } from "@/components/events/EventGrid";
import { useEffect, useState } from "react";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SportsPage() {
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
          "sports", 
          { 
            size: 24,
            startDateTime: today,
            sort: "date,asc"
          }
        );
        if (data.length === 0) {
          setError("No sports events found. Please try again later.");
        }
        setEvents(data);
        setIsMockData(data[0]?.id?.startsWith("mock-"));
      } catch (error) {
        console.error("Error fetching sports events:", error);
        setError("Unable to load sports events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Head>
        <title>Sports Events - Your Choice Tickets</title>
        <meta name="description" content="Find and book tickets for major sports events and championships" />
      </Head>
      
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
          <img
            src="https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1920&q=80"
            alt="Sports hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold">Sports Events</h1>
            <p className="text-xl text-muted-foreground">
              Experience the thrill of live sports events and championships
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