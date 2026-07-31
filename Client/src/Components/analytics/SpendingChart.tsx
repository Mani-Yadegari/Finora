import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import Card from "../ui/Card";

const data = [
  {
    name: "Food",
    value: 400,
  },
  {
    name: "Transport",
    value: 250,
  },
  {
    name: "Shopping",
    value: 300,
  },
  {
    name: "Entertainment",
    value: 150,
  },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const SpendingChart = () => {
  return (
    <Card className="h-[380px]">
      <h3 className="text-lg font-semibold mb-6">Spending Categories</h3>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={120}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SpendingChart;
