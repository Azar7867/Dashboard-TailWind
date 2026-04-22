import { useState, useEffect } from "react";
import { Trash2, Pencil, Plus, Database } from "lucide-react";

/* 🔥 PREMIUM MODAL */
const ModalWrapper = ({ children }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl w-[420px] shadow-2xl border border-white/30 animate-fadeIn">
      {children}
    </div>
  </div>
);

export default function Admin() {
  const [bikes, setBikes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [bike, setBike] = useState({ name: "", price: "", image: "" });
  const [review, setReview] = useState({ user: "", bike: "", review: "" });

  const [editBikeId, setEditBikeId] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);

  const [showBikeModal, setShowBikeModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [bikeErrors, setBikeErrors] = useState({});

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

const bikeRes = await fetch("http://localhost:5000/api/bikes", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const reviewRes = await fetch("http://localhost:5000/api/reviews", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 🔥 Handle expiry
if (bikeRes.status === 401 || reviewRes.status === 401) {
  localStorage.removeItem("token");
  alert("Session expired");
  window.location.href = "/login";
  return;
}

      setBikes(await bikeRes.json());
      setReviews(await reviewRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= VALIDATION =================
  const validateBike = () => {
    let errors = {};
    if (!bike.name.trim()) errors.name = "Bike name required";
    if (!bike.price) errors.price = "Price required";
    if (!bike.image.trim()) errors.image = "Image required";

    setBikeErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ================= BIKE =================
  const handleBikeSubmit = async () => {
    if (!validateBike()) return;

    const url = editBikeId
      ? `http://localhost:5000/api/bikes/${editBikeId}`
      : "http://localhost:5000/api/bikes";

    const method = editBikeId ? "PUT" : "POST";

    await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify(bike),
});

    setBike({ name: "", price: "", image: "" });
    setEditBikeId(null);
    setShowBikeModal(false);
    setBikeErrors({});
    fetchData();
  };

  const deleteBike = async (id) => {
    await fetch(`http://localhost:5000/api/bikes/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    fetchData();
  };

  const handleEditBike = (b) => {
    setBike({ name: b.name, price: b.price, image: b.image });
    setEditBikeId(b._id);
    setShowBikeModal(true);
  };

  // ================= REVIEW =================
  const handleReviewSubmit = async () => {
    const url = editReviewId
      ? `http://localhost:5000/api/reviews/${editReviewId}`
      : "http://localhost:5000/api/reviews";

    const method = editReviewId ? "PUT" : "POST";

    const res = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify(review),
});

    const data = await res.json();

    setReviews((prev) =>
      editReviewId
        ? prev.map((r) => (r._id === editReviewId ? data : r))
        : [...prev, data]
    );

    setReview({ user: "", bike: "", review: "" });
    setEditReviewId(null);
    setShowReviewModal(false);
  };

  const deleteReview = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    fetchData();
  };

  const handleEditReview = (r) => {
    setReview(r);
    setEditReviewId(r._id);
    setShowReviewModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl text-white shadow-lg">
          <Database size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Manage bikes & reviews easily
          </p>
        </div>
        <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/admin-login";
    }}
    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
  >
    Logout
  </button>
      </div>
       
      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= BIKES ================= */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-lg">Bikes ({bikes.length})</h2>

            <button
              onClick={() => {
                setBike({ name: "", price: "", image: "" });
                setEditBikeId(null);
                setShowBikeModal(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          {bikes.map((b) => (
            <div
              key={b._id}
              className="flex justify-between items-center py-3 px-2 rounded-xl hover:bg-white/60 transition"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={b.image}
                  className="w-14 h-14 rounded-xl object-cover shadow-md"
                />
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-gray-500">₹{b.price}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleEditBike(b)}>
                  <Pencil size={18} />
                </button>
                <button onClick={() => deleteBike(b._id)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-lg">Reviews ({reviews.length})</h2>

            <button
              onClick={() => {
                setReview({ user: "", bike: "", review: "" });
                setEditReviewId(null);
                setShowReviewModal(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          {reviews.map((r) => (
            <div
              key={r._id}
              className="flex justify-between py-3 px-2 rounded-xl hover:bg-white/60 transition"
            >
              <div>
                <p className="font-semibold">{r.user}</p>
                <p className="text-sm text-blue-500">{r.bike}</p>
                <p className="text-sm text-gray-600 mt-1">{r.review}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleEditReview(r)}>
                  <Pencil size={18} />
                </button>
                <button onClick={() => deleteReview(r._id)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BIKE MODAL ================= */}
      {showBikeModal && (
        <ModalWrapper>
          <h2 className="text-xl font-bold mb-4">
            {editBikeId ? "Edit Bike" : "Add Bike"}
          </h2>

          <div className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">Bike Name</label>
              <input
                value={bike.name}
                onChange={(e) =>
                  setBike((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {bikeErrors.name && <p className="text-red-500 text-xs">{bikeErrors.name}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Price</label>
              <input
                value={bike.price}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setBike((prev) => ({ ...prev, price: e.target.value }));
                  }
                }}
                className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {bikeErrors.price && <p className="text-red-500 text-xs">{bikeErrors.price}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Image URL</label>
              <input
                value={bike.image}
                onChange={(e) =>
                  setBike((prev) => ({ ...prev, image: e.target.value }))
                }
                className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {bikeErrors.image && <p className="text-red-500 text-xs">{bikeErrors.image}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button onClick={() => setShowBikeModal(false)} className="text-gray-500">
                Cancel
              </button>

              <button
                onClick={handleBikeSubmit}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* ================= REVIEW MODAL ================= */}
      {showReviewModal && (
        <ModalWrapper>
          <h2 className="text-xl font-bold mb-4">
            {editReviewId ? "Edit Review" : "Add Review"}
          </h2>

          <div className="space-y-4">

            <input
              placeholder="User Name"
              value={review.user}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, user: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <input
              placeholder="Bike Name"
              value={review.bike}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, bike: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <textarea
              placeholder="Review"
              value={review.review}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, review: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <div className="flex justify-end gap-3 pt-3">
              <button onClick={() => setShowReviewModal(false)} className="text-gray-500">
                Cancel
              </button>

              <button
                onClick={handleReviewSubmit}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}