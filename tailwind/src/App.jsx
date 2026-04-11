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

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  // 🔥 THIS FIXES YOUR ISSUE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
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

        {/* PROTECTED */}
        <Route
          path="/*"
          element={
            isAuth ? (
              <AppRoutes setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}