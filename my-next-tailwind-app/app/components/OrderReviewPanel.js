'use client';
import OrderItemList from "./OrderItemList";

export default function OrderReviewPanel({ step, orderId }) {
  if (step === 4) return null;
  return (
    <div className="mt-12">
      <h4 className="font-semibold mb-2">Items in Your Order</h4>
      <OrderItemList orderId={orderId} />
    </div>
  );
}
