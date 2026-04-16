import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./AppRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/AdminLogin";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Admin from "../pages/Admin";

export default function RootRouter() {
  const location = useLocation();

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          isAuth ? <Navigate to="/" /> : <Login setIsAuth={setIsAuth} />
        }
      />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ADMIN PROTECTED */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        }
      />

      {/* MAIN PROTECTED APP */}
      <Route
        path="/*"
        element={
          isAuth ? (
            <AppRoutes setIsAuth={setIsAuth} />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        }
      />
    </Routes>
  );
}