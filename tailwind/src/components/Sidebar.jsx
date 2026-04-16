import {
  LayoutDashboard,
  BarChart3,
  Users,
  Folder,
  Settings,
  HelpCircle,
  X,
  PlayCircle,
  CheckCircle,
  FileText
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Projects", icon: Folder, path: "/projects" },
    { name: "Tasks", icon: LayoutDashboard, path: "/tasks" },
    { name: "In Progress", icon: PlayCircle, path: "/in-progress" },
  { name: "Completed", icon: CheckCircle, path: "/completed" },
  { name: "Blog", icon: FileText, path: "/blog" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Help", icon: HelpCircle, path: "/help" },
    // { name: "Admin", icon: Settings, path: "/admin-login" }
  ];

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-black text-white p-5 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      
      {/* Logo & Close Button */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            ⚛️
          </div>
          <h1 className="text-lg font-semibold">ReactDash</h1>
        </div>
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar();
              }}
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
