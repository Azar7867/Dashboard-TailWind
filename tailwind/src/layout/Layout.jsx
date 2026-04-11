import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Layout({ setIsAuth }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen overflow-hidden">
      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen relative overflow-hidden">
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* <Header toggleSidebar={toggleSidebar} /> */}
          <Header toggleSidebar={toggleSidebar} setIsAuth={setIsAuth} />
          <main className="max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
