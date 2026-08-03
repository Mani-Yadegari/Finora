import { useState } from "react";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Card from "../ui/Card";

const chartData = {
  week: [
    { label: "Mon", income: 500, expense: 120 },
    { label: "Tue", income: 700, expense: 250 },
    { label: "Wed", income: 450, expense: 180 },
    { label: "Thu", income: 900, expense: 320 },
    { label: "Fri", income: 650, expense: 200 },
    { label: "Sat", income: 800, expense: 280 },
    { label: "Sun", income: 1000, expense: 400 },
  ],

  month: [
    { label: "Jan", income: 4200, expense: 1900 },
    { label: "Feb", income: 5100, expense: 2300 },
    { label: "Mar", income: 4800, expense: 2600 },
    { label: "Apr", income: 6200, expense: 2800 },
    { label: "May", income: 5800, expense: 2500 },
    { label: "Jun", income: 7200, expense: 4200 },
    { label: "Jul", income: 6800, expense: 2900 },
    { label: "Aug", income: 7600, expense: 3500 },
    { label: "Sep", income: 6900, expense: 3100 },
    { label: "Oct", income: 8200, expense: 3800 },
    { label: "Nov", income: 7800, expense: 3400 },
    { label: "Dec", income: 9000, expense: 4000 },
  ],

  year: [
    { label: "2022", income: 52000, expense: 22000 },
    { label: "2023", income: 68000, expense: 31000 },
    { label: "2024", income: 82000, expense: 38000 },
    { label: "2025", income: 95000, expense: 42000 },
    { label: "2026", income: 110000, expense: 46000 },
  ],
};

const FinanceChart = () => {
  const [range, setRange] = useState<"week" | "month" | "year">("month");

  return (
    <Card
      className="
        relative
        overflow-hidden
        h-95
        bg-white/[0.04]
        backdrop-blur-2xl
        border-white/10
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -top-24
          -right-20
          w-60
          h-60
          rounded-full
          bg-green-400/10
          blur-3xl
        "
      />

      {/* Header */}
      <div
        className="
          relative
          flex
          justify-between
          items-start
          mb-5
        "
      >
        <div>
          <h3 className="text-xl font-semibold">Financial Overview</h3>

          {/* Legend */}
          <div
            className="
              flex
              items-center
              gap-4
              text-xs
              text-zinc-400
              mt-2
            "
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Income
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Expense
            </div>
          </div>
        </div>

        {/* Range Switch */}
        <div
          className="
            flex
            gap-1
            bg-white/5
            p-1
            rounded-xl
            border
            border-white/10
          "
        >
          {["week", "month", "year"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item as "week" | "month" | "year")}
              className={`
                px-3
                py-1.5
                rounded-lg
                text-xs
                capitalize
                transition-all

                ${
                  range === item
                    ? "bg-green-500/20 text-green-400"
                    : "text-zinc-400 hover:text-white"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={chartData[range]}
          margin={{
            top: 10,
            right: 15,
            left: 10,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity={0.35} />

              <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="label"
            stroke="#71717a"
            tickLine={false}
            axisLine={false}
            dy={10}
            minTickGap={8}
            tick={{ fontSize: 14 }}
          />

          <YAxis
            stroke="#71717a"
            tickLine={false}
            axisLine={false}
            width={55}
            tickFormatter={(value) => (value === 0 ? "" : `$${value / 1000}k`)}
          />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
              color: "#fff",
            }}
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#4ade80"
            strokeWidth={3}
            fill="url(#incomeGradient)"
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#fb7185"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default FinanceChart;
