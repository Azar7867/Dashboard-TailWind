import { useEffect, useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await axios.get("http://localhost:5000/api/plans");
    setPlans(res.data);
  };
const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#F5F7FB]">
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">

        {plans.map((plan) => (
          <div
            key={plan._id} // ✅ fix (MongoDB uses _id)
            className="rounded-3xl p-8 bg-white shadow-lg hover:shadow-2xl transition"
          >
            {/* TITLE */}
            <h3 className="text-blue-600 font-semibold text-lg">
              {plan.name}
            </h3>

            {/* PRICE */}
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-800">
                ₹{plan.price}
              </span>
              <span className="text-gray-400 ml-2">/Monthly</span>
            </div>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-4">
              {plan.desc}
            </p>

            {/* FEATURES */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-blue-500 mt-1" />
                  {f}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
  onClick={() => navigate("/payment", { state: plan })}
  className="mt-8 w-full py-3 rounded-xl text-white font-medium
  bg-gradient-to-r from-blue-600 to-indigo-600
  hover:scale-[1.02] transition shadow-md"
>
  Buy Now
</button>
          </div>
        ))}

      </div>
    </div>
  );
}