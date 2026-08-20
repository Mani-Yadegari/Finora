import type { ReactNode } from "react";

type SettingsCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  danger?: boolean;
};

const SettingsCard = ({
  icon,
  title,
  description,
  children,
  danger = false,
}: SettingsCardProps) => {
  return (
    <section
      className={`relative overflow-visible rounded-2xl border ${
        danger
          ? "border-red-500/[0.13] bg-red-500/[0.018]"
          : "border-white/[0.08] bg-white/[0.025]"
      }`}
    >
      {!danger && (
        <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-green-500/[0.025] blur-3xl" />
      )}

      {danger && (
        <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-red-500/[0.025] blur-3xl" />
      )}

      <div className="relative flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        {icon}

        <div>
          <h2
            className={`text-sm font-medium ${
              danger ? "text-red-400" : "text-white/85"
            }`}
          >
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-white/30">{description}</p>
        </div>
      </div>

      <div className="relative p-5">{children}</div>
    </section>
  );
};

export default SettingsCard;
