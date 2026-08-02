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

  const changeColor =
    type === "expense"
      ? isNegative
        ? "text-green-400"
        : "text-red-400"
      : isNegative
        ? "text-red-400"
        : "text-green-400";

  const TrendIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  return (
    <Card
      className="
        flex
        items-center
        gap-5
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div
        className={`
          w-[72px]
          h-[72px]
          rounded-3xl
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
        <Icon size={30} strokeWidth={2.2} />
      </div>

      <div className="flex flex-col flex-1">
        <p className="text-sm text-zinc-400">{title}</p>

        <h3 className="text-3xl font-semibold tracking-tight mt-1">{value}</h3>

        <p
          className={`
            flex
            items-center
            gap-1
            text-sm
            font-medium
            mt-2
            ${changeColor}
          `}
        >
          {change}
          <TrendIcon size={16} strokeWidth={2.5} />
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
