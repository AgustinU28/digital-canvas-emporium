
import React, { createContext, useContext, useState } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Actualizado",
          description: `${product.title} actualizado en el carrito`,
        });
        
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "¡Agregado al carrito!",
          description: `${product.title} añadido al carrito`,
        });
        
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      
      if (updatedItems.length !== prevItems.length) {
        toast({
          title: "Producto eliminado",
          description: "Se ha eliminado el producto del carrito",
          variant: "destructive",
        });
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrito vacío",
      description: "Se han eliminado todos los productos del carrito",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
