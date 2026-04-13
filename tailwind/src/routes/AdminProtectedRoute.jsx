import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}