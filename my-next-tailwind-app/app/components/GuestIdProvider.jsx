'use client';

import { useEffect, useState } from 'react';
import { getOrCreateGuestId } from '../utils/guestId';

const GuestIdProvider = ({ children }) => {
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    const id = getOrCreateGuestId();
    setGuestId(id);
  }, []);

  return <>{children}</>;
};

export default GuestIdProvider;
