import type { ReactNode } from "react";

type PreferenceRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

const PreferenceRow = ({
  icon,
  title,
  description,
  children,
}: PreferenceRowProps) => {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/[0.06] px-4 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/[0.06] text-green-400">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="select-text text-sm font-medium text-white">{title}</p>

          <p className="mt-1 select-text text-xs text-white/30">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PreferenceRow;
