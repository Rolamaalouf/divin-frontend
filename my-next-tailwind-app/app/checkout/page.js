"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AddressForm from "../components/AddressForm";
import { validateAddress, validatePayment } from "../components/validation";
import OrderItemList from "../components/OrderItemList";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { user } = useAuth();
  const router = useRouter();

  // Prefill user address if logged in
  const [address, setAddress] = useState({
    region: "",
    "address-direction": "",
    phone: "",
    building: "",
    floor: "",
  });

  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user]);

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const updateAddress = (updatedField) => {
    setAddress((prev) => ({ ...prev, ...updatedField }));
  };

  const updatePayment = (updatedField) => {
    setPayment((prev) => ({ ...prev, ...updatedField }));
  };

  const [selectedShippingFee, setSelectedShippingFee] = useState(0);

  const handleNext = () => {
    if (step === 1 && !validateAddress(address)) return;
    if (step === 2 && paymentMethod === "card" && !validatePayment(payment)) return;
    setStep((prev) => prev + 1);
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("Order placed successfully!");
      setStep(4);
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Step Indicators */}
      <div className="mb-6 flex justify-between">
        {["Address", "Payment", "Confirm", "Success"].map((label, index) => (
          <div key={index} className={`text-sm ${step === index + 1 ? "font-bold" : "text-gray-400"}`}>
            {label}
          </div>
        ))}
      </div>

      {/* Step 1 - Address */}
      {step === 1 && (
        <>
          <AddressForm address={address} updateAddress={updateAddress} />

          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">Shipping Method</label>
            <select
              onChange={(e) => setSelectedShippingFee(Number(e.target.value))}
              className="w-full border p-2 rounded"
              defaultValue={0}
            >
              <option value={0}>Free Shipping</option>
              <option value={5}>Standard ($5)</option>
              <option value={10}>Express ($10)</option>
            </select>
          </div>

          <button
            onClick={handleNext}
            className="mt-8 bg-[#A68F7B] text-white p-3 w-full rounded"
          >
            Continue to Payment
          </button>
        </>
      )}

      {/* Step 2 - Payment */}
      {step === 2 && (
        <>
          <h3 className="text-lg font-semibold">Choose Payment Method</h3>
          <div className="flex gap-4 my-4">
            {["card", "cod", "wish"].map((method) => (
              <button
                key={method}
                className={`border px-4 py-2 rounded ${
                  paymentMethod === method ? "bg-[#A68F7B] text-white" : ""
                }`}
                onClick={() => setPaymentMethod(method)}
              >
                {method === "card" && "Credit Card"}
                {method === "cod" && "Cash on Delivery"}
                {method === "wish" && "Wish Money Transfer"}
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
            <div className="mt-4 text-sm text-gray-600">
              <p>Instructions will be sent to your email for transferring via Wish Money.</p>
            </div>
          )}

          <button
            onClick={handleNext}
            className="mt-8 bg-[#A68F7B] text-white p-3 w-full rounded"
          >
            Review Order
          </button>
        </>
      )}

      {/* Step 3 - Confirm */}
      {step === 3 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>
          <div className="mb-2"><strong>Region:</strong> {address.region}</div>
          <div className="mb-2"><strong>Phone:</strong> {address.phone}</div>
          <div className="mb-2">
            <strong>Shipping Fee:</strong> ${selectedShippingFee}
          </div>
          <div className="mb-2">
            <strong>Payment Method:</strong>{" "}
            {paymentMethod === "card"
              ? "Credit Card"
              : paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Wish Money"}
          </div>

          <OrderItemList orderId={orderId} />

          <button
            onClick={handleSubmitOrder}
            disabled={loading}
            className="mt-8 w-full bg-[#A68F7B] text-white p-3 rounded hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}

      {/* Step 4 - Success */}
      {step === 4 && (
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
      )}
    </div>
  );
}
