'use client';

import { useParams } from 'next/navigation';
import { useOrder } from '@/app/hooks/useOrderHooks';
import OrderDetail from '@/app/components/orders/OrderDetail';

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { data: order, isLoading, isError } = useOrder(id);
  console.log('Order:', order);


  if (isLoading) return <div>Loading...</div>;
  if (isError || !order) return <div>Error loading order</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-4xl mx-auto">
      <hr className="my-6" />
     {/* Optionally still show details below */}
      <OrderDetail order={order} />
    </div>
  );
}
