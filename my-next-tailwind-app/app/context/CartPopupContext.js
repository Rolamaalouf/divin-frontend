// CartPopupContext.js
'use client'
import React, { createContext, useContext, useState } from "react";

const CartPopupContext = createContext();

export const useCartPopup = () => useContext(CartPopupContext);

export const CartPopupProvider = ({ children }) => {
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  return (
    <CartPopupContext.Provider value={{ cartPopupOpen, setCartPopupOpen }}>
      {children}
    </CartPopupContext.Provider>
  );
};
