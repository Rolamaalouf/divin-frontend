'use client';

export default function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  onNext,
}) {
  return (
    <>
      <h3 className="text-lg font-semibold">Choose Payment Method</h3>

      <div className="flex gap-4 my-4">
        {["cod", "wish"].map((method) => (
          <button
            key={method}
            type="button"
            className={`border px-4 py-2 rounded transition ${
              paymentMethod === method
                ? "bg-[#031B28] text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setPaymentMethod(method)}
          >
            {method === "cod" && "Cash on Delivery"}
            {method === "wish" && "Wish Money"}
          </button>
        ))}
      </div>

      {paymentMethod === "whish" && (
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          <p>
            Please transfer the amount to:
          </p>
          <p className="font-medium text-black">
            +961 76 933 662
          </p>
          <p>
            After completing the transfer, your order will be confirmed.
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        className="mt-8 bg-[#031B28] text-white p-3 w-full rounded"
      >
        Review Order
      </button>
    </>
  );
}
