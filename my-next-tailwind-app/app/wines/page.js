// app/checkout/page.tsx or app/orders/page.tsx
import { Suspense } from "react";
import WinesPage from "../components/WinesPage";

export default function WinesPageWrapper() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <WinesPage />
    </Suspense>
  );
}
