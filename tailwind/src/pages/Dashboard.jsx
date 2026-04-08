import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TrafficChart from "../components/TrafficChart";
import BikeTable from "../components/BikeTable";
import Activity from "../components/Activity";

export default function Dashboard() {
  return (
    <>
      <Header />

      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatsCard title="Total Users" value="12,840" change="+15%" />
        <StatsCard title="Revenue" value="$45,210" change="+8.2%" />
        <StatsCard title="Active Projects" value="34" change="+2 projects" />
        <StatsCard title="Pending Tasks" value="9" change="-1 task" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <TrafficChart />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-2">
          <BikeTable />
        </div>
        <Activity />
      </div>
    </>
  );
}