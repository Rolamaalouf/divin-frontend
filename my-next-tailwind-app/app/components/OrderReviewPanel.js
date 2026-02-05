'use client';

import { useState } from "react";
import OrderItemList from "./OrderItemList";

export default function OrderReviewPanel({
  step,
  orderId,
  showShippingFee = false,
  shippingFee = 0,
}) {
  const [subtotal, setSubtotal] = useState(0);

  if (step === 4) return null;

  const total = subtotal + (showShippingFee ? shippingFee : 0);

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h4 className="font-semibold mb-4 text-lg">Order Summary</h4>

      <OrderItemList
        orderId={orderId}
        onSubtotalChange={setSubtotal}
      />

      <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {showShippingFee && (
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="font-medium">
              ${shippingFee.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between border-t pt-2 font-semibold text-base text-black">
          <span>Total</span>
          <span>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
