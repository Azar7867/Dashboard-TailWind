import { MoreVertical, FolderOpen } from "lucide-react";

export default function Projects() {
  const projects = [
    { name: "E-commerce Website", status: "In Progress", progress: 65, color: "bg-blue-500" },
    { name: "Admin Dashboard", status: "Completed", progress: 100, color: "bg-emerald-500" },
    { name: "Mobile App", status: "Pending", progress: 15, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Portfolio</h1>
          <p className="text-slate-500 mt-2">
            Track and manage all active and archived projects.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-200">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl ${project.color.replace('bg-', 'bg-')}/10 flex items-center justify-center text-xl`}>
                <FolderOpen className={project.color.replace('bg-', 'text-')} size={24} />
              </div>
              <button className="text-slate-300 hover:text-slate-500 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <h2 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{project.name}</h2>
            <div className="flex justify-between items-center mt-6 mb-2">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Progress</span>
              <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
            </div>
            
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${project.color} transition-all duration-500`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-6 border-t border-slate-50">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                project.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                "bg-slate-100 text-slate-600"
              }`}>
                {project.status}
              </span>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Open Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}