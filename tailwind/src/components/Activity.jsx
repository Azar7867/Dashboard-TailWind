import { useEffect, useState } from "react";

export default function Activity() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow h-full">
      
      {/* Header */}
      <h2 className="font-semibold text-gray-700 mb-2">
        Bike Reviews
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Customer Feedback
      </p>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((item) => (
          <div key={item.id} className="flex gap-3">
            
            {/* Avatar */}
            <img
              src={item.avatar}
              alt=""
              className="w-10 h-10 rounded-full"
            />

            {/* Content */}
            <div>
              {/* Name + Bike */}
              <p className="text-sm text-gray-700">
                <span className="font-semibold">
                  {item.user}
                </span>{" "}
                reviewed{" "}
                <span className="text-blue-600 font-medium">
                  {item.bike}
                </span>
              </p>

              {/* Rating */}
              <div className="text-yellow-400 text-sm">
                {"⭐".repeat(item.rating)}
              </div>

              {/* Review Text */}
              <p className="text-xs text-gray-500 mt-1">
                {item.review}
              </p>

              {/* Time */}
              <p className="text-xs text-gray-400 mt-1">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}