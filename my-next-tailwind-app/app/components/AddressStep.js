'use client';
import AddressForm from "./AddressForm";

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
  return (
    <>
      {isGuest && (
        <div className="grid gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={guestInfo.name}
            onChange={(e) => updateGuestInfo({ name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={guestInfo.email}
            onChange={(e) => updateGuestInfo({ email: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
      )}

      <AddressForm address={address} updateAddress={updateAddress} />

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium">Shipping Method</label>
        <select
          onChange={(e) => setSelectedShippingFee(Number(e.target.value))}
          className="w-full border p-2 rounded"
          value={selectedShippingFee}
        >
          <option value={5}>Standard ($5)</option>
          <option value={10}>Express ($10)</option>
        </select>
      </div>

      <button onClick={onNext} className="mt-8 bg-[#A68F7B] text-white p-3 w-full rounded">
        Continue to Payment
      </button>
    </>
  );
}
