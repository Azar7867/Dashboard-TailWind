import { useState, useEffect } from "react";
import { Trash2, Pencil, Plus, Database, Star } from "lucide-react";

export default function Admin() {
  const [bikes, setBikes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [bike, setBike] = useState({});
  const [review, setReview] = useState({});

  const [editBikeId, setEditBikeId] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);

  const fetchData = async () => {
    try {
      const bikeRes = await fetch("http://localhost:5000/api/bikes");
      const reviewRes = await fetch("http://localhost:5000/api/reviews");

      setBikes(await bikeRes.json());
      setReviews(await reviewRes.json());
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBikeSubmit = async (e) => {
    e.preventDefault();
    if (editBikeId) {
      await fetch(`http://localhost:5000/api/bikes/${editBikeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bike),
      });
      setEditBikeId(null);
    } else {
      await fetch("http://localhost:5000/api/bikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bike),
      });
    }
    setBike({});
    fetchData();
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (editReviewId) {
      await fetch(`http://localhost:5000/api/reviews/${editReviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      setEditReviewId(null);
    } else {
      await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
    }
    setReview({});
    fetchData();
  };

  const deleteBike = async (id) => {
    if (confirm("Are you sure you want to delete this bike?")) {
      await fetch(`http://localhost:5000/api/bikes/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  const deleteReview = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await fetch(`http://localhost:5000/api/reviews/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  const handleEditBike = (b) => {
    setBike({
      name: b.name,
      price: b.price,
      insurance: b.insurance,
      tax: b.tax,
      onroad: b.onroad,
      image: b.image,
    });
    setEditBikeId(b._id);
  };

  const handleEditReview = (r) => {
    setReview(r);
    setEditReviewId(r._id);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Database size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Control Center</h1>
          <p className="text-slate-500 font-medium">Manage database records and user interactions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BIKE MANAGEMENT */}
        <div className="space-y-6">
          <form onSubmit={handleBikeSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
              <Plus size={20} className="text-blue-500" />
              {editBikeId ? "Edit Bike Details" : "Register New Bike"}
            </h2>

            <div className="space-y-4">
              <input value={bike.name || ""} className="input" placeholder="Model Name (e.g. Yamaha R1)"
                onChange={(e)=>setBike({...bike,name:e.target.value})} required/>
              
              <div className="grid grid-cols-2 gap-4">
                <input value={bike.price || ""} className="input" placeholder="Price"
                  onChange={(e)=>setBike({...bike,price:e.target.value})} required/>
                <input value={bike.onroad || ""} className="input" placeholder="On-Road"
                  onChange={(e)=>setBike({...bike,onroad:e.target.value})} />
              </div>

              <input value={bike.image || ""} className="input" placeholder="Image URL"
                onChange={(e)=>setBike({...bike,image:e.target.value})} />
            </div>

            <button className={`${editBikeId ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"} text-white w-full py-3 rounded-xl font-bold transition-all shadow-lg mt-2`}>
              {editBikeId ? "Save Changes" : "Create Record"}
            </button>
          </form>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-slate-50/50">
              <h2 className="font-bold text-slate-800">Existing Inventory ({bikes.length})</h2>
            </div>
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {bikes.map((b) => (
                <div key={b._id} className="flex justify-between items-center p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    {b.image && <img src={b.image} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{b.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{b.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={()=>handleEditBike(b)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                      <Pencil size={18}/>
                    </button>
                    <button onClick={()=>deleteBike(b._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEW MANAGEMENT */}
        <div className="space-y-6">
          <form onSubmit={handleReviewSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
              <Star size={20} className="text-amber-500" />
              {editReviewId ? "Moderate Review" : "Post Manual Review"}
            </h2>

            <div className="space-y-4">
              <input value={review.user || ""} className="input" placeholder="User Name"
                onChange={(e)=>setReview({...review,user:e.target.value})} required/>
              <input value={review.bike || ""} className="input" placeholder="Bike Associated"
                onChange={(e)=>setReview({...review,bike:e.target.value})} required/>
              <textarea value={review.review || ""} className="input min-h-[100px]" placeholder="Review text content..."
                onChange={(e)=>setReview({...review,review:e.target.value})} required/>
            </div>

            <button className={`${editReviewId ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" : "bg-slate-900 hover:bg-black shadow-slate-200"} text-white w-full py-3 rounded-xl font-bold transition-all shadow-lg mt-2`}>
              {editReviewId ? "Update Review" : "Publish Review"}
            </button>
          </form>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-slate-50/50">
              <h2 className="font-bold text-slate-800">Member Reviews ({reviews.length})</h2>
            </div>
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {reviews.map((r) => (
                <div key={r._id} className="flex justify-between items-center p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-slate-800 text-sm truncate">{r.user}</p>
                    <p className="text-xs text-blue-600 font-medium">on {r.bike}</p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={()=>handleEditReview(r)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                      <Pencil size={18}/>
                    </button>
                    <button onClick={()=>deleteReview(r._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}