import { Trash2, Pencil } from 'lucide-react';

const OrderList = ({ orders, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {orders.map((order) => (
      <div key={order.id} className="border p-4 rounded shadow-sm">
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => onEdit(order)}><Pencil size={18} /></button>
          <button onClick={() => onDelete(order.id)}><Trash2 size={18} /></button>
        </div>
      </div>
    ))}
  </div>
);

export default OrderList;
