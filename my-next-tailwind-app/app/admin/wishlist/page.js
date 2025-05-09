'use client';

import { useWishlist } from '../../hooks/useWishlistHooks';

export default function AdminWishlistPage() {
  const { data: wishlists, isLoading, error } = useWishlist({ useMyEndpoint: true });

  if (isLoading) return <p className="p-4">Loading wishlists...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading wishlists</p>;
  if (!wishlists?.length) return <p className="p-4">No customer wishlists found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Wishlists (Customers & Guests)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr style={{ backgroundColor: '#34434F' }} className="text-white">
              <th className="py-2 px-4 text-left">Wishlist ID</th>
              <th className="py-2 px-4 text-left">Product ID</th>
              <th className="py-2 px-4 text-left">User / Guest</th>
            </tr>
          </thead>
          <tbody>
            {wishlists.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.product_id}</td>
                <td className="py-2 px-4">
                  {item.user_id
                    ? `User ID: ${item.user_id}`
                    : item.guest_id
                    ? `Guest (${item.guest_id.slice(0, 8)}...)`
                    : 'Unknown'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
