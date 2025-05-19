'use client';

export default function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  payment,
  updatePayment,
  guestInfo,
  updateGuestInfo,
  onNext,
}) {
  return (
    <>
      <h3 className="text-lg font-semibold">Choose Payment Method</h3>
      <div className="flex gap-4 my-4">
        {["card", "cod", "wish"].map((method) => (
          <button
            key={method}
            className={`border px-4 py-2 rounded ${
              paymentMethod === method ? "bg-[#031B28] text-white" : ""
            }`}
            onClick={() => setPaymentMethod(method)}
          >
            {method === "card" && "Credit Card"}
            {method === "cod" && "Cash on Delivery"}
            {method === "wish" && "Wish Money"}
          </button>
        ))}
      </div>

      {paymentMethod === "card" && (
        <div className="grid gap-4 mt-4">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={payment.cardName}
            onChange={(e) => updatePayment({ cardName: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Card Number"
            value={payment.cardNumber}
            onChange={(e) =>
              updatePayment({ cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16) })
            }
            className="border p-2 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              value={payment.expDate}
              onChange={(e) => updatePayment({ expDate: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              value={payment.cvv}
              onChange={(e) =>
                updatePayment({ cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })
              }
              className="border p-2 rounded"
            />
          </div>
        </div>
      )}

      {paymentMethod === "wish" && (
        <div className="mt-4 text-sm text-gray-600 space-y-2">

          <p>Amount to be transfered to +961376933662</p>
        </div>
      )}

      <button onClick={onNext} className="mt-8 bg-[#031B28] text-white p-3 w-full rounded">
        Review Order
      </button>
    </>
  );
}
