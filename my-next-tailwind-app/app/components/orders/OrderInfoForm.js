'use client'
import { useState } from 'react';
import { useUpdateOrder } from '../../hooks/useOrderHooks'

const OrderInfoForm = ({ order }) => {
  const [status, setStatus] = useState(order.status || '');
  const [shippingFee, setShippingFee] = useState(order.shipping_fee || 0);
  const updateOrder = useUpdateOrder();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder.mutate({
      id: order.id,
      data: { status, shipping_fee: shippingFee },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Order Status</label>
        <select
          className="mt-1 border px-2 py-1 rounded w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Shipping Fee ($)</label>
        <input
          type="number"
          value={shippingFee}
          onChange={(e) => setShippingFee(Number(e.target.value))}
          className="mt-1 border px-2 py-1 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Order Info
      </button>
    </form>
  );
};

export default OrderInfoForm;