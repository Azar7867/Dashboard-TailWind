import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/EditModal";
import { toast } from "react-toastify";

export default function CarDetails() {
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState(null);

  const [selectedCars, setSelectedCars] = useState([]);
  const [offer, setOffer] = useState(null);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars");
    setCars(res.data.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ✅ HANDLE CHECKBOX (AUTO OFFER DETECT)
  const handleCheckbox = (id) => {
    let updated;

    if (selectedCars.includes(id)) {
      updated = selectedCars.filter((c) => c !== id);
    } else {
      updated = [...selectedCars, id];
    }

    setSelectedCars(updated);

    const selectedData = cars.filter((car) =>
      updated.includes(car._id)
    );

    const offers = selectedData.map((c) => c.offer);
    const uniqueOffers = [...new Set(offers)];

    if (uniqueOffers.length === 1) {
      setOffer(uniqueOffers[0]);
    } else {
      setOffer(null);
    }
  };

  // ✅ SELECT ALL
  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = cars.map((c) => c._id);
      setSelectedCars(allIds);

      const offers = cars.map((c) => c.offer);
      const uniqueOffers = [...new Set(offers)];

      if (uniqueOffers.length === 1) {
        setOffer(uniqueOffers[0]);
      } else {
        setOffer(null);
      }
    } else {
      setSelectedCars([]);
      setOffer(null);
    }
  };

  // ✅ APPLY BULK OFFER
  const applyBulkOffer = async () => {
    try {
      if (!offer && offer !== 0)
        return toast.error("Select offer %");
      if (selectedCars.length === 0)
        return toast.error("Select at least one car");

      await Promise.all(
        selectedCars.map((id) =>
          axios.post("http://localhost:5000/api/offers", {
            carId: id,
            offer,
          })
        )
      );

      toast.success("Offer applied successfully 🚀");

      setSelectedCars([]);
      setOffer(null);
      fetchCars();
    } catch (error) {
      toast.error("Failed to apply offer ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Details</h1>

      {/* 🔥 BULK ACTION BAR */}
      <div className="flex items-center gap-4 mb-4">

        {/* DROPDOWN */}
        <select
          value={offer ?? ""}
          onChange={(e) => setOffer(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Offer %</option>
          <option value={20}>20%</option>
          <option value={40}>40%</option>
          <option value={50}>50%</option>
          <option value={60}>60%</option>
          <option value={80}>80%</option>
        </select>

        {/* SHOW OFFER */}
        {selectedCars.length > 0 && offer !== null && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            {offer}% selected
          </span>
        )}

        {/* MIXED STATE */}
        {selectedCars.length > 0 && offer === null && (
          <span className="text-gray-500 text-sm">
            Mixed offers selected
          </span>
        )}

        {/* APPLY BUTTON */}
        <button
          onClick={applyBulkOffer}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Offer
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedCars.length === cars.length &&
                      cars.length > 0
                    }
                  />
                </th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Model</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Offer</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100">
              {cars.map((car) => (
                <tr
                  key={car._id}
                  className={`hover:bg-gray-50 transition ${
                    selectedCars.includes(car._id)
                      ? "bg-blue-50"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCars.includes(car._id)}
                      onChange={() => handleCheckbox(car._id)}
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {car.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {car.model}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹{car.price}
                  </td>

                  <td className="px-6 py-4">
                    {car.offer > 0 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {car.offer}% OFF
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        No Offer
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelected(car)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <EditModal
          car={selected}
          close={() => setSelected(null)}
          refresh={fetchCars}
        />
      )}
    </div>
  );
}