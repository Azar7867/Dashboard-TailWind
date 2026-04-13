// import { Menu, Search } from "lucide-react";

// export default function Header({ toggleSidebar }) {
//   return (
//     <div className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30 py-4 px-1 rounded-2xl mb-6">
//       <div className="flex items-center gap-4">
//         <button 
//           onClick={toggleSidebar}
//           className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <Menu size={24} />
//         </button>
//         <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent hidden sm:block">
//           Welcome back, Alex!
//         </h1>
//       </div>

//       <div className="flex gap-4 items-center flex-1 justify-end">
//         <div className="relative hidden md:block w-64">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search reports..."
//             className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
//           />
//         </div>
        
//         <div className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-200">
//           <img
//             src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
//             className="w-9 h-9 rounded-xl object-cover shadow-sm"
//             alt="User avatar"
//           />
//           <div className="hidden lg:block">
//             <p className="text-sm font-semibold text-slate-900 leading-none">Alex Johnson</p>
//             <p className="text-xs text-slate-500 mt-1">Super Admin</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar, setIsAuth }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30 py-4 px-1 rounded-2xl mb-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent hidden sm:block">
          Welcome back, Alex!
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex gap-4 items-center flex-1 justify-end">

        {/* SEARCH */}
        <div className="relative hidden md:block w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        {/* LOGIN BUTTON */}
        {/* <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          Login
        </button> */}
        <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // 💥 FORCE RELOAD
  }}
  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
>
  Logout
</button>

        {/* USER PROFILE (UNCHANGED) */}
        <div className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-200">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            className="w-9 h-9 rounded-xl object-cover shadow-sm"
            alt="User avatar"
          />
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">
              Alex Johnson
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}