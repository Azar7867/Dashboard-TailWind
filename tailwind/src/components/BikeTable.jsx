// import { useEffect, useState } from "react";

// export default function BikeTable() {
//   const [bikes, setBikes] = useState([]);

//   // useEffect(() => {
//   //   fetch("http://localhost:5000/api/bikes")
//   //     .then((res) => res.json())
//   //     .then((data) => setBikes(data))
//   //     .catch(err => console.error("Failed to fetch bikes:", err));
//   // }, []);

//   useEffect(() => {
//   const token = localStorage.getItem("token");

//   fetch("http://localhost:5000/api/bikes", {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },

//   })
//     .then((res) => {
//       // if (res.status === 401) {
//       //   throw new Error("Unauthorized");
//       // }
//       if (res.status === 401) {
//   localStorage.removeItem("token");
//   alert("Session expired");
//   window.location.href = "/login";
// }
//       return res.json();
//     })
//     .then((data) => setBikes(data))
//     .catch((err) => {
//       console.error("Failed to fetch bikes:", err);
//       alert("Unauthorized! Please login again");
//     });
// }, []);

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h2 className="text-lg font-bold text-slate-900 tracking-tight">
//             Indian Bike Prices
//           </h2>
//           <p className="text-sm text-slate-500">Live market rates and variations</p>
//         </div>

//         <select className="bg-slate-50 border-none px-4 py-2 rounded-xl text-sm font-medium text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer">
//           <option>All Bikes</option>
//           <option>Sports</option>
//           <option>Cruiser</option>
//         </select>
//       </div>

//       {/* Responsive Wrapper */}
//       <div className="overflow-x-auto -mx-6 px-6">
//         <table className="w-full min-w-[600px] text-left border-collapse">
//           <thead>
//             <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-50">
//               <th className="pb-4">Bike Model</th>
//               <th className="pb-4">Ex-Showroom</th>
//               <th className="pb-4">Insurance</th>
//               <th className="pb-4">RTO / Tax</th>
//               <th className="pb-4">On-Road Price</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {bikes.map((bike) => (
//               <tr
//                 key={bike._id}
//                 className="group hover:bg-slate-50/50 transition-colors"
//               >
//                 <td className="py-4">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={bike.image}
//                       className="w-12 h-12 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform"
//                       alt={bike.name}
//                     />
//                     <span className="font-semibold text-slate-900 text-sm">
//                       {bike.name}
//                     </span>
//                   </div>
//                 </td>

//                 <td className="py-4">
//                   <span className="text-slate-600 text-sm font-medium">{bike.price}</span>
//                 </td>
                
//                 <td className="py-4">
//                   <span className="text-slate-500 text-sm">{bike.insurance}</span>
//                 </td>

//                 <td className="py-4">
//                   <span className="text-slate-500 text-sm">{bike.tax}</span>
//                 </td>

//                 <td className="py-4">
//                   <span className="font-bold text-blue-600 text-sm">
//                     {bike.onroad}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function BikeTable() {
  const [bikes, setBikes] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [bikesPerPage, setBikesPerPage] = useState(5); // 👈 dynamic now

  useEffect(() => {
    fetch("http://localhost:5000/api/bikes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          alert("Session expired");
          window.location.href = "/login";
        }
        return res.json();
      })
      .then((data) => setBikes(data))
      .catch((err) => {
        console.error("Failed to fetch bikes:", err);
        alert("Unauthorized! Please login again");
      });
  }, []);

  // ✅ Pagination Logic
  const indexOfLastBike = currentPage * bikesPerPage;
  const indexOfFirstBike = indexOfLastBike - bikesPerPage;
  const currentBikes = bikes.slice(indexOfFirstBike, indexOfLastBike);

  const totalPages = Math.ceil(bikes.length / bikesPerPage);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Indian Bike Prices
          </h2>
          <p className="text-sm text-slate-500">Live market rates and variations</p>
        </div>

        
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-50">
              <th className="pb-4">Bike Model</th>
              <th className="pb-4">Ex-Showroom</th>
              <th className="pb-4">Insurance</th>
              <th className="pb-4">RTO / Tax</th>
              <th className="pb-4">On-Road Price</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {currentBikes.map((bike) => (
              <tr
                key={bike._id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={bike.image}
                      className="w-12 h-12 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                      alt={bike.name}
                    />
                    <span className="font-semibold text-slate-900 text-sm">
                      {bike.name}
                    </span>
                  </div>
                </td>

                <td className="py-4">
                  <span className="text-slate-600 text-sm font-medium">{bike.price}</span>
                </td>

                <td className="py-4">
                  <span className="text-slate-500 text-sm">{bike.insurance}</span>
                </td>

                <td className="py-4">
                  <span className="text-slate-500 text-sm">{bike.tax}</span>
                </td>

                <td className="py-4">
                  <span className="font-bold text-blue-600 text-sm">
                    {bike.onroad}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Pagination + Rows Dropdown */}
{/* Pagination + Rows Dropdown */}
<div className="flex flex-col sm:flex-row justify-end items-center mt-6 gap-4">

  {/* Numbers + Info */}
  <div className="flex items-center gap-3">

    {/* Showing text */}
    <span className="text-sm text-slate-500 mr-3">
      Showing Page <span className="font-semibold text-blue-600">{currentPage}</span> of {totalPages}
    </span>

    {/* Page Numbers */}
    <div className="flex items-center gap-2">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl text-sm font-medium border transition
              ${
                currentPage === page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  </div>

  {/* Rows Dropdown */}
  <div className="flex items-center gap-2">
    <select
      value={bikesPerPage}
      onChange={(e) => {
        setBikesPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
      className="border px-3 py-2 rounded-lg text-sm outline-none cursor-pointer"
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={12}>12</option>
      <option value={20}>20</option>
    </select>

    <span className="text-sm text-slate-500">Items per page</span>
  </div>

</div>
    </div>
  );
}