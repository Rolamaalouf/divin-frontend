'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import { useOrders } from "../../hooks/useOrderHooks";
import { useCreateOrder } from "../../hooks/useOrderHooks";
import { useUpdateOrder } from "../../hooks/useOrderHooks";
import { useDeleteOrder } from "../../hooks/useOrderHooks";
import { useOrderItems } from "../../hooks/useOrderItemHooks";
import OrderList from "../../components/orders/OrderList";
import OrderForm from "../../components/orders/OrderForm";

const AdminOrdersPage = () => {
  const [editingOrder, setEditingOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders();

  const { data: orderItems = [] } = useOrderItems(); // assuming it returns all items

  const createOrder = useCreateOrder({
    onSuccess: () => toast.success("Order created successfully"),
    onError: () => toast.error("Failed to create order"),
  });

  const updateOrder = useUpdateOrder({
    onSuccess: () => toast.success("Order updated successfully"),
    onError: () => toast.error("Failed to update order"),
  });

  const deleteOrder = useDeleteOrder({
    onSuccess: () => toast.success("Order deleted successfully"),
    onError: () => toast.error("Failed to delete order"),
  });

  const handleOrderSubmit = (data) => {
    if (editingOrder) {
      updateOrder.mutate({ id: editingOrder.id, data });
    } else {
      createOrder.mutate(data);
    }
    setEditingOrder(null);
    setShowOrderForm(false);
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowOrderForm(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders.</p>;
  console.log("All Order Items:", orderItems);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <button
        onClick={handleAddOrder}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Order
      </button>

      {showOrderForm && (
        <OrderForm
          initialData={editingOrder}
          onSubmit={handleOrderSubmit}
          onCancel={() => setShowOrderForm(false)}
        />
      )}

      <OrderList
        orders={orders}
        orderItems={orderItems}
        onEdit={(order) => {
          setEditingOrder(order);
          setShowOrderForm(true);
        }}
        onDelete={deleteOrder.mutate}
      />
    </section>
  );
};

export default AdminOrdersPage;
