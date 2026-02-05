'use client';
import AddressForm from "./AddressForm";
import { useState } from "react";

export default function AddressStep({
  address,
  updateAddress,
  selectedShippingFee,
  setSelectedShippingFee,
  isGuest,
  guestInfo,
  updateGuestInfo,
  onNext,
}) {
  const [emailError, setEmailError] = useState("");

  // Simple email regex for demonstration
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (isGuest) {
      if (!guestInfo.email) {
        setEmailError("Email is required.");
        return;
      }
      if (!validateEmail(guestInfo.email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      setEmailError("");
    }
    onNext();
  };
  return (
    <>
{isGuest && (
  <div className="grid gap-4 mb-4">
    <input
      suppressHydrationWarning
      type="text"
      placeholder="Name"
      value={guestInfo.name}
      onChange={(e) => updateGuestInfo({ name: e.target.value })}
      className="border p-2 rounded"
    />
    <input
      suppressHydrationWarning
      type="email"
      placeholder="Email"
      value={guestInfo.email}
      onChange={(e) => updateGuestInfo({ email: e.target.value })}
      className="border p-2 rounded"
    />
    {/* Display email error message */}
    {emailError && (
      <p className="text-red-600 text-sm mt-1">{emailError}</p>
    )}
  </div>
)}


      <AddressForm address={address} updateAddress={updateAddress} />

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium">Shipping Method</label>
        <select
          suppressHydrationWarning
          onChange={(e) => setSelectedShippingFee(Number(e.target.value))}
          className="w-full border p-2 rounded"
          value={selectedShippingFee}
        >
          <option value={5}>Standard ($5)</option>
          <option value={10}>Express (same day delivery) ($10)</option>
        </select>
      </div>

      <button
        suppressHydrationWarning
        onClick={handleContinue}
        className="mt-8 bg-[#031B28] text-white p-3 w-full rounded"
      >
        Continue to Payment
      </button>
    </>
  );
}
