import { useState, useEffect, useCallback } from "react";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { useDebounce } from "@/hooks/useDebounce";

interface LocationEventsState {
  events: TicketmasterEvent[];
  isLoading: boolean;
  error: string | null;
  isMockData: boolean;
}

interface UseLocationEventsProps {
  category?: string;
  size?: number;
  latitude?: number | null;
  longitude?: number | null;
  sort?: string;
}

export const useLocationEvents = ({
  category,
  size = 8,
  latitude,
  longitude,
  sort = "date,asc"
}: UseLocationEventsProps) => {
  const [state, setState] = useState<LocationEventsState>({
    events: [],
    isLoading: true,
    error: null,
    isMockData: false
  });

  const debouncedLat = useDebounce(latitude, 500);
  const debouncedLng = useDebounce(longitude, 500);

  const fetchEvents = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const today = new Date().toISOString().split("T")[0];

      const events = await ticketmasterApi.getEvents(
        undefined,
        category,
        {
          size,
          startDateTime: today,
          sort
        },
        debouncedLat,
        debouncedLng
      );

      setState({
        events,
        isLoading: false,
        error: null,
        isMockData: false
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch events",
        events: []
      }));
    }
  }, [category, size, sort, debouncedLat, debouncedLng]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return state;
};