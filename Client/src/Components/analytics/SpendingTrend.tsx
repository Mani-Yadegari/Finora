import { Clock3, CalendarDays, TrendingDown, Activity } from "lucide-react";

import Card from "../ui/Card";

const trends = [
  {
    title: "Evening Spending",
    value: "42%",
    description: "Most expenses happen after 6 PM",
    icon: Clock3,
  },
  {
    title: "Weekend Usage",
    value: "28%",
    description: "Your weekend spending is lower",
    icon: CalendarDays,
  },
  {
    title: "Daily Average",
    value: "$54",
    description: "8% less than last month",
    icon: TrendingDown,
  },
];

const SpendingTrend = () => {
  return (
    <Card className="relative overflow-hidden h-[320px]">
      <div
        className="
        absolute
        -left-16
        -bottom-16
        h-40
        w-40
        rounded-full
        bg-green-500/10
        blur-3xl
        "
      />

      <div className="relative flex items-center gap-3 mb-4">
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
          <Activity size={20} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Spending Habits</h3>

          <p className="mt-1 text-sm text-zinc-500">
            Understand your financial behavior
          </p>
        </div>
      </div>

      <div className="relative space-y-2.5">
        {trends.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
              group
              relative
              flex
              items-center
              justify-between
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.06]
              bg-black/20
              backdrop-blur-2xl
              px-3.5
              py-[11px]
              "
            >
              <div
                className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/[0.08]
                to-transparent
                "
              />

              <div className="relative flex items-center gap-3">
                <div
                  className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-green-400/10
                  bg-green-400/[0.05]
                  text-green-400
                  "
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium leading-4 text-zinc-200">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                className="
                relative
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                px-3
                py-1.5
                "
              >
                <span className="text-sm font-semibold text-zinc-300">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SpendingTrend;
