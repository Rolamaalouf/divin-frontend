"use client";

import { toast } from "react-toastify";

export default function Stepper({
  step,
  setStep,
  address,
  payment,
  paymentMethod,
  guestInfo,
  isGuest,
}) {
  const steps = ["Address", "Payment", "Confirm", "Success"];

  return (
    <div className="mb-6 flex justify-between items-center">
      {steps.map((label, index) => {
        const stepIndex = index + 1;
        const isActive = step === stepIndex;
        const isCompleted = step > stepIndex;
        const isClickable = stepIndex < 4;

        const handleStepClick = () => {
          if (!isClickable) return;

          if (stepIndex < step) {
            setStep(stepIndex); // Go back
          } else {
            // Validate before moving forward
            if (stepIndex === 2) {
              const { region, phone } = address;
              const direction = address["address-direction"];
              const guestFilled = isGuest
                ? Boolean(guestInfo.name && guestInfo.email && address.phone)
                : true;

              if (!region || !phone || !direction || !guestFilled) {
                toast.error("Please complete the address step first.");
                return;
              }
            }

            if (stepIndex === 3 && paymentMethod === "card") {
              const { cardName, cardNumber, expDate, cvv } = payment;
              if (!cardName || !cardNumber || !expDate || !cvv) {
                toast.error("Please fill in card details.");
                return;
              }
            }

            setStep(stepIndex);
          }
        };

        return (
          <button
            key={index}
            onClick={handleStepClick}
            disabled={!isClickable}
            className="flex flex-col items-center text-sm focus:outline-none disabled:cursor-not-allowed"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                ${
                  isActive
                    ? "bg-[#E2C269] text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
            >
              {isCompleted ? "✓" : stepIndex}
            </div>
            <span
              className={`${
                isActive
                  ? "text-[#E2C269] font-semibold"
                  : isCompleted
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
