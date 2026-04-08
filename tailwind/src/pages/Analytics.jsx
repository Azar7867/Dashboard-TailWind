import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TrafficChart from "../components/TrafficChart";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-500 mt-2">
          Monitor your performance, revenue, and user engagement metrics.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Visitors" value="24,500" change="+12%" />
        <StatsCard title="Conversions" value="3,120" change="+5.4%" />
        <StatsCard title="Bounce Rate" value="38%" change="-2%" />
        <StatsCard title="Avg Session" value="3m 24s" change="+10%" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Revenue Growth</h2>
          <RevenueChart />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Traffic Allocation</h2>
          <TrafficChart />
        </div>
      </div>

      {/* Extra Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Top Geographic Regions</h2>
          <ul className="space-y-4">
            {[
              { label: "India", perc: "40%", flag: "🇮🇳" },
              { label: "USA", perc: "25%", flag: "🇺🇸" },
              { label: "UK", perc: "15%", flag: "🇬🇧" },
              { label: "Other Regions", perc: "20%", flag: "🌍" },
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-center group">
                <span className="text-slate-600 flex items-center gap-3">
                  <span className="text-xl">{item.flag}</span>
                  <span className="font-medium">{item.label}</span>
                </span>
                <span className="font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-wider">
                  {item.perc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Real-time Activity</h2>
          <ul className="space-y-4">
            {[
              { msg: "User John signed up", time: "2 mins ago" },
              { msg: "Order #1234 completed", time: "15 mins ago" },
              { msg: "New traffic spike detected", time: "1 hour ago" },
              { msg: "Server performance stable", time: "3 hours ago" },
            ].map((activity, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shadow-sm shadow-blue-200"></div>
                <div>
                  <p className="text-slate-700 font-medium text-sm">{activity.msg}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}