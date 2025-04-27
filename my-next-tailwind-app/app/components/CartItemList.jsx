"use client";

import { useDeleteCart, useUpdateCartItem } from "../hooks/useCartHooks";
import { Trash2 } from "lucide-react";


const CartItemList = ({ items = [], onDelete, onClearCart }) => {
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: clearCart } = useDeleteCart();  // Using the deleteCart mutation


  const handleUpdateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      return; // silently ignore invalid quantity
    }

    updateCartItem({ id: cartItemId, quantity });
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * (item.price || 0),
    0
  );

  const handleClearCart = () => {
    // Prefer cartId from items, fallback to null (do NOT use guestId here)
    const cartId = items[0]?.cartId || null;

    if (cartId) {
      clearCart(cartId);
    }
    // silently ignore if no cartId found
  };

  return (
    <div className="relative">
      {/* Clear Cart Button */}
      {items.length > 0 && (
        <button
          onClick={handleClearCart}  // Clear the entire cart
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          aria-label="Clear Cart"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => {
              const key = item.cartItemId ?? `cart-item-${index}`;
              return (
                <div key={key} className="flex items-center gap-4 border-b pb-4">
                  {/* Product Image */}
                  <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden bg-white rounded border">
                    <div className="w-full h-full p-2">
                      <img
                        src={item.image?.[0] || "/placeholder.jpg"}
                        alt={item.name || "Product image"}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-medium mb-1">{item.name || "Unnamed Product"}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      ${item.price?.toFixed(2) || "0.00"} × {item.quantity}
                    </p>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleUpdateQuantity(item.cartItemId, Number(e.target.value))
                      }
                      className="w-16 mt-1 px-2 py-1 border rounded text-sm"
                    />
                  </div>

                  {/* Remove single item */}
                  <button
                    onClick={() => onDelete(item.cartItemId)}
                    className="text-red-600 text-sm hover:underline ml-auto"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Total and Actions */}
          <div className="mt-6 space-y-2">
            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 text-sm"
              onClick={() => (window.location.href = "/cart")}
            >
              View Cart
            </button>
            <button
              className="w-full bg-[#E2C269] text-black py-2 rounded hover:bg-[#d1a72f] text-sm"
              onClick={() => (window.location.href = "/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItemList;
