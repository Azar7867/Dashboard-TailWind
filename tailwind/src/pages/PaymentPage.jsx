import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  CreditCard,
  Smartphone,
  Landmark,
  ShieldCheck
} from "lucide-react";

export default function PaymentPage() {
  const { state: plan } = useLocation();
  const [method, setMethod] = useState("upi");
  const handlePayment = async () => {
  try {
    await axios.post("http://localhost:5000/api/payments", {
      planName: plan.name,
      amount: plan.price,
      method: method,
    });

    // alert("Payment Successful 🎉");

  } catch (err) {
    console.error(err);
    alert("Payment Failed ❌");
  }
};

  if (!plan) {
    return <div className="p-10 text-center">No Plan Selected ❌</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-6">

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">

        {/* LEFT - PAYMENT METHODS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Choose Payment Method
          </h2>

          {/* METHOD CARD */}
          {[
            { id: "upi", name: "UPI (GPay / PhonePe)", icon: Smartphone },
            { id: "card", name: "Credit / Debit Card", icon: CreditCard },
            { id: "bank", name: "Net Banking", icon: Landmark },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setMethod(item.id)}
                className={`flex items-center justify-between p-4 mb-3 rounded-xl cursor-pointer border transition
                ${
                  method === item.id
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-blue-600" size={20} />
                  <span className="text-gray-700">{item.name}</span>
                </div>

                {method === item.id && (
                  <span className="text-blue-600 text-sm font-medium">
                    Selected
                  </span>
                )}
              </div>
            );
          })}

          {/* INPUT AREA */}
          <div className="mt-6">

            {method === "upi" && (
              <div className="space-y-3">
                <input
                  placeholder="Enter UPI ID (example@upi)"
                  className="w-full p-3 border rounded-lg bg-gray-100 focus:border-blue-500 outline-none"
                />
                <p className="text-xs text-gray-400">
                  Pay using any UPI app like GPay, PhonePe, Paytm
                </p>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-3">
                <input
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="MM/YY"
                    className="w-1/2 p-3 border rounded-lg bg-gray-100"
                  />
                  <input
                    placeholder="CVV"
                    className="w-1/2 p-3 border rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            )}

            {method === "bank" && (
              <select className="w-full p-3 border rounded-lg bg-gray-100">
                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
              </select>
            )}

          </div>

        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-4 text-gray-600">

            <div className="flex justify-between">
              <span>Plan</span>
              <span className="font-medium">{plan.name}</span>
            </div>

            <div className="flex justify-between">
              <span>Price</span>
              <span>₹{plan.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹0</span>
            </div>

          </div>

          <div className="border-t my-5"></div>

          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{plan.price}</span>
          </div>

          {/* PAY BUTTON */}
          <button
            onClick={handlePayment}
            className="mt-6 w-full py-3 rounded-xl text-white font-medium
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:scale-[1.02] transition shadow-md"
          >
            Pay ₹{plan.price}
          </button>

          {/* SECURITY */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <ShieldCheck size={16} />
            Secure & Encrypted Payment
          </div>

        </div>

      </div>
    </div>
  );
}