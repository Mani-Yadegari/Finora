import Card from "../ui/Card";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;

  type?: "expense" | "income" | "balance" | "investment";

  iconColor?: string;
  iconBg?: string;
};

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,

  type = "income",

  iconColor = "text-green-400",
  iconBg = "bg-green-500/10",
}: Props) => {
  const changeValue = Number(change.replace(/[^\d.-]/g, ""));

  const isNegative = changeValue < 0;

  // آیا این تغییر خوب است؟
  const isPositiveChange = type === "expense" ? isNegative : !isNegative;

  const changeColor = isPositiveChange ? "text-green-400" : "text-red-400";

  const changeBg = isPositiveChange ? "bg-green-500/10" : "bg-red-500/10";

  const TrendIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  const glowColor = type === "expense" ? "bg-red-400/5" : "bg-green-400/5";

  return (
    <Card
      className="
        relative
        overflow-hidden
        flex
        items-center
        gap-5
        min-h-[150px]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute
          -right-10
          -bottom-10
          w-32
          h-32
          rounded-full
          ${glowColor}
          blur-3xl
        `}
      />

      {/* Icon */}
      <div
        className={`
          relative
          w-16
          h-16
          rounded-2xl
          ${iconBg}
          ${iconColor}
          flex
          items-center
          justify-center
          border
          border-white/10
          backdrop-blur-xl
          shadow-inner
          shrink-0
        `}
      >
        <Icon size={27} strokeWidth={2.2} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col">
        <p
          className="
            text-sm
            text-zinc-400
          "
        >
          {title}
        </p>

        <h3
          className="
            text-3xl
            font-semibold
            tracking-tight
            mt-1
          "
        >
          {value}
        </h3>

        {/* Change Badge */}
        <div
          className={`
            flex
            items-center
            gap-1
            w-fit
            mt-3
            px-2.5
            py-1
            rounded-full
            text-xs
            font-medium
            ${changeColor}
            ${changeBg}
            border
            border-white/10
          `}
        >
          {change}

          <TrendIcon size={14} strokeWidth={2.5} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
