import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";

    if (!form.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email format";
    }

    if (!form.password) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Minimum 6 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message);
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200">

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[360px] border border-white/40">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full mt-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}