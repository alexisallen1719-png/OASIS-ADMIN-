'use client';
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null if not logged in, object if logged in
  const [cart, setCart] = useState([]); // array of service objects
  const [referralActive, setReferralActive] = useState(false);

  const loginUser = (profileData) => {
    setUser(profileData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const toggleReferral = () => {
    setReferralActive(prev => !prev);
  }

  const addToCart = (service) => {
    setCart(prev => {
      // Avoid duplicates
      if (prev.some(s => s.id === service.id)) return prev;
      return [...prev, service];
    });
  };

  const removeFromCart = (serviceId) => {
    setCart(prev => prev.filter(s => s.id !== serviceId));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      user, loginUser, logoutUser,
      cart, addToCart, removeFromCart, clearCart,
      referralActive, toggleReferral
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
