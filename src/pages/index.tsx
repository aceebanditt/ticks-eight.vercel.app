import Head from "next/head";
import { useRouter } from "next/router";
import { EventCarousel } from "@/components/events/EventCarousel";
import { useEffect, useState } from "react";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, MapPin } from "lucide-react";
import { SearchDialog } from "@/components/search/SearchDialog";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Footer } from "@/components/layout/Footer";

export const HomePage = () => {
  const router = useRouter();
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  const [featuredEvents, setFeaturedEvents] = useState<TicketmasterEvent[]>([]);
  const [concertEvents, setConcertEvents] = useState<TicketmasterEvent[]>([]);
  const [sportsEvents, setSportsEvents] = useState<TicketmasterEvent[]>([]);
  const [comedyEvents, setComedyEvents] = useState<TicketmasterEvent[]>([]);
  const [theatreEvents, setTheatreEvents] = useState<TicketmasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const today = new Date().toISOString().split("T")[0];
        
        const [featured, concerts, sports, comedy, theatre] = await Promise.all([
          ticketmasterApi.getEvents(undefined, undefined, { 
            size: 8, 
            startDateTime: today,
            sort: "relevance,desc"
          }, latitude, longitude),
          ticketmasterApi.getEvents(undefined, "music", { 
            size: 8, 
            startDateTime: today,
            sort: "date,asc"
          }, latitude, longitude),
          ticketmasterApi.getEvents(undefined, "sports", { 
            size: 8, 
            startDateTime: today,
            sort: "date,asc"
          }, latitude, longitude),
          ticketmasterApi.getEvents(undefined, "comedy", { 
            size: 8, 
            startDateTime: today,
            sort: "date,asc"
          }, latitude, longitude),
          ticketmasterApi.getEvents(undefined, "theatre", { 
            size: 8, 
            startDateTime: today,
            sort: "date,asc"
          }, latitude, longitude)
        ]);

        if ([featured, concerts, sports, comedy, theatre].every(arr => arr.length === 0)) {
          throw new Error("Unable to fetch events at this time. Please try again later.");
        }
        
        setFeaturedEvents(featured);
        setConcertEvents(concerts);
        setSportsEvents(sports);
        setComedyEvents(comedy);
        setTheatreEvents(theatre);
        setIsMockData(featured[0]?.id?.startsWith("mock-"));
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error instanceof Error ? error.message : "Unable to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!locationLoading) {
      fetchEvents();
    }
  }, [latitude, longitude, locationLoading]);

  return (
    <>
      <Head>
        <title>Your Choice Tickets - Find and Book Event Tickets</title>
        <meta name="description" content="Book tickets for concerts, sports events, theatre shows and more at Your Choice Tickets" />
      </Head>
      
      <div className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <img
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-bold">Experience Live Events Like Never Before</h1>
            <p className="text-xl text-muted-foreground">
              Get tickets to the most anticipated concerts, sports events, and shows
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => router.push("/category/concerts")}
              >
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <SearchDialog />
            </div>
            {latitude && longitude && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Showing events near your location</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-16 space-y-16">
        {locationLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingSpinner />
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
          <Alert variant="destructive" className="mb-8">
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

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        ) : (
          <>
            {featuredEvents.length > 0 && (
              <EventCarousel 
                title="Featured Events" 
                events={featuredEvents.map(event => ({ event }))}
                categoryLink="/category/featured"
              />
            )}
            {concertEvents.length > 0 && (
              <EventCarousel 
                title="Concerts & Music" 
                events={concertEvents.map(event => ({ event }))}
                categoryLink="/category/concerts"
              />
            )}
            {sportsEvents.length > 0 && (
              <EventCarousel 
                title="Sports Events" 
                events={sportsEvents.map(event => ({ event }))}
                categoryLink="/category/sports"
              />
            )}
            {comedyEvents.length > 0 && (
              <EventCarousel 
                title="Comedy Shows" 
                events={comedyEvents.map(event => ({ event }))}
                categoryLink="/category/comedy"
              />
            )}
            {theatreEvents.length > 0 && (
              <EventCarousel 
                title="Theatre & Shows" 
                events={theatreEvents.map(event => ({ event }))}
                categoryLink="/category/theatre"
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;