import {
  LayoutDashboard,
  BarChart3,
  Users,
  Folder,
  Settings,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Projects", icon: Folder, path: "/projects" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Help", icon: HelpCircle, path: "/help" },
    { name: "Admin", icon: Settings, path: "/admin" }
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-black text-white p-5">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          ⚛️
        </div>
        <h1 className="text-lg font-semibold">ReactDash</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}