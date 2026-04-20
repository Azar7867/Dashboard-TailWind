import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function OfferPage() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [offer, setOffer] = useState("");

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars");
    setCars(res.data.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ✅ Apply Offer
  const handleApplyOffer = async () => {
    try {
      if (!offer || offer < 0 || offer > 100) {
        return toast.error("Enter valid offer (0-100)");
      }

      await axios.post("http://localhost:5000/api/offers", {
        carId: selectedCar._id,
        offer,
      });

      toast.success("Offer applied successfully 🎉");

      setSelectedCar(null);
      setOffer("");
      fetchCars();
    } catch (error) {
      toast.error("Failed to apply offer ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Apply Offer</h1>

      <div className="grid grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car._id} className="border p-4 rounded shadow">
  <h2 className="font-bold">{car.name}</h2>
  <p>{car.model}</p>

  {/* Price */}
  <p>₹{car.price}</p>

  {/* ✅ SHOW OFFER */}
  {car.offer > 0 ? (
    <p className="text-green-600 font-semibold">
      {car.offer}% OFF
    </p>
  ) : (
    <p className="text-gray-400 text-sm">No Offer</p>
  )}

  <button
    onClick={() => setSelectedCar(car)}
    className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
  >
    Apply Offer
  </button>
</div>
        ))}
      </div>

      {/* ✅ MODAL */}
      {selectedCar && (
        <div
          className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-80 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-3">
              Apply Offer - {selectedCar.name}
            </h2>

            <input
              type="number"
              placeholder="Enter offer %"
              className="border p-2 w-full mb-4 rounded"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={handleApplyOffer}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Apply
              </button>

              <button
                onClick={() => setSelectedCar(null)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}