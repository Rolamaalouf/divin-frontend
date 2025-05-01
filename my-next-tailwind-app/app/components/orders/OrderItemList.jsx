import { Trash2, Pencil } from 'lucide-react';
import { useOrderItemsByOrderId } from "../hooks/useOrderItemHooks";

const OrderList = ({ orders, onEdit, onDelete }) => (
  <table className="w-full border border-collapse text-sm">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-3 py-2">ID</th>
        <th className="border px-3 py-2">Status</th>
        <th className="border px-3 py-2">Shipping Fees</th>
        <th className="border px-3 py-2">Items</th> {/* Updated Items column */}
        <th className="border px-3 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => {
        const { data: orderItems, isLoading, isError } = useOrderItemsByOrderId(order.id);

        return (
          <tr key={order.id}>
            <td className="border px-3 py-2">{order.id}</td>
            <td className="border px-3 py-2">{order.status}</td>
            <td className="border px-3 py-2">${order.shipping_fees}</td>
            <td className="border px-3 py-2">
              {isLoading ? (
                <p>Loading items...</p>
              ) : isError || !orderItems || orderItems.length === 0 ? (
                <p>No items</p>
              ) : (
                <ul className="list-disc pl-4">
                  {orderItems.map((item) => (
                    <li key={item.id}>
                      {/* Display product_id, quantity, and price */}
                      Product ID: {item.product_id} - Qty: {item.quantity} - Price: ${item.price}
                    </li>
                  ))}
                </ul>
              )}
            </td>
            <td className="border px-3 py-2 flex gap-2">
              <button onClick={() => onEdit(order)}><Pencil size={16} /></button>
              <button onClick={() => onDelete(order.id)}><Trash2 size={16} /></button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default OrderList;
