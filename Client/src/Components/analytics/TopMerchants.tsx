import { ShoppingBag, Coffee, Car, Receipt } from "lucide-react";
import { motion } from "framer-motion";

import Card from "../ui/Card";
import AnimatedNumber from "../ui/AnimatedNumber";

const expenses = [
  {
    name: "Amazon",
    category: "Shopping",
    amount: 240,
    percent: 32,
    icon: ShoppingBag,
  },
  {
    name: "Uber",
    category: "Transport",
    amount: 120,
    percent: 16,
    icon: Car,
  },
  {
    name: "Starbucks",
    category: "Food & Drinks",
    amount: 85,
    percent: 11,
    icon: Coffee,
  },
];

const TopMerchants = () => {
  return (
    <Card className="relative overflow-hidden h-[320px]">
      <div
        className="
        absolute
        -top-20
        -right-20
        h-44
        w-44
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
          <Receipt size={20} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Top Expenses</h3>

          <p className="mt-1 text-sm text-zinc-500">
            Your biggest spending areas
          </p>
        </div>
      </div>

      <div className="relative space-y-4">
        {expenses.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.name}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-2xl
                    bg-black/20
                    border
                    border-white/[0.06]
                    text-zinc-300
                    backdrop-blur-xl
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>

                    <p className="text-xs text-zinc-500">{item.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-200">
                    <AnimatedNumber
                      value={item.amount}
                      prefix="$"
                      decimals={0}
                      duration={1}
                      delay={index * 0.15}
                    />
                  </p>

                  <p className="text-xs text-zinc-500">
                    <AnimatedNumber
                      value={item.percent}
                      suffix="%"
                      decimals={0}
                      duration={1}
                      delay={index * 0.15}
                    />
                  </p>
                </div>
              </div>

              <div
                className="
                mt-2
                h-1.5
                rounded-full
                bg-white/[0.06]
                overflow-hidden
                "
              >
                <motion.div
                  className="
                  h-full
                  rounded-full
                  bg-green-400/60
                  "
                  initial={{ width: 0 }}
                  animate={{
                    width: `${item.percent}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TopMerchants;
