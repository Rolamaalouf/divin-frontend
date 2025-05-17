'use client';

import Link from 'next/link';
import { useOrders, useDeleteOrder, useUpdateOrder } from '@/app/hooks/useOrderHooks';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();
  const deleteOrder = useDeleteOrder();
  const updateOrder = useUpdateOrder();
  const queryClient = useQueryClient();

  const [editingStatus, setEditingStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this order?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteOrder.mutate(id, {
              onSuccess: () => toast.success('Order deleted successfully'),
              onError: () => toast.error('Failed to delete order'),
            });
          },
        },
        {
          label: 'No',
        },
      ],
    });
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
          queryClient.invalidateQueries(['orders']);
        },
        onError: () => toast.error('Failed to update order'),
      }
    );
  };

  if (isLoading) return <div className="p-6 text-gray-600">Loading orders...</div>;
  if (isError || !orders) return <div className="p-6 text-red-600">Failed to load orders.</div>;

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">All Orders</h1>

      {/* Scrollable table container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border border-[#34434F] bg-white shadow-sm">
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
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition text-center">
                <td className="py-3 px-4 border-b">{order.id}</td>
                <td className="py-3 px-4 border-b">
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

                <td className="py-3 px-4 border-b">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                    <select
                      value={editingStatus[order.id] || order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="pending">Placed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleStatusUpdate(order)}
                      className="bg-[#1B2930] text-white px-2 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                  </div>
                </td>

                <td className="py-3 px-4 border-b">${order.shipping_fees?.toFixed(2)}</td>

                <td className="py-3 px-4 border-b">
                  <div className="flex justify-center items-center gap-2">
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

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? 'bg-[#34434F] text-white' : 'bg-white'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
