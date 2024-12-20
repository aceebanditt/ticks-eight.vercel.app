import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EventCard, EventCardProps } from "./EventCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface EventCarouselProps {
  title: string;
  events: EventCardProps[];
  categoryLink?: string;
}

export const EventCarousel = ({ title, events, categoryLink }: EventCarouselProps) => {
  if (!events.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {categoryLink && (
          <Link href={categoryLink}>
            <Button variant="ghost" className="group font-semibold hover:bg-transparent">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </div>
      <div className="relative -mx-4 px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {events.map((event, index) => (
              <CarouselItem key={event.event.id || index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <EventCard {...event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 h-12 w-12 rounded-full border-2 bg-white/95 hover:bg-white shadow-lg transition-all duration-200 hover:scale-105">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </CarouselPrevious>
          <CarouselNext className="right-0 h-12 w-12 rounded-full border-2 bg-white/95 hover:bg-white shadow-lg transition-all duration-200 hover:scale-105">
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};