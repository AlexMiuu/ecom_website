// src/context/CartContext.js
import React, { createContext, useState } from 'react';

/**
 * CartContext provides global cart state:
 * - cart: array of cart items
 * - addToCart: function to add item
 * - removeFromCart: function to remove item
 * - showCart: boolean to toggle slide-out UI
 * - setShowCart: function to open/close cart panel
 */

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setShowCart(true); // Auto-open cart panel on add
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, showCart, setShowCart }}>
      {children}
    </CartContext.Provider>
  );
}
