'use client';
import { useRouter } from "next/navigation";
import OrderItemList from "./OrderItemList";

export default function SuccessStep({ orderId }) {
  const router = useRouter();
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">Thanks for your purchase!</h2>
      <OrderItemList orderId={orderId} />
      <button
        onClick={() => router.push("/wines")}
        className="bg-[#A68F7B] text-white p-3 rounded mt-6"
      >
        Return to Shopping
      </button>
    </div>
  );
}
