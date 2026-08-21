import type { ReactNode } from "react";

type NotificationRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

const NotificationRow = ({
  icon,
  title,
  description,
  enabled,
  onToggle,
}: NotificationRowProps) => {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/6 px-4 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/6 text-green-400">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="select-text text-sm font-medium text-white">{title}</p>

          <p className="mt-1 select-text text-xs text-white/30">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-all duration-200 ${
          enabled
            ? "border-green-400/20 bg-green-500 shadow-[0_0_14px_rgba(34,197,94,0.12)]"
            : "border-white/8 bg-white/8"
        }`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${
            enabled ? "left-5.5" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationRow;
