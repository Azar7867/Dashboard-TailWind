import { BrowserRouter } from "react-router-dom";
import RootRouter from "./routes/RootRouter";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
    <ToastContainer position="top-right" autoClose={2000} />
     <RootRouter  />
    </BrowserRouter>
  );
}