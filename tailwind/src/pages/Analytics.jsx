import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TrafficChart from "../components/TrafficChart";

export default function Analytics() {
  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <p className="text-gray-500 mt-2">
        Monitor your performance, revenue, and user engagement.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatsCard title="Visitors" value="24,500" change="+12%" />
        <StatsCard title="Conversions" value="3,120" change="+5.4%" />
        <StatsCard title="Bounce Rate" value="38%" change="-2%" />
        <StatsCard title="Avg Session" value="3m 24s" change="+10%" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Revenue Overview</h2>
          <RevenueChart />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Traffic Sources</h2>
          <TrafficChart />
        </div>
      </div>

      {/* Extra Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Top Countries</h2>
          <ul className="space-y-2 text-gray-600">
            <li>🇮🇳 India - 40%</li>
            <li>🇺🇸 USA - 25%</li>
            <li>🇬🇧 UK - 15%</li>
            <li>🌍 Others - 20%</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2 text-gray-600">
            <li>User John signed up</li>
            <li>Order #1234 completed</li>
            <li>New traffic spike detected</li>
            <li>Server performance stable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}