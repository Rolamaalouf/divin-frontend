"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { ShoppingCart, Heart, Plus, Minus, Loader2 } from "lucide-react"
import { useAddToCart } from "../hooks/useCartHooks"
import { useAddToWishlist } from "../hooks/useWishlistHooks"
import { useCartPopup } from "../context/CartPopupContext"

const ProductActions = ({
  product,
  currentUser,
  showStock = false,
  hideWishlist = false,
  onAddedToCart,
  variant = "default", // default, compact, minimal
}) => {
  const [quantity, setQuantity] = useState(1)
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart()
  const { mutate: addToWishlist, isPending: addingToWishlist } = useAddToWishlist()
  const { setCartPopupOpen } = useCartPopup()

  const handleAddToCart = () => {
    if (!product?.id) return toast.error("Invalid product data")
    if (quantity < 1) return toast.error("Select a valid quantity")
    if (product.stock < quantity) return toast.error(`Only ${product.stock} in stock`)

    addToCart(
      { product_id: product.id, quantity },
      {
        onSuccess: () => {
          if (onAddedToCart) onAddedToCart()
          setCartPopupOpen(true)
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to add to cart"),
      },
    )
  }

  const handleAddToWishlist = () => {
    addToWishlist(
      { product_id: product.id },
      {
        onSuccess: () => toast.success("Added to wishlist!"),
        onError: (err) => toast.error(err.response?.data?.message || "Failed to add to wishlist"),
      },
    )
  }

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock))
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const handleInputChange = (e) => {
    let value = e.target.value
    if (value === "") {
      setQuantity("")
      return
    }
    value = Number(value)
    if (isNaN(value)) return
    if (value < 1) value = 1
    else if (value > product.stock) value = product.stock
    setQuantity(value)
  }

  const handleInputBlur = () => {
    if (quantity === "" || Number(quantity) < 1) {
      setQuantity(1)
    }
  }

  const isOutOfStock = product.stock < 1

  return (
    <div className="relative space-y-6">
      {/* Wishlist Floating Button */}
      {!hideWishlist && (
        <button
          onClick={handleAddToWishlist}
          disabled={addingToWishlist}
          className="absolute top-[-338] right-0 z-10 m-2 p-2 bg-white rounded-full shadow-md text-[#031B28] hover:text-[#E2C269] transition-colors duration-200 disabled:opacity-50"
          aria-label="Add to wishlist"
        >
          {addingToWishlist ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
        </button>
      )}

      {/* Stock Information */}
      {showStock && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Availability:</span>
          <span className={`font-medium ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
            {isOutOfStock ? "Out of Stock" : `${product.stock} in stock`}
          </span>
        </div>
      )}

      {/* Elegant Quantity Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-[#E2C269] transition-colors duration-200">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1 || quantity === ""}
            className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 group"
            type="button"
          >
            <Minus className="h-4 w-4 text-gray-600 group-hover:text-[#031B28]" />
          </button>
          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="flex-1 px-4 py-3 text-center text-lg font-semibold text-gray-800 border-none outline-none bg-transparent"
            aria-label="Quantity"
          />
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 group"
            type="button"
          >
            <Plus className="h-4 w-4 text-gray-600 group-hover:text-[#031B28]" />
          </button>
        </div>
      </div>

      {/* Responsive Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={handleAddToCart}
          disabled={addingToCart || isOutOfStock}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#031B28] to-[#042530] text-white py-4 px-6 rounded font-semibold text-lg hover:from-[#042530] hover:to-[#053540] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        >
          {addingToCart ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="hidden xs:inline">Adding to Cart...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden xs:inline">{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
              <span className="xs:hidden">{isOutOfStock ? "Out" : "Add"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductActions
