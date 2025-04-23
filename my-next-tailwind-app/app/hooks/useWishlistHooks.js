import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createWishlistItem,
  getWishlist,
  deleteWishlistItem,
} from '../lib/api';
import { getOrCreateGuestId } from '../utils/guestId';
export const useWishlist = () =>
  useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

// hooks/useWishlistHooks.js
export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => {
        const guest_id = getOrCreateGuestId(); // Get guest ID here
        return createWishlistItem({ ...data, guest_id });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      },
    });
  };
  

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
