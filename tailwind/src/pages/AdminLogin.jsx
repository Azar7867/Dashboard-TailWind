import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate("/admin");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-200">

      {/* CARD */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[380px] border border-white/40">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Admin Login 🔐
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Access your dashboard securely
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter admin email"
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Login
        </button>

        {/* BACK TO HOME */}
        <p className="text-center text-sm mt-5">
          ←{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer font-semibold hover:underline"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}