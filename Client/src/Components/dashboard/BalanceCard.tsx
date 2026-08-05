import { Landmark, TrendingUp } from "lucide-react";
import Card from "../ui/Card";
import AnimatedNumber from "../ui/AnimatedNumber";

const BalanceCard = () => {
  const balance = 24580;
  const growth = 12.5;

  const chartData = [30, 45, 35, 60, 50, 75, 90];

  return (
    <Card
      className="
        relative
        overflow-hidden
        h-[190px]
        bg-gradient-to-br
        from-green-500/10
        via-white/[0.04]
        to-transparent
      "
    >
      {/* Top Glow */}
      <div
        className="
          absolute
          -top-24
          -right-20
          w-64
          h-64
          rounded-full
          bg-green-400/10
          blur-3xl
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          -bottom-24
          -left-16
          w-52
          h-52
          rounded-full
          bg-emerald-500/5
          blur-3xl
        "
      />

      <div className="relative flex items-center justify-between h-full">
        {/* Left */}
        <div>
          <div
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-xl
              border
              border-green-400/20
              bg-green-500/10
              text-green-400
              shadow-[0_0_18px_rgba(34,197,94,.15)]
            "
          >
            <Landmark size={20} />
          </div>

          <p className="mt-5 text-sm text-zinc-400">Total Balance</p>

          <h2
            className="
              mt-1
              text-4xl
              font-semibold
              tracking-tight
            "
          >
            <AnimatedNumber value={balance} prefix="$" />
          </h2>

          <p className="mt-1 text-xs text-zinc-500">Across all accounts</p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-4">
          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-green-400/15
              bg-green-500/10
              px-3
              py-1.5
              text-sm
              font-medium
              text-green-400
            "
          >
            <TrendingUp size={14} />+{growth}% this month
          </div>

          <div
            className="
    flex
    items-end
    gap-2
    w-44
    h-16
    group
  "
          >
            {chartData.map((height, index) => (
              <div
                key={index}
                className="
        flex-1
        origin-bottom
        rounded-full
        bg-gradient-to-t
        from-green-600/70
        via-green-500/55
        to-green-300/80

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:scale-y-110
        hover:brightness-125
        hover:-translate-y-0.5

        group-hover:opacity-70
        hover:!opacity-100
      "
                style={{
                  height: `${height}%`,
                  transitionDelay: `${index * 20}ms`,
                }}
              />
            ))}
          </div>

          <p className="text-[11px] tracking-wide text-zinc-500">Last 7 days</p>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
