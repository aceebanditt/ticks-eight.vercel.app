import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar as CalendarIcon, MapPin, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { EventCard } from "@/components/events/EventCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TicketmasterEvent, ticketmasterApi, ClassificationKey } from "@/services/ticketmaster";

export interface SearchFilters {
  query: string;
  eventType: ClassificationKey | "all";
  date: Date | undefined;
  location: string;
  priceRange: number[];
}

export const SearchDialog = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    eventType: "all",
    date: undefined,
    location: "",
    priceRange: [0, 1000],
  });

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<TicketmasterEvent[]>([]);

  const eventTypes: Array<{ label: string; value: ClassificationKey | "all" }> = [
    { label: "All Events", value: "all" },
    { label: "Concerts", value: "music" },
    { label: "Sports", value: "sports" },
    { label: "Theatre", value: "theatre" },
    { label: "Comedy", value: "comedy" },
    { label: "Family", value: "family" },
  ];

  const locations = [
    "All Locations",
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
    "Las Vegas",
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);

    try {
      const events = await ticketmasterApi.getEvents(
        filters.query,
        filters.eventType === "all" ? undefined : filters.eventType,
        {
          startDateTime: filters.date?.toISOString().split("T")[0],
          city: filters.location === "all locations" ? undefined : filters.location,
        }
      );

      const filteredEvents = events.filter((event: TicketmasterEvent) => {
        const eventPrice = event.priceRanges?.[0]?.min || 0;
        const matchesPrice = eventPrice >= filters.priceRange[0] && 
                           eventPrice <= filters.priceRange[1];

        return matchesPrice;
      });

      setSearchResults(filteredEvents);
    } catch (error) {
      console.error("Error searching events:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Search Events</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Input
                placeholder="Search events, artists, venues..."
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Select
                  value={filters.eventType}
                  onValueChange={(value: ClassificationKey | "all") => 
                    setFilters({ ...filters, eventType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.date ? format(filters.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.date}
                      onSelect={(date) => setFilters({ ...filters, date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Select
                  value={filters.location}
                  onValueChange={(value) => setFilters({ ...filters, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Price Range</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">${filters.priceRange[0]}</span>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                    className="flex-1"
                  />
                  <span className="text-sm">${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search Events"
              )}
            </Button>
          </div>

          {hasSearched && (
            <ScrollArea className="flex-1 px-1">
              {isSearching ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
                  {searchResults.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <p className="text-lg font-medium">No events found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};