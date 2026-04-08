import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TrafficChart from "../components/TrafficChart";
import BikeTable from "../components/BikeTable";
import Activity from "../components/Activity";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value="12,840" change="+15%" />
        <StatsCard title="Revenue" value="$45,210" change="+8.2%" />
        <StatsCard title="Active Projects" value="34" change="+2 projects" />
        <StatsCard title="Pending Tasks" value="9" change="-1 task" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TrafficChart />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 overflow-x-auto">
          <BikeTable />
        </div>
        <div>
          <Activity />
        </div>
      </div>
    </div>
  );
}