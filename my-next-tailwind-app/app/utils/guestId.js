import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useGuestId = () => {
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("guest_id");
      if (!id) {
        id = uuidv4();
        localStorage.setItem("guest_id", id);
      }
      setGuestId(id);
    }
  }, []);

  return guestId;
};
