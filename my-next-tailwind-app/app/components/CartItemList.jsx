"use client";

import { useState } from "react";
import { useCreateOrder } from "../hooks/useOrderHooks";
import { useDeleteCart, useUpdateCartItem } from "../hooks/useCartHooks";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useGuestId } from "../utils/guestId";
import { toast } from "react-toastify";

const CartItemList = ({
  items = [],
  onDelete,
  onClearCart,
  onCheckout,
  shippingAddressInput = "Not specified",
  selectedShippingFee = 0,
  promoInput = null,
}) => {
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: clearCart } = useDeleteCart();
  const { mutate: createOrder, isLoading } = useCreateOrder();
  const { user } = useAuth();
  const guestId = useGuestId();

  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  const handleUpdateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;
    updateCartItem({ id: cartItemId, quantity });
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * (item.price || 0),
    0
  );

  const handleClearCart = () => {
    const cartId = items[0]?.cartId || null;
    if (cartId) clearCart(cartId);
  };

  const handleCheckout = () => {
    if (items.length === 0 || totalPrice === 0) {
      toast.error("Your cart is empty. Cannot checkout.");
      return;
    }

    const mappedItems = items.map((item) => ({
      product_id: item.productId ?? null,
      quantity: item.quantity ?? 1,
      price: item.price ?? 0,
    }));

    const hasInvalidItem = mappedItems.some(
      (item) => !item.product_id || item.quantity < 1
    );
    if (hasInvalidItem) {
      toast.error("One or more cart items are missing product details.");
      return;
    }

    const orderData = {
      user_id: user?.id || null,
      guest_id: !user?.id && guestId ? guestId : null,
      status: "pending",
      address: shippingAddressInput,
      shipping_fees: Number(selectedShippingFee),
      promocode: promoInput,
      items: mappedItems,
    };

    createOrder(orderData, {
      onSuccess: (response) => {
        const orderId = response?.order?.id;
        if (!orderId) {
          toast.error("Order creation failed. No order ID received.");
          return;
        }
        toast.success("Order placed successfully!");
        handleClearCart();
        if (onCheckout) onCheckout(orderId);
        window.location.href = `/checkout?id=${orderId}`;
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.error ||
            error.message ||
            "Checkout failed. Please try again."
        );
      },
    });
  };

  return (
    <div className="relative">
      {items.length > 0 && (
        <button
          onClick={handleClearCart}
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
                <div
                  key={key}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden bg-transparent rounded border">
                    <div className="w-full h-full p-2">
                      <img
                        src={item.image?.[0] || "/placeholder.jpg"}
                        alt={item.name || "Product image"}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-medium mb-1">
                      {item.name || "Unnamed Product"}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      ${item.price?.toFixed(2) || "0.00"} × {item.quantity}
                    </p>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          item.cartItemId,
                          Number(e.target.value)
                        )
                      }
                      className="w-16 mt-1 px-2 py-1 border rounded text-sm"
                    />
                  </div>

                  <button
                    onClick={() => onDelete(item.cartItemId)}
                    className="text-gray-800 text-sm hover:underline ml-auto"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-2">
            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 text-sm"
              onClick={() => (window.location.href = "/cart")}
            >
              View Cart
            </button>
            <button
              disabled={isLoading}
              className="w-full bg-[#E2C269] text-black py-2 rounded hover:bg-[#d1a72f] text-sm disabled:opacity-50"
              onClick={() => {
                if (!user) {
                  setShowGuestPrompt(true);
                } else {
                  handleCheckout();
                }
              }}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}

      {showGuestPrompt && (
        <div className="fixed inset-0  flex items-center justify-center z-50" style={{ backdropFilter: "blur(6px)" }}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Continue as Guest?</h3>
            <p className="text-sm mb-6">
              Would you like to continue as a guest or log in to your account?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowGuestPrompt(false);
                  handleCheckout();
                }}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm"
              >
                Continue as Guest
              </button>
              <button
                onClick={() => {
                  window.location.href = "/login";
                }}
                className="px-4 py-2 bg-[#E2C269] text-black rounded hover:bg-[#d1a72f] text-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemList;
