import { createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";

//rzeczy które zwraca context
type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: `${product.id}-${size}`, // Unique ID based on product ID and size
    };
    setItems([newCartItem, ...items]);
  };

  return (
    <CartContext.Provider value={{ items, onAddItem }}>
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
