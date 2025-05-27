"use client";

import { useState } from "react";
import { useCreateOrder } from "../hooks/useOrderHooks";
import { useDeleteCart, useUpdateCartItem } from "../hooks/useCartHooks";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useGuestId } from "../utils/guestId";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

  const [showModal, setShowModal] = useState(false);

  const handleUpdateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;
    updateCartItem({ id: cartItemId, quantity });
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * (item.price || 0),
    0
  );

  const handleClearCart = () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete the entire cart?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const cartId = items[0]?.cartId || null;
            if (cartId) clearCart(cartId);
            toast.success("Cart cleared successfully");
          },
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const finalizeCheckout = () => {
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
        const cartId = items[0]?.cartId;
        if (cartId) {
          localStorage.setItem("lastCartId", cartId);
        }
        if (!orderId) {
          toast.error("Order creation failed. No order ID received.");
          return;
        }
        toast.success("Finalizing purchase!");
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

  const handleCheckoutClick = () => {
    if (items.length === 0 || totalPrice === 0) {
      toast.error("Your cart is empty. Cannot checkout.");
      return;
    }

    if (user) {
      finalizeCheckout();
    } else {
      setShowModal(true);
    }
  };

  const handleModalAction = (action) => {
    setShowModal(false);
    if (action === "guest") {
      finalizeCheckout();
    } else if (action === "login") {
      window.location.href = "/login";
    }
  };

  return (
    <div className="relative px-4 sm:px-0 flex flex-col h-[120vh] bg-white">
      {items.length > 0 && (
        <button
          onClick={handleClearCart}
          className="absolute -top-1 right-1 text-red-600 hover:text-red-800"
          aria-label="Clear Cart"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-gray-600 text-center mt-8">Start shopping.</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
            {items.map((item, index) => {
              const key = item.cartItemId ?? `cart-item-${index}`;
              return (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
                >
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden bg-white border rounded">
                    <img
                      src={item.image?.[0] || "/placeholder.jpg"}
                      alt={item.name || "Product image"}
                      className="object-contain w-full h-full p-1"
                    />
                  </div>
                  <div className="flex-1 w-full flex flex-col justify-center text-center sm:text-left">
                    <p className="font-medium text-sm sm:text-base break-words">
                      {item.name || "Unnamed Product"}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      ${item.price?.toFixed(2) || "0.00"} × {item.quantity}
                    </p>
                    <div className="flex justify-center sm:justify-start mt-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.cartItemId,
                            Number(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 border rounded text-xs sm:text-sm"
                        aria-label={`Quantity for ${item.name || "product"}`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end sm:justify-start sm:items-start w-full sm:w-auto">
                    <button
                      onClick={() => onDelete(item.cartItemId)}
                      className="text-gray-800 text-xs sm:text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* STICKY CHECKOUT FOOTER */}
          <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 pb-2 mt- border-t space-y-2 text-center sm:text-left z-10">
            <p className="font-semibold text-sm sm:text-base">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button
              disabled={isLoading}
              className="w-full bg-[#E2C269] text-black py-2 rounded hover:bg-[#d1a72f] text-sm disabled:opacity-50"
              onClick={handleCheckoutClick}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-[#FFFFFF]/70 bg-opacity-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm mx-auto text-center">
            <h3 id="checkout-modal-title" className="text-lg font-semibold mb-4">
              Proceed to checkout
            </h3>
            <p className="text-sm mb-6">Choose how you want to continue</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleModalAction("guest")}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm"
              >
                ✅ Continue as Guest
              </button>
              <button
                onClick={() => handleModalAction("login")}
                className="px-4 py-2 bg-[#1B2930] text-white rounded hover:bg-[#10181d] text-sm"
              >
                🔐 Login
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#1B2930] text-white rounded hover:bg-[#10181d] text-sm"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemList;
