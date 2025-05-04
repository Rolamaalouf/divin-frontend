'use client';
import OrderItemList from "./OrderItemList";

export default function ReviewStep({ address, shippingFee, paymentMethod, orderId, onPlaceOrder, loading }) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>
      <div className="mb-2"><strong>Region:</strong> {address.region}</div>
      <div className="mb-2"><strong>Phone:</strong> {address.phone}</div>
      <div className="mb-2"><strong>Shipping Fee:</strong> ${shippingFee}</div>
      <div className="mb-2"><strong>Payment Method:</strong> {paymentMethod}</div>

      <OrderItemList orderId={orderId} />

      <button
        onClick={onPlaceOrder}
        disabled={loading}
        className="mt-8 w-full bg-[#A68F7B] text-white p-3 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </>
  );
}
