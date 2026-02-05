'use client';

import { useEffect } from 'react';

export default function PaymentStep({ setPaymentMethod, onNext }) {
  // Force Cash on Delivery
  useEffect(() => {
    setPaymentMethod('cod');
  }, [setPaymentMethod]);

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

      <div className="border border-[#031B28] rounded p-4 bg-gray-50">
        <p className="font-medium text-[#031B28]">
          Cash on Delivery
        </p>
        <p className="text-sm text-gray-600 mt-1">
          You will pay in cash when your order is delivered.
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-8 bg-[#031B28] text-white p-3 w-full rounded hover:opacity-90 transition"
      >
        Review Order
      </button>
    </>
  );
}
