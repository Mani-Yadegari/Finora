import { WalletCards, Sparkle } from "lucide-react";
import Card from "../ui/Card";

const SavingChart = () => {
  const savingPercent = 72;
  const targetAmount = "$30,000";

  return (
    <Card
      className="
        relative
        overflow-hidden
        h-full
        bg-white/[0.04]
        backdrop-blur-2xl
        border-white/10
      "
    >
      {/* Top Glow */}
      <div
        className="
          absolute
          -top-20
          -right-20
          w-48
          h-48
          rounded-full
          bg-green-400/10
          blur-3xl
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          -bottom-20
          -left-20
          w-40
          h-40
          rounded-full
          bg-emerald-400/10
          blur-3xl
        "
      />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-wider
              text-zinc-500
            "
          >
            Monthly Goal
          </p>

          <h3
            className="
              text-lg
              font-semibold
              mt-1
            "
          >
            Saving Progress
          </h3>
        </div>

        {/* Icon */}
        <div
          className="
            relative
            w-11
            h-11
            rounded-2xl
            bg-green-500/10
            text-green-400
            flex
            items-center
            justify-center
            border
            border-green-400/20
            backdrop-blur-xl
            shadow-[0_0_25px_rgba(34,197,94,0.15)]
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-green-400/10
              blur-xl
            "
          />

          <WalletCards size={22} strokeWidth={2} className="relative z-10" />
        </div>
      </div>

      {/* Circular Chart */}
      <div
        className="
    relative
    flex
    items-center
    justify-center
    mt-4
    h-[190px]
  "
      >
        {/* Chart Glow */}
        <div
          className="
      absolute
      w-52
      h-52
      rounded-full
      bg-green-400/15
      blur-3xl
    "
        />

        <svg
          className="
      absolute
      w-52
      h-52
      -rotate-90
    "
          viewBox="0 0 120 120"
        >
          {/* Background Ring */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />

          {/* Progress Ring */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#4ade80"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${savingPercent * 3.27} 327`}
          />
        </svg>

        {/* Center */}
        <div className="absolute flex flex-col items-center justify-center">
          <h2 className="text-[34px] font-bold tracking-tight leading-none">
            {savingPercent}%
          </h2>

          <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500">
            of {targetAmount}
          </p>
        </div>
      </div>

      {/* Status */}
      <div
        className="
          relative
          text-center
          mt-3
        "
      >
        <h3
          className="
            text-base
            font-semibold
            flex
            justify-center
            items-center
            gap-2
          "
        >
          You're doing great!
          <Sparkle size={15} className="text-green-300" />
        </h3>

        <p
          className="
            text-sm
            text-zinc-400
            mt-1
          "
        >
          Keep going, you're almost there.
        </p>
      </div>
    </Card>
  );
};

export default SavingChart;
