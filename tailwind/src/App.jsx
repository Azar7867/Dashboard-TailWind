// import { BrowserRouter} from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// export default function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import AppRoutes from "./routes/AppRoutes";
// import Login from "./pages/Login";
// import AdminLogin from "./pages/AdminLogin";
// import AdminProtectedRoute from "./routes/AdminProtectedRoute";
// import Admin from "./pages/Admin";
// import Register from "./pages/Register";
// import { useLocation } from "react-router-dom";
// export default function App() {
//   const location = useLocation();
//   const [isAuth, setIsAuth] = useState(false);

//   // 🔥 THIS FIXES YOUR ISSUE
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuth(true);
//     }
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* LOGIN */}
//         <Route
//           path="/login"
//           element={
//             isAuth ? <Navigate to="/" /> : <Login setIsAuth={setIsAuth} />
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <AdminProtectedRoute>
//               <Admin />
//             </AdminProtectedRoute>
//           }
//         />

//         {/* REGISTER */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         {/* <Route path="/tasks" element={<Tasks />} /> */}

//         {/* PROTECTED */}
//         <Route
//           path="/*"
//           element={
//             isAuth ? (
//               <AppRoutes setIsAuth={setIsAuth} />
//             ) : (
//               // <Navigate to="/login" />
//               <Navigate to="/login" state={{ from: location }} replace />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import Admin from "./pages/Admin";
import Register from "./pages/Register";

// ✅ CREATE INNER COMPONENT
function AppWrapper() {
  const location = useLocation();

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token") // ✅ FIXED
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

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        }
      />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* PROTECTED */}
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

// ✅ MAIN APP
export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}