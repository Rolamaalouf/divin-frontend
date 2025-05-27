"use client";

import React from "react";

const WishlistItemList = ({ items = [], onDelete }) => {
  if (!items || items.length === 0) {
    return <p className="text-gray-500 italic">Your wishlist is empty.</p>;
  }

  return (
    <div>
      <h2 className="font-semibold text-xl mb-6">My Wishlist</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-2"
          >
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 flex items-center justify-center overflow-hidden border rounded-lg bg-gray-50">
                <img
                  src={item.product.image?.[0] || "/placeholder.jpg"}
                  alt={item.product.name || "Product image"}
                  className="object-contain w-full h-full p-2"
                />
              </div>
              <p className="font-medium text-gray-800 text-sm sm:text-base break-words max-w-[160px]">
                {item.product?.name}
              </p>
            </div>

            <button
              onClick={() => onDelete(item.id)}
              className="text-gray-500 hover:text-red-600 text-xl font-bold px-2"
              aria-label="Remove"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistItemList;
