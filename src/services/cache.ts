import { TicketmasterEvent, TicketmasterVenue } from "./ticketmaster";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

interface Cache {
  events: { [key: string]: CacheItem<TicketmasterEvent[]> };
  venues: { [key: string]: CacheItem<TicketmasterVenue> };
  singleEvents: { [key: string]: CacheItem<TicketmasterEvent> };
}

const CACHE_DURATION = {
  EVENTS: 5 * 60 * 1000, // 5 minutes
  VENUE: 30 * 60 * 1000, // 30 minutes
  SINGLE_EVENT: 15 * 60 * 1000 // 15 minutes
};

class CacheService {
  private cache: Cache = {
    events: {},
    venues: {},
    singleEvents: {}
  };

  private generateCacheKey(params: Record<string, any>): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join("|");
  }

  private isExpired<T>(item: CacheItem<T>): boolean {
    return Date.now() - item.timestamp > item.expiresIn;
  }

  getEvents(params: Record<string, any>): TicketmasterEvent[] | null {
    const key = this.generateCacheKey(params);
    const cached = this.cache.events[key];

    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    if (cached) {
      delete this.cache.events[key];
    }

    return null;
  }

  setEvents(params: Record<string, any>, events: TicketmasterEvent[]): void {
    const key = this.generateCacheKey(params);
    this.cache.events[key] = {
      data: events,
      timestamp: Date.now(),
      expiresIn: CACHE_DURATION.EVENTS
    };
  }

  getVenue(venueId: string): TicketmasterVenue | null {
    const cached = this.cache.venues[venueId];

    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    if (cached) {
      delete this.cache.venues[venueId];
    }

    return null;
  }

  setVenue(venueId: string, venue: TicketmasterVenue): void {
    this.cache.venues[venueId] = {
      data: venue,
      timestamp: Date.now(),
      expiresIn: CACHE_DURATION.VENUE
    };
  }

  getSingleEvent(eventId: string): TicketmasterEvent | null {
    const cached = this.cache.singleEvents[eventId];

    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    if (cached) {
      delete this.cache.singleEvents[eventId];
    }

    return null;
  }

  setSingleEvent(eventId: string, event: TicketmasterEvent): void {
    this.cache.singleEvents[eventId] = {
      data: event,
      timestamp: Date.now(),
      expiresIn: CACHE_DURATION.SINGLE_EVENT
    };
  }

  clearCache(): void {
    this.cache = {
      events: {},
      venues: {},
      singleEvents: {}
    };
  }
}

export const cacheService = new CacheService();