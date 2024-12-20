import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TicketmasterEvent } from "@/services/ticketmaster";

export interface EventCardProps {
  event: TicketmasterEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const venue = event._embedded?.venues?.[0];
  const venueName = venue 
    ? `${venue.name}${venue.city?.name ? `, ${venue.city.name}` : ""}${venue.state?.stateCode ? `, ${venue.state.stateCode}` : ""}`
    : "Venue TBA";
  const price = event.priceRanges?.[0] 
    ? `$${Math.floor(event.priceRanges[0].min)}+`
    : "Price TBA";
  const imageUrl = event.images?.find(img => img.ratio === "16_9" && img.width >= 640)?.url || 
                  event.images?.[0]?.url || 
                  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80";
  const eventDate = event.dates?.start?.localDate 
    ? new Date(event.dates.start.localDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      })
    : "Date TBA";
  const hasSeatmap = Boolean(event.seatmap?.staticUrl || venue?.seatmap?.staticUrl);

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="group relative w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
          <Image
            src={imageUrl}
            alt={event.name || "Event image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
            unoptimized={true}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <p className="text-xl font-bold text-white line-clamp-1">{event.name || "Event Title"}</p>
            <div className="flex items-center text-sm text-white/90">
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center text-sm text-white/90">
              <MapPinIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{venueName}</span>
            </div>
            {hasSeatmap && (
              <div className="flex items-center text-sm text-white/90">
                <TicketIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                <span>Seating Chart Available</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/95 text-black px-4 py-2 rounded-full font-bold shadow-lg transform transition-transform duration-300 group-hover:scale-105">
            {price}
          </span>
        </div>
      </Card>
    </Link>
  );
};