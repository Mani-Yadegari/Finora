import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

const data = [
  {
    month: "Jan",
    income: 4000,
  },
  {
    month: "Feb",
    income: 5200,
  },
  {
    month: "Mar",
    income: 6800,
  },
  {
    month: "Apr",
    income: 7200,
  },
];

const IncomeChart = () => {
  return (
    <Card className="h-[380px]">
      <h3 className="text-lg font-semibold mb-6">Income Growth</h3>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="#71717a" />

          <YAxis stroke="#71717a" />

          <Tooltip />

          <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeChart;
