import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

import Card from "../ui/Card";
import AnimatedNumber from "../ui/AnimatedNumber";

const data = [
  {
    name: "Food",
    value: 1200,
    percent: "32%",
  },
  {
    name: "Shopping",
    value: 900,
    percent: "24%",
  },
  {
    name: "Bills",
    value: 680,
    percent: "18%",
  },
  {
    name: "Transport",
    value: 450,
    percent: "12%",
  },
  {
    name: "Other",
    value: 520,
    percent: "14%",
  },
];

const COLORS = ["#16a34a", "#2563eb", "#d97706", "#dc2626", "#7c3aed"];

const SpendingBreakdown = () => {
  return (
    <Card className="relative overflow-hidden h-[320px]">
      <div
        className="
        absolute
        -right-20
        -top-20
        h-44
        w-44
        rounded-full
        bg-green-500/10
        blur-3xl
        "
      />

      <div className="relative flex items-center gap-3 mb-3">
        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          border-green-400/20
          bg-green-400/[0.08]
          text-green-400
          "
        >
          <PieIcon size={20} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Spending Breakdown</h3>

          <p className="mt-1 text-sm text-zinc-500">Where your money goes</p>
        </div>
      </div>

      <div
        className="
        relative
        flex
        items-center
        gap-5
        -translate-y-2
        "
      >
        <div className="relative h-[170px] w-[170px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={78}
                paddingAngle={4}
                stroke="transparent"
                animationDuration={900}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#09090b",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "14px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div
            className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            "
          >
            <span className="text-xs text-zinc-500">Total</span>

            <span className="text-xl font-semibold text-white">
              <AnimatedNumber
                value={3750}
                prefix="$"
                decimals={0}
                duration={1.2}
                delay={0.2}
              />
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="
              flex
              items-center
              justify-between
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                  h-2.5
                  w-2.5
                  rounded-full
                  opacity-80
                  "
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                />

                <span className="text-sm text-zinc-300">{item.name}</span>
              </div>

              <div className="text-right">
                <p className="text-sm text-zinc-300">
                  ${item.value.toLocaleString()}
                </p>

                <p className="text-xs text-zinc-500">{item.percent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SpendingBreakdown;
