import { useEffect, useState } from "react";

export default function BikeTable() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data));
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">
          Indian Bike Prices
        </h2>

        <select className="border px-3 py-1 rounded-lg text-sm">
          <option>All Bikes</option>
        </select>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 text-sm text-gray-500 pb-3 border-b">
        <span>Bike</span>
        <span>Price</span>
        <span>Insurance</span>
        <span>Tax</span>
        <span>On Road</span>
      </div>

      {/* Rows */}
      <div className="space-y-4 mt-4">
        {bikes.map((bike) => (
          <div
            key={bike.id}
            className="grid grid-cols-5 items-center"
          >
            {/* Bike Name + Image */}
            <div className="flex items-center gap-3">
              <img
                src={bike.image}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <span className="font-medium text-sm">
                {bike.name}
              </span>
            </div>

            <span className="text-gray-700">{bike.price}</span>
            <span className="text-gray-500">{bike.insurance}</span>
            <span className="text-gray-500">{bike.tax}</span>

            <span className="font-semibold text-blue-600">
              {bike.onroad}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}