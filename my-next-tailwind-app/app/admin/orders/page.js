'use client';

import Link from 'next/link';
import { useOrders, useDeleteOrder, useUpdateOrder } from '@/app/hooks/useOrderHooks';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();
  const deleteOrder = useDeleteOrder();
  const updateOrder = useUpdateOrder();
  const queryClient = useQueryClient();

  const [editingStatus, setEditingStatus] = useState({}); // { orderId: status }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      deleteOrder.mutate(id, {
        onSuccess: () => toast.success('Order deleted successfully'),
        onError: () => toast.error('Failed to delete order'),
      });
    }
  };

  const handleStatusChange = (orderId, status) => {
    setEditingStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleStatusUpdate = (order) => {
    const newStatus = editingStatus[order.id];
    if (!newStatus || newStatus === order.status) return;

    updateOrder.mutate(
      { id: order.id, data: { status: newStatus } },
      {
        onSuccess: () => {
          toast.success(`Order #${order.id} updated to ${newStatus}`);
          queryClient.invalidateQueries(['orders']); // Refresh without full reload
        },
        onError: () => {
          toast.error('Failed to update order');
        },
      }
    );
  };

  if (isLoading) return <div className="p-6 text-gray-600">Loading orders...</div>;
  if (isError || !orders) return <div className="p-6 text-red-600">Failed to load orders.</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <table className="min-w-full border border-[#34434F] bg-white shadow-sm">
        <thead className="bg-[#34434F] text-white">
          <tr>
            <th className="py-3 px-4 border-b">Order ID</th>
            <th className="py-3 px-4 border-b">Customer</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Shipping Fee</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="py-3 px-4 border-b text-center">{order.id}</td>
              <td className="py-3 px-4 border-b text-center">
  {order.user ? (
    <>
      <div>{order.user.name}</div>
      <div className="text-sm text-gray-500">{order.user.email}</div>
    </>
  ) : (
    <>
      <div>{order.name || 'Guest'}</div>
      <div className="text-sm text-gray-500">{order.email || 'N/A'}</div>
    </>
  )}
</td>


              <td className="py-3 px-4 border-b text-center">
                <select
                  value={editingStatus[order.id] || order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">Placed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleStatusUpdate(order)}
                  className="ml-2 bg-[#1B2930] text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </td>

              <td className="py-3 px-4 border-b text-center">${order.shipping_fees?.toFixed(2)}</td>
              <td className="py-3 px-4 border-b text-center">
                <div className="flex items-center justify-center gap-2">
                  <Link href={`/admin/orders/${order.id}`}>
                    <Eye className="text-blue-600 hover:text-blue-800 cursor-pointer" size={18} />
                  </Link>
                  <button onClick={() => handleDelete(order.id)}>
                    <Trash2 className="text-red-600 hover:text-red-800 cursor-pointer" size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
