'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createWishlistItem,
  getWishlist,
  getMyWishlist,
  deleteWishlistItem
} from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useGuestId } from "../utils/guestId";

// GET wishlist (choose between getWishlist and getMyWishlist based on `useMyEndpoint`)
export const useWishlist = ({ useMyEndpoint = false } = {}) => {
  const { user, loading } = useAuth();
  const guestId = useGuestId();

  const enabled = !loading && (!!user || !!guestId);

  return useQuery({
    queryKey: ['wishlist', useMyEndpoint ? 'my' : (user?.id ?? guestId)],
    queryFn: () =>
      useMyEndpoint
        ? getMyWishlist(user?.id ?? null, guestId)
        : getWishlist(user?.id ?? null, guestId),
    enabled,
  });
};

// ADD to wishlist
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const guestId = useGuestId();

  return useMutation({
    mutationFn: async (data) => {
      const user_id = user?.id ?? null;
      return await createWishlistItem({ ...data, user_id, guest_id: guestId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id ?? guestId] });
      queryClient.invalidateQueries({ queryKey: ['wishlist', 'my'] });
    },
  });
};

// REMOVE from wishlist
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const guestId = useGuestId();

  return useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id ?? guestId] });
      queryClient.invalidateQueries({ queryKey: ['wishlist', 'my'] });
    },
  });
};
