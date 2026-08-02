import Card from "../ui/Card";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;

  iconColor?: string;
  iconBg?: string;

  changeColor?: string;
};

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,

  iconColor = "text-green-400",
  iconBg = "bg-green-500/10",

  changeColor = "text-green-400",
}: Props) => {
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
      {/* Icon */}
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

      {/* Content */}
      <div className="flex flex-col flex-1">
        <p className="text-sm text-zinc-400">{title}</p>

        <h3 className="text-3xl font-semibold tracking-tight mt-1">{value}</h3>

        <p className={`text-sm font-medium mt-2 ${changeColor}`}>{change}</p>
      </div>
    </Card>
  );
};

export default StatCard;
