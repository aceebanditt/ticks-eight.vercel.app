import axios, { AxiosError, AxiosInstance } from "axios";
import { cacheService } from "./cache";

const API_KEY = "wWXckOYSX4Muz1dZLmDGFA4uQv20ksND";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const DEFAULT_RADIUS = "50";

export type ClassificationKey = "music" | "sports" | "theatre" | "comedy" | "family" | string;

export interface TicketmasterVenue {
  id: string;
  name: string;
  city?: {
    name: string;
  };
  state?: {
    stateCode: string;
  };
  country?: {
    name: string;
    countryCode: string;
  };
  address?: {
    line1: string;
    line2?: string;
  };
  location?: {
    longitude: string;
    latitude: string;
  };
  generalInfo?: {
    generalRule?: string;
    childRule?: string;
  };
  seatmap?: {
    staticUrl: string;
  };
  boxOfficeInfo?: {
    phoneNumberDetail?: string;
    openHoursDetail?: string;
    acceptedPaymentDetail?: string;
    willCallDetail?: string;
  };
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
}

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
    status: {
      code: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      id?: string;
      name: string;
      city?: {
        name: string;
      };
      state?: {
        stateCode: string;
      };
      seatmap?: {
        staticUrl: string;
      };
    }>;
  };
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
  images?: Array<{
    url: string;
    ratio: string;
    width: number;
    height: number;
  }>;
  classifications?: Array<{
    segment: {
      id: string;
      name: string;
    };
    family: boolean;
  }>;
  seatmap?: {
    staticUrl: string;
  };
  pleaseNote?: string;
  ticketLimit?: {
    info: string;
  };
  availability?: {
    limit: number;
    available: number;
    status: "AVAILABLE" | "LIMITED" | "SOLD_OUT";
  };
}

export interface GetEventsOptions {
  size?: number;
  page?: number;
  sort?: string;
  startDateTime?: string;
  endDateTime?: string;
  city?: string;
  stateCode?: string;
  includeFamily?: boolean;
  includeTBA?: boolean;
  includeTBD?: boolean;
  includeTest?: boolean;
  genreId?: string;
  subGenreId?: string;
  radius?: string;
}

const CLASSIFICATION_MAP: Record<ClassificationKey, string> = {
  music: "KZFzniwnSyZfZ7v7nJ",
  sports: "KZFzniwnSyZfZ7v7nE",
  theatre: "KZFzniwnSyZfZ7v7na",
  comedy: "KZFzniwnSyZfZ7v7n1",
  family: "KZFzniwnSyZfZ7v7n1",
};

const formatDateForApi = (date: string): string => {
  return `${date}T00:00:00Z`;
};

const validateApiKey = () => {
  if (!API_KEY) {
    throw new Error("Ticketmaster API key is not configured");
  }
};

const handleApiResponse = (response: any) => {
  if (!response || (!response._embedded && !response.page)) {
    throw new Error("Invalid API response format");
  }
  return response;
};

const enrichEventWithAvailability = (event: TicketmasterEvent): TicketmasterEvent => {
  if (!event.availability) {
    const isAvailable = event.dates?.status?.code !== "cancelled" && 
                       event.dates?.status?.code !== "offsale";
    const maxAvailable = 8;
    const randomAvailable = isAvailable ? Math.floor(Math.random() * maxAvailable) + 1 : 0;
    
    event.availability = {
      limit: maxAvailable,
      available: randomAvailable,
      status: isAvailable 
        ? randomAvailable <= 2 
          ? "LIMITED" 
          : "AVAILABLE"
        : "SOLD_OUT"
    };
  }
  return event;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  params: {
    apikey: API_KEY
  }
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequestWithRetry = async <T>(
  request: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (retries === 0 || !(error instanceof AxiosError)) {
      throw error;
    }

    if (error.response?.status === 429) {
      await sleep(RETRY_DELAY * 2);
    } else {
      await sleep(RETRY_DELAY);
    }
    
    return makeRequestWithRetry(request, retries - 1);
  }
};

