import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createWishlistItem,
  getWishlist,
  deleteWishlistItem,
} from '../lib/api';

export const useWishlist = () =>
  useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWishlistItem,
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
