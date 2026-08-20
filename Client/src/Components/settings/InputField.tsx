import type { ReactNode } from "react";

type InputFieldProps = {
  label: string;
  icon: ReactNode;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

const InputField = ({
  label,
  icon,
  type = "text",
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label className="mb-2 block select-text text-xs font-medium text-white/45">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/10 pl-10 pr-4 text-sm text-white outline-none transition-all duration-200 hover:border-white/[0.11] focus:border-green-500/30 focus:bg-white/[0.025] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.035)]"
        />
      </div>
    </div>
  );
};

export default InputField;
