'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useOrderItems } from '../hooks/useOrderItemHooks';
import { useOrders } from '../hooks/useOrderHooks';
import dayjs from 'dayjs';
import { Sparklines, SparklinesBars } from 'react-sparklines';


export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const { data: orderItems, isLoading: loadingItems } = useOrderItems();
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const [filterYear, setFilterYear] = useState(dayjs().year());

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  const reports = useMemo(() => {
    if (!orderItems || !orders) return { topProducts: [], salesByMonth: [], totals: { quantity: 0, amount: 0 } };

    const itemsWithOrders = orderItems.map(item => {
      const order = orders.find(o => o.id === item.order_id);
      return { ...item, order };
    }).filter(entry => entry.order);

    const productSalesMap = {};
    itemsWithOrders.forEach(({ product_id, quantity }) => {
      productSalesMap[product_id] = (productSalesMap[product_id] || 0) + quantity;
    });

    const topProducts = Object.entries(productSalesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([productId, quantity]) => ({ productId, quantity }));

    const monthlySales = Array(12).fill(null).map(() => ({ quantity: 0, amount: 0 }));

    itemsWithOrders.forEach(({ quantity, price, order }) => {
      const orderDate = dayjs(order.createdAt);
      if (orderDate.year() === parseInt(filterYear)) {
        const monthIndex = orderDate.month();
        monthlySales[monthIndex].quantity += quantity;
        monthlySales[monthIndex].amount += quantity * price;
      }
    });

    const salesByMonth = monthlySales.map((data, i) => ({
      month: dayjs().month(i).format('MMMM'),
      quantity: data.quantity,
      amount: data.amount,
    }));

    const totals = salesByMonth.reduce(
      (acc, curr) => ({
        quantity: acc.quantity + curr.quantity,
        amount: acc.amount + curr.amount,
      }),
      { quantity: 0, amount: 0 }
    );

    return { topProducts, salesByMonth, totals };
  }, [orderItems, orders, filterYear]);

  if (loading || loadingItems || loadingOrders) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6 text-white">You must be logged in to access this page.</div>;
  }

  return (
    <div className="text-black p-6">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="mb-8">Welcome, {user.email} 👋</p>

      <div className="mb-6">
        <label className="font-medium mr-2">Filter by Year:</label>
        <input
          type="number"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Top Products */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Top 3 Sold Products</h2>
        <ul className="space-y-2">
          {reports.topProducts.map((p, idx) => (
            <li key={p.productId} className="border p-3 rounded shadow-sm">
              #{idx + 1} – Product ID: <strong>{p.productId}</strong> — Sold: <strong>{p.quantity}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly Sales Bar Chart */}
<div className="mt-10 mb-10">
  <h2 className="text-xl font-semibold mb-2">Monthly Sales Chart ({filterYear})</h2>
  <div className="bg-white p-4 rounded shadow w-full md:w-2/3">
    <h3 className="text-md font-medium mb-2">Units Sold (Bar Chart)</h3>
    <div className="relative">
      <Sparklines data={reports.salesByMonth.map(d => d.quantity)} limit={12} width={500} height={80} margin={5}>
        <SparklinesBars style={{ fill: "#E2C269" }} />
      </Sparklines>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-2">
        {Array.from({ length: 12 }, (_, idx) => (
          <span key={idx} className="text-xs text-center">{idx + 1}</span>
        ))}
      </div>
    </div>
  </div>
</div>



{/* Monthly Sales Table */}
<div className="mb-10">
  <h2 className="text-xl font-semibold mb-2">Monthly Sales Table ({filterYear})</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border">
      <thead style={{ backgroundColor: '#34434F', color: 'white' }}>
        <tr>
          <th className="border px-4 py-2 text-left">Month</th>
          <th className="border px-4 py-2 text-left">Units Sold</th>
          <th className="border px-4 py-2 text-left">Amount ($)</th>
        </tr>
      </thead>
      <tbody>
        {reports.salesByMonth.map(({ month, quantity, amount }) => (
          <tr key={month}>
            <td className="border px-4 py-2">{month}</td>
            <td className="border px-4 py-2">{quantity}</td>
            <td className="border px-4 py-2">${amount.toFixed(2)}</td>
          </tr>
        ))}
        <tr className="font-bold bg-gray-100">
          <td className="border px-4 py-2">Total</td>
          <td className="border px-4 py-2">{reports.totals.quantity}</td>
          <td className="border px-4 py-2">${reports.totals.amount.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


    </div>
  );
}
