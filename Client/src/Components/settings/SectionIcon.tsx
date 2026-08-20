import type { ReactNode } from "react";

type SectionIconProps = {
  children: ReactNode;
};

const SectionIcon = ({ children }: SectionIconProps) => {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/[0.07] text-green-400">
      {children}
    </div>
  );
};

export default SectionIcon;
