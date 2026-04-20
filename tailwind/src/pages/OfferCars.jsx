import { useEffect, useState } from "react";
import axios from "axios";

export default function OfferCars() {
  const [cars, setCars] = useState([]);

  const fetchOffers = async () => {
    const res = await axios.get("http://localhost:5000/api/offers");
    setCars(res.data.data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🔥 Offer Cars</h1>

      <div className="grid grid-cols-3 gap-6">
        {cars.map((car) => {
          const finalPrice =
            car.price - (car.price * car.offer) / 100;

          return (
            <div
              key={car._id}
              className="p-5 rounded-xl shadow-lg bg-white border hover:scale-105 transition"
            >
              <h2 className="text-lg font-bold">{car.name}</h2>
              <p className="text-gray-500">{car.model}</p>

              {/* Original Price */}
              <p className="text-gray-400 line-through mt-2">
                ₹{car.price}
              </p>

              {/* Final Price */}
              <p className="text-2xl font-bold text-green-600">
                ₹{finalPrice}
              </p>

              {/* Offer */}
              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {car.offer}% OFF
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}