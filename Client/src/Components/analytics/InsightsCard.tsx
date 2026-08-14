import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

import Card from "../ui/Card";

const insights = [
  {
    icon: TrendingUp,
    title: "Saving improved",
    text: "Your saving rate increased by 8% this month.",
    type: "positive",
  },
  {
    icon: AlertCircle,
    title: "Food spending increased",
    text: "Food expenses are 18% higher than your average.",
    type: "warning",
  },
];

const InsightsCard = () => {
  return (
    <Card className="relative overflow-hidden h-[320px]">
      <div
        className="
        absolute
        -top-20
        -right-16
        h-40
        w-40
        rounded-full
        bg-green-500/10
        blur-3xl
        "
      />

      <div className="relative flex items-center gap-3 mb-5">
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
          <Sparkles size={20} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Financial Insights</h3>

          <p className="mt-1 text-sm text-zinc-500">
            Smart analysis of your habits
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/[0.07]
              bg-black/20
              backdrop-blur-2xl
              px-3.5
              py-3
              "
            >
              <div
                className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                ${
                  item.type === "positive"
                    ? "border-green-400/15 bg-green-400/[0.07] text-green-400"
                    : "border-yellow-400/15 bg-yellow-400/[0.07] text-yellow-400"
                }
                `}
              >
                <Icon size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-200">
                  {item.title}
                </p>

                <p className="mt-1 text-xs leading-4 text-zinc-500">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="
        mt-4
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-green-400/15
        bg-green-400/[0.05]
        px-3
        py-2.5
        "
      >
        <div
          className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-green-400/[0.08]
          text-green-400
          "
        >
          <Lightbulb size={15} />
        </div>

        <p className="text-xs leading-5 text-green-300">
          Reducing unnecessary spending by $120 could increase your saving rate
          to 78%.
        </p>
      </div>
    </Card>
  );
};

export default InsightsCard;
