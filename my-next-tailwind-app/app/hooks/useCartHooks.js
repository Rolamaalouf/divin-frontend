import { useAuth } from "../context/AuthContext"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCart,
  getCarts,
  createCartItem,
  deleteCartItem,
  updateCartItem,
  getMyCartItems,
  deleteCart
} from "../lib/api";
import { useGuestId } from "../utils/guestId";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Helper to generate the query key based on user or guest
const getCartKey = (user, guestId) => ["cart-items", user?.id ?? guestId];

// GET my cart items
export const useCartItems = () => {
  const { user, loading } = useAuth();
  const guestId = useGuestId();
  const enabled = !loading && (!!user || !!guestId);
  const key = getCartKey(user, guestId);

  return useQuery({
    queryKey: key,
    queryFn: () => getMyCartItems(user?.id ?? null, guestId),
    enabled,
  });
};

// ADD to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const guestId = useGuestId();
  const key = getCartKey(user, guestId);
  return useMutation({
    mutationFn: async ({ product_id, quantity }) => {
      const user_id = user?.id ?? null;
      const carts = await getCarts();

      let cart = carts.find(c =>
        user_id ? c.user_id === user_id : c.guest_id === guestId
      );

      if (!cart) {
        cart = await createCart({ user_id, guest_id: guestId });
        cart = cart.data || cart;
      }

      if (!cart?.id) throw new Error("Failed to find or create cart");

      const response = await createCartItem({
        cart_id: cart.id,
        product_id,
        quantity,
      });

      return response.data || response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
};

// REMOVE from cart
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const guestId = useGuestId();
  const key = getCartKey(user, guestId);

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to remove cart item");
    },
  });
};

// DELETE the entire cart
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const guestId = useGuestId();
  const key = getCartKey(user, guestId);

  return useMutation({
    mutationFn: (cartId) => deleteCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to clear the cart");
    },
  });
};

// Invalidate cart when auth changes
export const useSyncCartOnAuthChange = () => {
  const { user } = useAuth();
  const guestId = useGuestId();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: getCartKey(user, guestId) });
  }, [user, guestId, queryClient]);
};

// UPDATE cart item quantity
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const guestId = useGuestId();
  const key = getCartKey(user, guestId);

  return useMutation({
    mutationFn: async ({ id, quantity }) => {
      return await updateCartItem(id, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update cart item");
    },
  });
};
