import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketmasterEvent, ticketmasterApi } from "@/services/ticketmaster";
import { AlertCircle, CreditCard, MapPin, Calendar } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const CheckoutPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<TicketmasterEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        setLoading(true);
        const eventData = await ticketmasterApi.getEventById(eventId as string);
        if (!eventData) {
          throw new Error("Event not found");
        }
        setEvent(eventData);
      } catch (err) {
        setError("Unable to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const basePrice = event?.priceRanges?.[0]?.min || 0;
  const fees = basePrice * 0.15;
  const total = (basePrice + fees) * quantity;
  const venue = event?._embedded?.venues?.[0];
  const venueName = venue?.name || "Venue TBA";
  const cityName = venue?.city?.name;
  const locationDisplay = cityName ? `${venueName}, ${cityName}` : venueName;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-8">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Event not found"}</AlertDescription>
        </Alert>
        <Button 
          className="mt-4" 
          variant="outline"
          onClick={() => router.push("/")}
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - {event.name} | Your Choice Tickets</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h2 className="text-2xl font-bold">{event.name}</h2>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(event.dates.start.localDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{locationDisplay}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <div className="relative">
                    <Input id="card" placeholder="4242 4242 4242 4242" />
                    <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="8" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(8, Math.max(1, parseInt(e.target.value) || 1)))}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ticket Price</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service Fee</span>
                    <span>${fees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Quantity</span>
                    <span>x{quantity}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Complete Purchase
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  By completing this purchase you agree to our terms of service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;