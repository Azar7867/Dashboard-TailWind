import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Tasks from "../pages/Tasks";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Team from "../pages/Team";
import CompletedTasks from "../pages/CompletedTasks";
import InProgressTasks from "../pages/InProgressTasks";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
import Admin from "../pages/Admin";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import Pricing from "../pages/Pricing";
import AddPlan from "../pages/AddPlan";
import PaymentPage from "../pages/PaymentPage";
import PaymentHistory from "../pages/PaymentHistory";
import CarDetails from "../pages/CarDetails"
import OfferCars from "../pages/OfferCars";
import OfferPage from "../pages/OfferPage";
export default function AppRoutes({ setIsAuth }) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="team" element={<Team />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/in-progress" element={<InProgressTasks />} />
        <Route path="settings" element={<Settings />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="help" element={<Help />} />
        <Route path="blog" element={<Blog />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="add-plan" element={<AddPlan />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="admin" element={<Admin />} />
        <Route path="offer" element={<OfferPage />} />
        <Route path="offer-cars" element={<OfferCars />} />
        <Route path="cars" element={<CarDetails />} />
      </Route>
    </Routes>
  );
}