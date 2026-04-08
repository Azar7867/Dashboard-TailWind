import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { name: "Organic", value: 58 },
  { name: "Referral", value: 25 },
  { name: "Social", value: 12 },
  { name: "Direct", value: 26 },
];

const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB"];

export default function TrafficChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow h-[300px]">
      {/* Title */}
      <h2 className="font-semibold text-gray-700 mb-4">
        Traffic Sources
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip formatter={(value) => `${value}%`} />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            barSize={40}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}