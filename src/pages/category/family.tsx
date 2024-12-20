import { useEffect, useState } from "react";
import Head from "next/head";
import { EventGrid } from "@/components/events/EventGrid";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const FamilyEventsPage = () => {
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (locationLoading) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await ticketmasterApi.getEvents(
          undefined, 
          "family", 
          { 
            size: 24,
            startDateTime: today,
            sort: "date,asc",
            includeFamily: true
          },
          latitude,
          longitude
        );
        if (data.length === 0) {
          setError("No family events found in your area. Please try again later.");
        }
        setEvents(data);
        setIsMockData(data[0]?.id?.startsWith("mock-"));
      } catch (error) {
        console.error("Failed to fetch family events:", error);
        setError("Unable to load family events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [latitude, longitude, locationLoading]);

  return (
    <>
      <Head>
        <title>Family Events - Your Choice Tickets</title>
        <meta name="description" content="Find and book tickets for family-friendly events and shows" />
      </Head>
      
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
          <img
            src="https://images.unsplash.com/photo-1472711795975-42c5b4ee828c?w=1920&q=80"
            alt="Family Events"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold">Family Events</h1>
            <p className="text-xl text-muted-foreground">
              Discover amazing shows and events perfect for the whole family
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {locationLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted-foreground">Detecting your location...</p>
          </div>
        )}

        {locationError && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Access</AlertTitle>
            <AlertDescription>
              {locationError}. Showing events from all locations.
            </AlertDescription>
          </Alert>
        )}

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
};

export default FamilyEventsPage;