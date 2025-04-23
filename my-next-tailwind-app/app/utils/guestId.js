import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'guest_id';

export function getOrCreateGuestId() {
  if (typeof window === 'undefined') return null;

  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
}
export function clearGuestId() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GUEST_ID_KEY);
}

