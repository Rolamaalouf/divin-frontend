"use client";

import React from "react";

const WishlistItemList = ({ items = [], onDelete }) => {
  if (!items || items.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">My Wishlist</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
            <img
  src={item.product?.image?.[0] || '/placeholder.jpg'}
  alt={item.product?.name ?? 'Product'}
  width={60}
  height={60}
  className="rounded object-contain"
/>

  <div>
    <p className="font-semibold">{item.product?.name}</p>
    <button
      onClick={() => onDelete(item.id)}
      className="mt-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
    >
      Remove
    </button>
  </div>
</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistItemList;
