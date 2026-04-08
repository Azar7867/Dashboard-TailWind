import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";

export default function Admin() {
  const [bikes, setBikes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [bike, setBike] = useState({});
  const [review, setReview] = useState({});

  const [editBikeId, setEditBikeId] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);

  const fetchData = async () => {
    const bikeRes = await fetch("http://localhost:5000/api/bikes");
    const reviewRes = await fetch("http://localhost:5000/api/reviews");

    setBikes(await bikeRes.json());
    setReviews(await reviewRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD / UPDATE BIKE
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

  // ADD / UPDATE REVIEW
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
    await fetch(`http://localhost:5000/api/bikes/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const deleteReview = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // EDIT CLICK
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
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* BIKE FORM */}
      <form onSubmit={handleBikeSubmit} className="bg-white p-4 rounded shadow space-y-2">
        <h2>{editBikeId ? "Edit Bike ✏️" : "Add Bike"}</h2>

        <input value={bike.name || ""} className="input" placeholder="Name"
          onChange={(e)=>setBike({...bike,name:e.target.value})}/>

        <input value={bike.price || ""} className="input" placeholder="Price"
          onChange={(e)=>setBike({...bike,price:e.target.value})}/>

        <input value={bike.image || ""} className="input" placeholder="Image"
          onChange={(e)=>setBike({...bike,image:e.target.value})}/>

        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          {editBikeId ? "Update Bike" : "Add Bike"}
        </button>
      </form>

      {/* BIKE LIST */}
      <div className="bg-white p-4 rounded shadow">
        <h2>Bike List</h2>

        {bikes.map((b) => (
          <div key={b._id} className="flex justify-between items-center py-2 border-b">
            <span>{b.name}</span>

            <div className="flex gap-2">
              <button onClick={()=>handleEditBike(b)}
                className="bg-yellow-500 text-white px-2 py-1 rounded">
                <Pencil size={16}/>
              </button>

              <button onClick={()=>deleteBike(b._id)}
                className="bg-red-500 text-white px-2 py-1 rounded">
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REVIEW FORM */}
      <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded shadow space-y-2">
        <h2>{editReviewId ? "Edit Review ✏️" : "Add Review"}</h2>

        <input value={review.user || ""} className="input" placeholder="User"
          onChange={(e)=>setReview({...review,user:e.target.value})}/>

        <input value={review.bike || ""} className="input" placeholder="Bike"
          onChange={(e)=>setReview({...review,bike:e.target.value})}/>

        <button className="bg-green-600 text-white px-3 py-1 rounded">
          {editReviewId ? "Update Review" : "Add Review"}
        </button>
      </form>

      {/* REVIEW LIST */}
      <div className="bg-white p-4 rounded shadow">
        <h2>Review List</h2>

        {reviews.map((r) => (
          <div key={r._id} className="flex justify-between items-center py-2 border-b">
            <span>{r.user} - {r.bike}</span>

            <div className="flex gap-2">
              <button onClick={()=>handleEditReview(r)}
                className="bg-yellow-500 text-white px-2 py-1 rounded">
                <Pencil size={16}/>
              </button>

              <button onClick={()=>deleteReview(r._id)}
                className="bg-red-500 text-white px-2 py-1 rounded">
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}