import { createContext, useContext, useReducer, ReactNode } from "react";
import { TicketmasterEvent } from "@/services/ticketmaster";

interface CartItem {
  event: TicketmasterEvent;
  quantity: number;
  priceRange: {
    type: string;
    min: number;
    max: number;
  };
  maxAvailable: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { eventId: string; quantity: number } }
  | { type: "UPDATE_AVAILABILITY"; payload: { eventId: string; maxAvailable: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const basePrice = item.priceRange.min;
    const fees = basePrice * 0.15;
    return sum + (basePrice + fees) * item.quantity;
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        item => item.event.id === action.payload.event.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        const newQuantity = Math.min(
          updatedItems[existingItemIndex].quantity + action.payload.quantity,
          updatedItems[existingItemIndex].maxAvailable
        );
        updatedItems[existingItemIndex].quantity = newQuantity;
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.event.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map(item =>
        item.event.id === action.payload.eventId
          ? { 
              ...item, 
              quantity: Math.min(action.payload.quantity, item.maxAvailable)
            }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case "UPDATE_AVAILABILITY": {
      const updatedItems = state.items.map(item =>
        item.event.id === action.payload.eventId
          ? { 
              ...item, 
              maxAvailable: action.payload.maxAvailable,
              quantity: Math.min(item.quantity, action.payload.maxAvailable)
            }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};