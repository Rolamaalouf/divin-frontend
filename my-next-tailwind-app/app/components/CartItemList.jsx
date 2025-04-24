import React from 'react';
import { useRemoveCartItem, useUpdateCartItem } from '../hooks/useCartHooks';

const CartItemList = ({ items = [], onDelete }) => {
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: deleteCartItem } = useRemoveCartItem();

  const handleUpdateQuantity = (cartItemId, quantity) => {
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
    );
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">{item.product?.name}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                  min={1}
                />
                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
              </div>
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItemList;
