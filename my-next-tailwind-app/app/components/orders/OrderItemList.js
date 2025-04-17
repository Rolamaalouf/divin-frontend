import { Trash2, Pencil } from 'lucide-react';

const OrderItemList = ({ orderItems, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    {orderItems.map((item) => (
      <div key={item.id} className="border p-4 rounded shadow-sm">
        <p><strong>Product ID:</strong> {item.product_id}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => onEdit(item)}><Pencil size={18} /></button>
          <button onClick={() => onDelete(item.id)}><Trash2 size={18} /></button>
        </div>
      </div>
    ))}
  </div>
);

export default OrderItemList;
