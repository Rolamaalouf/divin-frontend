'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useGuestId } from "../utils/guestId";
import { useUpdateOrder } from "../hooks/useOrderHooks";
import { useDeleteCart } from "../hooks/useCartHooks";

import AddressStep from "../components/AddressStep";
import PaymentStep from "../components/PaymentStep";
import ReviewStep from "../components/ReviewStep";
import SuccessStep from "../components/SuccessStep";
import OrderReviewPanel from "../components/OrderReviewPanel";
import Stepper from "../components/Stepper";


export default function OrdersPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { user } = useAuth();
  const guestId = useGuestId();
  const isGuest = !user;

  const [address, setAddress] = useState({
    region: "",
    "address-direction": "",
    phone: "",
    building: "",
    floor: "",
  });

  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [shippingFee, setShippingFee] = useState(5);
  const updateOrderMutation = useUpdateOrder();
  const { mutate: clearCart } = useDeleteCart();
  useEffect(() => {
    if (!orderId) {
      toast.error("No order found. Redirecting...");
      router.push("/cart");
      return;
    }

    // Redirect to wines page if the order is already completed
    const isCompleted = localStorage.getItem(`order-${orderId}-completed`);
    if (isCompleted === "true") {
      toast.info("Order already placed. Redirecting...");
      setTimeout(() => {
        router.replace("/wines");
      }, 1500);
    }
  }, [orderId, router]);

  useEffect(() => {
    if (user?.address) setAddress(user.address);
  }, [user]);
  useEffect(() => {
    if (step === 4) {
      const cartId = localStorage.getItem('lastCartId');
      if (cartId) {
        clearCart(cartId);
        localStorage.removeItem('lastCartId');
      }
      if (orderId) {
        localStorage.setItem(`order-${orderId}-completed`, 'true');
      }
    }
  }, [step, clearCart, orderId]);
  
  useEffect(() => {
    if (step === 2) {
      const { region, phone } = address;
      const direction = address["address-direction"];
      const guestFilled = isGuest
        ? Boolean(guestInfo.name && guestInfo.email && address.phone)
        : true;

      if (!region || !phone || !direction || !guestFilled) {
        toast.error("Please complete the address step first.");
        setStep(1);
      }
    }

    if (step === 3 && paymentMethod === "card") {
      const { cardName, cardNumber, expDate, cvv } = payment;
      if (!cardName || !cardNumber || !expDate || !cvv) {
        toast.error("Please fill in card details.");
        setStep(2);
      }
    }
  }, [step, address, guestInfo, payment, paymentMethod, isGuest]);

  // Prevent going back after success and force redirection to wines page
  useEffect(() => {
    if (step === 4) {
      window.history.pushState(null, "", window.location.href); // Prevent back navigation
      const handlePopState = () => {
        router.replace("/wines");
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [step, router]);

  const updateAddress = (field) => setAddress((prev) => ({ ...prev, ...field }));
  const updatePayment = (field) => setPayment((prev) => ({ ...prev, ...field }));
  const updateGuestInfo = (field) => setGuestInfo((prev) => ({ ...prev, ...field }));

  const handleNext = () => setStep((prev) => prev + 1);

  const handleSubmitOrder = async () => {
    if (!orderId) return toast.error("Order ID is missing.");

    try {
      setLoading(true);

      const data = {
        address,
        shipping_fees: shippingFee,
        paymentMethod,
        payment: paymentMethod === "card" ? payment : null,
        status: "PLACED",
      };

      if (user) {
        data.user_id = user.id;
      } else {
        if (!guestId) return toast.error("Missing guest ID");
        data.guest_id = guestId;
        data.name = guestInfo.name;
        data.email = guestInfo.email;
      }

      console.log("Sending updateOrder:", { id: orderId, data });

      await updateOrderMutation.mutateAsync({ id: orderId, data });
      toast.success("Order placed successfully!");

      // Save order completion status in localStorage
      localStorage.setItem(`order-${orderId}-completed`, "true");

      setStep(4);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Panel - Order Review */}
        <div className="md:col-span-1">
          <OrderReviewPanel
            step={step}
            orderId={orderId}
            showShippingFee={step === 3}
            shippingFee={shippingFee}
          />
        </div>

        {/* Right Panel - Checkout Steps */}
        <div className={`md:col-span-${step === 4 ? 3 : 2}`}>
          {step !== 4 && <h2 className="text-2xl font-bold mb-6">Checkout</h2>}

          {step !== 4 && (
  <Stepper
    step={step}
    setStep={setStep}
    address={address}
    payment={payment}
    paymentMethod={paymentMethod}
    guestInfo={guestInfo}
    isGuest={isGuest}
  />
)}


          {step === 1 && (
            <AddressStep
              address={address}
              updateAddress={updateAddress}
              selectedShippingFee={shippingFee}
              setSelectedShippingFee={setShippingFee}
              isGuest={isGuest}
              guestInfo={guestInfo}
              updateGuestInfo={updateGuestInfo}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <PaymentStep
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              payment={payment}
              updatePayment={updatePayment}
              guestInfo={guestInfo}
              updateGuestInfo={updateGuestInfo}
              onNext={handleNext}
            />
          )}

          {step === 3 && (
            <ReviewStep
              address={address}
              shippingFee={shippingFee}
              paymentMethod={paymentMethod}
              orderId={orderId}
              onPlaceOrder={handleSubmitOrder}
              loading={loading}
            />
          )}

          {step === 4 && (
            <div className="md:col-span-3 flex justify-center">
              <SuccessStep orderId={orderId} shippingFee={shippingFee} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
