import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";
import Image from "next/image";

export const CartSheet = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();

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

  const handleCheckout = () => {
    if (state.items.length === 1) {
      router.push(`/checkout/${state.items[0].event.id}`);
    } else {
      router.push("/checkout/cart");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {state.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {state.items.map((item) => {
                  const basePrice = item.priceRange.min;
                  const fees = basePrice * 0.15;
                  const total = (basePrice + fees) * item.quantity;

                  return (
                    <div key={item.event.id} className="space-y-3">
                      <div className="flex space-x-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.event.images?.[0]?.url || "https://images.unsplash.com/photo-1514933651103-005eec06c04b"}
                            alt={item.event.name}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-medium leading-none">{item.event.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${basePrice.toFixed(2)} + ${fees.toFixed(2)} fee
                          </p>
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
                        <div className="w-20 text-right">
                          <p className="font-medium">${total.toFixed(2)}</p>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="space-y-4 pt-4">
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${state.total.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};