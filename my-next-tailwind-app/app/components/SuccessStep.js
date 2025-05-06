'use client';

import { useOrderItemsByOrderId } from "../hooks/useOrderItemHooks";
import { useRouter } from "next/navigation";

export default function SuccessStep({ orderId, shippingFee = 0 }) {
  const { data: orderItems, isLoading, isError } = useOrderItemsByOrderId(orderId);
  const router = useRouter();

  if (isLoading) return <p>Loading order summary...</p>;
  if (isError || !orderItems || orderItems.length === 0)
    return <p>Order not found or empty.</p>;

  const itemsTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = itemsTotal + shippingFee;

  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h2>
      <p className="text-lg mb-6">Thank you for your purchase.</p>

      <div className="bg-gray-50 border rounded-lg p-6 shadow w-full max-w-md text-left">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
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
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="pt-4 mt-4 border-t space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${itemsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* 🎈 Return to Shopping Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3 bg-[#1B2930] text-white rounded-full font-semibold flex items-center gap-2 hover:bg-red-900 transition-all duration-300 "
      >
        🍷 Return to Shopping
      </button>
    </div>
  );
}
