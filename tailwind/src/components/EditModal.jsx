import { useState } from "react";
import axios from "axios";

export default function EditModal({ car, close, refresh }) {
  const [form, setForm] = useState({
    name: car.name,
    model: car.model,
    price: car.price,
    description: car.description || "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Update API
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/cars/${car._id}`,
        form
      );

      refresh();   // reload table
      close();     // close modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50"
      onClick={close} // ✅ click outside to close
    >
      {/* STOP CLICK PROPAGATION */}
      <div
        className="bg-white p-6 rounded-xl w-96 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Car</h2>

        {/* Name */}
        <input
          name="name"
          className="border p-2 w-full mb-2 rounded"
          value={form.name}
          onChange={handleChange}
        />

        {/* Model */}
        <input
          name="model"
          className="border p-2 w-full mb-2 rounded"
          value={form.model}
          onChange={handleChange}
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          className="border p-2 w-full mb-2 rounded"
          value={form.price}
          onChange={handleChange}
        />

        {/* Description */}
        <input
          name="description"
          className="border p-2 w-full mb-4 rounded"
          value={form.description}
          onChange={handleChange}
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Update
          </button>

          <button
            onClick={close}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}