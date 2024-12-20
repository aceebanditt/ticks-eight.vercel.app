import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { CreditCard, MapPin, Calendar, Trash2 } from "lucide-react";

const Cart = () => {
  const router = useRouter();
  const { state, dispatch } = useCart();

  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/");
    }
  }, [state.items.length, router]);

  const handleRemoveItem = (eventId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: eventId });
  };

  const handleUpdateQuantity = (eventId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(eventId);
      return;
    }
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { eventId, quantity: Math.min(8, quantity) },
    });
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Checkout - Your Choice Tickets</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {state.items.map((item) => {
                  const basePrice = item.priceRange.min;
                  const fees = basePrice * 0.15;
                  const total = (basePrice + fees) * item.quantity;
                  const venue = item.event._embedded?.venues?.[0];
                  const eventDate = new Date(item.event.dates.start.localDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <div key={item.event.id} className="space-y-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.event.images?.[0]?.url || "https://images.unsplash.com/photo-1514933651103-005eec06c04b"}
                            alt={item.event.name}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{item.event.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{eventDate}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{venue?.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.event.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.event.id, item.quantity + 1)}
                              disabled={item.quantity >= 8}
                            >
                              +
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => handleRemoveItem(item.event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="font-medium">${total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            ${basePrice.toFixed(2)} + ${fees.toFixed(2)} fee
                          </p>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  );
                })}
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
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => {
                  const basePrice = item.priceRange.min;
                  const fees = basePrice * 0.15;
                  const total = (basePrice + fees) * item.quantity;

                  return (
                    <div key={item.event.id} className="flex justify-between text-sm">
                      <span>{item.event.name} (x{item.quantity})</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  );
                })}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
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

export default Cart;