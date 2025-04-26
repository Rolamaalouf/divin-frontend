'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/AuthContext';

const GuestIdContext = createContext(null);

export const useGuestId = () => useContext(GuestIdContext);

const GuestIdProvider = ({ children }) => {
  const { user } = useAuth();
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (user) {
      localStorage.removeItem('guest_id');
      setGuestId(null);
    } else {
      let id = localStorage.getItem('guest_id');
      if (!id) {
        id = uuidv4();
        localStorage.setItem('guest_id', id);
      }
      setGuestId(id);
    }
  }, [user]);

  return (
    <GuestIdContext.Provider value={guestId}>
      {children}
    </GuestIdContext.Provider>
  );
};

export default GuestIdProvider;
