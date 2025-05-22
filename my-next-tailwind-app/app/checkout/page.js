import { Suspense } from "react";
import OrdersPage from '../components/OrdersPage'

export default function OrdersPageWrapper() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <div className="min-h-screen flex flex-col">
        {/* Main content grows to fill available space */}
        <main className="flex-1">
          <OrdersPage />
        </main>
        {/* Footer can go here if needed */}
      </div>
    </Suspense>
  );
}
