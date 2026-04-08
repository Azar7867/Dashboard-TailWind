import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsCard({ title, value, change }) {
  const isPositive = change.includes("+");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight group-hover:text-blue-600 transition-colors">
            {value}
          </h2>
        </div>
        <div className={`p-2 rounded-xl ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
          {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
        }`}>
          {change}
        </span>
        <span className="text-xs text-slate-400 font-medium">vs last month</span>
      </div>
    </div>
  );
}