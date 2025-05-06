'use client';

import React, { useState } from 'react';
import { useMyOrderItems } from '../hooks/useOrderItemHooks'; // adjust path if needed
import dayjs from 'dayjs'; // Make sure you install dayjs: `npm install dayjs`
import Header from '../components/header';

const OrdersHistoryPage = () => {
  const { data: orderItems, isLoading, isError } = useMyOrderItems();
  const [selectedDate, setSelectedDate] = useState('');

  if (isLoading) return <p className="p-4">Loading your order history...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load order history.</p>;

  const completedItems = orderItems?.filter(
    (item) => item.Order?.status !== 'pending'
  );

  // Filter by selected date
  const filteredItems = selectedDate
    ? completedItems.filter((item) =>
        dayjs(item.createdAt).format('YYYY-MM-DD') === selectedDate
      )
    : completedItems;

  return (
      <>
<div className="bg-[#1B2930] sticky top-0 z-50">
  <Header />
</div>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-[#34434F] font-bold mb-6">Bottles ordered</h1>

      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Filter by Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate('')}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-gray-600">No orders found for the selected date.</p>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-xl shadow hover:shadow-md transition"
            >
<img
  src={item.product?.image?.[0] || "/placeholder.jpg"}
  alt={item.product?.name || "Product"}
  className="w-16 h-16 object-contain rounded border"
/>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-lg text-[#34434F] font-semibold">{item.product?.name}</h2>
                  <span className="text-sm text-gray-500">
                    {dayjs(item.createdAt).format('DD MMM YYYY')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  Quantity: {item.quantity} &middot; ${item.price}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Status: <span className="capitalize">{item.Order?.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default OrdersHistoryPage;
