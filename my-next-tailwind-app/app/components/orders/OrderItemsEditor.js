'use client';

import { useState } from 'react';
import { useUpdateOrderItem } from '../../hooks/useOrderItemHooks';

const OrderItem = ({ item }) => {
  const [qty, setQty] = useState(item.quantity);
  const updateItem = useUpdateOrderItem();

  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="font-medium">{item.product?.name || 'Product'}</p>
        <p className="text-sm text-gray-500">Price: ${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={qty}
          min="1"
          className="border rounded px-2 py-1 w-16"
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => updateItem.mutate({ id: item.id, data: { quantity: qty } })}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const OrderItemsEditor = ({ items }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Order Items</h2>
      {items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderItemsEditor;
