import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Card from "../ui/Card";

const data = [
  {
    month: "Jan",
    income: 4000,
    expense: 1800,
  },
  {
    month: "Feb",
    income: 5200,
    expense: 2200,
  },
  {
    month: "Mar",
    income: 4800,
    expense: 2600,
  },
  {
    month: "Apr",
    income: 7000,
    expense: 3000,
  },
  {
    month: "May",
    income: 6500,
    expense: 2800,
  },
];

const FinanceChart = () => {
  return (
    <Card className="h-[380px]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Financial Overview</h3>

        <p className="text-sm text-zinc-400">Income vs Expense</p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />

          <XAxis dataKey="month" stroke="#71717a" />

          <YAxis stroke="#71717a" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default FinanceChart;