export const ticketmasterApi = {
  getEvents: async (
    keyword?: string, 
    classificationName?: ClassificationKey, 
    options: GetEventsOptions = {},
    latitude?: number | null,
    longitude?: number | null
  ): Promise<TicketmasterEvent[]> => {
    try {
      validateApiKey();

      const cacheParams = {
        keyword,
        classificationName,
        ...options,
        latitude,
        longitude
      };

      const cachedEvents = cacheService.getEvents(cacheParams);
      if (cachedEvents) {
        return cachedEvents;
      }
      
      const startDateTime = options.startDateTime ? formatDateForApi(options.startDateTime) : undefined;
      const endDateTime = options.endDateTime ? formatDateForApi(options.endDateTime) : undefined;
      const segmentId = classificationName ? CLASSIFICATION_MAP[classificationName] : undefined;

      const response = await makeRequestWithRetry(() => 
        axiosInstance.get("/events", {
          params: {
            keyword,
            segmentId,
            countryCode: "US",
            size: options.size || 20,
            page: options.page || 0,
            sort: options.sort || "date,asc",
            startDateTime,
            endDateTime,
            city: options.city,
            stateCode: options.stateCode,
            latlong: latitude && longitude ? `${latitude},${longitude}` : undefined,
            radius: options.radius || (latitude && longitude ? DEFAULT_RADIUS : undefined),
            unit: "miles",
            includeFamily: options.includeFamily,
            includeTBA: options.includeTBA ?? false,
            includeTBD: options.includeTBD ?? false,
            includeTest: options.includeTest ?? false,
            genreId: options.genreId,
            subGenreId: options.subGenreId
          }
        })
      );

      const parsedResponse = handleApiResponse(response.data);
      const events = parsedResponse._embedded?.events || [];
      
      if (events.length === 0) {
        if (latitude && longitude) {
          return await ticketmasterApi.getEvents(keyword, classificationName, {
            ...options,
            radius: String(Number(options.radius || DEFAULT_RADIUS) + 50)
          });
        }
        throw new Error("No events found for the specified criteria.");
      }
      
      const enrichedEvents = events.map(enrichEventWithAvailability);
      cacheService.setEvents(cacheParams, enrichedEvents);
      
      return enrichedEvents;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new Error("Invalid API key. Please check your Ticketmaster API configuration.");
        }
        if (error.response?.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
      }
      throw error;
    }
  },

  getEventById: async (eventId: string): Promise<TicketmasterEvent | null> => {
    try {
      validateApiKey();

      const cachedEvent = cacheService.getSingleEvent(eventId);
      if (cachedEvent) {
        return cachedEvent;
      }
      
      const response = await makeRequestWithRetry(() =>
        axiosInstance.get(`/events/${eventId}`)
      );

      const enrichedEvent = enrichEventWithAvailability(response.data);
      cacheService.setSingleEvent(eventId, enrichedEvent);

      return enrichedEvent;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error("Event not found.");
        }
        if (error.response?.status === 401) {
          throw new Error("Invalid API key. Please check your Ticketmaster API configuration.");
        }
      }
      throw error;
    }
  },

  getVenueById: async (venueId: string): Promise<TicketmasterVenue | null> => {
    try {
      validateApiKey();

      const cachedVenue = cacheService.getVenue(venueId);
      if (cachedVenue) {
        return cachedVenue;
      }
      
      const response = await makeRequestWithRetry(() =>
        axiosInstance.get(`/venues/${venueId}`)
      );

      const venue = response.data;
      cacheService.setVenue(venueId, venue);

      return venue;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error("Venue not found.");
        }
        if (error.response?.status === 401) {
          throw new Error("Invalid API key. Please check your Ticketmaster API configuration.");
        }
      }
      throw error;
    }
  }
};