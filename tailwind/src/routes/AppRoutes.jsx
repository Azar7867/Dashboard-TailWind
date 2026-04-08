import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";

import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Team from "../pages/Team";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="team" element={<Team />} />
        <Route path="projects" element={<Projects />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}