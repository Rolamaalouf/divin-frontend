'use client';

import { useState } from 'react';
import {
  useOrders,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
} from '../../hooks/useOrderHooks';
import {
  useOrderItems,
  useCreateOrderItem,
  useUpdateOrderItem,
  useDeleteOrderItem,
} from '../../hooks/useOrderItemHooks';

import OrderList from '../../components/orders/OrderList';
import OrderForm from '../../components/orders/OrderForm';
import OrderItemList from '../../components/orders/OrderItemList';
import OrderItemForm from '../../components/orders/OrderItemForm';

const AdminOrdersPage = () => {
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const { data: orders = [] } = useOrders();
  const { data: orderItems = [] } = useOrderItems();

  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const createItem = useCreateOrderItem();
  const updateItem = useUpdateOrderItem();
  const deleteItem = useDeleteOrderItem();

  const handleOrderSubmit = (data) => {
    if (editingOrder) {
      updateOrder.mutate({ id: editingOrder.id, data });
    } else {
      createOrder.mutate(data);
    }
    setEditingOrder(null);
  };

  const handleItemSubmit = (data) => {
    if (editingItem) {
      updateItem.mutate({ id: editingItem.id, data });
    } else {
      createItem.mutate(data);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-8 p-6">
      <section>
        <h1 className="text-2xl font-bold">Orders</h1>
        <OrderForm initialData={editingOrder} onSubmit={handleOrderSubmit} onCancel={() => setEditingOrder(null)} />
        <OrderList
          orders={orders}
          onEdit={setEditingOrder}
          onDelete={deleteOrder.mutate}
        />
      </section>

      <section>
        <h2 className="text-xl font-bold">Order Items</h2>
        <OrderItemForm initialData={editingItem} onSubmit={handleItemSubmit} onCancel={() => setEditingItem(null)} />
        <OrderItemList
          orderItems={orderItems}
          onEdit={setEditingItem}
          onDelete={deleteItem.mutate}
        />
      </section>
    </div>
  );
};

export default AdminOrdersPage;
