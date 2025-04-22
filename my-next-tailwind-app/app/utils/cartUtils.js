// utils/cartUtils.js
import { v4 as uuidv4 } from "uuid"

export const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem("guest_id")

  if (!guestId) {
    guestId = uuidv4()
    localStorage.setItem("guest_id", guestId)
  }

  return guestId
}

export const getOrCreateCart = async (currentUser, createCartFn, getCartsFn) => {
  try {
    const userId = currentUser?.id
    const guestId = getOrCreateGuestId()

    // Try to fetch existing carts
    const carts = await getCartsFn()

    // Find cart for current user or guest
    let cart = carts.find((c) => (userId ? c.user_id === userId : c.guest_id === guestId))

    // If no cart exists, create one
    if (!cart) {
      cart = await createCartFn({
        user_id: userId || null,
        guest_id: guestId,
      })
    }

    return cart
  } catch (error) {
    console.error("Error in getOrCreateCart:", error)
    throw error
  }
}
