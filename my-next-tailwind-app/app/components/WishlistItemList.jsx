// components/WishlistItemList.jsx
import React from 'react';

const WishlistItemList = ({ items = [], onDelete }) => {
  return (
    <div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Wishlist is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">{item.product?.name}</p>
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistItemList;
