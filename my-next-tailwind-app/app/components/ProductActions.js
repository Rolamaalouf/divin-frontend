import { useState } from "react"
import { toast } from "react-toastify"
import { useAddToCart } from "../hooks/useCartHooks"
import { useAddToWishlist } from "../hooks/useWishlistHooks"
import { useUpdateCartItem } from "../hooks/useCartHooks"

const ProductActions = ({ product, currentUser }) => {
  const [quantity, setQuantity] = useState(1)
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart()
  const { mutate: addToWishlist, isPending: addingToWishlist } = useAddToWishlist()
  const { mutate: updateCartItem, isPending: updatingCartItem } = useUpdateCartItem()

  const handleAddToCart = () => {
    if (!product || !product.id) {
      toast.error("Invalid product data")
      return
    }

    if (quantity < 1) {
      toast.error("Please select a valid quantity")
      return
    }

    if (product.stock < quantity) {
      toast.error(`Only ${product.stock} items available in stock`)
      return
    }

    addToCart(
      {
        product_id: product.id,
        quantity: quantity,
        user_id: currentUser?.id || null,
      },
      {
        onSuccess: () => toast.success("Added to cart!"),
        onError: (err) => {
          console.error("Add to cart error:", err)
          toast.error(err.response?.data?.message || "Failed to add to cart")
        },
      }
    )
  }

  const handleUpdateQuantity = (cartItemId) => {
    if (quantity < 1) {
      toast.error("Quantity must be greater than 0")
      return
    }

    updateCartItem(
      { id: cartItemId, quantity },
      {
        onSuccess: () => toast.success("Cart item updated!"),
        onError: (err) => {
          console.error("Update cart item error:", err)
          toast.error(err.response?.data?.message || "Failed to update cart item")
        },
      }
    )
  }

  const handleAddToWishlist = () => {
    addToWishlist(
      { 
        product_id: product.id,
      },
      {
        onSuccess: () => toast.success("Added to wishlist!"),
        onError: (err) => {
          console.error("Add to wishlist error:", err);
          toast.error(err.response?.data?.message || "Failed to add to wishlist");
        },
      },
    )
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-sm">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <span className="text-xs text-gray-500">In stock: {product.stock}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={addingToCart || product.stock < 1}
          className="bg-[#1B2930] text-white px-4 py-2 rounded hover:brightness-110 disabled:opacity-50"
        >
          {addingToCart ? "Adding..." : product.stock < 1 ? "Out of Stock" : "Add to Cart"}
        </button>
        <button
          onClick={handleAddToWishlist}
          disabled={addingToWishlist}
          className="bg-[#E2C269] text-[#1B2930] px-4 py-2 rounded hover:brightness-110 disabled:opacity-50"
        >
          {addingToWishlist ? "Adding..." : "Add to Wishlist"}
        </button>
      </div>
    </div>
  )
}

export default ProductActions
