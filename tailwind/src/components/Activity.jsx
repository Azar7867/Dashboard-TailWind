import { useEffect, useState } from "react";
import { MessageSquare, Star } from "lucide-react";

export default function Activity() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(err => console.error("Failed to fetch reviews:", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
          <MessageSquare size={20} />
        </div>
        <div>
          <h2 className="font-bold text-slate-800 tracking-tight">
            Bike Reviews
          </h2>
          <p className="text-xs text-slate-400 font-medium">Customer Sentiment</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {reviews.map((item) => (
          <div key={item.id} className="flex gap-4 group cursor-default">
            
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={item.avatar}
                alt={item.user}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all border border-slate-100 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Name + Bike */}
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {item.user}
                </p>
                <div className="flex bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-600 items-center gap-0.5">
                  <Star size={10} fill="currentColor" />
                  {item.rating}.0
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-0.5">
                Reviewed <span className="text-blue-600 font-semibold">{item.bike}</span>
              </p>

              {/* Review Text */}
              <div className="mt-2 bg-slate-50 p-3 rounded-xl relative">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* Time */}
              <p className="text-[10px] text-slate-400 font-medium mt-2 flex items-center gap-2">
                <span>{item.time}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-blue-500 hover:underline cursor-pointer">Reply</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}