import { Menu, Bell, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();

    const socket = io("http://localhost:5000");

    socket.on("new-notification", (data) => {
      toast.success(data.message);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  // 📥 FETCH
  const fetchNotifications = async () => {
    const res = await axios.get("http://localhost:5000/api/notifications");
    setNotifications(res.data);
  };

  // ❌ DELETE
  const deleteNotification = async (id) => {
    await axios.delete(`http://localhost:5000/api/notifications/${id}`);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  // 🧹 CLEAR
  const clearAll = async () => {
    await axios.delete("http://localhost:5000/api/notifications");
    setNotifications([]);
  };

  return (
    <div className="flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 rounded-2xl mb-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">
       <button
  onClick={toggleSidebar}
  className="hidden max-[1024px]:block p-2 hover:bg-gray-100 rounded-lg"
>
  <Menu />
</button>
        <h1 className="text-xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🔍 SEARCH */}
        <div className="relative hidden md:block w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50  focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
          />
        </div>

        {/* 🔔 NOTIFICATION */}
        <div className="relative">
          <Bell
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer text-gray-700 hover:text-blue-600"
          />

          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              {notifications.length}
            </span>
          )}

          {/* DROPDOWN */}
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-2xl p-4 z-50">

              <div className="flex justify-between mb-3">
                <h3 className="text-sm font-semibold">Notifications</h3>
                <button
                  onClick={clearAll}
                  className="text-red-500 text-xs hover:underline"
                >
                  Clear All
                </button>
              </div>

              {notifications.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">
                  No notifications
                </p>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n._id}
                      className="flex justify-between items-start p-3 rounded-xl hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="text-sm text-gray-800">
                          {n.message}
                        </p>
                        <small className="text-gray-400">
                          {new Date(n.createdAt).toLocaleTimeString()}
                        </small>
                      </div>

                      <X
                        size={16}
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={() => deleteNotification(n._id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🚪 LOGOUT */}
        <button
          onClick={() => {
  localStorage.removeItem("token");

  // ✅ clear axios default headers
  delete axios.defaults.headers.common["Authorization"];

  // ✅ force full reset
  window.location.href = "/login";
}}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
}