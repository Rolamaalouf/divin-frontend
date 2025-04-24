import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCart, getMyCartItems, getCarts, createCartItem, getCartItems, deleteCartItem, updateCartItem } from "../lib/api"
import { getOrCreateGuestId } from "../utils/cartUtils"

export const useCartItems = () =>
  useQuery({
    queryKey: ["cart-items"],
    queryFn: getMyCartItems,
  })

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ product_id, quantity, user_id }) => {
      try {
        // Step 1: Try to fetch existing carts
        const carts = await getCarts()
        const guest_id = getOrCreateGuestId()

        let cart = carts.find((c) => (user_id ? c.user_id === user_id : c.guest_id === guest_id))

        // Step 2: If no cart exists, create one
        if (!cart) {
          const response = await createCart({ user_id, guest_id })
          cart = response.data || response // Handle different response formats
        }

        if (!cart || !cart.id) {
          throw new Error("Failed to create or find cart")
        }

        // Step 3: Add item to the found or created cart
        const response = await createCartItem({
          cart_id: cart.id,
          product_id,
          quantity,
        })

        return response.data || response // Handle different response formats
      } catch (error) {
        console.error("Add to cart error:", error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] })
    },
  })
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] })
    },
  })
}
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, quantity }) => {
      return await updateCartItem(id, { quantity })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] })
    },
  })
}