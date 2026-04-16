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
        <Route path="help" element={<Help />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}