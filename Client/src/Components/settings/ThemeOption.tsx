import type { ReactNode } from "react";
import { Check } from "lucide-react";

type ThemeOptionProps = {
  active: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

const ThemeOption = ({
  active,
  icon,
  title,
  description,
  onClick,
}: ThemeOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
        active
          ? "border-green-500/25 bg-green-500/[0.06] shadow-[0_0_25px_rgba(34,197,94,0.035)]"
          : "border-white/[0.07] bg-white/[0.018] hover:border-white/[0.12] hover:bg-white/[0.035]"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          active
            ? "bg-green-500/10 text-green-400"
            : "bg-white/[0.04] text-white/30"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-white">{title}</p>

        <p className="mt-1 text-xs text-white/30">{description}</p>
      </div>

      {active && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-black shadow-[0_0_12px_rgba(34,197,94,0.25)]">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

export default ThemeOption;
