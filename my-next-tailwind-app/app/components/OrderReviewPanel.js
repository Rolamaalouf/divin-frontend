'use client';

import OrderItemList from "./OrderItemList";

export default function OrderReviewPanel({ step, orderId, showShippingFee = false, shippingFee = 0 }) {
  if (step === 4) return null;

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h4 className="font-semibold mb-4 text-lg">Order Summary</h4>
      <OrderItemList orderId={orderId} />
      {showShippingFee && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
          <p>Shipping Fee: <span className="font-medium">${shippingFee.toFixed(2)}</span></p>
        </div>
      )}
    </div>
  );
}
