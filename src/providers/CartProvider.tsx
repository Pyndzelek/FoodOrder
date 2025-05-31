import { createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

//rzeczy które zwraca context
type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: string, delta: number) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
  updateQuantity: (id: string, delta: number) => {},
  total: 0,
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem["size"]) => {
    // Check if the item already exists in the cart
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      // If it exists, just increase the quantity
      updateQuantity(existingItem.id, 1);
      return;
    }
    // If it doesn't exist, create a new cart item
    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: randomUUID(), // Unique ID based on product ID and size
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + delta } : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const total = parseFloat(
    items
      .reduce((sum, item) => (sum += item.product.price * item.quantity), 0)
      .toFixed(2)
  );

  return (
    <CartContext.Provider value={{ items, onAddItem, updateQuantity, total }}>
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

export default CartProvider;
