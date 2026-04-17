import { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard, Smartphone, Landmark } from "lucide-react";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const getIcon = (method) => {
    if (method === "upi") return <Smartphone size={16} className="text-blue-500" />;
    if (method === "card") return <CreditCard size={16} className="text-purple-500" />;
    return <Landmark size={16} className="text-green-500" />;
  };

  const formatMethod = (method) => {
    if (method === "upi") return "UPI";
    if (method === "card") return "Card";
    return "Net Banking";
  };

  return (
  <div className="min-h-screen bg-[#F5F7FB] p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-900">
        💳 Payment History
      </h1>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 bg-slate-50 text-slate-700 text-sm font-bold px-6 py-4 border-b border-black/30">
        <span>Plan</span>
        <span>Method</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Status</span>
      </div>

      {/* TABLE BODY */}
      {payments.length === 0 ? (
        <div className="text-center text-gray-400 py-12 text-sm">
          No Payments Yet ❌
        </div>
      ) : (
        payments.map((item, index) => (
          <div
            key={item._id || index}
            className="grid grid-cols-5 items-center px-6 py-4 border-b border-black/30 last:border-none hover:bg-slate-50 transition-all duration-150"
          >

            {/* PLAN */}
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 text-[15px]">
                {item.planName}
              </span>
              <span className="text-xs text-gray-400">
                #{item._id?.slice(-6)}
              </span>
            </div>

            {/* METHOD */}
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getIcon(item.method)}
              </div>
              {formatMethod(item.method)}
            </div>

            {/* AMOUNT */}
            <span className="text-green-600 font-bold text-[15px]">
              ₹{item.amount}
            </span>

            {/* DATE */}
            <span className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>

            {/* STATUS */}
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full w-fit">
              ✔ Success
            </span>

          </div>
        ))
      )}
    </div>
  </div>
);
}

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CreditCard, Smartphone, Landmark } from "lucide-react";

// export default function PaymentHistory() {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const fetchPayments = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/payments");
//       setPayments(res.data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   const getIcon = (method) => {
//     if (method === "upi") return <Smartphone className="text-blue-500" />;
//     if (method === "card") return <CreditCard className="text-purple-500" />;
//     return <Landmark className="text-green-500" />;
//   };

//   const formatMethod = (method) => {
//     if (method === "upi") return "UPI Payment";
//     if (method === "card") return "Card Payment";
//     return "Net Banking";
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F7FB] p-6">

//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//         💳 Payment History
//       </h1>

//       {payments.length === 0 ? (
//         <div className="text-center text-gray-400 mt-20">
//           No Payments Yet ❌
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">

//           {payments.map((item, index) => (
//             <div
//               key={item._id || index}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
//             >

//               {/* HEADER */}
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-blue-50 p-3 rounded-full">
//                   {getIcon(item.method)}
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {item.planName}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {formatMethod(item.method)}
//                   </p>
//                 </div>
//               </div>

//               {/* AMOUNT */}
//               <div className="mb-4">
//                 <p className="text-gray-400 text-sm">Amount Paid</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   ₹{item.amount}
//                 </p>
//               </div>

//               {/* DATE */}
//               <div className="mb-4">
//                 <p className="text-gray-400 text-sm">Date</p>
//                 <p className="text-sm text-gray-700">
//                   {new Date(item.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               {/* FOOTER */}
//               <div className="flex justify-between items-center mt-4">

//                 <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
//                   ✔ Successful
//                 </span>

//                 <span className="text-xs text-gray-400">
//                   #{item._id?.slice(-6)}
//                 </span>

//               </div>

//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// }