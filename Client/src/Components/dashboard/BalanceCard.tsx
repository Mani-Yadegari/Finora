import { Landmark, TrendingUp } from "lucide-react";
import Card from "../ui/Card";

const BalanceCard = () => {
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
      {/* Glow */}
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

      <div className="relative flex justify-between items-center h-full">
        {/* Left */}
        <div>
          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-green-500/10
              text-green-400
              flex
              items-center
              justify-center
              border
              border-green-400/20
            "
          >
            <Landmark size={20} />
          </div>

          <p className="text-sm text-zinc-400 mt-5">Total Balance</p>

          <h2
            className="
              text-4xl
              font-semibold
              tracking-tight
              mt-1
            "
          >
            $24,580.00
          </h2>
        </div>

        {/* Right Side */}
        <div
          className="
            flex
            flex-col
            items-end
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-1
              text-sm
              text-green-400
              bg-green-500/10
              px-3
              py-1.5
              rounded-full
            "
          >
            <TrendingUp size={14} />
            +12.5%
          </div>

          {/* Mini Chart */}
          <div
            className="
              w-44
              h-16
              flex
              items-end
              gap-2
              opacity-60
            "
          >
            {[30, 45, 35, 60, 50, 75, 90].map((height, index) => (
              <div
                key={index}
                className="
                  flex-1
                  rounded-full
                  bg-green-400/40
                "
                style={{
                  height: `${height}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
