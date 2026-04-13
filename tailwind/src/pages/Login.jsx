import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

const validate = () => {
  let err = {};

  // Email validation
  if (!form.email) {
    err.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    err.email = "Invalid email format";
  }

  // Password validation
  if (!form.password) {
    err.password = "Password is required";
  } else if (form.password.length < 6) {
    err.password = "Password must be at least 6 characters";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
    err.password = "Password must contain at least 1 special character";
  }

  setErrors(err);
  return Object.keys(err).length === 0;
};

  // const handleLogin = async () => {
  //    e.preventDefault();

  // localStorage.setItem("token", "user_logged_in");

  // setIsAuth(true); // 🔥 THIS IS IMPORTANT

  // navigate("/");
  //   if (!validate()) return;

  //   const res = await fetch("http://localhost:5000/api/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
      
  //   });

  //   const data = await res.json();

  //   if (data.token) {
  //     localStorage.setItem("token", data.token);
  //     navigate("/");
  //   } else {
  //     alert(data.message);
  //   }
  // };

  const handleLogin = async (e) => {
  e.preventDefault(); // ✅ FIX

  // ✅ First validate
  if (!validate()) return;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      // ✅ Store token
      localStorage.setItem("token", data.token);

      // ✅ Update auth state
      setIsAuth(true);

      // ✅ Redirect
      navigate("/");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200">

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[360px] border border-white/40">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
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
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* BUTTON */}
        <form onSubmit={handleLogin}>
        <button
  type="submit"
  className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition"
>
  Login
</button>
</form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}