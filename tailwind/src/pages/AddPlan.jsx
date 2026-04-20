import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    desc: "",
    features: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await axios.get("http://localhost:5000/api/plans");
    setPlans(res.data);
  };

  const handleDelete = async (id) => {
  const confirm = window.confirm("Delete this plan?");

  if (!confirm) {
    toast("Cancelled ❌");
    return;
  }

  try {
    await axios.delete(`http://localhost:5000/api/plans/${id}`);

    toast.success("Plan deleted 🗑️");
    fetchPlans();

  } catch (err) {
    console.error(err);
    toast.error("Delete failed ❌");
  }
};

  const handleChange = (field, value) => {
    if (field === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (field === "price" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.desc || !form.features) {
      alert("Fill all fields ❌");
      return;
    }
    const data = {
      name: form.name,
      price: Number(form.price),
      desc: form.desc,
      features: form.features.split(",").map((f) => f.trim()),
    };
    try {
      if (editId) {
      await axios.put(`http://localhost:5000/api/plans/${editId}`, data);
      toast.success("Plan updated ✏️");
    } else {
      await axios.post("http://localhost:5000/api/plans", data);
      toast.success("Plan added 🚀");
    }
      setShowForm(false);
      setEditId(null);
      setForm({ name: "", price: "", desc: "", features: "" });
      fetchPlans();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed ❌");
    }
  };

  const handleEdit = (plan) => {
    setShowForm(true);
    setEditId(plan._id);
    setForm({
      name: plan.name,
      price: plan.price,
      desc: plan.desc,
      features: plan.features.join(", "),
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6 text-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Plans</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({ name: "", price: "", desc: "", features: "" });
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg"
        >
          + Add Plan
        </button>
      </div>

      {/* POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-lg mb-4 text-center font-semibold">
              {editId ? "Edit Plan ✏️" : "Add Plan ➕"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={form.name}
                placeholder="Plan Name"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:border-blue-500 outline-none"
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                value={form.price}
                placeholder="Price"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:border-blue-500 outline-none"
                onChange={(e) => handleChange("price", e.target.value)}
              />
              <textarea
                value={form.desc}
                placeholder="Description"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:border-blue-500 outline-none"
                onChange={(e) => handleChange("desc", e.target.value)}
              />
              <textarea
                value={form.features}
                placeholder="Features (comma separated)"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:border-blue-500 outline-none"
                onChange={(e) => handleChange("features", e.target.value)}
              />
              <button className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
                {editId ? "Update Plan" : "Add Plan"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PLAN CARDS */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col"
          >
            {/* Card content grows to fill space */}
            <div className="flex-1">
              <h3 className="text-blue-600 font-semibold text-lg">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold mt-2 text-gray-800">
                ₹{plan.price}
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                {plan.desc}
              </p>
              <ul className="mt-4 text-sm space-y-1 text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
            </div>

            {/* Buttons always at bottom */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="w-1/2 bg-yellow-400 text-black py-2 rounded hover:opacity-90"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan._id)}
                className="w-1/2 bg-red-500 text-white py-2 rounded hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}