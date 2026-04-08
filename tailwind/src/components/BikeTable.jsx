import { useEffect, useState } from "react";

export default function BikeTable() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch(err => console.error("Failed to fetch bikes:", err));
  }, []);

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

        <select className="bg-slate-50 border-none px-4 py-2 rounded-xl text-sm font-medium text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer">
          <option>All Bikes</option>
          <option>Sports</option>
          <option>Cruiser</option>
        </select>
      </div>

      {/* Responsive Wrapper */}
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
            {bikes.map((bike) => (
              <tr
                key={bike.id}
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
    </div>
  );
}