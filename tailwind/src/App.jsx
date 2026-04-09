import { BrowserRouter} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
      <AppRoutes />
    </BrowserRouter>
  );
}