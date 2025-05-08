// app/checkout/page.tsx or app/orders/page.tsx
import { Suspense } from "react";
import OrdersPage from "../../components/OrdersPage";

export default function OrdersPageWrapper() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <OrdersPage />
    </Suspense>
  );
}
