'use client';

import { useEffect } from "react";
import { useOrderItemsByOrderId } from "../hooks/useOrderItemHooks";

export default function OrderItemList({ orderId, onSubtotalChange }) {
  const { data: orderItems, isLoading, isError } =
    useOrderItemsByOrderId(orderId);

  // ✅ Always define subtotal (even if empty)
  const subtotal = Array.isArray(orderItems)
    ? orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    : 0;

  // ✅ Hook is ALWAYS called
  useEffect(() => {
    if (onSubtotalChange) {
      onSubtotalChange(subtotal);
    }
  }, [subtotal, onSubtotalChange]);

  // ⬇️ Now safe to return conditionally
  if (isLoading) return <p>Loading items...</p>;

  if (isError || !orderItems || orderItems.length === 0) {
    return <p>No bottles in your order.</p>;
  }

  return (
    <div className="border-t mt-4 pt-4">
      <h4 className="font-semibold mb-2">Items:</h4>

      <ul className="divide-y">
        {orderItems.map((item) => (
          <li key={item.id} className="py-4 flex items-center gap-4">
            <img
              src={item.product?.image?.[0] || "/placeholder.jpg"}
              alt={item.product?.name || "Product"}
              className="w-16 h-16 object-contain rounded border"
            />
            <div className="flex-1">
              <span className="block font-medium">
                {item.product?.name || "Product"}
              </span>
              <span className="text-sm text-gray-600">
                {item.quantity} × ${item.price.toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
